document.addEventListener('scroll', () => {
    const pictureContainer = document.querySelector('.picture-container');
    const scrollPosition = window.scrollY;
  
    // Show picture container when scrolling down
    if (scrollPosition > 300) { // Adjust the threshold as needed
      pictureContainer.classList.add('visible');
    } else {
      pictureContainer.classList.remove('visible');
    }
  });
  
  // Function to toggle chatbot visibility
  function toggleChatbot() {
    const chatContainer = document.getElementById('chat-container');
    chatContainer.classList.toggle('show');
  }
  
  // Function to send message (implement as needed)
  function sendMessage() {
    // Implement message sending functionality here
  }