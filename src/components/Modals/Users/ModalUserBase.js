
// ESTA ES OTRA FORMA DE REALIZAR UN MODAL PERO CON BASE

// import React, { useEffect, useRef, useState } from "react";
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
// import { Password } from "primereact/password";
// import "../Modals.scss";
// import constants from "../../../utils/constants";
// import { Toast } from "primereact/toast";
// import { InputText } from "primereact/inputtext";
// import ModalBase from "../ModalBase";

// const ModalUserBase = (props) => {
//   const [Nombre, setNombre] = useState("");
//   const [Apellido, setApellido] = useState("");
//   const [Correo, setCorreo] = useState("");
//   const [modalShowUser, setModalShowUser] = useState(false);

//   const toast = useRef(null);

//   const limpiar = () => {
//     // setcontraNew("");
//     // setConfirmContraNew("");
//   };
//   const data = JSON.parse(localStorage.getItem("data"));

//   const fetchUser = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(constants.api + "users/" + data.idUsuarios, {
//         method: "GET",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//           Authorization: "Bearer" + token,
//         },
//       });
//       const result = await response.json();

//       setNombre(result.nombre);
//       setApellido(result.apellido);
//       setCorreo(result.correo);
//     } catch (error) {
//       console.log("Estan vacios los campos o esta mal la consulta");
//     }
//   };
//   const sendEditUsers = async (props) => {

//     // Se pasa como parametro de los props el onHide
//     const { onHide} = props;

//     try {
//       // const  id_num = parseInt(id)
//       if (!(Nombre && Apellido && Correo)) {
//         toast.current.show({
//           severity: "warn",
//           summary: "Llene todos los campos",
//           detail: "Campos vacios",
//           life: 3000,
//         });

//         return;
//       }

//       const response = await fetch(constants.api + "users/" + data.ID, {
//         method: "PUT",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           nombre: Nombre,
//           apellido: Apellido,
//           correo: Correo,
//         }),
//       });

//       const result = await response.json();

//       if (result) {
//         toast.current.show({
//           severity: "success",
//           summary: "Se Ha editado el Usuario",
//           detail: "",
//           life: 3000,
//         });
//         setTimeout(() => {
//           onHide()
//         }, 1000);
//         limpiar();
//       } else {
//         toast.current.show({
//           severity: "warn",
//           summary: "Error en servidor ",
//           detail: "Intente de nuevo",
//           life: 3000,
//         });
//       }
//     } catch (error) {
//       //   alert("Error en el servidor", error);
//       console.log(error);
//       // Swal.fire({
//       //     icon: "error",
//       //     title: "El usuario ya existe", error,
//       //     text: "Intente de nuevo",
//       //     timer: 3000,
//       //   });
//     }
//   };

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   return (
//     <>
//       <ModalBase title="Editar Admnid" {...props} >
//       <div className="d-flex content-cahnge-password">
//         <div className="col-12 col-md-6">
//           <div className="d-grid mt-2">
//             {/* <label>
//                 {" "}
//                 <p>Nombre </p>
//               </label> */}
//             <span className="p-float-label">
//               <InputText
//                 id="username"
//                 value={Nombre}
//                 onChange={(e) => setNombre(e.target.value)}
//               />
//               <label htmlFor="username">Nombre</label>
//             </span>
//           </div>
//         </div>

//         <div className="col-12 col-md-6">
//           <div className="d-grid mt-2">
//             <span className="p-float-label">
//               <InputText
//                 id="Apellido"
//                 value={Apellido}
//                 onChange={(e) => setApellido(e.target.value)}
//               />
//               <label htmlFor="Apellido">Apellido</label>
//             </span>
//           </div>
//         </div>
//         <div className="col-12 col-md-6">
//           <div className="d-grid mt-2">
//             {/* <label>
//                 {" "}
//                 <p>Nombre </p>
//               </label> */}
//             <span className="p-float-label">
//               <InputText
//                 id="correo"
//                 value={Correo}
//                 onChange={(e) => setCorreo(e.target.value)}
//               />
//               <label htmlFor="correo">Correo</label>
//             </span>
//           </div>
//         </div>
//       </div>
//       <hr className="hr-footer"></hr>
//       <div className="modal-footer1">
//         <Button className="btn btn-success" onClick={() => sendEditUsers(props)}>
//           Guardar
//         </Button>
//       </div>
//     </ModalBase>
// <Toast ref={toast} position="bottom-right" />

//     </>
  
//   );
// };

// export default ModalUserBase;
