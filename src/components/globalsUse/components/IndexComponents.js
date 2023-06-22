import React, { useRef } from "react";
import NavBar from "../../globals/NavBar";
import Referencia from "../../globals/useRef/useRefe";
import Maps from "../maps/Maps";
import "./index.scss";
const IndexComponents = () => {
  return (
    <div className="container-info">
      <NavBar titule="Componentes" />
      <h1>Componentes</h1>
      <hr></hr>
      <Maps />
      <hr></hr>
        <h3>UseRef funcionamiento</h3>
        <Referencia />
      <hr></hr>
      
    </div>
  );
};

export default IndexComponents;
