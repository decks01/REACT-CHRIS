import React, { useState,useEffect } from "react";
import { Map, Marker, GeoJsonLoader } from "pigeon-maps";
import MapsLyers from "./MapsLyers";

const Maps = (props) => {
  const [Maps, setMaps] = useState();
  const [MapSearch, setMapSearch] = useState();
  const [DataMap, setDataMap] = useState([])

  var geoJsonLink =
    "http://10.10.23.178:8000/geoserver/geomatica/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=geomatica%3Aaseo_colonias&outputFormat=application%2Fjson";

    var geoJsonLink12 =
    "http://10.10.23.178:8000/geoserver/geomatica/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=geomatica%3Aaseo_colonias&maxFeatures=449&outputFormat=application%2Fjson";


    var geoJsonLink1 =
    "http://10.10.23.178:8000/geoserver/geomatica/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=geomatica%3AColonias&outputFormat=application%2Fjson";

    var geoJsonLinkLimite =
    "http://10.10.23.178:8000/geoserver/geomatica/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=geomatica%3Appdu_limite_municipal&maxFeatures=50&outputFormat=application%2Fjson";

    const filterResult = (result) => {
      const data = result?.features
      const array = []
      if(result){
        console.log(result);
        // con st results = DataMap.filter(item => item.genero == "MASCULINO")
        const results = data?.filter(item => item.geometry != null)
        array.push(results)
        console.log('FILTER', results);
        
        setDataMap(results)
  
      }
    }   

    

  const data = (e) => {
    console.log(e);
    setMaps(e.payload.properties.nombre); 
  };

  const fetchUser = async () => {
    try {
      const response = await fetch(geoJsonLink, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        
        },
      });
      const result = await response.json();

      // filterResult(result)

      console.log(result, 'Este es el resultado');
    } catch (error) {
      console.log("Estan vacios los campos o esta mal la consulta");
    }
  };
  
  useEffect(() => {
    fetchUser()
  
  
  }, [])
  


  const dataSearch = (e) => {
    console.log(e.payload.properties.nombre);
    setMapSearch(e.payload.properties.nombre);
  };
  return (
    <div className="p-2 " id={props.id} >
      <h3>Componente de map   </h3>
        {DataMap ? 
              <Map height={300} defaultCenter={[20.72356, -103.38479]} defaultZoom={11}>
              <GeoJsonLoader
                link={ geoJsonLink1}
                  styleCallback={(feature, hover, active) =>
                      hover
                      ? { fill: "#93c0d099", strokeWidth: "2" }
                      : { fill: "#0000ff73", strokeWidth: "1" }
                  }
                onMouseOver={data}
                onClick={dataSearch}
              />
            </Map>
            : <p> No hay datos</p>
        }
  
      <div>
        <p>Hola este es el dato seleccionado: {Maps}</p>
        <p> Colonia seleccionada: {MapSearch}</p>
        <small> <strong> necesita JSON para sombrear</strong></small>
      </div>
      <div>
      {/* <MapsLyers /> */}
      </div>
    </div>
  );
};

export default Maps;
