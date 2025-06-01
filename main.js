#!/usr/bin/env node
require('dotenv').config();
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
// function zum öffnen des github repositorys
async function getRepo() {
    let driver = await new Builder().forBrowser('chrome').build();
    await driver.get('https://github.com/korn20123/chatbot');
}                                                          
// Funktion für Anfragen an OpenAI
async function askOpenAI(prompt) {
    try {
        console.log('generating response...');
        const completion = await client.chat.completions.create({
            model: 'openai/gpt-4o-mini', // Du kannst das Modell anpassen, z. B. 'gpt-3.5-turbo'
            messages: [
                { role: 'system', content: 'du bist ein chat bot für tech intusiasten. mache also keine dummen beispiele und sei sehr genau! Sei auserdem sehr proffessionell.' }, 
                { role: 'user', content: prompt },
            ],
        });
        return completion.choices[0].message.content;
    } catch (error) {
        console.error('error with  request', error.message);
        return 'Sorry, an error has occured';
    }
}

// Funktion für interaktive Nutzereingaben
function startChat() {

    rl.question('your question to the chatbot (exit to quit. or repo to open the github repo.): ', async (input) => {
        if (input.toLowerCase() === 'exit') {
            console.log('Chat exited.');
            rl.close();
            return;
        }
        if(input.toLowerCase() =='repo') {
            getRepo();
    }

        const response = await askOpenAI(input);
        console.log('Response:', response);
        startChat(); // Erneute Eingabeaufforderung
    });
}

// Chat starten
startChat();