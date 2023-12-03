import React, { useEffect, useState } from "react";
import AdminMenu from "../../componets/Layout/AdminMenu";
import Layout from "../../componets/Layout/Layout";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { url } from "../Auth/auth";
import { Select } from "antd";
const { Option } = Select;

function UpdateProduct() {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");
  const getsingleProduct = async () => {
    try {
      const res = await axios.get(
        `${url}/api/v1/product/get-product/${params.slug}`
      );
      console.log(res);
      setName(res.data.product.name);
      setDescription(res.data.product.description);
      setPrice(res.data.product.price);
      setQuantity(res.data.product.quantity);
      setId(res.data.product._id);
      setCategory(res.data.product.category);
      setShipping(res.data.product.shipping);
    } catch (error) {
      console.log(error);
      toast.error("Error en la obtencion del Producto");
    }
  };
  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `${url}/api/v1/product/delete-product/${id}`
      );
      toast.success(" Eliminacion del Producto");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Error en la Eliminacion del Producto");
    }
  };
  const handleupdate = async (e) => {
    e.preventDefault();

    try {
      const productdata = new FormData();
      productdata.append("name", name);
      productdata.append("description", description);
      productdata.append("price", price);
      productdata.append("quantity", quantity);
      photo && productdata.append("photo", photo);
      productdata.append("category", category._id);
      const res = await axios.put(
        `${url}/api/v1/product/update-product/${id}`,
        productdata
      );

      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error("Product Update Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error en la actualizacion  del producto");
    }
  };
  useEffect(() => {
    // getAllCategories();
    getsingleProduct();
  }, []);
  return (
    <Layout title={"Dashboard -Create Products"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update Product</h1>
            <Select
              bordered={false}
              placeholder="Selected a Category"
              size="large"
              showSearch
              className="form-select mb-3"
              onChange={(value) => {
                setCategory(value);
              }}
              value={category.name}
            >
              {categories.map((x) => (
                <Option key={x._id} value={x._id}>
                  {x.name}
                </Option>
              ))}
            </Select>
            <div className="mb-3">
              <label className="btn btn-outline-secondary col-md-12">
                {photo ? photo.name : "Upload Photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                />
              </label>
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={name}
                placeholder="Nombre"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={description}
                placeholder="Descripcion"
                className="form-control"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                value={price}
                placeholder="Precio"
                className="form-control"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                value={quantity}
                placeholder="Cantidad"
                className="form-control"
                onChange={(e) => setQuantity(e.target.value)}
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
                  setShipping(value);
                }}
                value={shipping ? "yes" : "No"}
              >
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
              </Select>
            </div>
            <div className="d-flex flex-wrap">
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleupdate}>
                  Update Product
                </button>
              </div>
              <div className="mb-3">
                <button className="btn btn-danger" onClick={handleDelete}>
                  Delete Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default UpdateProduct;
