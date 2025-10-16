import {getPersonality, getSystemPrompt} from "./personalities.js"

let currentConversationId = '';
let personalityKey = "flirty"
let currentPersonality = null

const sendButton = document.getElementById('sendButton');
const responseLog = document.getElementById('responseLog');
const messageInput = document.getElementById('messageInput');

sendButton.addEventListener('click', async () => {
    const userMessage = messageInput.value.trim();

    if (!userMessage) {
        alert('Please enter a message');
        return;
    }

    await sendMessage(userMessage)
});

messageInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendButton.click();
    }
});

async function createConversation(userMessage) {
    currentPersonality = getPersonality(personalityKey)
    const systemPrompt = getSystemPrompt(currentPersonality);

    const response = await fetch('https://api.openai.com/v1/conversations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${openAiApiKey}`
        },
        body: JSON.stringify({
            metadata: {personality: personalityKey},
            items: [
                {
                    type: 'message',
                    role: 'system',
                    content: systemPrompt
                },
                {
                    type: 'message',
                    role: 'user',
                    content: userMessage
                }
            ]
        })
    });

    const conversation = await response.json();

    if (!response.ok) {
        console.error(conversation);
        throw new Error(`Failed to create conversation: ${conversation.error?.message || "Unknown error"}`);
    }

    console.log(`Conversation Created! Conversation ID: ${conversation.id}`);
    return conversation.id;
}

async function addResponseToConversation(message) {
    addMessageToLog('You', message)

    const response = await fetch('https://api.openai.com/v1/responses', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${openAiApiKey}`
        },
        body: JSON.stringify({
            model: 'gpt-4o-mini',
            conversation: currentConversationId,
            input: message
        })
    });

    const data = await response.json()

    if (!response.ok) {
        console.error(data)
        throw new Error(`Response failed: ${data.error?.message || "Unknown error"}`);
    }

    console.log(data)
    const reply = data.output[0].content[0].text;
    addMessageToLog(currentPersonality.displayName, reply);
}

async function sendMessage(message) {
    if (!currentConversationId) {
        console.log(`No conversation ID found. Creating a new conversation...`);
        currentConversationId = await createConversation(message);
    }

    console.log(`Conversation ID: ${currentConversationId}`);
    await addResponseToConversation(message, currentConversationId);
}

function addMessageToLog(sender, message) {
    // TODO: Update sender to be defined names rather than a string
    if (responseLog.querySelector('.text-gray-400.italic')) {
        responseLog.innerHTML = '';
    }

    const messageElement = document.createElement('div');
    messageElement.className = 'mb-4 pb-4 border-b border-gray-700 last:border-b-0';

    const senderElement = document.createElement('p');
    senderElement.className = 'font-semibold mb-1';
    senderElement.textContent = sender + ':';

    const messageContentElement = document.createElement('p');
    messageContentElement.className = 'text-gray-300 whitespace-pre-wrap';
    messageContentElement.textContent = message;

    messageElement.appendChild(senderElement);
    messageElement.appendChild(messageContentElement);

    responseLog.appendChild(messageElement);
    responseLog.scrollTop = responseLog.scrollHeight;
}