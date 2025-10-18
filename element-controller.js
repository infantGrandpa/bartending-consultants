import {sendMessage} from "./process-msg.js"

const sendButton = document.getElementById('sendButton');
const responseLog = document.getElementById('responseLog');
const messageInput = document.getElementById('messageInput');

export function enableSendButton() {
    sendButton.disabled = false;
    sendButton.classList.remove('opacity-50', 'cursor-not-allowed');
}

export function disableSendButton() {
    sendButton.disabled = true;
    sendButton.classList.add('opacity-50', 'cursor-not-allowed');
}

export function addMessageToLog(sender, message) {
    if (responseLog.querySelector('.text-gray-400.italic')) {
        responseLog.innerHTML = '';
    }

    const messageElement = document.createElement('div');
    messageElement.className = 'mb-4 pb-4 border-b border-gray-700 last:border-b-0';

    const senderElement = document.createElement('p');
    senderElement.className = 'font-semibold mb-1';
    senderElement.textContent = sender + ':';

    const messageContentElement = document.createElement('p');
    messageContentElement.className = 'text-gray-300 whitespace-pre-wrap';
    messageContentElement.textContent = message;

    messageElement.appendChild(senderElement);
    messageElement.appendChild(messageContentElement);

    responseLog.appendChild(messageElement);
    responseLog.scrollTop = responseLog.scrollHeight;
}

export function clearMessageInput() {
    messageInput.value = '';
}

sendButton.addEventListener('click', async () => {
    const userMessage = messageInput.value.trim();

    if (!userMessage) {
        alert('Please enter a message');
        return;
    }

    await sendMessage(userMessage)
});

messageInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendButton.click();
    }
});