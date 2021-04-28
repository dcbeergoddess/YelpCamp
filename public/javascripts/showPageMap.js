mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/mapbox/streets-v11', // style URL
  center: campground.geometry.coordinates, // starting position [lng, lat]
  zoom: 10 // starting zoom
});
//ADD PIN TO MAP
new mapboxgl.Marker({ color: 'black', rotation: 45 })
  .setLngLat(campground.geometry.coordinates)
  .addTo(map);