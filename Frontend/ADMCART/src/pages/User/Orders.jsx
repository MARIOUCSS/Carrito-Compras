import React from "react";
import Layout from "../../componets/Layout/Layout";
import UserMenu from "../../componets/Layout/UserMenu";

function Orders() {
  return (
    <Layout title={"your Orders"}>
      <div className="container-fluid ´-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1>All Orders</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Orders;
