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

  const removeItem = (id) => {
    try {
      const carr = [...cart];

      const carf = carr.filter((x) => x._id !== id);
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
                <div className="col-md-4 mt-2">
                  <img
                    src={`${url}/api/v1/product/product-photo/${x._id}`}
                    alt={x.name}
                    className="card-img-top"
                    width="100px"
                    height={"100px"}
                    object-fit={"cover"}
                  />
                </div>
                <div className="col-md-8">
                  <p>{x.name}</p>
                  <p>{x.description}</p>
                  <p>Price :{x.price}</p>
                  <button
                    className="btn btn-danger mb-2"
                    onClick={() => removeItem(x._id)}
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
            <h4>Total :</h4>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Cartpages;
