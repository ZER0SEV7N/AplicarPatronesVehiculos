//frontendnext/src/app/vehiculos/layout.tsx
//Archivo para el layout de la sección de vehiculos, incluye la barra de navegacion
import React from "react";
import Navbar from "@/src/util/navbar.Module";

export default function VehiculosLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Navbar />
            <div className="container mt-5 pt-4">
                {children}
            </div>
        </div>
    );
}