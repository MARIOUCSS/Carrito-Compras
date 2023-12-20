import { PayPalButtons } from "@paypal/react-paypal-js";
import { useCart } from "../Context/Cart";

import { useNavigate } from "react-router-dom";
import axios from "axios";
const PaypalPayment = (props) => {
  const [cart, setCart] = useCart();
  const serverUrl = "http://localhost:5000/api/v1/product";
  const navigate = useNavigate();
  const createOrder = async (data) => {
    try {
      const response = await axios.post(
        `${serverUrl}/create-paypal-order`,
        {
          product: {
            description: "ropa",
            cost: props.total.toString(),
            // cart: cart,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      //////

      console.log("Response:", response); // Verificar la respuesta completa
      console.log("Response Data:", response.data); // Verificar la parte 'data' de la respuesta

      return response.data.id;
    } catch (error) {
      console.error("Error:", error);
      // Manejar el error aquí si es necesario
      throw error; // O relanzar el error para que lo maneje otro lugar
    }
  };

  // const onApprove = (data) => {
  //   return fetch(`${serverUrl}/capture-paypal-order`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       orderID: data.orderID,
  //     }),
  //   }).then((response) => {
  //     console.log("pagado");
  //     response.json();
  //   });
  // };
  const onApprove = async (data) => {
    try {
      const response = await axios.post(
        `${serverUrl}/capture-paypal-order`,
        {
          orderID: data.orderID,
          cart: cart,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("pagado");
      // localStorage.removeItem("cart");
      localStorage.setItem("cart", JSON.stringify([]));
      setCart([]);
      navigate("/");
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      // Manejar el error aquí si es necesario
      throw error; // O relanzar el error para que lo maneje otro lugar
    }
  };
  return (
    <PayPalButtons
      createOrder={(data, actions) => createOrder(data, actions)}
      onApprove={(data, actions) => onApprove(data, actions)}
    />
  );
};

export default PaypalPayment;
