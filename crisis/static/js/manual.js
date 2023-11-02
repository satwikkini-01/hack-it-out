document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.content section');
    sections.forEach(section => {
        section.style.display = 'none';
    });

    const defaultEnabled = document.getElementById("earthquake");
    defaultEnabled.style.display = 'block';

    const links = document.querySelectorAll('.sidebar a');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('href').substr(1);
            sections.forEach(section => {
                if (section.id === sectionId) {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            });
        });
    });
});

//Chatbot:

const chatCircle = document.querySelector('.chat-circle');
const chatBox = document.querySelector('.chat-box');
const closeButton = document.querySelector('.close-button');
const chatBoxMessages = document.getElementById('chat-box-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

chatCircle.addEventListener('click', () => {
    chatCircle.style.display = 'none';
    chatBox.style.right = '20px';
    chatBoxMessages.style.display = 'block';
});

closeButton.addEventListener('click', () => {
    chatCircle.style.display = 'flex';
    chatBox.style.right = '-320px';
    chatBoxMessages.style.display = 'none';
});

function sendMessage(message) {
    const userMessage = document.createElement('div');
    userMessage.className = 'message user-message';
    userMessage.innerHTML = message;
    chatBoxMessages.appendChild(userMessage);
}

function receiveMessage(message) {
    const botMessage = document.createElement('div');
    botMessage.className = 'message bot-message';
    botMessage.innerHTML = message;
    chatBoxMessages.appendChild(botMessage);
}

function sendUserMessage() {
    const message = userInput.value;
    if (message.trim() !== '') {
        sendMessage(message);
        scrollToBottom();

        // Make a GET request to a URL (replace 'your-url' with the actual URL)
        fetch(`http://127.0.0.1:8000/accounts/getResponse?IPmessage=${message}`)
            .then(response => response.json())
            .then(data => {
                const botResponse = data.message;
                receiveMessage(botResponse);
                scrollToBottom();
            })
            .catch(error => {
                console.error('Error:', error);
            });

        userInput.value = '';
    }
}


sendButton.addEventListener('click', () => {
  sendUserMessage();
});

userInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    sendUserMessage();
  }
});

function scrollToBottom() {
  chatBoxMessages.scrollTop = chatBoxMessages.scrollHeight;
}


