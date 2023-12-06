import React from "react";
import { Link } from "react-router-dom";
import Layout from "../componets/Layout/Layout";
import useCategory from "../hooks/useCategory";
function Categories() {
  const categories = useCategory();
  return (
    <Layout title={"All Categories"}>
      <div className="container">
        <div className="row">
          {categories?.map((p) => (
            <div className="col-md-6 mt-5 mb-3 gx-3 gy-3" key={p._id}>
              <Link to={`/category/${p.slug}`} className="btn btn-primary">
                {p.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Categories;
