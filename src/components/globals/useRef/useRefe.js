import React, { useRef } from 'react';


const Referencia = () => {
    let refMenubtn = useRef(0),
     refMenu = useRef(0)


    const handleToggleMenu = (e) => {
        // const $menu = document.getElementById('menu')
        // if(e.target.textContent === 'Menu'){
        //     e.target.textContent = 'Cerrar'
        //     $menu.style.display ='block'
        // }else {
        //     e.target.textContent = 'Menu'
        //     $menu.style.display ='none'
        // }
          if(refMenubtn.current.textContent === 'Menu'){
            refMenubtn.current.textContent = 'Cerrar'
            refMenu.current.style.display ='block'
            }else {
                refMenubtn.current.textContent = 'Menu'
                refMenu.current.style.display ='none'
            }
    }
    return ( 
        <div>

<p>Uso de referencias  <small>Se utiliza para elementos que ya estan en el DOM</small></p><br></br>
            <button onClick={handleToggleMenu}  ref={refMenubtn} className='btn btn-secondary' id='btn-menu'>Menu</button>

            <nav ref={refMenu} id='menu' style={{display: 'none'}}>
                <a href='#'> Section 1  </a>
                <br />
                <a href='#'> Section 2  </a>
                <br />
                <a href='#'> Section 3  </a>
                <br />
                <a href='#'> Section 4  </a>

            </nav>
        </div>
    );
};

export default Referencia;