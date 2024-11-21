// Slideshow Functionality
let slideIndex = 0;

function showSlides() {
    let slides = document.getElementsByClassName("slide");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.opacity = "0";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    slides[slideIndex-1].style.opacity = "1";
    setTimeout(showSlides, 3000); // Change image every 3 seconds
}

// Initialize slideshow
showSlides();

// Add scroll event to handle blur effect and picture visibility
window.addEventListener('scroll', function() {
    let scrollPosition = window.scrollY;
    let slideshow = document.querySelector('.slideshow-container');
    let picture = document.querySelector('.picture-container');

    if (scrollPosition > 50) { // Adjust the scroll position as needed
        slideshow.classList.add('scroll-blur');
    } else {
        slideshow.classList.remove('scroll-blur');
    }

    // Show picture on scroll
    if (scrollPosition > window.innerHeight / 2) {
        picture.classList.add('visible');
    } else {
        picture.classList.remove('visible');
    }
});

// Chatbot Functionality
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

    // Initialize chatbot visibility and message handling
    document.getElementById('send-button').addEventListener('click', sendMessage);
});

let step = 0;
let destination = '';

function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === '') return;

    showMessage(userInput, 'user');
    document.getElementById('user-input').value = '';

    if (step === 0) {
        destination = userInput;
        showMessage('📅 How many days will you be staying? 🏨 (1-5)', 'bot');
        step++;
    } else if (step === 1) {
        const days = parseInt(userInput);
        if (days >= 1 && days <= 5) {
            fetchRecommendation(destination, days);
        } else {
            showMessage('Please enter a valid number of days (1-5).', 'bot');
        }
    }
}

function showMessage(message, sender) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.className = 'message ' + (sender === 'bot' ? 'bot-message' : 'user-message');
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