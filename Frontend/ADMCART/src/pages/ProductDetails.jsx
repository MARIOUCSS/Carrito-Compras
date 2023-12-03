import React, { useState, useEffect } from "react";
import Layout from "../componets/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { url } from "./Auth/auth";
import { useNavigate } from "react-router-dom";
function ProductDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [realProducts, setRealProducts] = useState([]);
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  const getProduct = async () => {
    try {
      const res = await axios.get(
        `${url}/api/v1/product/get-product/${params.slug}`
      );
      //solo res.data =array , res.data.product cuando hay un elemento especifico
      setProduct(res?.data.product);
      getsimilarprod(res.data?.product._id, res.data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  //SIMILAR PRODUCTO
  const getsimilarprod = async (pid, cid) => {
    try {
      const res = await axios.get(
        `${url}/api/v1/product/related-product/${pid}/${cid}`
      );
      //solo res.data =array , res.data.product cuando hay un elemento especifico
      setRealProducts(res?.data.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      {/* <h1>Products Details</h1>
      {JSON.stringify(product, null, 4)} */}
      {/* { "_id": "656004b0867f602c4248d16f", "name": "chaqueta", "slug": "chaqueta",
       "description": "cuerina importada", "price": 23, 
       "category": { "_id": "6555910e68d96648c095aa6d", "name": "prueba 2", "slug": "prueba-2", "__v": 0 },
        "quantity": 3234, "createdAt": "2023-11-24T02:04:32.881Z", "updatedAt": "2023-11-24T02:04:32.881Z", "__v": 0 } */}
      <div className="row container mt-2">
        <div className="col-md-6">
          <img
            // src={`${url}/api/v1/product/product-photo/${product._id}`}
            src={`${url}/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height="390"
            width={"350px"}
          />
        </div>
        <div className="col-md-6">
          <h1 className="text-center">Product Details</h1>
          <h6>Name:{product.name}</h6>
          <h6>Description:{product.description}</h6>
          <h6>Price:{product.price}</h6>
          <h6>Category:{product.category?.name}</h6>
          <button className="btn btn-secondary ms-1">ADD TO CART</button>
        </div>
      </div>
      <div className="row container">
        <h1>Similar Products</h1>
        {realProducts.length < 1 && <p>No similar Products Found</p>}
        <div className="d-flex flex-wrap">
          {realProducts.length > 0 &&
            realProducts.map((product, index) => (
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
                  <button className="btn btn-secondary ms-1">
                    Add TO CART
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
      {/* {JSON.stringify(realProducts, null, 4)} */}
    </Layout>
  );
}

export default ProductDetails;
