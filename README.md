# User Manager

A cross-platform desktop application built with Electron, React, Vite, and Tailwind CSS for managing user information.

## Features

- Select a directory to store user data
- View list of users
- Add new users with name and email
- Beautiful and responsive UI
- Cross-platform (Windows, macOS, Linux)

## Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd user-manager
```

2. Install dependencies:

```bash
npm install
```

## Development

To run the application in development mode:

```bash
npm run electron:dev
```

This will:

1. Start the Vite development server
2. Compile the Electron main process
3. Launch the Electron application

## Building

To build the application for your platform:

```bash
npm run electron:build
```

The built application will be available in the `dist` directory.

## Project Structure

```
user-manager/
├── electron/           # Electron main process files
│   ├── main.ts        # Main process
│   └── preload.ts     # Preload script
├── src/               # React application
│   ├── pages/         # Page components
│   ├── App.tsx        # Main React component
│   └── main.tsx       # React entry point
├── package.json       # Project configuration
└── README.md         # This file
```

## Technologies Used

- Electron - Cross-platform desktop application framework
- React - UI library
- Vite - Build tool and development server
- Tailwind CSS - Utility-first CSS framework
- TypeScript - Type-safe JavaScript
# poc-electron
