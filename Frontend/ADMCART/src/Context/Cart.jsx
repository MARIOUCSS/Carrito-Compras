import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import axios from "axios";
///Modificacion
// const ARRAYINICIAL = {
//   Carrito: [],
//   carttotalcanti: 0,
//   carttotalmonto: 0,
// };
export const Cartcontext = createContext();

export const useCart = () => {
  const context = useContext(Cartcontext);
  return context;
};

export const GlobalCart = (props) => {
  const [cart, setCart] = useState([]);

  //para que una reiniciado se siga mostrando y se siga almacendo en el localstora
  //si existe se sigamistrando
  useEffect(() => {
    let existingcar = localStorage.getItem("cart");
    if (existingcar) setCart(JSON.parse(existingcar));
  }, []);
  return (
    <Cartcontext.Provider value={[cart, setCart]}>
      {props.children}
    </Cartcontext.Provider>
  );
};
