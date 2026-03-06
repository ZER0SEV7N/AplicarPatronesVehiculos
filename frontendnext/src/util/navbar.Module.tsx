//frontendvite/src/util/navbar.jsx
//Componente para la barra de navegacion superior
import React from 'react'
import Link  from 'next/link'

const Navbar = () => {
    return( 
    <nav className="navbar bg-dark fixed-top" data-bs-theme="dark">
        <div className="container-fluid">
            <Link className="navbar-brand text-white" href="/vehiculos">
                <h1 className="ms-2 mb-0">
                    <i className="bi bi-car-front-fill me-2"></i>
                    Concesionaria Singer
                </h1>
            </Link>
        </div>
    </nav>
    )
};


export default Navbar;