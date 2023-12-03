import React, { useState } from "react";
import Layout from "../../componets/Layout/Layout";
import { toast } from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { url } from "./auth";
import { useauth } from "../../Context/context";
function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { MostrarUsuario } = useauth();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const onsubmitL = async (e) => {
    const toastDuration = 5000;
    e.preventDefault();

    try {
      const res = await axios.post(`${url}/api/v1/auth/login`, login);
      if (res.data.success) {
        toast.success(res.data && res.data.message, {
          autoClose: toastDuration,
        });
        MostrarUsuario(res.data.user, res.data.token);
        //Guardamos en el localstorage con el "auth"
        localStorage.setItem("auth", JSON.stringify(res.data));
        // : Esta expresión utiliza el operador "||"
        // (OR lógico) para tomar el valor de location.state.
        //  Si location.state tiene un valor (es decir, no es
        //    nulo o indefinido), se utilizará ese valor. Si
        //     location.state es nulo o indefinido, se utilizará
        //      "/" como valor predeterminado.
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
    // toast.success("registrado correctamente");
  };
  return (
    <Layout title="Login-Ecomer App">
      <div className="form-container">
        <form onSubmit={onsubmitL}>
          <h1 className="title">Login</h1>

          <div className="mb-3">
            <input
              type="email"
              placeholder="Enter Your Email"
              class="form-control"
              onChange={(e) => setLogin({ ...login, email: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              class="form-control"
              placeholder="Enter Your Password"
              onChange={(e) => setLogin({ ...login, password: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <button
              type="submit"
              class="btn btn-primary"
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              Forgot Password
            </button>
          </div>
          <button type="submit" class="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default Login;
