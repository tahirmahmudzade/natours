export const displayMap = (locations) => {
  const [lat, lng] = locations[0].coordinates;
  mapboxgl.accessToken =
    'pk.eyJ1IjoidGFiYWNhYmExMjMiLCJhIjoiY2xnNDQ0a2VvMDIwZzNwcnE1bTE5cWc1byJ9.ZnQw3kx1tirT3R3fjzxevQ';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/outdoors-v12',
    center: [lat, lng],
    zoom: 10,
    hash: true,
    minZoom: 3,
    scrollZoom: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    const el = document.createElement('div');
    el.className = 'marker';

    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 100,
      left: 100,
      right: 100,
    },
  });
};
