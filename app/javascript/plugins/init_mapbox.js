// app/javascript/plugins/init_mapbox.js
import mapboxgl from 'mapbox-gl';

const fitMapToMarkers = (map, markers) => {
  const bounds = new mapboxgl.LngLatBounds();
  markers.forEach(marker => bounds.extend([ marker.lng, marker.lat ]));
  map.fitBounds(bounds, { padding: 20, maxZoom: 10, duration: 0 });
};

const initMapbox = () => {
  const mapElement = document.getElementById('map');

  if (mapElement) { // only build a map if there's a div#map to inject into
    mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v10'
    });

    const markers = JSON.parse(mapElement.dataset.markers);
    markers.forEach((marker) => {
      const popup = new mapboxgl.Popup().setHTML(marker.infoWindow); // add this

      new mapboxgl.Marker({ color: '#D85040'})
        .setLngLat([ marker.lng, marker.lat ])
        .setPopup(popup) // add this
        .addTo(map);
    });

    const marker_spot = JSON.parse(mapElement.dataset.spot);

    new mapboxgl.Marker({ color: '#153351' })
      .setLngLat([ marker_spot.lng, marker_spot.lat ])
      .addTo(map);

    fitMapToMarkers(map, markers);
  };
}

export { initMapbox };
