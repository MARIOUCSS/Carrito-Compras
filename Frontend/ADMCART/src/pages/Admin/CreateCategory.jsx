import React, { useEffect, useState } from "react";
import Layout from "../../componets/Layout/Layout";
import AdminMenu from "../../componets/Layout/AdminMenu";
import { toast } from "react-hot-toast";
import axios from "axios";
import { url } from "../Auth/auth";
import CategoryForm from "../../componets/Form/CategoryForm";
import { Modal } from "antd";
//ojo para los modales se puede usar esto : https://ant.design/  ojo npm install antd --save
function CreateCategory() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  const handleupdateSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `${url}/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (res.data.success) {
        toast.success(`${updatedName} is update`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategories();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error Actualizando  la categoria");
    }
  };
  //delete
  const handledeleteSubmit = async (pid) => {
    try {
      const res = await axios.delete(
        `${url}/api/v1/category/delete-category/${pid}`
      );
      if (res.data.success) {
        toast.success(`${name} is deleted`);

        getAllCategories();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error Actualizando  la categoria");
    }
  };
  //obtener all categories
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${url}/api/v1/category/create-category`, {
        name,
      });
      if (res.data.success) {
        toast.success(`${res.data.category.name} is created`);
        getAllCategories();
        setName("");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error Ingresando la categoria");
    }
  };
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
  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <Layout title={"Dashboard -Create Category"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Category</h1>
            <div className="p-3 w-50">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            {/* ojo */}
            <div className="w-75">
              <table class="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((x) => (
                    <tr>
                      <td key={x._id}>{x.name}</td>
                      <td>
                        <button
                          className="btn btn-primary m-1"
                          //ojo se puede mandar otro {set;set}
                          onClick={() => {
                            setVisible(true);
                            setUpdatedName(x.name);
                            setSelected(x);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger m-1"
                          onClick={() => handledeleteSubmit(x._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              open={visible}
            >
              <CategoryForm
                handleSubmit={handleupdateSubmit}
                value={updatedName}
                setValue={setUpdatedName}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CreateCategory;
