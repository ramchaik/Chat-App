const socket = io();

// Elements
const $messageForm = document.querySelector('#message-form');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFormButon = $messageForm.querySelector('button');
const $sendLocationButton = document.querySelector('#send-location');
const $messages = document.querySelector('#messages');

// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML;
const locationMessageTemplate = document.querySelector(
  '#location-message-template'
).innerHTML;

socket.on('message', message => {
  console.log('message', message);
  const html = Mustache.render(messageTemplate, {
    message: message.text,
    createdAt: moment(message.createdAt).format('h:mm a')
  });
  $messages.insertAdjacentHTML('beforeend', html);
});

socket.on('locationMessage', (message) => {
  console.log(message);
  const html = Mustache.render(locationMessageTemplate, {
    url: message.url,
    createdAt: moment(message.createdAt).format('h:mm a')
  });
  $messages.insertAdjacentHTML('beforeend', html);
});

$messageForm.addEventListener('submit', event => {
  event.preventDefault();

  $messageFormButon.setAttribute('disabled', 'disabled');

  const message = event.target.elements.message.value;

  socket.emit('sendMessage', message, error => {
    $messageFormButon.removeAttribute('disabled');
    $messageFormInput.value = '';
    $messageFormInput.focus();

    if (error) {
      return console.log(error);
    }

    console.log('Message delivered!');
  });
});

$sendLocationButton.addEventListener('click', event => {
  if (!navigator.geolocation) {
    return alert('Geolocation is not supported by browser.');
  }

  $sendLocationButton.setAttribute('disabled', 'disabled');

  navigator.geolocation.getCurrentPosition(position => {
    const { longitude, latitude } = position.coords;

    socket.emit('sendLocation', { longitude, latitude }, error => {
      $sendLocationButton.removeAttribute('disabled');

      if (error) {
        return console.log(error);
      }

      console.log('Location shared!');
    });
  });
});
