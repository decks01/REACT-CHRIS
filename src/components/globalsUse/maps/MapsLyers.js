import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet.awesome-markers';


function MapsLyers() {
  useEffect(() => {

    var map = L.map('map').setView([42.35, -71.08], 3);

    // load a tile layer
    L.tileLayer('http://tiles.mapc.org/basemap/{z}/{x}/{y}.png',
      {
        attribution: 'Tiles by <a href="http://mapc.org">MAPC</a>, Data by <a href="http://mass.gov/mgis">MassGIS</a>',
        maxZoom: 17,
        minZoom: 9
      }).addTo(map);
  
    // load GeoJSON from an external file
    fetch("countries.geojson").then(res => res.json()).then(data => {
      // add GeoJSON layer to the map once the file is loaded
      L.geoJson(data).addTo(map);
    });

    return () => {
    //   map.remove();
    };
  }, []);

  return (
    <div className=' w-100'>
            <div id="map" style={{height: '500px'}}></div>
    </div>

  );
}

export default MapsLyers;
