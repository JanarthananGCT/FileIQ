import React from "react";
import {
  SparrowIQProps,
  SparrowIQState,
  SparrowIQEntity,
} from "../common/types";
import {
  SUPPORTED_MIME_TYPES,
  MESSAGES,
  API_CONFIG,
} from "../common/constants";

export class SparrowIQ extends React.Component<SparrowIQProps, SparrowIQState> {
  constructor(props: SparrowIQProps) {
    super(props);
    this.state = {
      file: null,
      requirement: "",
      entities: [],
    };
  }

  validateFileType = (file: File) => {
    if (!SUPPORTED_MIME_TYPES.includes(file.type)) {
      return {
        success: false,
        message: MESSAGES.INVALID_FILE_TYPE,
      };
    }
    return this.props;
  };

  updateFile = (file: File) => this.setState({ file });

  updateRequirement = (requirement: string) => this.setState({ requirement });

  updateEntities = (entities: SparrowIQEntity[]) => this.setState({ entities });

  convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () =>
        resolve(reader.result?.toString().split(",")[1] || "");
      reader.onerror = () => reject(new Error(MESSAGES.FILE_CONVERSION_FAILED));
      reader.readAsDataURL(file);
    });
  };

  validateState = () => {
    if (!this.state.file) {
      return { success: false, message: MESSAGES.FILE_REQUIRED };
    }

    if (!this.state.requirement.trim()) {
      return { success: false, message: MESSAGES.REQUIREMENT_REQUIRED };
    }

    if (!this.state.entities.length) {
      return { success: false, message: MESSAGES.ENTITY_REQUIRED };
    }

    return { success: true, message: MESSAGES.FILE_PARSED };
  };

  validateFile = async (fileBase64: string) => {
    const requestBody = {
      contents: [
        {
          role: API_CONFIG.ROLE_USER,
          parts: [
            {
              inlineData: {
                data: fileBase64,
                mimeType: this.state.file?.type,
              },
            },
            {
              text: `${API_CONFIG.REQUIREMENT_PREFIX}${this.state.requirement}`,
            },
          ],
        },
      ],
      systemInstruction: {
        role: API_CONFIG.ROLE_USER,
        parts: [
          {
            text: `${API_CONFIG.SYSTEM_INSTRUCTION} ${this.state.entities.join(", ")}`,
          },
        ],
      },
      generationConfig: {
        temperature: 1,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 8192,
        responseMimeType: API_CONFIG.MIME_TYPE_JSON,
        responseSchema: {
          type: "object",
          properties: {
            requirement: { type: "string" },
            validity: { type: "boolean" },
            reason: { type: "string" },
            ...Object.fromEntries(
              this.state.entities.map((entity) => [entity, { type: "string" }])
            ),
          },
        },
      },
    };

    const response = await fetch(
      `${this.props.config.GENERATE_URL}?key=${this.props.config.API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": API_CONFIG.MIME_TYPE_JSON },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        `${MESSAGES.API_ERROR}: ${error.error?.message || MESSAGES.UNKNOWN_ERROR}`
      );
    }

    return response.json();
  };

  parseValidationResponse = async (data: any) => {
    if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error(MESSAGES.INVALID_RESPONSE);
    }

    try {
      const responseText = data.candidates[0].content.parts[0].text;
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);

      if (jsonMatch) {
        const parsedData = JSON.parse(jsonMatch[0]);
        return {
          validity: Boolean(parsedData.validity),
          reason: parsedData.reason || MESSAGES.NO_REASON,
          entities: Object.fromEntries(
            this.state.entities.map((entity) => [
              entity.name,
              parsedData[entity.name] || MESSAGES.NOT_FOUND,
            ])
          ),
        };
      }

      // Fallback parsing if JSON parsing fails
      const validity =
        responseText.toLowerCase().includes('"validity": true') ||
        responseText.toLowerCase().includes("validity: true");

      const reasonMatch = responseText.match(
        /"reason":\s*"([^"]*)"|reason:\s*([^\n]*)/i
      );
      const reason = reasonMatch?.[1] || MESSAGES.NO_REASON;

      const entities = Object.fromEntries(
        this.state.entities.map((entity) => {
          const match = responseText.match(
            new RegExp(
              `"${entity.name}":\s*"?([^"\n]*)"?|${entity.name}:\s*([^\n]*)`,
              "i"
            )
          );
          return [
            entity.name,
            (match?.[1] || match?.[2] || "").trim() || MESSAGES.NOT_FOUND,
          ];
        })
      );

      return { validity, reason, entities };
    } catch (error) {
      console.error("Error parsing response:", error);
      throw new Error(MESSAGES.PARSE_ERROR);
    }
  };
  async parseFile(file: File) {
    const fileBase64 = await this.convertFileToBase64(file);
    const validationResponse = await this.validateFile(fileBase64);
    return this.parseValidationResponse(validationResponse);
  }
}
