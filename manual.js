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
  chatBox.style.right = '20px';
  chatBox.querySelector('.chat-box-header').style.display = 'block';
  chatBox.querySelector('.chat-box-messages').style.display = 'block';
});

closeButton.addEventListener('click', () => {
  chatBox.style.right = '-300px';
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

sendButton.addEventListener('click', () => {
  const message = userInput.value;
  if (message.trim() !== '') {
    sendMessage(message);
    setTimeout(() => {
      receiveMessage("This is a bot response.");
    }, 1000);
    userInput.value = '';
  }
});

