import React, { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";
import { Reducers } from "./Reducers";
const auth = {
  user: null,
  token: "",
};

//creamos el createcontext
export const Registro = createContext();

// viene la simplificacion
export const useauth = () => {
  const context = useContext(Registro);
  return context;
};

//el global sera el padre de todo

export const Global = (props) => {
  const [state, dispatch] = useReducer(Reducers, auth);
  //default axios
  // hace esta línea de código es configurar la cabecera de autorización predeterminada
  // en Axios con el valor del token del estado de tu aplicación (si existe)
  //por ultimo este se va a distribuir por todo
  axios.defaults.headers.common["Authorization"] = state?.token;
  //
  //cuando el token ya esta cargado por defecto se tiene que mostrar en home
  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      //console.log("si hay carga");
      const parsedata = JSON.parse(data);
      MostrarUsuario(parsedata.user, parsedata.token);
    }
  }, []);

  const MostrarUsuario = (us, tok) => {
    dispatch({ type: "MostrarU", payload: { user: us, token: tok } });
  };
  return (
    <Registro.Provider value={{ prueba: state, MostrarUsuario }}>
      {props.children}
    </Registro.Provider>
  );
};
