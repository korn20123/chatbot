#!/usr/bin/env node
require('dotenv').config();
const fs=require('fs');
const { Builder, Browser, By, Key, until } = require('selenium-webdriver');
const OpenAI = require('openai');
const readline = require('readline');

// OpenAI Client initialisieren
const client = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
});

// Readline-Interface für Nutzereingaben
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Nachrichtenverlauf initialisieren
const systemMessage={
    role: 'system',
    content: 'Du bist ein Chatbot für Tech-Enthusiasten. Gib präzise, professionelle und korrekte Antworten. Vermeide triviale Beispiele und überprüfe deine Antworten auf Richtigkeit. Wenn du dir nicht zu 90 % sicher bist frage nach. Kommunikation erfolgt über eine CLI OpenRouter API-Schnittstelle.',
  };
let messageHistory = [];
// function zum importieren des nachrichten verlaufs.
function importMessageHistory() {
    try {
        const data = JSON.parse(fs.readFileSync('history.json'));
        messageHistory.push(...data);
    } catch(error) {
        console.error(error.message);
    }
}
//function zum exportieren des nachrichten verlaufs
function exportMessageHistory() {
    try {
        fs.writeFileSync('history.json', JSON.stringify(messageHistory, null, 2));
    } catch(error) {
        console.error(error.message);
    }
}
// Funktion zum Öffnen des GitHub-Repositorys
async function getRepo() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('https://github.com/korn20123/chatbot');
  } catch (error) {
    console.error('Error with open the Repositorie:', error.message);
  }
}

// Funktion für Anfragen an OpenAI
async function askOpenAI(prompt) {
  try {
    console.log('Generating response...');
    // Benutzernachricht zum Verlauf hinzufügen
    messageHistory.push({ role: 'user', content: prompt });
    const messagesToSend=[systemMessage, ...messageHistory];
    const completion = await client.chat.completions.create({
      model: 'meta-llama/llama-4-maverick:free',
      messages: messagesToSend // Gesamten Verlauf senden
    });

    const response = completion.choices[0].message.content;
    // Assistentenantwort zum Verlauf hinzufügen
    messageHistory.push({ role: 'assistant', content: response });
    if(messageHistory.length >= 10)
    {
      messageHistory.splice(0, 1);
    }
    return response;
  } catch (error) {
    console.error('Error with the request:', error.message);
    return 'Sorry, an error has occured';
  }
}

// Funktion für interaktive Nutzereingaben
function startChat() {
  rl.question('your question to the Chatbot (exit to quit,export to export your history, import to import your history, repo to open the GitHub-Repo): ', async (input) => {
    if(input.toLowerCase() =='import') {
        importMessageHistory();
    }
    if(input.toLowerCase() =='export') {
        exportMessageHistory();
    }
    if (input.toLowerCase() === 'exit') {
      console.log('Chat exited.');
      rl.close();
      return;
    }
    if (input.toLowerCase() === 'repo') {
      await getRepo();
      startChat(); // Erneute Eingabeaufforderung
      return;
    }

    const response = await askOpenAI(input);
    console.log('response:', response);
    startChat(); // Erneute Eingabeaufforderung
  });
}

// Chat starten
startChat();