import React, { useState, useEffect } from "react";
import Layout from "../../componets/Layout/Layout";
import UserMenu from "../../componets/Layout/UserMenu";
import { useNavigate } from "react-router-dom";
import { useauth } from "../../Context/context";
import { toast } from "react-hot-toast";
import axios from "axios";
import { url } from "../Auth/auth";
function Profile() {
  const { prueba, MostrarUsuario, actualizarus } = useauth();
  const navigate = useNavigate();
  //state
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  //
  const onsubmitR = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${url}/api/v1/auth/profile`, {
        name,
        email,
        password,
        phone,
        address,
      });

      if (res.data?.success) {
        actualizarus(res.data?.updateuser);
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = res.data.updateuser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Update Successfuly");
      }
    } catch (error) {
      console.log(error);
    }
    // toast.success("registrado correctamente");
  };
  useEffect(() => {
    const { email, name, phone, address } = prueba?.user;
    setName(name);
    setEmail(email);
    setAddress(address);
    setPhone(phone);
  }, [prueba?.user]);
  return (
    <Layout title={"Your Profile"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="form-container">
              <form onSubmit={onsubmitR}>
                <h1 className="title">USER PROFILE</h1>
                <div className="mb-3">
                  <input
                    placeholder="Enter Your Name"
                    class="form-control"
                    value={name}
                    onChange={(e) => setName(e.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    class="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.value)}
                    disabled
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Enter Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.value)}
                    required
                  />
                </div>
                <div class="mb-3">
                  <input
                    placeholder="Enter Your Phone"
                    class="form-control"
                    value={phone}
                    onChange={(e) => setPhone(e.value)}
                  />
                </div>
                <div class="mb-3">
                  <input
                    class="form-control"
                    placeholder="Enter Your Address"
                    value={address}
                    onChange={(e) => setAddress(e.value)}
                  />
                </div>
                <button type="submit" class="btn btn-primary">
                  UPDATE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
