import React, { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Password } from "primereact/password";
import "./changePass.scss";
import "../Modals.scss";

import constants from "../../../utils/constants";
import { Toast } from "primereact/toast";

const ModalChangePassword = (props) => {
  const [contraNew, setcontraNew] = useState("");
  const [ConfirmcontraNew, setConfirmContraNew] = useState("");

  const toast = useRef(null);

  const limpiar = () => {
    setcontraNew("");
    setConfirmContraNew("");
  };
  const data = JSON.parse(localStorage.getItem("data"));



  const sendEditPassword = async () => {
    try {
      // const  id_num = parseInt(id)
      if (!(contraNew && ConfirmcontraNew)) {
        toast.current.show({
          severity: "warn",
          summary: "Llene todos los campos",
          detail: "Campos vacios",
          life: 3000,
        });

        return;
      }
      if (contraNew !== ConfirmcontraNew) {
        toast.current.show({
          severity: "warn",
          summary: " Las contraseñas no coinciden ",
          detail: "Intente de nuevo",
          life: 3000,
        });

        return;
      }
      const response = await fetch(
        constants.api +
          "users/updatePassword/" +  data.idUsuarios,
          {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contrasena: contraNew,
            }),
          }
      );
      const result = await response.json();
          
      console.log("Se mandaron los datos ", result);

      if (result) {
        toast.current.show({
          severity: "success",
          summary: "Se Ha cambiado la contraseña",
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
      alert("Error en el servidor12", error);
      // Swal.fire({
      //     icon: "error",
      //     title: "El usuario ya existe", error,
      //     text: "Intente de nuevo",
      //     timer: 3000,
      //   });
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter justify-content-center"
      centered
      className="moda-change-password"
    >
      <Modal.Header closeButton>
        <h5>Editar Contraseña</h5>
      </Modal.Header>
      <Modal.Body className="modal-body-custom">
        <div className="d-flex content-cahnge-password">
          <div className="col-12 col-md-6">
            <div className="d-grid mt-2">
              <label> <p>Contraseña </p></label>
              <Password
                feedback={false}
                value={contraNew}
                onChange={(e) => setcontraNew(e.target.value)}
                toggleMask
              />
            </div>
          </div>


          <div className="col-12 col-md-6">
            <div className="d-grid mt-2">
            <label> <p> Confirmar Contraseña </p></label>

            <Password
              feedback={false}
              value={ConfirmcontraNew}
              onChange={(e) => setConfirmContraNew(e.target.value)}
              toggleMask
            />
            </div>
    
          </div>
        </div>
        <hr className="hr-footer"></hr>

        <div className="modal-footer1">
          <Button className="btn btn-success" onClick={sendEditPassword}>
          Guardar
        </Button>
        </div>
      </Modal.Body>
      <Toast ref={toast} position="bottom-right" />
  
      {/* <Modal.Footer>
  
        <Button className="btn btn-success" onClick={sendEditPassword}>
          Guardar
        </Button>
      </Modal.Footer> */}
    </Modal>
  );
};

export default ModalChangePassword;
