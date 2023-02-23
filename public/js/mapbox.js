/* eslint-disable vars-on-top */
/* eslint-disable no-undef */
/* eslint-disable prefer-destructuring */
const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoidGFoeWlyciIsImEiOiJjbGN1YnpnbG4wdDAzM3BteGJmbm1xejlwIn0.RH67fFLpdDilydiZCsh17Q';

  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/tahyirr/clcucye3t004z15pavx9dmjq2',
    scrollZoom: false,
    //   center: [-118.6919213, 34.0207305],
    //   zoom: 8,
    //   interactive: false,
  });

  const bound = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    const el = document.createElement('div');
    el.className = 'marker';

    // eslint-disable-next-line no-new
    new mapboxgl.Marker({
      anchor: 'bottom',
      element: el,
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day: ${loc.day}: ${loc.description}</p>`)
      .addTo(map);
    bound.extend(loc.coordinates);
  });

  map.fitBounds(bound, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};

module.exports = displayMap;
