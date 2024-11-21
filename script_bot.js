document.addEventListener('DOMContentLoaded', () => {
    const chatbotIcon = document.getElementById('chatbot-icon');
    const chatContainer = document.getElementById('chat-container');
    const closeButton = document.getElementById('close-button');

   
    showMessage('Hello, I am Indu, your personal travel planner. 🌍🗺️ Where would you like to go on your next adventure? Let us plan the perfect trip together!', 'bot');
    setTimeout(() => {
        showMessage('🚗 Where do you want to go on your next trip? 🏖️🏝️', 'bot');
    }, 4000);

   
    chatbotIcon.addEventListener('click', () => {
        chatbotIcon.style.display = 'none'; 
        chatContainer.classList.add('show'); 
    });

    
    closeButton.addEventListener('click', () => {
        chatContainer.classList.remove('show'); 
        chatbotIcon.style.display = 'flex'; 
    });
});

let step = 0;
let destination = '';

function sendMessage() {
    const userInput = document.getElementById('user-input').value.trim().toLowerCase();
    if (userInput === '') return;

    showMessage(userInput, 'user');
    document.getElementById('user-input').value = '';

    let response;

    if (userInput === 'hi' || userInput === 'hello' || userInput === 'hey') {
        response = 'Hello! I am Indu, your personal travel planner. 🌍🗺️ Where would you like to go on your next adventure?';
        step = 0;  // Reset step for new conversation
    } else if (userInput === 'bye' || userInput === 'goodbye') {
        response = 'Goodbye! Have a great day! 😊';
        step = 0;  // Reset step for new conversation
    } else if (userInput === 'thank you' || userInput === 'thanks') {
        response = 'You’re welcome! If you need any more help, just let me know.';
    } else if (step === 0) {
        // Handle travel destination input
        destination = userInput;
        response = '📅 How many days will you be staying? 🏨 (1-5)';
        step++;
    } else if (step === 1) {
        const days = parseInt(userInput);
        if (days >= 1 && days <= 5) {
            fetchRecommendation(destination, days);
            return; // Exit the function as fetchRecommendation will handle the rest
        } else {
            response = 'Please enter a valid number of days (1-5).';
        }
    } else {
        response = 'I’m sorry, I didn’t understand that. Can you please provide more details?';
    }

    showMessage(response, 'bot');
}




function showMessage(message, sender) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.className = 'message ' + (sender === 'bot' ? 'bot-message' : 'user-message') + ' typewriter';
    messageElement.innerText = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}


function fetchRecommendation(destination, days) {
    const formData = new FormData();
    formData.append('destination', destination);
    formData.append('days', days);

    fetch('/get_recommendation', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
       
        const itineraryMessage = `Your itinerary for ${destination} (${days} days):\n${data.itinerary}`;
        showMessage(itineraryMessage, 'bot');

        
        if (data.travel_sites.length > 0) {
            const travelSitesMessage = `Recommended travel sites:\n${data.travel_sites.join('\n')}`;
            showMessage(travelSitesMessage, 'bot');
        }

        // Combine and display Tips
        if (data.tips.length > 0) {
            const tipsMessage = `Travel tips:\n${data.tips.join('\n')}`;
            showMessage(tipsMessage, 'bot');
        }

        
        showMessage(data.farewell, 'bot');

        
        step = 0;
        destination = '';
    })
    .catch(error => {
        showMessage('Error fetching recommendation. Please try again later.', 'bot');
        console.error('Error:', error);
    });
}
