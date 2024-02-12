import React, { useEffect, useState } from "react";
import AdminMenu from "../../componets/Layout/AdminMenu";
import Layout from "../../componets/Layout/Layout";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { url } from "../Auth/auth";
import { Select } from "antd";
const { Option } = Select;
function CreateProduct() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
    shipping: "",
    photo: "",
  });

  const getAllCategories = async () => {
    try {
      const res = await axios.get(`${url}/api/v1/category/get-category`);
      if (res.data.success) {
        setCategories(res.data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error en la obtencion de la categoria");
    }
  };
  const handleCreated = async (e) => {
    e.preventDefault();

    console.log(product);
    try {
      const productdata = new FormData();
      productdata.append("name", product.name);
      productdata.append("description", product.description);
      productdata.append("price", product.price);
      productdata.append("quantity", product.quantity);
      productdata.append("photo", product.photo);
      productdata.append("category", product.category);
      console.log(productdata);
      const res = await axios.post(
        `${url}/api/v1/product/create-product`,
        productdata
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/dashboard/admin/products");
      } else {
        toast.error("Product Created Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error en la creacion del producto");
    }
  };
  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <Layout title={"Dashboard -Create Products"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Create Product</h1>
            <Select
              bordered={false}
              placeholder="Selected a Category"
              size="large"
              showSearch
              className="form-select mb-3"
              onChange={(value) => {
                setProduct({ ...product, category: value });
              }}
            >
              {categories.map((x) => (
                <Option key={x._id} value={x._id}>
                  {x.name}
                </Option>
              ))}
            </Select>
            <div className="mb-3">
              <label className="btn btn-outline-secondary col-md-12">
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) =>
                    setProduct({ ...product, photo: e.target.files[0] })
                  }
                />
              </label>
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={product.name}
                placeholder="Nombre"
                className="form-control"
                onChange={(e) =>
                  setProduct({ ...product, name: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={product.description}
                placeholder="Descripcion"
                className="form-control"
                onChange={(e) =>
                  setProduct({ ...product, description: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                value={product.price}
                placeholder="Precio"
                className="form-control"
                onChange={(e) =>
                  setProduct({ ...product, price: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                value={product.quantity}
                placeholder="Cantidad"
                className="form-control"
                onChange={(e) =>
                  setProduct({ ...product, quantity: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <Select
                bordered={false}
                placeholder="Selected a Shipping"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setProduct({ ...product, shipping: value });
                }}
              >
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
              </Select>
            </div>
            <div className="mb-3">
              <button className="btn btn-primary" onClick={handleCreated}>
                Create Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CreateProduct;
