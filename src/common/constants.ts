const SUPPORTED_MIME_TYPES = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
const MESSAGES = {
    INVALID_FILE_TYPE: "Invalid file type. Please upload a PDF, JPG, or PNG file.",
    FILE_REQUIRED: "Please select a file.",
    REQUIREMENT_REQUIRED: "Please enter validation requirements.",
    ENTITY_REQUIRED: "Please add at least one entity for extraction.",
    FILE_PARSED: "File parsed successfully",
    FILE_CONVERSION_FAILED: "File conversion failed",
    API_ERROR: "API request failed",
    UNKNOWN_ERROR: "Unknown error",
    INVALID_RESPONSE: "Invalid API response format",
    PARSE_ERROR: "Failed to parse validation response",
    NO_REASON: "No reason provided",
    NOT_FOUND: "Not found"
  };
  
  const API_CONFIG = {
    ROLE_USER: "user",
    MIME_TYPE_JSON: "application/json",
    SYSTEM_INSTRUCTION: "You will analyse the file content and compare it with the requirement text and tell whether the file passed the requirement or not. You will also share the reason in short. Extract the following information:",
    REQUIREMENT_PREFIX: "Requirement: "
  };

export  {
    SUPPORTED_MIME_TYPES,
    MESSAGES,
    API_CONFIG
}