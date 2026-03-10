//frontendNext/src/hooks/formHooks.jsx
//Componente para el formulario de ingreso de datos
"use client";
import React, { useState, useEffect } from "react";
import api from "../lib/config";
import { Marca, TipoVehiculo, Vehiculo } from "../types";
import { useRouter } from "next/navigation";
import FormPage from "../components/form.Component";

//Definir los props del componente
interface FormComponentProps {
  vehiculo?: Vehiculo; //Al editar se proporciona el vehiculo
}

const FormComponent = ({ vehiculo }: FormComponentProps) => {
  const router = useRouter(); //Para redireccion
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [tiposVehiculo, setTiposVehiculo] = useState<TipoVehiculo[]>([]);
  const [matriculaExistente, setMatriculaExistente] = useState<Vehiculo[]>([]);

  //Cargar marcas y tipos de vehiculo al montar el componente
  const [formData, setFormData] = useState({
    idtv: "",
    modelo: "",
    color: "",
    matricula: "",
    anio_fabricacion: new Date().getFullYear().toString(),
    estado: "",
    idmarca: "",
  });

  //Cargar datos del vehiculo a editar (si es necesario)
  useEffect(() => {
    const cargarSelects = async () => {
      const [marcasRes, tiposRes, vehiculosRes] = await Promise.all([
        api.get("/marcas"),
        api.get("/tipos-vehiculos"),
        api.get("/vehiculos")
      ]);
      setMarcas(marcasRes.data);
      setTiposVehiculo(tiposRes.data);
      setMatriculaExistente(vehiculosRes.data);
    };
    cargarSelects();
  }, []);

  //Cargar los datos del vehiculo al editar
  useEffect(() => {
    if(vehiculo){
      setFormData({
        idtv: vehiculo.idtipovehiculo.toString(),
        modelo: vehiculo.modelo,
        color: vehiculo.color,
        matricula: vehiculo.matricula,
        anio_fabricacion: vehiculo.anio_fabricacion.toString(),
        estado: vehiculo.estado || "",
        idmarca: vehiculo.idmarca.toString(),
      });
    }
  }, [vehiculo]);

  //Manejar cambios en los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //Manejar el envio del formulario
  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    //Validar que la matricula no se repita
    const matriculaIngresada = formData.matricula.trim().toLowerCase();

    const existeMatricula = matriculaExistente.some((v) =>
      v.matricula.trim().toLowerCase() === matriculaIngresada &&
      (!vehiculo || v.idvehiculo !== vehiculo.idvehiculo) 
    );

    if(existeMatricula){
      alert("La matrícula ya existe. Por favor, ingresa una matrícula diferente.");
      return;
    }

    //Modificar el tipado de los datos en el payload
    const payload = {
      ...formData,
      idtv: parseInt(formData.idtv),
      anio_fabricacion: parseInt(formData.anio_fabricacion),
      idmarca: parseInt(formData.idmarca),
    }
    try{
      if(vehiculo?.idvehiculo){
        //Modo edicion
        await api.patch(`/vehiculos/${vehiculo.idvehiculo}`, payload);
        alert("Vehiculo actualizado exitosamente");
        
      } else {
        //Modo creacion
        await api.post("/vehiculos", payload);
        alert("Vehiculo creado exitosamente");
      }
      router.push("/vehiculos"); //Redireccionar al listado
      router.refresh(); 
    } catch (error) {
      console.error("Error al guardar el vehiculo:", error);
      alert("Ocurrió un error al guardar el vehiculo. Por favor, intenta nuevamente.");
    }
  };
  return (
    <FormPage
      formData={formData}
      marcas={marcas}
      tiposVehiculo={tiposVehiculo}
      isEditMode={!!vehiculo}
      onSubmit={handleSubmit}
      onChange={handleChange}
      onCancel={() => router.push("/vehiculos")}
    />
  )
};

export default FormComponent;