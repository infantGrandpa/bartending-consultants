import {getPersonality, getSystemPrompt} from "./personalities.js"
import {addMessageToLog, clearMessageInput} from "./element-controller.js";
import {addResponseToConversation, createConversation} from "./openai-api.js";

let currentConversationId = '';
let personalityKey = "salty"
let currentPersonality = null


export async function sendMessage(message) {
    currentPersonality = getPersonality(personalityKey)

    if (!currentConversationId) {
        console.log(`No conversation ID found. Creating a new conversation...`);
        const systemPrompt = getSystemPrompt(currentPersonality);
        currentConversationId = await createConversation(systemPrompt, message, personalityKey);
    }

    addMessageToLog('You', message);
    clearMessageInput();

    console.log(`Conversation ID: ${currentConversationId}`);
    const reply = await addResponseToConversation(message, currentConversationId);

    addMessageToLog(currentPersonality.displayName, reply);
}

