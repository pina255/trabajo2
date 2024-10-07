  // Crear el mapa centrado en Muchamiel
  var map = L.map('map').setView([38.4152, -0.4459], 13);  // Coordenadas de Muchamiel

  // Añadir capa de OpenStreetMap
  L.tileLayer('https://.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: "Mi openStreetMap"
  }).addTo(map);

  // Añadir un marcador en Muchamiel
  var marker = L.marker([38.4152, -0.4459]).addTo(map);

  // Añadir un cuadro emergente al marcador
  marker.bindPopup("<b>Muchamiel</b><br>Alicante, España.").openPopup();
  