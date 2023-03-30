import React, { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Password } from "primereact/password";
import "../Modals.scss";
import constants from "../../../utils/constants";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { TreeSelect } from "primereact/treeselect";
import Form from "react-bootstrap/Form";

const ModalUserAdd = (props) => {
  const [Nombre, setNombre] = useState("");
  const [Apellido, setApellido] = useState("");
  const [Correo, setCorreo] = useState("");
  const [idUser, setIdUser] = useState();
  const [rol, setRol] = useState(2);
  const [roles, setRoles] = useState([]);

  const toast = useRef(null);

  const today = new Date();
  const year = today.getFullYear();
  

  const limpiar = () => {
    setNombre("");
    setApellido("");
    setCorreo("");
    setRol("");
    setIdUser("")
  };
  const data = JSON.parse(localStorage.getItem("data"));

  const fetchRoles = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(constants.api + "roles/", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer" + token,
        },
      });
      const result = await response.json();
      setRoles(result);
    } catch (error) {
      console.log("Estan vacios los campos o esta mal la consulta");
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const sendEditUsers = async (e) => {
    try {
        
      // const  id_num = parseInt(id)
      if (!(Nombre && Apellido && Correo && idUser )) {
        toast.current.show({
          severity: "warn",
          summary: "Llene todos los campos",
          detail: "Campos vacios",
          life: 3000,
        });

        return;
      }
      const rolParse = parseInt(rol);
      const idParse = parseInt(idUser);
      const response = await fetch(constants.api + "register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ID: idParse,
          nombre: Nombre,
          apellido: Apellido,
          correo: Correo,
          rolUsuario: rolParse,
          contrasena: `zapopan${year}`,

        }),
      });

      const result = await response.json();
 

      if (result) {
        toast.current.show({
          severity: "success",
          summary: "Se Ha Guardado el Usuario",
          detail: "",
          life: 3000,
        });

        limpiar();
      } else {
        toast.current.show({
          severity: "warn",
          summary: "Error en servidor ",
          detail: "Intente de nuevo",
          life: 3000,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const rolTipo = ["Empeladp", "Administrador", "ROl", "Administrador"];

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter justify-content-center"
      centered
      className="moda-change-password"
      id="Modal-User"
    >
      <Modal.Header closeButton>
        <h5>Agregar Usuario</h5>
      </Modal.Header>
      <Modal.Body className="modal-body-custom">
        <div className="d-flex content-cahnge-password">
        <div className="col-12 col-md-6">
            <div className="d-grid mt-2">
              {/* <label>
                {" "}
                <p>Nombre </p>
              </label> */}
              <span className="p-float-label">
                <InputText
                  id="username"
                  value={idUser}
                  type='number'
                  onChange={(e) => setIdUser(e.target.value)}
                />
                <label htmlFor="username">Usuario</label>
              </span>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="d-grid mt-2">
              {/* <label>
                {" "}
                <p>Nombre </p>
              </label> */}
              <span className="p-float-label">
                <InputText
                  id="username"
                  value={`zapopan${year}`}
                  disabled
                //   onChange={(e) => setNombre(e.target.value)}
                />
                <label htmlFor="username">Contraseña</label>
              </span>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="d-grid mt-2">
              {/* <label>
                {" "}
                <p>Nombre </p>
              </label> */}
              <span className="p-float-label">
                <InputText
                  id="username"
                  value={Nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
                <label htmlFor="username">Nombre</label>
              </span>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="d-grid mt-2">
              <span className="p-float-label">
                <InputText
                  id="Apellido"
                  value={Apellido}
                  onChange={(e) => setApellido(e.target.value)}
                />
                <label htmlFor="Apellido">Apellido</label>
              </span>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="d-grid mt-2">
              {/* <label>
                {" "}
                <p>Nombre </p>
              </label> */}
              <span className="p-float-label">
                <InputText
                  id="correo"
                  value={Correo}
                  onChange={(e) => setCorreo(e.target.value)}
                />
                <label htmlFor="correo">Correo</label>
              </span>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="d-grid mt-2">
              {/* <label>
                {" "}
                <p>Nombre </p>
              </label> */}
              <span className="p-float-label">
                <Form.Select aria-label="Default select example" onChange={(e) => setRol(e.target.value)}>
                  <option>Selecciona un Rol</option>
                  <option value="2">Empleado</option>
                  <option value="1">Administrador</option>
                  <option value="3">Lectura</option>
                </Form.Select>

                {/* <select
                  id="rol"
                  value={rol}
                  onChange={(e) => setRol(e.target.value)}
                >
                    <option>gsd</option>
                </select> */}
                {/* <label htmlFor="rol">Rol</label> */}
              </span>
            </div>
          </div>
        </div>
        <div></div>
      </Modal.Body>
      <Toast ref={toast} position="bottom-right" />
      <Modal.Footer>
        {/* <Button onClick={props.onHide}>Close</Button> */}
 
        <Button className="btn btn-success" onClick={sendEditUsers}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalUserAdd;
