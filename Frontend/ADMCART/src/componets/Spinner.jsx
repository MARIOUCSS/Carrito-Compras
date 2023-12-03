import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
function Spinner() {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    // const interval = setInterval(() => {
    //   setCount((preValue) => --preValue);
    // }, 1000);
    // count === 0 && navigate("/login");
    // return () => clearInterval(interval);

    const interval = setInterval(() => {
      setCount(count - 1); // Actualización directa
    }, 1000);
    if (count === 0) {
      navigate("/login", {
        // Esto es un objeto que se está pasando como una propiedad adicional.
        // En este caso, se está pasando una propiedad llamada state con el valor
        //  location.pathname. El objeto location generalmente se refiere a la ubi
        //  cación actual del navegador. location.pathname
        state: location.pathname,
      });
    }
    //con esto se para cancelar el interval
    return () => clearInterval(interval);
  }, [count, navigate]);
  return (
    <>
      <div className="d-flex justify-content-center align-items-center">
        <h1 className="Text-center">redireccionando en {count} second</h1>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
}

export default Spinner;
