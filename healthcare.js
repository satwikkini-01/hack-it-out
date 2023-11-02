var userLatitude;
var userLongitude;

async function getNearbyHospitals(latitude, longitude) {
  const overpassBaseUrl = 'https://overpass-api.de/api/interpreter';
  const overpassQuery = `[out:json][timeout:25];
      (
        node["amenity"="hospital"](around:10000,${latitude},${longitude});
        way["amenity"="hospital"](around:10000,${latitude},${longitude});
        relation["amenity"="hospital"](around:10000,${latitude},${longitude});
      );
      out center;`;

  const apiUrl = overpassBaseUrl + '?data=' + encodeURIComponent(overpassQuery);

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data.elements);
    return data.elements;
  } catch (error) {
    console.error('Error fetching nearby hospitals:', error);
    return null;
  }
}

async function getNearbyPolice(latitude, longitude) {
  const overpassBaseUrl = 'https://overpass-api.de/api/interpreter';
  const overpassQuery = `[out:json][timeout:25];
      (
        node["amenity"="police"](around:10000,${latitude},${longitude});
        way["amenity"="police"](around:10000,${latitude},${longitude});
        relation["amenity"="police"](around:10000,${latitude},${longitude});
      );
      out center;`;

  const apiUrl = overpassBaseUrl + '?data=' + encodeURIComponent(overpassQuery);

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data.elements);
    return data.elements;
  } catch (error) {
    console.error('Error fetching nearby police stations:', error);
    return null;
  }
}

async function getNearbyFire(latitude, longitude) {
  const overpassBaseUrl = 'https://overpass-api.de/api/interpreter';
  const overpassQuery = `[out:json][timeout:25];
      (
        node["amenity"="fire_stations"](around:10000,${latitude},${longitude});
        way["amenity"="fire_stations"](around:10000,${latitude},${longitude});
        relation["amenity"="fire_stations"](around:10000,${latitude},${longitude});
      );
      out center;`;

  const apiUrl = overpassBaseUrl + '?data=' + encodeURIComponent(overpassQuery);

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data.elements);
    return data.elements;
  } catch (error) {
    console.error('Error fetching nearby fire stations:', error);
    return null;
  }
}

function plotHospitalsOnMap(hospitals, police, fire) {
  const map = L.map('map', { zoomControl: false }).setView([userLatitude, userLongitude], 15);

  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    maxZoom: 18,
    minZoom: 3,
    attribution: 'Map data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  const boundsLargeScreen = L.latLngBounds(
    L.latLng(-90, -180),
    L.latLng(90, 180)
  );
  map.setMaxBounds(boundsLargeScreen);

  const marker = L.marker([userLatitude, userLongitude]).addTo(map);
  marker.bindPopup('Your Location', { direction: 'top' });

  marker.on('mouseover', function () {
    marker.openPopup();
  });

  marker.on('mouseout', function () {
    marker.closePopup();
  });
  marker._icon.classList.add('red-marker');

  hospitals.forEach(hospital => {
    const marker = L.marker([hospital.lat, hospital.lon]).addTo(map);

    marker.bindPopup(hospital.tags.name || 'Hospital', { direction: 'top' });

    marker.on('mouseover', function () {
      marker.openPopup();
    });

    marker.on('mouseout', function () {
      marker.closePopup();
    });

    marker.on('click', function () {
      const unnamed = 'Hospitals near me';
      const url = `https://www.google.com/maps/search/?api=1&query=${hospital.tags.name || unnamed}`;
      window.open(url, '_blank');
    });
  });

  police.forEach(polic => {
    const marker = L.marker([polic.lat, polic.lon]).addTo(map);

    marker.bindPopup(polic.tags.name || 'Police Station', { direction: 'top' });

    marker.on('mouseover', function () {
      marker.openPopup();
    });

    marker.on('mouseout', function () {
      marker.closePopup();
    });

    marker.on('click', function () {
      const unnamed = 'Police Stations near me';
      const url = `https://www.google.com/maps/search/?api=1&query=${polic.tags.name || unnamed}`;
      window.open(url, '_blank');
    });
  });

  fire.forEach(fir => {
    const marker = L.marker([fir.lat, fir.lon]).addTo(map);

    marker.bindPopup(fir.tags.name || 'Fire Station', { direction: 'top' });

    marker.on('mouseover', function () {
      marker.openPopup();
    });

    marker.on('mouseout', function () {
      marker.closePopup();
    });

    marker.on('click', function () {
      const unnamed = 'Fire Station near me';
      const url = `https://www.google.com/maps/search/?api=1&query=${fir.tags.name || unnamed}`;
      window.open(url, '_blank');
    });
  });
}

function getUserLocationAndFind() {
  navigator.geolocation.getCurrentPosition(async (position) => {
    userLatitude = position.coords.latitude;
    userLongitude = position.coords.longitude;

    const nearbyHospitals = await getNearbyHospitals(userLatitude, userLongitude);
    const nearbyPolice = await getNearbyPolice(userLatitude, userLongitude);
    const nearbyFire = await getNearbyFire(userLatitude, userLongitude);

    plotHospitalsOnMap(nearbyHospitals, nearbyPolice, nearbyFire);
  }, (error) => {
    console.error('Error getting user location:', error);
  });
}

getUserLocationAndFind();

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
  chatBoxHeader.style.display = 'flex';
  chatBoxMessages.style.display = 'block';
});

closeButton.addEventListener('click', () => {
  chatCircle.style.display = 'flex';
  chatBox.style.right = '-320px';
  chatBoxHeader.style.display = 'none';
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
    setTimeout(() => {
      receiveMessage("This is a bot response.");
      scrollToBottom();
    }, 1000);
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