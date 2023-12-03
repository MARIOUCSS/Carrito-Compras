import { useState, useEffect } from "react";
import { useauth } from "../../Context/context";
import { Outlet } from "react-router-dom";

import axios from "axios";
import { url } from "../../pages/Auth/auth";
import Spinner from "../Spinner";
export function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const { MostrarUsuario, prueba } = useauth();
  //por defecto se lanzara para que automaticamente
  //vea si es administrador o no en todo caso usuario
  useEffect(() => {
    //creamos una funcion para verificar si existe el token
    const authCheck = async () => {
      const res = await axios.get(`${url}/api/v1/auth/user-auth`);
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    //si hay un token ejecuta la funcion autocheck
    if (prueba?.token) authCheck();
    //si la prueba se modifica
  }, [prueba?.token]);
  // si ok es verdadero sal es loutlet
  return ok ? <Outlet /> : <Spinner />;
}
