import {getPersonality, getSystemPrompt} from "./personalities.js"
import {addMessageToLog, clearMessageInput} from "./element-controller.js";
import {addResponseToConversation, createConversation} from "./openai-api.js";
import {elevenLabsApiKey} from "./api-key-handler.js"
import {playAudioBlob} from "./audio-handler.js";

let currentConversationId = '';
let personalityKey = "showman"
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
    await speakResponse(reply, currentPersonality.elevenLabsVoiceId);
}


async function speakResponse(responseMessage, voiceId) {
    // TODO: Extract ElevenLabs request
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'xi-api-key': elevenLabsApiKey
        },
        body: JSON.stringify({
            text: responseMessage,
            model_id: 'eleven_monolingual_v1',      // TODO: Check if this is the model we actually want to use
            voice_settings: {
                stability: 0.5,
                similarity_boost: 0.75
            }
        })
    });

    if (!response.ok) {
        throw new Error(`ElevenLabs API error: ${response.status}`);
    }

    const audioBlob = await response.blob();
    await playAudioBlob(audioBlob);
}
