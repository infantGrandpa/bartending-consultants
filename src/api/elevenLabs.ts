import {playAudioBlob} from "../utils/audioHandler.ts";

async function sendElevenLabsRequest(voiceId: string, jsonBody: any, elevenLabsApiKey: string) {
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'xi-api-key': elevenLabsApiKey
        },
        body: JSON.stringify(jsonBody)
    });

    if (!response.ok) {
        throw new Error(`ElevenLabs API error: ${response.status}`);
    }

    return response;
}

export async function speakMessage(messageToSpeak: string, voiceId: string, elevenLabsKey: string) {
    const requestBody = {
        text: messageToSpeak,
        model_id: 'eleven_flash_v2_5',
        voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75

        }
    }

    const response = await sendElevenLabsRequest(voiceId, requestBody, elevenLabsKey);

    const audioBlob = await response.blob();
    await playAudioBlob(audioBlob);
}