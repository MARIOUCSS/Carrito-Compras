import React from "react";
import Layout from "../../componets/Layout/Layout";
import AdminMenu from "../../componets/Layout/AdminMenu";
import { useauth } from "../../Context/context";
const Admindashboard = () => {
  const { prueba, MostrarUsuario } = useauth();
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3>Admin Name:{prueba.user.name}</h3>
              <h3>Admin Email:{prueba.user.email}</h3>
              <h3>Admin Contact:{prueba.user.phone}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Admindashboard;
