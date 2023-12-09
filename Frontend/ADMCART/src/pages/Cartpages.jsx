import React from "react";
import Layout from "../componets/Layout/Layout";
import { useCart } from "../Context/Cart";
import { useauth } from "../Context/context";
import { useNavigate } from "react-router-dom";
import { url } from "./Auth/auth";
function Cartpages() {
  const [cart, setCart] = useCart();
  const { prueba } = useauth();
  const navigate = useNavigate();
  const TotalPagar = () => {
    //falta añadir la cantidad para poder multiplicar ojo con eso
    const cartm = [...cart];
    const total = cartm.reduce((ac, x) => {
      const productT = x.product.price * x.cantidad;
      return ac + productT;
    }, 0);
    return total;
  };
  const removeItem = (id) => {
    try {
      const carr = [...cart];

      const carf = carr.filter((x) => x.product._id !== id);
      //console.log(carf);
      setCart(carf);
      localStorage.setItem("cart", JSON.stringify(carf));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {`Hello ${prueba?.token && prueba?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length > 1
                ? `You have${cart.length} items in your cart${
                    prueba?.token ? "" : " please login to checkout"
                  }`
                : "your cart is empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-9">
            {cart?.map((x) => (
              <div className="row  card flex-row">
                <div className="col-md-4 mt-2" key={x._id}>
                  <img
                    src={`${url}/api/v1/product/product-photo/${x.product._id}`}
                    alt={x.product.name}
                    className="card-img-top"
                    width="100px"
                    height={"100px"}
                    object-fit={"cover"}
                  />
                </div>
                <div className="col-md-8">
                  <p>{x.product.name}</p>
                  <p>{x.product.description}</p>
                  <p>Price :{x.product.price}</p>
                  <p>Cantidad :{x.cantidad}</p>
                  <button
                    className="btn btn-danger mb-2"
                    onClick={() => removeItem(x.product._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-3 text-center">
            <h2>Cart Sumary</h2>
            <p>Total|Checkout|Payment</p>
            <hr />
            <h4>Total :{TotalPagar()}</h4>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Cartpages;
