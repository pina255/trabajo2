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

     }

     function error(){

     }