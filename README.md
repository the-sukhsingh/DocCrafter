# DocCrafter

A modern documentation generation platform that uses AI to transform project information into professional documents.

![DocCrafter](https://your-project-image-url.com)

## Overview

DocCrafter is a Next.js-powered web application that streamlines the process of creating comprehensive project documentation. By answering guided questions about your project, the platform generates professional documentation with well-structured chapters that you can export to multiple formats.

### Key Features

- **AI-Powered Document Generation**: Transform project information into professional documentation
- **Interactive Questionnaire**: Guide users through structured information gathering
- **Chapter-Based Organization**: Automatically organize content into logical chapters
- **Multiple Export Options**: Export to DOCX and other formats
- **Project Dashboard**: Manage all your documentation projects in one place
- **Real-time Preview**: View your documentation as you build it

## Technology Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS 4, DaisyUI
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Authentication**: Clerk
- **Background Processing**: Inngest
- **Storage**: Azure Storage Blob
- **Document Generation**: DOCX

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB connection
- Clerk account for authentication
- Azure Storage account (for storing images and assets)
- Inngest account (for background processing)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/doccrafter.git
   cd doccrafter
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables by creating a `.env.local` file:
   ```
   # Next.js
   NEXT_PUBLIC_APP_URL=http://localhost:3000

   # MongoDB
   MONGODB_URI=your_mongodb_connection_string

   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key

   # Azure Storage
   AZURE_STORAGE_CONNECTION_STRING=your_azure_storage_connection_string
   AZURE_STORAGE_CONTAINER_NAME=your_container_name

   # Inngest
   INNGEST_EVENT_KEY=your_inngest_event_key
   INNGEST_SIGNING_KEY=your_inngest_signing_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Building for Production

```bash
npm run build
npm run start
```

## Project Structure

```
src/
  app/                   # Next.js 15 App Router
    (app)/               # Protected routes (dashboard, projects)
    (test)/              # Test routes
    api/                 # API routes
  components/            # React components
    screens/             # Major screen components
    sections/            # Website sections
  context/               # React context providers
  hooks/                 # Custom React hooks
  inngest/               # Background job definitions
  lib/                   # Shared libraries
  model/                 # Data models
  services/              # Service layer
  utils/                 # Utility functions
```

## Usage Flow

1. **Sign Up/Login**: Create an account or log in
2. **Create Project**: Start a new documentation project
3. **Answer Questions**: Provide information about your project
4. **Review Chapters**: Review and edit generated chapter structure
5. **Generate Content**: AI generates detailed content for each chapter
6. **Preview & Export**: Review the final document and export to your preferred format

## Development

### Running Tests

```bash
npm run test
```

### Linting

```bash
npm run lint
```

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the [MIT License](LICENSE)

## Acknowledgements

- Next.js
- React
- Tailwind CSS
- DaisyUI
- Mongoose
- Clerk
- Inngest
- Azure Storage
- DOCX