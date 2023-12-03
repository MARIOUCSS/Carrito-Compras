import React from "react";
import { searchC } from "../../Context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { url } from "../../pages/Auth/auth";
function SearchImput() {
  const [values, setValues] = searchC();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `${url}/api/v1/product/search/${values.keyword}`
      );
      // const respro = await axios.get(
      //   `${url}/api/v1/product/product-list/${page}`
      // );
      // console.log(res);
      setValues({ ...values, results: res.data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input
          class="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          //value=""inicio con el onchange lo modifici copio lo inioodel stado u cambio el keyword
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <button class="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchImput;
