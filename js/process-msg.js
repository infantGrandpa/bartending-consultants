import {getPersonality, getSystemPrompt} from "./personalities.js"
import {addMessageToLog, changeBartenderImage, clearMessageInput} from "./element-controller.js";
import {addResponseToConversation, createConversation} from "./openai-api.js";
import {elevenLabsApiKey} from "./api-key-handler.js"
import {playAudioBlob} from "./audio-handler.js";
import {stripMarkdownFromString} from "./utils.js";

let currentConversationId = '';
let currentPersonality = null

const speakMessage = true;

export function changePersonality(newPersonalityKey) {
    currentPersonality = getPersonality(newPersonalityKey);
    changeBartenderImage(currentPersonality.imagePath);
    clearExistingConversation();
}

export function getCurrentPersonality() {
    return currentPersonality;
}

export function resetPersonality() {
    currentPersonality = null;
}

export function isConversationOngoing() {
    return !!currentConversationId;
}

function clearExistingConversation() {
    currentConversationId = '';
}

export async function sendMessage(message) {
    if (!currentPersonality) {
        throw new Error("Personality not set. Select a personality.")
    }

    if (!currentConversationId) {
        console.log(`No conversation ID found. Creating a new conversation...`);
        const systemPrompt = getSystemPrompt(currentPersonality);
        currentConversationId = await createConversation(systemPrompt, message, currentPersonality.key);
    }

    addMessageToLog('You', message);
    clearMessageInput();

    let reply = await addResponseToConversation(message, currentConversationId);
    reply = stripMarkdownFromString(reply);

    if (speakMessage) {
        // TODO: Add button to UI for speaking message aloud.
        // We're turning this off to save on API usage
        await speakResponse(reply, currentPersonality.elevenLabsVoiceId);
    }
    addMessageToLog(currentPersonality.displayName, reply);
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
            model_id: 'eleven_flash_v2_5',
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
