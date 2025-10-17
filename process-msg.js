import {getPersonality, getSystemPrompt} from "./personalities.js"
import {addMessageToLog, clearMessageInput} from "./element-controller.js";
import {openAiApiKey} from "./openai-api-setup.js";

let currentConversationId = '';
let personalityKey = "flirty"
let currentPersonality = null


async function createConversation(userMessage) {
    // TODO: Refactor conversation/response requests into a single function
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

export async function sendMessage(message) {
    if (!currentConversationId) {
        console.log(`No conversation ID found. Creating a new conversation...`);
        currentConversationId = await createConversation(message);
    }

    addMessageToLog('You', message);
    clearMessageInput();

    console.log(`Conversation ID: ${currentConversationId}`);
    await addResponseToConversation(message, currentConversationId);
}

