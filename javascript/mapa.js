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
        zoom: 14
      })

      L.titleLayer("https://title.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"Mi openStreetMap"}).addTo(map)

      let control = L.Routing.control({
        waypoints:[
          L.latLng(latitude, longitude),
          L.latLng(38.412429, -0.442176)
        ],
        language: "es",

      }).addTo(map);

     }

     function error(){
        let map= L.map("map",{
          center:[38.412429, -0.442176],
          zoom: 14
        })

        .titleLayer("https://title.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"Mi openStreetMap"}).addTo(map)

     }