//frontendvite/src/util/navbar.Util.jsx
//Componente para la barra de navegacion superior
import React from 'react'
import Link  from 'next/link'
import { CarFront, LayoutDashboard, Car } from 'lucide-react';

const Navbar = () => {
    return( 
    <nav className="navbar bg-dark fixed-top" data-bs-theme="dark">
        <div className="container-fluid">
            <Link className="navbar-brand text-white" href="/">
                <h1 className="ms-2 mb-0">
                    <i className="bi bi-car-front-fill me-2"></i>
                    Concesionaria Singer
                </h1>
            </Link>
            <div className='flex items-center gap-6'>
                <Link className='flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transiction-colors' href='/'>
                    <h1 className="ms-2 mb-0">
                        Dashboard
                    </h1>
                </Link>
                <Link className='flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors' href='/vehiculos'>
                    <h1 className="ms-2 mb-0">
                        Vehículos
                    </h1>
                </Link>
            </div>
        </div>
    </nav>
    )
};


export default Navbar;