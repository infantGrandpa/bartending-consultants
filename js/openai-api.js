import {openAiApiKey} from "./api-key-handler.js";

async function sendOpenAiRequest(endpoint, jsonBody) {
    const requestUrl = `https://api.openai.com/v1/${endpoint}`
    const response = await fetch(requestUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${openAiApiKey}`
        },
        body: JSON.stringify(jsonBody)
    });

    const data = await response.json()

    if (!response.ok) {
        console.error(data);
        throw new Error(`Request failed: ${data.error?.message || "Unknown error"}`);
    }

    return data
}

export async function createConversation(systemPrompt, userMessage, personalityKey) {
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
    return conversation.id;
}

export async function addResponseToConversation(message, conversationId) {
    const requestBody = {
        model: 'gpt-4.1',
        conversation: conversationId,
        input: message
    }

    const data = await sendOpenAiRequest('responses', requestBody)
    return data.output[0].content[0].text;
}