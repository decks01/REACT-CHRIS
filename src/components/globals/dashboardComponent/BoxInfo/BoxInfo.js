import React, { useState } from "react";
import "./BoxInfo.scss";
import { GiBlockHouse } from "react-icons/gi";
import { FaInfoCircle } from "react-icons/fa";



export const BoxColorInfo = (props) => {
  return (
    <>
      <div className="box-info-dash " style={{ backgroundColor: props.color }}>
        {props.icon ? props.icon : <FaInfoCircle />}
        <h3> {props.num}</h3>
        <h6> {props.name}</h6>

      </div>
    </>
  );
};
const BoxInfo = (props) => {
    const [datos, setdatos] = useState("Chrsitian")

  return (
    
    <div className="card-profiles d-flex">
      <div className="col-12 col-sm-6 col-xl-3 p-2">
        <BoxColorInfo color="background-color: rgb(208, 242, 255)" name='105 COLONIAS' num='105' icon={<GiBlockHouse />}/>
      </div>
      <div className="col-12 col-sm-6 col-xl-3 p-2">
        <BoxColorInfo color="rgb(255, 231, 217)" name='COLONIAS'  num='105'/>
      </div>
      <div className="col-12 col-sm-6 col-xl-3 p-2">
        <BoxColorInfo color="rgb(208, 242, 255)" name='COLONIAS' num='105'/>
      </div>
      <div className="col-12 col-sm-6 col-xl-3 p-2">
        <BoxColorInfo color="rgb(255, 247, 205)" name='COLONIAS' num='105'/>
      </div>
    </div>
  );
};

export default BoxInfo;
