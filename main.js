require('dotenv').config();
const OpenAI = require('openai');
const readline = require('readline');

// OpenAI Client initialisieren
const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Readline-Interface für Nutzereingaben
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Funktion für Anfragen an OpenAI
async function askOpenAI(prompt) {
    try {
        const completion = await client.chat.completions.create({
            model: 'gpt-4o-mini', // Du kannst das Modell anpassen, z. B. 'gpt-3.5-turbo'
            messages: [
                { role: 'system', content: 'du bist ein chat bot für tech intusiasten. mache also keine dummen beispiele und sei sehr genau!' }, 
                { role: 'user', content: prompt },
            ],
        });
        return completion.choices[0].message.content;
    } catch (error) {
        console.error('Fehler bei der Anfrage:', error.message);
        return 'Entschuldigung, es ist ein Fehler aufgetreten.';
    }
}

// Funktion für interaktive Nutzereingaben
function startChat() {

    rl.question('Deine Frage an den Chatbot (oder "exit" zum Beenden): ', async (input) => {
        if (input.toLowerCase() === 'exit') {
            console.log('Chat beendet.');
            rl.close();
            return;
        }

        const response = await askOpenAI(input);
        console.log('Antwort:', response);
        startChat(); // Erneute Eingabeaufforderung
    });
}

// Chat starten
console.log('Willkommen! Stelle deine Fragen an den Chatbot.');
startChat();