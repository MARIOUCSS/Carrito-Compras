import React from "react";
import Layout from "../../componets/Layout/Layout";
import UserMenu from "../../componets/Layout/UserMenu";
import { useauth } from "../../Context/context";
function Dashboard() {
  const { prueba, MostrarUsuario } = useauth();
  return (
    <Layout title={"Dashboard -Ecomerce App"}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3>{prueba.user.name}</h3>
              <h3>{prueba.user.email}</h3>
              <h3>{prueba.user.address}</h3>
            </div>
          </div>
        </div>
      </div>

      <h1>Dashboard Page</h1>
    </Layout>
  );
}

export default Dashboard;
