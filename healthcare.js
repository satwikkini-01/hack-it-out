var userLatitude;
var userLongitude;

async function getNearbyHospitals(latitude, longitude) {
    const overpassBaseUrl = 'https://overpass-api.de/api/interpreter';
    const overpassQuery = `[out:json][timeout:25];
      (
        node["amenity"="hospital"](around:2000,${latitude},${longitude});
        way["amenity"="hospital"](around:2000,${latitude},${longitude});
        relation["amenity"="hospital"](around:2000,${latitude},${longitude});
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

function plotHospitalsOnMap(hospitals) {
    const map = L.map('map', {zoomControl: false}).setView([userLatitude, userLongitude], 15);

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

        marker.bindPopup(hospital.tags.name || 'Unnamed Hospital', { direction: 'top' });

        marker.on('mouseover', function () {
            marker.openPopup();
        });

        marker.on('mouseout', function () {
            marker.closePopup();
        });

        marker.on('click', function () {
            const url = `https://www.google.com/maps/search/?api=1&query=${hospital.tags.name}`;
            window.open(url, '_blank');
        });
    });
}

function getUserLocationAndFindHospitals() {
    navigator.geolocation.getCurrentPosition(async (position) => {
        userLatitude = position.coords.latitude;
        userLongitude = position.coords.longitude;

        const nearbyHospitals = await getNearbyHospitals(userLatitude, userLongitude);

        plotHospitalsOnMap(nearbyHospitals);
    }, (error) => {
        console.error('Error getting user location:', error);
    });
}

getUserLocationAndFindHospitals();

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