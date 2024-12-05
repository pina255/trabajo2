let options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

// Ubicación fija de la otra persona en Madrid (latitud y longitud)
const ubicacionOtraPersona = [40.416775, -3.703790]; // Madrid, España

// Pedir la ubicación del usuario
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(success, error, options);
} else {
  alert("Los servicios de geolocalización no están disponibles");
}

function success(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  // Crear el mapa centrado en la ubicación del usuario
  let map = L.map("map", {
    center: [latitude, longitude],
    zoom: 11
  });

  // Cargar la capa de OpenStreetMap
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
  }).addTo(map);

  // Crear un marcador en la ubicación del usuario
  let userMarker = L.marker([latitude, longitude]).addTo(map);
  userMarker.bindPopup("<b>Tu ubicación</b>").openPopup();

  // Crear un marcador para la ubicación de la otra persona (Madrid)
  let targetMarker = L.marker(ubicacionOtraPersona).addTo(map);
  targetMarker.bindPopup("<b>Ubicación de la otra persona (Madrid)</b>").openPopup();

  // Calcular la distancia entre la ubicación del usuario y la otra persona
  let userLatLng = L.latLng(latitude, longitude);
  let targetLatLng = L.latLng(ubicacionOtraPersona);
  let distancia = userLatLng.distanceTo(targetLatLng); // Devuelve la distancia en metros

  // Mostrar la distancia en el HTML
  document.getElementById("distance").textContent = `La distancia entre tu ubicación y la otra persona es: ${distancia.toFixed(2)} metros.`;

  // Dibujar una línea entre ambos puntos (entre la ubicación del usuario y la otra persona)
  let latlngs = [userLatLng, targetLatLng];
  let polyline = L.polyline(latlngs, { color: "blue" }).addTo(map);

  // Ajustar el mapa para que ambos puntos sean visibles
  map.fitBounds(polyline.getBounds());
}

// Si no se puede obtener la ubicación, mostrar un mapa centrado en la ubicación predeterminada
function error() {
  let map = L.map("map", {
    center: ubicacionOtraPersona,
    zoom: 14
  });

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "Mi OpenStreetMap"
  }).addTo(map);

  let targetMarker = L.marker(ubicacionOtraPersona).addTo(map);
  targetMarker.bindPopup("<b>Ubicación de la otra persona (Madrid)</b>").openPopup();

  alert("No se pudo obtener la ubicación del usuario.");
}
