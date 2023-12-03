import React, { useState } from "react";
import Layout from "../../componets/Layout/Layout";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { url } from "./auth";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [newpassword, setNewpassword] = useState({
    email: "",
    password: "",
    answer: "",
  });
  const onsubmitL = async (e) => {
    const toastDuration = 5000;
    e.preventDefault();
    console.log(newpassword);
    try {
      const res = await axios.post(
        `${url}/api/v1/auth/forgot-password`,
        newpassword
      );
      if (res.data.success) {
        toast.success(res.data && res.data.message, {
          autoClose: toastDuration,
        });
        ////// MostrarUsuario(res.data.user, res.data.token);
        //Guardamos en el localstorage con el "auth"
        ///// localStorage.setItem("auth", JSON.stringify(res.data));
        // : Esta expresión utiliza el operador "||"
        // (OR lógico) para tomar el valor de location.state.
        //  Si location.state tiene un valor (es decir, no es
        //    nulo o indefinido), se utilizará ese valor. Si
        //     location.state es nulo o indefinido, se utilizará
        //      "/" como valor predeterminado.
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
    // toast.success("registrado correctamente");
  };
  return (
    <Layout>
      <div className="Forgot Password -Ecommerce">
        <form onSubmit={onsubmitL}>
          <h1 className="title">RESET PASSWORD</h1>

          <div className="mb-3">
            <input
              type="email"
              placeholder="Enter Your Email"
              class="form-control"
              onChange={(e) =>
                setNewpassword({ ...newpassword, email: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Enter Your favorite Sport"
              class="form-control"
              onChange={(e) =>
                setNewpassword({ ...newpassword, answer: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              class="form-control"
              placeholder="Enter Your Password"
              onChange={(e) =>
                setNewpassword({ ...newpassword, password: e.target.value })
              }
            />
          </div>
          {/* <div className="mb-3">
            <button
              type="submit"
              class="btn btn-primary"
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              Forgot Password
            </button>
          </div> */}
          <button type="submit" class="btn btn-primary">
            Reset Password
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
