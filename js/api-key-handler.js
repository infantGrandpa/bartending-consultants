import {
    addMessageToLog,
    hideApiKeySetup,
    hideMessageArea,
    loadHTMLFragment,
    showApiKeySetup,
    showMessageArea
} from "./element-controller.js";

export let openAiApiKey = localStorage.getItem('openai_api_key');
export let elevenLabsApiKey = localStorage.getItem('elevenlabs_api_key')

let openaiApiKeyInput = null;
let elevenLabsApiKeyInput = null;

let clearApiKeysButton = null;
let saveApiKeysButton = null;

document.addEventListener('DOMContentLoaded',  async () => {
    await loadHTMLFragment('./html/api-keys.html', 'apiKeysContainer');

    openaiApiKeyInput = document.getElementById('openaiApiKeyInput');
    elevenLabsApiKeyInput = document.getElementById('elevenLabsApiKeyInput');

    clearApiKeysButton = document.getElementById('clearApiKeysButton');
    saveApiKeysButton = document.getElementById('saveApiKeysButton');

    saveApiKeysButton.addEventListener('click', () => {
        saveApiKeys();
    });

    clearApiKeysButton.addEventListener('click', () => {
        clearSavedApiKeys();
    });

    checkApiKeyStatus();
});

export function checkApiKeyStatus() {
    if (!openAiApiKey || !elevenLabsApiKey) {
        showApiKeySetup();
        hideMessageArea();
    } else {
        hideApiKeySetup();
        showMessageArea();
    }
}

function getOpenAiKeyFromInput() {
    const apiKeyValue = openaiApiKeyInput.value.trim();
    if (!apiKeyValue) {
        alert('Please enter an OpenAI API key.');
        return false;
    }

    localStorage.setItem('openai_api_key', apiKeyValue);
    openAiApiKey = apiKeyValue;

    return true;
}

function getElevenLabsKeyFromInput() {
    const apiKeyValue = elevenLabsApiKeyInput.value.trim();
    if (!apiKeyValue) {
        alert('Please enter an ElevenLabs API key.');
        return false;
    }

    localStorage.setItem('elevenlabs_api_key', apiKeyValue);
    elevenLabsApiKey = apiKeyValue;
    return true;
}

function saveApiKeys() {
    let success = getOpenAiKeyFromInput();
    if (success) {
        success = getElevenLabsKeyFromInput();
    }

    if (!success) {
        return;
    }

    openaiApiKeyInput.value = '';
    elevenLabsApiKeyInput.value = '';

    checkApiKeyStatus();
    addMessageToLog('System', 'API keys saved successfully!');
}

function clearSavedApiKeys() {
    if (confirm('Are you sure you want to clear your stored API key?')) {
        localStorage.removeItem('openai_api_key');
        openAiApiKey = null;

        localStorage.removeItem('elevenlabs_api_key');
        elevenLabsApiKey = null;

        checkApiKeyStatus();
    }
}