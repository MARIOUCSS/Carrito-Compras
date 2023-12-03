import React from "react";
import Layout from "../componets/Layout/Layout";
import { Link } from "react-router-dom";
function Pagenotfound() {
  return (
    <Layout>
      <div className="pnf">
        <h1 className="pnf-title">404</h1>
        <h2 className="pnf-heading">ops page no found</h2>
        <Link to="/" className="pnf-btn">
          Go back
        </Link>
      </div>
    </Layout>
  );
}

export default Pagenotfound;
