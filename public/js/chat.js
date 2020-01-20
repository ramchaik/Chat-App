const socket = io();

socket.on('message', message => {
  console.log(message);
});

document.querySelector('#message-form').addEventListener('submit', event => {
  event.preventDefault();
  const message = event.target.elements.message.value;
  socket.emit('sendMessage', message, (error) => {
    if (error) {
      return console.log(error);
    }

    console.log("Message delivered!");
  });
});

document.querySelector("#send-location").addEventListener('click', (event) => {
  if (!navigator.geolocation) {
    return alert("Geolocation is not supported by browser.");
  }

  navigator.geolocation.getCurrentPosition((position) => {
    const { longitude, latitude } = position.coords;
    socket.emit('sendLocation', { longitude, latitude },
	  (error) => {
		  if (error) {
			  return console.log(error);
		  }

		  console.log("Location shared!");
	  });
  });
})