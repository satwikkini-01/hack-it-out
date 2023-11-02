let earthquakeData;
let filteredData;

const twoDaysAgo = new Date();
twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

const formattedDate = twoDaysAgo.toISOString().split('T')[0]; // Format date for API call

const earthquakeURL = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${formattedDate}&endtime=now&minmagnitude=4.5`;
const othersURL = 'https://eonet.gsfc.nasa.gov/api/v2.1/events';

fetch(earthquakeURL)
    .then(response => response.json())
    .then(data => {
        const earthquakes2023 = data.features.filter(event => {
            const date = new Date(event.properties.time);
            return date.getFullYear() === 2023;
        });

        earthquakeData = earthquakes2023.map(earthquake => {
            const coordinates = earthquake.geometry.coordinates;
            const coordinatesWithoutZ = [coordinates[1], coordinates[0]]; // Reversed order: [latitude, longitude]

            return {
                title: earthquake.properties.title,
                coordinates: coordinatesWithoutZ
            };
        });

        eonet();

        if (earthquakeData && earthquakeData.length > 0) {
            earthquakeData.forEach(event => {
                console.log(event.title, event.coordinates);
            });
        } else {
            console.log('No earthquake data found for 2023.');
        }
    })
    .catch(error => {
        console.error('Error fetching earthquake data', error);
    });

// const othersURL = 'data.json';

function eonet() {

    fetch(othersURL)
        .then(response => response.json())
        .then(data => {
            const eventData = data.events;
            const eventsIn2023 = eventData.filter(event => {
                const date = new Date(event.geometries[0].date);
                return date.getFullYear() === 2023;
            });
            filteredData = eventsIn2023.map(event => {
                return {
                    id: event.id,
                    title: event.title,
                    description: event.description,
                    category: event.categories[0].title,
                    source: event.sources[0].url,
                    coordinates: [event.geometries[0].coordinates[1], event.geometries[0].coordinates[0]]
                };
            });

            initializeMapView();
            console.log(coordinates);
            console.log(filteredData);
        })
        .catch(error => {
            console.error('Error fetching the eonet', error);
        });
}

const map = L.map('map', {
    maxZoom: 18,
    zoomControl: false,
});

function setInitialView() {
    map.setView([30, 10], 3);
    const boundsLargeScreen = L.latLngBounds(
        L.latLng(-90, -180),
        L.latLng(90, 180)
    );
    map.setMaxBounds(boundsLargeScreen);
    map.options.minZoom = 3;
}

const earthquakeIconUrl = document.getElementById('earthquake-icon-url').value;
const stormIconUrl = document.getElementById('storm-icon-url').value;
const fireIconUrl = document.getElementById('fire-icon-url').value;
const icebergIconUrl = document.getElementById('iceberg-icon-url').value;
const volcanoIconUrl = document.getElementById('volcano-icon-url').value;
const othersIconUrl = document.getElementById('others-icon-url').value;

const earthquakeIcon = L.icon({
    iconUrl: earthquakeIconUrl,
    iconSize: [32, 32]
});

const stormIcon = L.icon({
    iconUrl: stormIconUrl,
    iconSize: [32, 32]
});

const fireIcon = L.icon({
    iconUrl: fireIconUrl,
    iconSize: [32, 32]
});

const icebergIcon = L.icon({
    iconUrl: icebergIconUrl,
    iconSize: [32, 32]
});

const volcanoIcon = L.icon({
    iconUrl: volcanoIconUrl,
    iconSize: [32, 32]
});

const othersIcon = L.icon({
    iconUrl: othersIconUrl,
    iconSize: [32, 32]
});


function initializeMapView() {
    setInitialView();

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        maxZoom: 18,
    }).addTo(map);

    if (earthquakeData && earthquakeData.length > 0) {
        earthquakeData.forEach(dataOne => {
            const marker = L.marker(dataOne.coordinates, { icon: earthquakeIcon }).addTo(map);
            marker.bindPopup('Earthquake, ' + dataOne.title, { closeOnClick: false, autoClose: false });

            marker.on('mouseover', function () {
                marker.openPopup();
            });

            marker.on('mouseout', function () {
                marker.closePopup();
            });

            marker.on('click', function () {
                const url = "https://www.google.com/search?q=" + encodeURIComponent("Earthquake " + dataOne.title);
                window.open(url, '_blank');
            });
        });
    } else {
        console.log("no earthquake data");
    }

    filteredData.forEach(dataOne => {
        let marker;

        if (dataOne.category === 'Volcanoes') {
            marker = L.marker(dataOne.coordinates, { icon: volcanoIcon }).addTo(map);
        } else if (dataOne.category === 'Wildfires') {
            marker = L.marker(dataOne.coordinates, { icon: fireIcon }).addTo(map);
        } else if (dataOne.category === 'Sea and Lake Ice') {
            marker = L.marker(dataOne.coordinates, { icon: icebergIcon }).addTo(map);
        } else if (dataOne.category === 'Severe Storms') {
            marker = L.marker(dataOne.coordinates, { icon: stormIcon }).addTo(map);
        } else {
            marker = L.marker(dataOne.coordinates, { icon: othersIcon }).addTo(map);
        }

        marker.bindPopup(dataOne.title, '\n' + dataOne.description, { closeOnClick: false, autoClose: false });

        marker.on('mouseover', function () {
            marker.openPopup();
        });

        marker.on('mouseout', function () {
            marker.closePopup();
        });

        marker.on('click', function () {
            const url = "https://www.google.com/search?q=" + encodeURIComponent(dataOne.title);
            window.open(url, '_blank');
        });
    });

}

window.onload = function () {
    initializeMapView();
};
window.onresize = function () {
    initializeMapView();
};

//Chatbot:

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