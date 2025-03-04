import React from "react";
import { ThemeProvider } from "@sparrowengg/twigs-react";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
};

export const decorators = [
  (Story) => (
    <ThemeProvider
      theme={{
        fonts: {
          body: "DM Sans, Roboto Mono",
          heading: "DM Sans, Roboto Mono, sans-serif",
        }
      }}
    >
      <Story />
    </ThemeProvider>
  )
];
