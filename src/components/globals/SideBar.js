import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Index.scss";
import logo from '../../assets/img/logo_transparencia.png'
import { BsTable } from "react-icons/bs";
import { MdDashboard } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";

const RouteLink = (props) => {
  const ColorClick = (id) => {
    const colore = document.getElementsByClassName("link-route");
    const color = document.getElementById(id);

    colore[`Inicio`].classList.remove("color-btn");
    colore[`Prueba`].classList.remove("color-btn");
    colore[`Usuarios`].classList.remove("color-btn");
    colore[`Usuarios`].classList.remove("color-btn");
    colore[`Datos`].classList.remove("color-btn");
    colore[`Components`].classList.remove("color-btn");


    if (id === color.id) {
      color.className += " color-btn";
    }
  };

  return (
    <Link
      onClick={(e) => ColorClick(props.nombre)}
      id={`${props.nombre}`}
      name="routas"
      className="link-route"
      to={`${props.to}`}
    >
      {props.icon}
      {props.nombre}
    </Link>
  );
};
const SideBar = () => {

  const [Nombre, setNombre] = useState("Omar")
  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div id="side-bar" className="side-bar-menu animate__animated ">
      <div id="side-bar-option" className="container-side-bar">
        <div>
          <div className="title-logo">
            {/* <p>Titule and Logo</p> */}
            <img className="logo-principal" src={logo} alt="Inicio del dashboard"/>
          </div>
          <div className="d-flex justify-content-center">
            <hr className="hr-title" />
          </div>
          <div className="link-routas d-flex">
            <FaUserCircle/>  Hola! {Nombre}
          </div>
          <div className="d-flex justify-content-center">
            <hr className="hr-title" />
          </div>

         

          <div className="link-routas">
            <RouteLink to="/" nombre="Inicio" icon={<MdDashboard />} />
          </div>

          <div className="link-routas">
            <RouteLink to="/usuarios" nombre="Usuarios" icon={<FiUsers />} />
          </div>

          <div className="link-routas">
            <RouteLink to="/prueba" nombre="Prueba" icon={<MdDashboard />} />
          </div>

          <div className="link-routas">
            <RouteLink to="/components" nombre="Components" icon={<MdDashboard />} />
          </div>

          <div className="link-routas">
            <RouteLink
              to="/asociaciones-vecinales"
              nombre="Datos"
              icon={<BsTable />}
            />
          </div>
        </div>
        <div className="d-flex justify-content-center w-100">
          <button className="btn btn-primary w-100 bt-logout" onClick={logout}>
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
