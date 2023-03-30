import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './profile.scss'
import logo from '../../../assets/img/logo_transparencia.png'
import { FaUserCircle } from "react-icons/fa";
import { FiEdit3 } from "react-icons/fi";
import { HiArrowRight } from "react-icons/hi";
import Tooltip from '@mui/material/Tooltip';
import ModalChangePassword from '../../Modals/changePassword/ModalChangePassword';
import ModalChangeUsers from '../../Modals/Users/ModalUser';
import constants from '../../../utils/constants';
import { Link } from 'react-router-dom';



const Profile = () => {

    const local = JSON.parse(localStorage.getItem("data"));

    const [modalShow, setModalShow] = useState(false);
    const [modalShowUser, setModalShowUser] = useState(false);
    const [id, setid] = useState()


    const [Nombre, setNombre] = useState("")
    const [Apellido, setApellido] = useState("")
    const [Correo, setCorreo] = useState("")

        const BackgroundNone = () => {

            const colore = document.getElementsByClassName("link-route");
            const color = document.getElementById(id);
        
            colore[`Inicio`].classList.remove("color-btn");
        }
        
        useEffect(() => {
            setid(local.ID)
            setNombre(local.nombre)
            setApellido(local.apellido)
            setCorreo(local.correo)
        }, [local])
        
     
        const fetchUser = async () => {
            try {
              const token = localStorage.getItem("token");
              const response = await fetch(constants.api + "users/" +  local.idUsuarios, {
                method: "GET",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  Authorization: "Bearer" + token,
                },
              });
              const result = await response.json();
      
              setid(result.ID)
              setNombre(result.nombre)
              setApellido(result.apellido)
              setCorreo(result.correo)
              
            } catch (error) {
              console.log("Estan vacios los campos o esta mal la consulta");
            }
          };
     
   
      
    return (
        <div className='profile'>
            <div className='bg-profile'></div>
            <div className='card-profile'>
                <div className='head-profile'>
                {local?.rolUsuario === 1 ?
                    <FaUserCircle size={'4em'}  style={{color:"#deb820"}}/>
                    :
                    <FaUserCircle size={'4em'}  />
                }
                    <div className='name-profile'>
                        <h5 className='name-titule-profile'>{Nombre ?  Nombre + ' ' + Apellido : 'Christian Omar' }</h5>
                        <p className='name-rol-asignado'>
                            {local?.rolUsuario === 1 && 'Administrador' }
                            {local?.rolUsuario === 2 && 'Empleado' }
                            {local?.rolUsuario === 3 && 'Administrador' }
                        </p>
                    </div>
                </div>

                <div className='content-information-user'>
                        <div className='col-12 col-xl-4 p-3 border-info-user' >
                            <div className='text-info-user edit-icon'>
                                <h6>Información de Usuario </h6>  <Tooltip title="Editar"><button className='icon-btn-edit' onClick={() => setModalShowUser(true)}><FiEdit3 /></button></Tooltip>
                            </div>
                            <div className='text-info-user'>
                                <p><strong> ID:  &nbsp; </strong>  {id}</p>
                            </div>
                            <div className='text-info-user'>
                                <p><strong> Nombre:  &nbsp; </strong>  {Nombre}</p>
                            </div>
                            <div className='text-info-user'>
                                <p><strong> Apellido:  &nbsp; </strong>  {Apellido}</p>
                            </div>
                            <div className='text-info-user'>
                                <p><strong> Correo:  &nbsp; </strong>  {Correo}</p>
                            </div>

             

                        </div>
                        <div className='col-12 col-xl-4 p-3 border-info-user' >
                            <div className='text-info-user edit-icon'>
                            <p><strong> Cambiar Contraseña  &nbsp; </strong> </p> <Tooltip title="Cambiar Contraseña"><button className='icon-btn-edit' onClick={() => setModalShow(true)}><FiEdit3 /></button></Tooltip>
                            </div>
                            <div className='text-info-user edit-icon'>
                            <p><strong> Datos de colonias  &nbsp; </strong> </p> <Tooltip title="Agregar colonias o editarlas"><Link className='icon-btn-edit'onClick={BackgroundNone} to='asociaciones-vecinales'><HiArrowRight /></Link></Tooltip>
                            </div>
                            <div className='text-info-user'>
                                <p><strong> Tipo de Rol Asignado  &nbsp; </strong> 
                                {local?.rolUsuario === 1 && 'Administrador' }
                            {local?.rolUsuario === 2 && 'Empleado' }
                            {local?.rolUsuario === 3 && 'Administrador' }
                                </p>
                            </div>
                         

             

                        </div>
                        <div className='col-12 col-xl-4 p-3 d-flex justify-content-center'>
                            <img className='logo-profile'  src={logo} alt='logo-profile'/>
                        </div>
                </div>

            </div>
                {/* MODALS */}
                <ModalChangePassword
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
                <ModalChangeUsers 
                      show={modalShowUser}
                      onHide={() => setModalShowUser(false)}
                />
        </div>
    );
};

export default Profile;