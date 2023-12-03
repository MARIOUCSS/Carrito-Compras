import React, { useState } from "react";
import Layout from "../../componets/Layout/Layout";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { url } from "./auth";

function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    answer: "",
  });

  const onsubmitR = async (e) => {
    const toastDuration = 5000;
    e.preventDefault();
    console.log(user);
    try {
      const res = await axios.post(`${url}/api/v1/auth/register`, user);
      if (res.data.success) {
        toast.success(res.data && res.data.message, {
          autoClose: toastDuration,
        });
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
    <Layout title="Register-Ecomer App">
      <div className="form-container">
        <form onSubmit={onsubmitR}>
          <h1 className="title">Register Form</h1>
          <div className="mb-3">
            <input
              placeholder="Enter Your Name"
              class="form-control"
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              placeholder="Enter Your Email"
              class="form-control"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              class="form-control"
              placeholder="Enter Your Password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>
          <div class="mb-3">
            <input
              placeholder="Enter Your Phone"
              class="form-control"
              onChange={(e) => setUser({ ...user, phone: e.target.value })}
            />
          </div>
          <div class="mb-3">
            <input
              class="form-control"
              placeholder="Enter Your Address"
              onChange={(e) => setUser({ ...user, address: e.target.value })}
            />
          </div>
          <div class="mb-3">
            <input
              class="form-control"
              placeholder="what is your favorite deport"
              onChange={(e) => setUser({ ...user, answer: e.target.value })}
            />
          </div>
          <button
            type="submit"
            class="btn btn-primary"
            onClick={() => {
              navigate("/forgot-password");
            }}
          >
            Forgot Password
          </button>
          <br />
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default Register;
