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
import Swal from "sweetalert2";

const ModalUserEdit = (props) => {
  const [Nombre, setNombre] = useState("");
  const [Apellido, setApellido] = useState("");
  const [Correo, setCorreo] = useState("");
  const [idUser, setIdUser] = useState();
  const [ids, setIds] = useState();

  const [rol, setRol] = useState();
  const [roles, setRoles] = useState([]);

  const toast = useRef(null);
  var moment = require("moment");
  var years = moment().year();

  const today = new Date();
  const year = today.getFullYear();

  const limpiar = () => {
    setNombre("");
    setApellido("");
    setCorreo("");
    setRol("");
    setIdUser("");
  };

  useEffect(() => {
    setIds(props?.data?.idUsuarios);
    setIdUser(props?.data?.ID);
    setNombre(props?.data?.nombre);
    setApellido(props?.data?.apellido);
    setCorreo(props?.data?.correo);
    setRol(props?.data?.rolUsuario);
  }, [props]);

  const sendUpdateUsers = async () => {
    try {
      const { onHide } = props;

      if (!(Nombre && Apellido && Correo && rol)) {
        toast.current.show({
          severity: "warn",
          summary: "Llene todos los campos",
          detail: "Campos vacios",
          life: 3000,
        });

        return;
      }
      const parseId = parseInt(ids);
      const response = await fetch(constants.api + "users/" + parseId, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: Nombre,
          apellido: Apellido,
          correo: Correo,
          rolUsuario: rol,
        }),
      });

      const result = await response.json();

      if (result) {
        toast.current.show({
          severity: "success",
          summary: "Se Ha editado el Usuario",
          detail: "",
          life: 3000,
        });
        setTimeout(() => {
          onHide();
          limpiar();
        }, 500);
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

  const updatePass = async (id) => {
    try {
      const { onHide } = props;

      const token = localStorage.getItem("token");
      const response = await fetch(constants.api + "users/updatePassword/" + ids, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer" + token,
        },
        body: JSON.stringify({
          contrasena: `Zapopan${years}`,

        }),
      });
      const result = await response.json();

      if (result) {
        toast.current.show({
          severity: "success",
          summary: `Se ha cambiado la contraseña ha Zapopan${year}`,
          detail: "",
          life: 3000,
        });
        setTimeout(() => {
          onHide();
          limpiar();
        }, 500);
      } else {
        toast.current.show({
          severity: "warn",
          summary: " No se pudo actualizar intente de nuevo",
          detail: "Intente de nuevo",
          life: 3000,
        });
      }


    } catch (error) {
      console.log(error);
    }
  }

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

  const rolTipo = ["Empeladp", "Administrador", "ROl", "Administrador"];

  const selected = roles.find(option => option.idRol === rol);

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter justify-content-center"
        centered
        className="moda-change-password"
        id="Modal-User"
      >
        <Modal.Header closeButton>
          <h5>Editar Usuario</h5>
        </Modal.Header>
        <Modal.Body className="modal-body-custom">
          <div className="d-flex content-cahnge-password">
            <div className="col-12 col-md-6">
              <div className="d-grid mt-2">
                <span className="p-float-label">
                  <InputText
                    id="username"
                    disabled
                    value={idUser}
                    type="number"
                    onChange={(e) => setIdUser(e.target.value)}
                  />
                  <label htmlFor="username">Usuario</label>
                </span>
              </div>
            </div>
            <div className="col-12 col-md-6"></div>

            <div className="col-12 col-md-6">
              <div className="d-grid mt-2">
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
                <span className="p-float-label"> 
                  {/* <Form.Select
                    defaultValue
                    aria-label="Default select example"
                    onChange={(e) => setRol(e.target.value)}
                  >
                    <option defaultValue> Selecciona un Rol</option>
                    <option selected={rol === 2} value={2}>
                      Empleado
                    </option>
                    <option selected={rol === 1} value={1}>
                      Administrador
                    </option>
                    <option selected={rol === 3} value={3}>
                      Lectura
                    </option>
                  </Form.Select> */}
                   
                   {/* <Form.Select value={selected?.idRol} onChange={(event) => setRol(event.target.value)}>
                        <option defaultValue> Selecciona una opción</option>
                        {roles.map(option => (
                        <option key={option.idRol} value={option.idRol} selected={option?.idRol === rol}>{option.tipoRol}</option>
                        ))}
                    </Form.Select> */}

                    <Form.Select value={selected?.idRol}  onChange={(event) => setRol(event.target.value)}>
                        <option > Selecciona una opción</option>
                        {roles.map(option => (
                        <option key={option.idRol} value={option.idRol} >{option.tipoRol}</option>
                        ))}
                    </Form.Select>
                </span>
              </div>
            </div>
          </div>
          <div></div>
        </Modal.Body>

        <Modal.Footer>
          <Button className="btn btn-secondary" onClick={updatePass}>
            Reset Contraseña
          </Button>
          <Button className="btn btn-success" onClick={sendUpdateUsers}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
      <Toast ref={toast} position="bottom-right" />
    </>
  );
};

export default ModalUserEdit;
