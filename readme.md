# 🚀 SparrowIQ

A powerful library for intelligent document processing and validation, featuring the advanced SparrowIQ .

## ✨ Features

- 📄 Support for multiple file types (PDF, DOCX, DOC)
- 🤖 AI-powered document validation and analysis
- 🎯 Customizable entity extraction
- 🔍 Smart requirement matching
- 🛡️ Built-in file type validation
- 💪 TypeScript support

## 🔧 Installation

```bash
npm i sparrow-iq
# or
yarn add sparrow-iq
```

## 🚀 Quick Start

```jsx
import { SparrowIQ } from 'sparrow-iq';

const App = () => {
  const iq = new SparrowIQ({
    FileType: ['pdf', 'docx', 'doc'],
    config: {
      API_KEY: 'YOUR_API_KEY',
      UPLOAD_URL: 'YOUR_UPLOAD_URL',
      GENERATE_URL: 'YOUR_GENERATE_URL'
    }
  });
  iq.validateFileType(FILE)
  iq.parseFile(FILE)
};
```

## 📚 API Reference

### SparrowIQ Props

| Prop | Type | Description |
|------|------|-------------|
| FileType | string[] | Supported file extensions |
| config.API_KEY | string | Your API key for authentication |
| config.UPLOAD_URL | string | URL for file uploads |
| config.GENERATE_URL | string | URL for content generation |

### Methods

- `validateFileType(file: File)`: Validates if the file type is supported
- `updateFile(file: File)`: Updates the current file in state
- `updateRequirement(requirement: string)`: Updates the requirement text
- `updateEntities(entities: SparrowIQEntity[])`: Updates the entities for extraction
- `validateState()`: Validates the current state of the component
- `validateFile(fileBase64: string)`: Validates the file content
- `parseFile(file)`: parse the file content

## 🔐 Security

Make sure to:
- Keep your API keys secure
- Validate file types before processing
- Handle errors appropriately

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---
