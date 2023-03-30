import React, { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Password } from "primereact/password";
import "./Modals.scss";
import constants from "../../utils/constants";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";

const ModalBase = (props, {footer}) => {



//   const toast = useRef(null);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter justify-content-center"
      centered
      className="moda-change-password"
      id='Modal-User'
      show={props.show}
    >
      <Modal.Header closeButton>
        <h5>{props.title}</h5>
      </Modal.Header>
      <Modal.Body className="modal-body-custom">
        <div className="d-flex content-cahnge-password">
            {props.children}
        </div>
       
      </Modal.Body>
      {/* <Toast ref={toast} position="bottom-right" /> */}
     
    </Modal>
  );
};

export default ModalBase;
