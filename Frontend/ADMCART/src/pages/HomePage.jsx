import React, { useEffect, useState } from "react";
import Layout from "../componets/Layout/Layout";
//import { useauth } from "../Context/context";
import { url } from "./Auth/auth";
import axios from "axios";
import { Link, json } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { prices } from "../componets/Routes/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/Cart";
import toast from "react-hot-toast";
function HomePage() {
  //const { prueba } = useauth();
  const [cart, setCart] = useCart();
  //esto lo carga
  //
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const AddCart = (pro) => {
    //estas insertando el pro id
    const existingproduct = cart.findIndex((x) => x.product._id === pro._id);
    if (existingproduct !== -1) {
      const updatec = [...cart];
      updatec[existingproduct].cantidad += 1;
      setCart(updatec);
      localStorage.setItem("cart", JSON.stringify(updatec));
    } else {
      setCart([...cart, { product: pro, cantidad: 1 }]);
      JSON.stringify([...cart, { product: pro, cantidad: 1 }]);
    }
    toast.success("Item Added to Cart");
  };
  const handleFilter = (value, id) => {
    //copiamos todo lo que tiene el checked
    let all = [...checked]; //empieza desde[]
    if (value) {
      //si hay un value agregalo al all sino filtra de todos saca los diferente a id
      //si hay introducelo y setealo
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    //si hay o no hay despues seteamelo
    setChecked(all);
  };
  //All products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const respro = await axios.get(
        `${url}/api/v1/product/product-list/${page}`
      );

      if (respro.data.success) {
        setLoading(false);
        setProducts(respro.data.products);
      }
      const rescat = await axios.get(`${url}/api/v1/category/get-category`);
      if (rescat.data?.success) {
        setCategories(rescat.data?.category);
      }
      const res = await axios.get(`${url}/api/v1/product/product-count`);
      if (rescat.data?.success) {
        setTotal(res.data?.total);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    //si no hay ninguno marcado checked ni radio  marcar todas
    if (!checked.length || !radio.length) getAllProducts();
    //console.log(products);
  }, [checked, radio]);

  useEffect(() => {
    if (checked.length || (radio.length && categories.length > 0))
      FilterProduct();
  }, [checked, radio, categories]);
  const FilterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${url}/api/v1/product/product-filter`,
        {
          checked,
          radio,
        }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (page === 1) return;
    LoadMore();
  }, [page]);
  const LoadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${url}/api/v1/product/product-list/${page}`
      );
      if (data.success) {
        setLoading(false);
        setProducts([...products, ...data.products]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"All Products-Best offers"}>
      <div className="row mt-3">
        <div className="col-md-3">
          <h6 className="text-center">Filter By Category</h6>
          <div className="d-flex flex-column p-4">
            {categories?.map((x) => (
              <Checkbox
                key={x._id}
                onChange={(e) => handleFilter(e.target.checked, x._id)}
              >
                {x.name}
              </Checkbox>
            ))}
          </div>
          <h6 className="text-center">Filter By Prices</h6>
          <div className="d-flex flex-column p-4">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {prices.map((x) => (
                <div key={x._id}>
                  <Radio value={x.array}>{x.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column p-4">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
            {products.length > 0 &&
              products.map((product, index) => (
                <div
                  key={index}
                  className="card m-1"
                  style={{ width: "18rem" }}
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
                    <button
                      className="btn btn-primary ms-1"
                      onClick={() => navigate(`/product/${product.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="btn btn-secondary ms-1"
                      onClick={() => AddCart(product)}
                    >
                      Add TO CART
                    </button>
                  </div>
                </div>
              ))}
          </div>
          <div className="m-2 p-3">
            {/* //EL TOTAL SON 4 Y PREGUNTA SI AL FILTRAR SIGUE SIENDO <4 Y PRODUCTO ES V SAEL ESL BOTON */}
            {/*al momento de filltar se se tiene 2 <4 total mostrara el boton */}
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading" : "Loadmore"}
              </button>
            )}
            {total}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default HomePage;
