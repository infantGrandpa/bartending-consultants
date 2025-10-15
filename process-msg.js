

const sendButton = document.getElementById('sendButton');
const responseLog = document.getElementById('responseLog');
const messageInput = document.getElementById('messageInput');

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

async function sendMessage(message) {
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${openAiApiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [
                    {
                        role: 'user',
                        content: message
                    }
                ]
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(JSON.stringify(data, null, 2));
        }

        const aiMessage = data.choices[0].message.content;
        addMessageToLog('AI', aiMessage);

    } catch (error) {
        console.error('Error:', error);
        addMessageToLog('Error', error.message);
    }

    addMessageToLog('You', message);
    messageInput.value = '';
}

function addMessageToLog(sender, message) {
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