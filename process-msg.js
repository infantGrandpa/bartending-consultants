import {getPersonality, getSystemPrompt} from "./personalities.js"
import {addMessageToLog, clearMessageInput} from "./element-controller.js";
import {sendOpenAiRequest} from "./openai-api-setup.js";

let currentConversationId = '';
let personalityKey = "flirty"
let currentPersonality = null


async function createConversation(userMessage) {
    currentPersonality = getPersonality(personalityKey)
    const systemPrompt = getSystemPrompt(currentPersonality);

    const requestBody = {
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
    }

    const conversation = await sendOpenAiRequest('conversations', requestBody);

    console.log(`Conversation Created! Conversation ID: ${conversation.id}`);
    return conversation.id;
}

async function addResponseToConversation(message) {
    const requestBody = {
        model: 'gpt-4o-mini',
        conversation: currentConversationId,
        input: message
    }

    const data = await sendOpenAiRequest('responses', requestBody)

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

