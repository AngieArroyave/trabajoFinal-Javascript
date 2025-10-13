let options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximunAge: 0,
}

if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(success, error, options)
}else{
    alert ('Los servicios de geolocalización no están disponibles')
}

function success(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    let map = L.map ('map', {
        center: [latitude, longitude],
        zoom: 14
    })

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var greenIcon = new L.Icon({ 
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png', 
    iconSize: [32, 52], 
    iconAnchor: [15, 45], 
    popupAnchor: [1, -34], 
    shadowSize: [41, 41],
    shadowAnchor: [4, 36],
    });

     let control = L.Routing.control({
        waypoints: [
            L.latLng(latitude, longitude),
            L.latLng(41.3624717, 2.1049473)
                ],
        language: 'es',
        createMarker: function (i, wp, nWps){
            switch (i) {
                case 0:
                    return L.marker(wp.latLng, {icon: greenIcon, draggable:true}).bindPopup('Inicio');
                case nWps-1:
                    return L.marker(wp.latLng, {icon: greenIcon, draggable:true}).bindPopup('Final');
            
                default:
                    return L.marker(wp.latLng, {icon: greenIcon, draggable:true}).bindPopup('Paso intermedio');
                    
            }
        }

    }).addTo(map);
}

function error(){
    let map = L.map('map', {
        center: [41.3624717, 2.1049473],
        zoom: 14
    })

     L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);

}
