import {getPersonality, getSystemPrompt} from "./personalities.js"
import {addMessageToLog, clearMessageInput} from "./element-controller.js";
import {addResponseToConversation, createConversation} from "./openai-api.js";
import {elevenLabsApiKey} from "./api-key-handler.js"
import {playAudioBlob} from "./audio-handler.js";

let currentConversationId = '';
let currentPersonality = null

export function changePersonality(newPersonalityKey) {
    currentPersonality = getPersonality(newPersonalityKey);
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

    const reply = await addResponseToConversation(message, currentConversationId);
    // TODO: Strip markdown from reply (from https://github.com/remarkjs/strip-markdown)

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
