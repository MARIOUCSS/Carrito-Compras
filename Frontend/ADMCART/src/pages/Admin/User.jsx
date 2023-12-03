import React from "react";
import Layout from "../../componets/Layout/Layout";
import AdminMenu from "../../componets/Layout/AdminMenu";

function User() {
  return (
    <Layout title={"Dashboard - All Users"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>all category</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default User;
