# Chatbot Node.js Application

## Overview
This is a simple chatbot application built with Node.js. It provides a commandline interface for users to interact with a bot, leveraging basic natural language processing and ai responses.

### Features
- Real-time chat functionality
- Lightweight and scalable
- messageHistory for better context
- api Integration to openrouter.ai

## Installation
To set up and run the chatbot application locally, follow these steps:

### Prerequisites
- Node.js (version 14.x or higher)
- npm (Node Package Manager)
- A terminal or command-line interface
### Instalation via github
#### Setup Instructions
   run
   cd path_to_chatbot
   note: path_to_chatbot is the path where you cloned the repository.
  

2. **Install Dependencies**  
   Run the following command to install the required Node.js packages:
   npm install


3. **Configure Environment**  
   Create a `.env` file in the root directory and add any necessary configuration API key, Example:
   OPENROUTER_API_KEY=your api key


4. **Run the Application**  
   Start the chatbot application with:
   npm start

### install via npm
Run npm install -g korn-Chatbot
Then run npm link
Now you can run chatbot in any Directory.
### Troubleshooting
- Ensure Node.js and npm are installed correctly by running `node -v` and `npm -v`.
- If you encounter dependency issues, try clearing the npm cache with `npm cache clean --force` and reinstall dependencies.
- Check the console logs for any errors during startup.

## Contributing
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

