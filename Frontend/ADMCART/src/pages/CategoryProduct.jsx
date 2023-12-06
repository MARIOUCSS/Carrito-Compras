import React, { useEffect, useState } from "react";
import Layout from "../componets/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { url } from "./Auth/auth";
function CategoryProduct() {
  const params = useParams();
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  //
  useEffect(() => {
    if (params?.slug) GetProductbyCategory();
  }, [params?.slug]);
  const GetProductbyCategory = async () => {
    try {
      const { data } = await axios.get(
        `${url}/api/v1/product/product-category/${params.slug}`
      );
      setProduct(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="container mt-3">
        <h4 className="text-center">Category-{category?.name}</h4>
        <h6 className="text-center">{product?.length}</h6>
        <div className="row"></div>
      </div>
      {product.length > 0 &&
        product.map((product, index) => (
          <div
            key={index}
            className="card m-1"
            style={{ width: "14rem", height: "30rem" }}
          >
            {product &&
              product.photo &&
              product.photo.contentType &&
              product.photo.data && (
                <img
                  src={`data:${product.photo.contentType};base64,${btoa(
                    String.fromCharCode(
                      ...new Uint8Array(product.photo.data.data)
                    )
                  )}`}
                  className="card-img-top"
                  alt={product.name}
                />
              )}
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">{product.description}</p>
              <p className="card-text">$/.{product.price}</p>
              {/* <button
                    className="btn btn-primary ms-1"
                    onClick={() => navigate(`/product/${product.slug}`)}
                  >
                    More Details
                  </button> */}
              <button className="btn btn-secondary ms-1">Add TO CART</button>
            </div>
          </div>
        ))}
    </Layout>
  );
}

export default CategoryProduct;
