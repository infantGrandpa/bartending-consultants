
let openAiApiKey = localStorage.getItem('openai_api_key');

const apiKeySetup = document.getElementById('apiKeySetup');
const apiKeyInput = document.getElementById('apiKeyInput');

const clearApiKeyButton = document.getElementById('clearApiKeyButton');
const saveApiKeyButton = document.getElementById('saveApiKeyButton');

function checkApiKeyStatus() {
    if (!openAiApiKey) {
        apiKeySetup.classList.remove('hidden');
        sendButton.disabled = true;
        sendButton.classList.add('opacity-50', 'cursor-not-allowed');
    } else {
        apiKeySetup.classList.add('hidden');
        clearApiKeyButton.classList.remove('hidden');
        sendButton.disabled = false;
        sendButton.classList.remove('opacity-50', 'cursor-not-allowed');
    }
}

checkApiKeyStatus();

saveApiKeyButton.addEventListener('click', () => {
    const apiKey = apiKeyInput.value.trim();
    if (!apiKey) {
        alert('Please enter an API key');
        return;
    }
    localStorage.setItem('openai_api_key', apiKey);
    openAiApiKey = apiKey;
    apiKeyInput.value = '';
    checkApiKeyStatus();
    addMessageToLog('System', 'API key saved successfully!');
});

clearApiKeyButton.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear your stored API key?')) {
        localStorage.removeItem('openai_api_key');
        openAiApiKey = null;
        checkApiKeyStatus();
        responseLog.innerHTML = '<p class="text-gray-400 italic">Messages will appear here...</p>';
    }
});