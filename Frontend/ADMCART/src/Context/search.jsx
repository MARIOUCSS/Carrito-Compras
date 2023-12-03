import React, { createContext, useContext, useReducer, useState } from "react";
// import axios from "axios";
// import { Reducers1 } from "./Reducers1";
// const [auth, setAuth] = useState({
//   keyword: "",
//   results: [],
// });

export const search = createContext();

export const searchC = () => {
  const context = useContext(search);
  return context;
};

export const GlobalB = (props) => {
  // const [state, dispatch] = useReducer(Reducers1, seachp);
  const [auth, setAuth] = useState({
    keyword: "",
    results: [],
  });
  return (
    <search.Provider value={[auth, setAuth]}>{props.children}</search.Provider>
  );
};
