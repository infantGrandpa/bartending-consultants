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