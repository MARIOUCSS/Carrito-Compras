import React, { useEffect, useState } from "react";
import Layout from "../../componets/Layout/Layout";
import AdminMenu from "../../componets/Layout/AdminMenu";
import axios from "axios";
import { toast } from "react-hot-toast";
import { url } from "../Auth/auth";
import { Link } from "react-router-dom";
const Products = () => {
  const [product, setProduct] = useState([]);
  const [photo, setPhoto] = useState("");

  const getAllProducts = async () => {
    try {
      const res = await axios.get(`${url}/api/v1/product/get-product`);
      if (res.data.success) {
        setProduct(res.data.products);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error en la obtencion de los Productos");
    }
  };
  useEffect(() => {
    getAllProducts();
    console.log(product);
  }, []);
  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex ">
            {product.map((product) => (
              <Link
                key={product._id}
                to={`/dashboard/admin/product/${product.slug}`}
                className="product-link"
              >
                <div class="card m-1" style={{ width: "18rem" }}>
                  {product &&
                    product.photo &&
                    product.photo.contentType &&
                    product.photo.data && (
                      // <img
                      //   src={`data:${
                      //     product.photo.contentType
                      //   };base64,${Buffer.from(
                      //     product.photo.data.data
                      //   ).toString("base64")}`}
                      //   className="card-img-top"
                      //   alt={product.name}
                      // />
                      <img
                        src={`data:${product.photo.contentType};base64,${btoa(
                          new Uint8Array(product.photo.data.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            ""
                          )
                        )}`}
                        className="card-img-top"
                        alt={product.name}
                      />
                    )}
                  <div class="card-body">
                    <h5 class="card-title">{product.name}</h5>
                    <p class="card-text">{product.description}</p>
                    <p class="card-text">$/.{product.price}</p>
                  </div>
                </div>
              </Link>

              //ojo en el style hay que tener cuidado siempre tiene que tener style={{}}
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
