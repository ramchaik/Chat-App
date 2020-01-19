const socket = io();

socket.on('message', message => {
  console.log(message);
});

document.querySelector('#message-form').addEventListener('submit', event => {
  event.preventDefault();
  const message = event.target.elements.message.value;
  socket.emit('sendMessage', message);
});

document.querySelector("#send-location").addEventListener('click', (event) => {
  if (!navigator.geolocation) {
    return alert("Geolocation is not supported by browser.");
  }

  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit('sendLocation', { 
      longitude: position.coords.longitude, 
      latitude: position.coords.latitude 
    });
  });
})