import { useState, useEffect } from "react";
import axios from "axios";
import { url } from "../pages/Auth/auth";

export default function useCategory() {
  const [categories, setCategories] = useState();
  //Obtener Categoria

  const Getcategorias = async () => {
    try {
      const res = await axios.get(`${url}/api/v1/category/get-category`);
      if (res.data.success) {
        setCategories(res.data.category);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    Getcategorias();
  }, []);
  return categories;
}
