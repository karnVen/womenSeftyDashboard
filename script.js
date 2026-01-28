
document.addEventListener('DOMContentLoaded', function () {
        const chatbotToggle = document.getElementById('chatbotToggle');
        const chatbotModal = document.getElementById('chatbotModal');
        const closeChatbot = document.getElementById('closeChatbot');
        const chatbotMessages = document.getElementById('chatbotMessages');
        const chatbotInput = document.getElementById('chatbotInput');
        const sendChatbotMessage = document.getElementById('sendChatbotMessage');

        // Toggle chatbot modal
        chatbotToggle.addEventListener('click', () => {
            chatbotModal.classList.remove('hidden');
        });

        closeChatbot.addEventListener('click', () => {
            chatbotModal.classList.add('hidden');
        });

        // Send message to AI API
        async function sendMessageToAI(message) {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer YOUR_API_KEY'
                },
                body: JSON.stringify({
                    model: 'gpt-4',
                    messages: [{ role: 'user', content: message }]
                })
            });
            const data = await response.json();
            return data.choices[0].message.content;
        }

        // Handle user input
        sendChatbotMessage.addEventListener('click', async () => {
            const userMessage = chatbotInput.value.trim();
            if (!userMessage) return;

            // Display user message
            chatbotMessages.innerHTML += `<div class="text-right text-white bg-primary rounded-lg p-2">${userMessage}</div>`;
            chatbotInput.value = '';

            // Get AI response
            const botMessage = await sendMessageToAI(userMessage);

            // Display AI response
            chatbotMessages.innerHTML += `<div class="text-left text-gray-200 bg-[#334155] rounded-lg p-2">${botMessage}</div>`;
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        });
    });