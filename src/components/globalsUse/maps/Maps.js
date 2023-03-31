import React, { useState } from "react";
import { Map, Marker, GeoJsonLoader } from "pigeon-maps";

const Maps = () => {
  const [Maps, setMaps] = useState();
  const [MapSearch, setMapSearch] = useState();

  const geoJsonLink =
    "https://raw.githubusercontent.com/isellsoap/deutschlandGeoJSON/main/2_bundeslaender/4_niedrig.geo.json";

  const data = (e) => {
    console.log(e);
    console.log(e.payload.properties.name);
    setMaps(e.payload.properties.name);
  };

  const dataSearch = (e) => {
    console.log(e);
    console.log(e.payload.properties.name);
    setMapSearch(e.payload.properties.name);
  };
  return (
    <div>
      <p>Componente de mapa, necesita JSON para sombrear </p>
      <Map height={300} defaultCenter={[50.879, 4.6997]} defaultZoom={4}>
        <GeoJsonLoader
          link={geoJsonLink}
            styleCallback={(feature, hover, active) =>
                hover
                ? { fill: "#93c0d099", strokeWidth: "2" }
                : { fill: "#d4e6ec99", strokeWidth: "1" }
     
            }
          onMouseOver={data}
          onClick={dataSearch}
        />
      </Map>
      <div>
        <p>Hola este es el dato seleccionado: {Maps}</p>
        <p> Colonia seleccionada: {MapSearch}</p>
      </div>
    </div>
  );
};

export default Maps;
