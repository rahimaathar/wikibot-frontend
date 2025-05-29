# Wikipedia Chatbot Frontend

Welcome to **wikipedia-chatbot-frontend** – a modern, responsive web interface for interacting with the Wikipedia chatbot!

## 🚀 Overview

This repository contains the frontend application for the Wikipedia chatbot, built with React and TypeScript. It provides an intuitive user interface for users to interact with the chatbot, view responses, and explore Wikipedia-based information in a conversational manner.

## ✨ Features

- Modern, responsive user interface built with Chakra UI
- Real-time chat interface with message history
- Smooth animations and transitions using Framer Motion
- Type-safe development with TypeScript
- Comprehensive error handling and loading states
- Mobile-friendly design
- Integration with the Wikipedia chatbot backend API

## 🛠️ Tech Stack

- **Framework:** React 18
- **Language:** TypeScript
- **UI Library:** Chakra UI
- **Styling:** Emotion
- **Animation:** Framer Motion
- **HTTP Client:** Axios
- **Icons:** React Icons
- **Testing:** Jest, React Testing Library

## ⚡ Getting Started

### Prerequisites

- Node.js 14.0.0 or later
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/wikibot.git
cd wikibot/frontend

# Install dependencies
npm install
# or
yarn install
```

### Running the Development Server

```bash
# Start the development server
npm start
# or
yarn start
```

The application will start on `http://localhost:3000`

### Building for Production

```bash
# Create a production build
npm run build
# or
yarn build
```

## 📚 Project Structure

```
src/
├── components/     # Reusable UI components
├── theme.ts       # Chakra UI theme configuration
├── App.tsx        # Main application component
├── index.tsx      # Application entry point
└── ...
```

## 🔧 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
REACT_APP_API_URL=http://localhost:8000
```

## 🧪 Testing

```bash
# Run tests
npm test
# or
yarn test
```

## 🤝 Contributing

Contributions are welcome! Please open issues or pull requests for improvements or bug fixes.

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add YourFeature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.



> **Note:** Make sure the backend server is running and properly configured before starting the frontend application.
