const socket = io(); 

const chatForm = document.getElementById('chat-form');
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const messageInput = document.getElementById('message');
    const message = messageInput.value;
    socket.emit('chat message', message);
    messageInput.value = '';
});

socket.on('chat message', (message) => {
    const chatMessages = document.getElementById('chat-messages');
    const li = document.createElement('li');
    li.textContent = message;
    chatMessages.appendChild(li);
});