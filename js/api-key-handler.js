import {addMessageToLog, hideMessageArea, showMessageArea} from "./element-controller.js";

export let openAiApiKey = localStorage.getItem('openai_api_key');
export let elevenLabsApiKey = localStorage.getItem('elevenlabs_api_key')

const apiKeySetup = document.getElementById('apiKeySetup');
const openaiApiKeyInput = document.getElementById('openaiApiKeyInput');
const elevenLabsApiKeyInput = document.getElementById('elevenLabsApiKeyInput');

const clearApiKeysButton = document.getElementById('clearApiKeysButton');
const saveApiKeysButton = document.getElementById('saveApiKeysButton');

function checkApiKeyStatus() {
    if (!openAiApiKey || !elevenLabsApiKey) {
        apiKeySetup.classList.remove('hidden');
        clearApiKeysButton.classList.add('hidden');
        hideMessageArea();
    } else {
        apiKeySetup.classList.add('hidden');
        clearApiKeysButton.classList.remove('hidden');
        showMessageArea();
    }
}

checkApiKeyStatus();

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

saveApiKeysButton.addEventListener('click', () => {
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
});

clearApiKeysButton.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear your stored API key?')) {
        localStorage.removeItem('openai_api_key');
        openAiApiKey = null;

        localStorage.removeItem('elevenlabs_api_key');
        elevenLabsApiKey = null;

        checkApiKeyStatus();
    }
});