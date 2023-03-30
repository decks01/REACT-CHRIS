import React, { useEffect } from "react";
import BoxInfo from "../components/globals/dashboardComponent/BoxInfo/BoxInfo";
import NavBar from "../components/globals/NavBar";
import Profile from "../components/globals/profile/profile";
import TableAsociacion from "../components/Table/TableAsociacion";
import constants from "../utils/constants";
import "./Home.scss";

const Home = () => {

  // useEffect(() => {
    
  //   const fetchServicio = async () => {
  //     try {
  //       const token = localStorage.getItem("token");
  //       const response = await fetch(constants.api + "login/reset", {
  //         method: "GET",
  //         headers: {
  //           Accept: "application/json",
  //           "Content-Type": "application/json",
  //           Authorization: "Bearer" + token,
  //         },
  //       });
  //       const result = await response.json();
  //       console.log(result);
  //       console.log("Si entra");
  //     } catch (error) {
  //       console.log("Estan vacios los campos o esta mal la consulta");
  //     }
  //   };
  //   fetchServicio();
  // }, []);

  return (
    <div className="container-info">
       <NavBar titule='Inicio' />
        <Profile />
        <BoxInfo />
    </div>
  );
};

export default Home;
