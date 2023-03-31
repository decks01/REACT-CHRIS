import "bootstrap/dist/css/bootstrap.css";
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";

//core
import "primereact/resources/primereact.min.css";

//icons
import "primeicons/primeicons.css";
import Index from "./auntetificacion/Login.js";
import Home from "./views/Home";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import SideBar from "./components/globals/SideBar";
import "animate.css";
import Prueba from "./views/prueba/Prueba.js";
import Users from "./views/users/Users.js";
import { useEffect } from "react";
import Asociaciones from "./views/Asociaciones/Asociaciones.js";
import { MyComponent } from "./components/globals/profile/prueba.js";
import IndexComponents from "./components/globalsUse/components/IndexComponents.js";

function App() {
  const token = localStorage.getItem("token");
  
  
  if(!token || token === null) {
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route exact path="*" element={<Index />} />
          </Routes>
        </BrowserRouter>
      </>
    );
  }
  return (
    <>
      <BrowserRouter>
        <SideBar />
        <Routes>
          <Route exact path="cd" element={<MyComponent />} />
          <Route exact path="*" element={<Home />} />

          <Route exact path="/prueba" element={<Prueba />} />
          <Route exact path="/asociaciones-vecinales" element={<Asociaciones />} />
          <Route exact path="/usuarios" element={<Users />} />
          <Route exact path="/components" element={<IndexComponents />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
