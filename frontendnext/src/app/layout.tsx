import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/src/util/navbar.Util";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
export const metadata: Metadata = {
  title: "Concesionaria Singer",
  description: "Sistema de gestión de vehículos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" data-scroll-behavior="smooth">
      <body>
        <div className="container mt-5 pt-4">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}