const socket = io();

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = input.value;
    input.value = '';
    socket.emit('chat message', value);
})

socket.on('chat message', (msg) => {
  const message = document.createElement('div');
  message.classList.add("message")
  message.textContent = msg;
  messages.appendChild(message);
})
