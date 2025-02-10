const { fromEvent } = require("rxjs");
const { map } = require("rxjs/operators")
const socket = io();

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

const formSubmit$ = fromEvent(form, 'submit').pipe(
  map(event => {
    event.preventDefault();
    const value = input.value;
    input.value = '';
    return value;
  })
)
formSubmit$.subscribe(value => {
  socket.emit('chat message', value);  
})

socket.on('chat message', (msg) => {
  const message = document.createElement('div');
  message.classList.add("message")
  message.textContent = msg;
  messages.appendChild(message);
})
