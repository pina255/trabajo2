let options={
  enableHighAccuracy: true,
  timeout: 5000,
  maximunAge: 0
}


if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(
      success,
      error,
      options
    );

  }else{
    alert("los servicios de geolocalización no están disponibles");
  }

  
  
  
  function success(positon){
      let latitude = positon.coords.latitude;
      let longitude = positon.coords.longitude;

      let map = L.map("map" ,{
        center:[latitude,longitude],
        zoom: 11
      })

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);
      var marker = L.marker([38.409684, -0.441105]).addTo(map);
     }

     var circle = L.circle([38.409684, -0.441105], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 500
  }).addTo(map);

  var polygon = L.polygon([
    [38.409684, -0.441105],
    [38.409684, -0.441105],
    [38.409684, -0.441105]
]).addTo(map);


marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
circle.bindPopup("I am a circle.");
polygon.bindPopup("I am a polygon.");


var popup = L.popup()
    .setLatLng([38.409684, -0.441105])
    .setContent("I am a standalone popup.")
    .openOn(map);

     function error(){
        let map= L.map("map",{
          center:[38.409684, -0.441105],
          zoom: 14
        })

        .titleLayer("https://title.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"Mi openStreetMap"}).addTo(map)

     }