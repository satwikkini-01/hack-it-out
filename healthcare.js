mapboxgl.accessToken = config.MAPBOX_API_KEY;
async function getNearbyHospitals(latitude, longitude) {
    const overpassBaseUrl = 'https://overpass-api.de/api/interpreter';
    const overpassQuery = `[out:json][timeout:25];
        (
          node["amenity"="hospital"](around:1000,${latitude},${longitude});
          way["amenity"="hospital"](around:1000,${latitude},${longitude});
          relation["amenity"="hospital"](around:1000,${latitude},${longitude});
        );
        out center;`;

    const apiUrl = overpassBaseUrl + '?data=' + encodeURIComponent(overpassQuery);

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.elements;
    } catch (error) {
        console.error('Error fetching nearby hospitals:', error);
        return null;
    }
}

function plotHospitalsOnMap(hospitals) {
    mapboxgl.accessToken = config.MAPBOX_API_KEY;

    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [hospitals[0].lon, hospitals[0].lat],
        zoom: 15, // Adjust the zoom level
    });

    // Add markers for hospitals
    hospitals.forEach(hospital => {
        const marker = new mapboxgl.Marker()
            .setLngLat([hospital.lon, hospital.lat])
            .addTo(map);

        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<a href="https://www.google.com/maps/search/?api=1&query=${hospital.lat},${hospital.lon}" target="_blank">Hospital Location</a>`
        );

        // Add a popup to the marker
        marker.setPopup(popup);
    });
}

function getUserLocationAndFindHospitals() {
    // Get the user's current location (latitude and longitude)
    navigator.geolocation.getCurrentPosition(async (position) => {
        const userLatitude = position.coords.latitude;
        const userLongitude = position.coords.longitude;

        // Get nearby hospitals based on the user's location
        const nearbyHospitals = await getNearbyHospitals(userLatitude, userLongitude);

        // Plot nearby hospitals on the map
        plotHospitalsOnMap(nearbyHospitals);
    }, (error) => {
        console.error('Error getting user location:', error);
    });
}

// Call the function to get user location and find nearby hospitals
getUserLocationAndFindHospitals();