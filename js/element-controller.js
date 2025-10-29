import {changePersonality, getCurrentPersonality, isConversationOngoing, sendMessage} from "./process-msg.js"

const sendButton = document.getElementById('sendButton');
const responseLog = document.getElementById('responseLog');
const messageInput = document.getElementById('messageInput');
const messageArea = document.getElementById('messageArea');
const bartenderImage = document.getElementById('bartenderImage')

const personalityButtons = document.querySelectorAll('.personality-button');

personalityButtons.forEach(button => {
    button.addEventListener('click', () => {
        const selectedPersonality = button.getAttribute('data-personality');

        const currentPersonality = getCurrentPersonality();
        if (currentPersonality && selectedPersonality === currentPersonality.key) {
            return;
        }

        if (isConversationOngoing()) {
            const userConfirmed = confirm('Changing personality will start a new conversation. Continue?');
            if (!userConfirmed) {
                return;
            }
        }

        // Remove selected state from all buttons
        personalityButtons.forEach(btn => {
            btn.classList.remove('border-blue-500');
            btn.classList.add('border-transparent');
        });

        // Add selected state to clicked button
        button.classList.remove('border-transparent');
        button.classList.add('border-blue-500');

        changePersonality(selectedPersonality);

        if (selectedPersonality) {
            enableSendButton();
        } else {
            disableSendButton();
        }

        initializeResponseLog();
    });
});

function initializeSendButtonState() {
    const currentPersonality = getCurrentPersonality();

    if (currentPersonality === null) {
        disableSendButton();
    } else {
        enableSendButton();
    }
}

document.addEventListener('DOMContentLoaded', initializeSendButtonState);

export function enableSendButton() {
    sendButton.disabled = false;
    sendButton.classList.remove('opacity-30', 'cursor-not-allowed');
}

export function disableSendButton() {
    sendButton.disabled = true;
    sendButton.classList.add('opacity-30', 'cursor-not-allowed');
}

export function showMessageArea() {
    messageArea.classList.remove('hidden');
}

export function hideMessageArea() {
    messageArea.classList.add('hidden');
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

const defaultLogHTML = `
    <p class="text-gray-400 italic">What kind of drink are you looking for? Tell me about:</p>
    <ul class="text-gray-400 italic list-disc list-inside">
        <li>Your preferred spirits (rum, whiskey, gin, etc.)</li>
        <li>Your preferred flavors (fruity, smokey, sour, etc.)</li>
        <li>Your preferred weight (light and refreshing, standard body, spirit forward, etc)</li>
        <li>Flavors and spirits you do NOT like</li>
    </ul>
`;

export function initializeResponseLog() {
    responseLog.innerHTML = defaultLogHTML;
}

document.addEventListener('DOMContentLoaded', initializeResponseLog);

export function changeBartenderImage(newSrc) {
    bartenderImage.src = newSrc;
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

export function updateDrinkDetails(drink) {
    console.log(drink);
}