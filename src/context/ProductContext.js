import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import axios from "axios";
import { API } from "../helpers/const";
import { useLocation } from "react-router-dom";

const productContext = createContext();
export const useProduct = () => useContext(productContext);

const initialState = {
  product: [],
  oneProduct: {},
  error: null,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PRODUCT":
      return { ...state, product: action.payload };
    case "GET_ONE_PRODUCT":
      return { ...state, oneProduct: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

const ProductContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  let location = useLocation();

  async function readProduct() {
    try {
      let { data } = await axios(API);
      dispatch({
        type: "GET_PRODUCT",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error.message,
      });
    } finally {
      dispatch({
        type: "SET_LOADING",
        payload: false,
      });
    }
  }

  async function addProduct(newProduct) {
    try {
      await axios.post(API, newProduct);
    } catch (error) {
      console.log(error);
    }
    console.log(newProduct, "newproduct");
  }

  async function getOneProduct(id) {
    try {
      let { data } = await axios(`${API}/${id}`);
      dispatch({
        type: "GET_ONE_PRODUCT",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteProduct(id) {
    try {
      await axios.delete(`${API}/${id}`);
      readProduct();
    } catch (error) {
      console.log(error);
    }
  }

  //! Pagination
  let [page, setPage] = useState(1);
  let itemPerPage = 3;
  let count = Math.ceil(state.product.length / itemPerPage);

  function handlePage() {
    let start = (page - 1) * itemPerPage;
    let end = start + itemPerPage;
    return state.product.slice(start, end);
  }
  //! Pagination

  //! SEARCH
  function searchProduct(value) {
    if (value === "") {
      readProduct();
    }
    let result = state.product.filter((item) =>
      item.title.toLowerCase().includes(value.toLowerCase())
    );
    dispatch({
      type: "GET_PRODUCT",
      payload: result,
    });
  }
  //! SEARCH

  //! SORT PRICE
  const [price, setPrice] = useState("all");
  function sortPrice(value) {
    setPrice(value);
    if (value === "all") {
      readProduct();
    } else if (value === "max") {
      let max = state.product.sort((a, b) => b.price - a.price);
      dispatch({
        type: "GET_PRODUCT",
        payload: max,
      });
    } else if (value === "min") {
      let min = state.product.sort((a, b) => a.price - b.price);
      dispatch({
        type: "GET_PRODUCT",
        payload: min,
      });
    }
  }
  //! SORT PRICE

  //! FILTERPRODUCT
  function filterProduct(category) {
    if (location.pathname === "/iphone") {
      let iphone = state.product.filter(
        (item) => item.category.toLowerCase() === category.toLowerCase()
      );
      console.log(state.product);

      dispatch({
        type: "GET_PRODUCT",
        payload: iphone,
      });
    }
  }
  console.log(location.pathname, "location path");
  //! FILTERPRODUCT

  const values = {
    addProduct,
    readProduct,
    getOneProduct,
    product: state.product,
    oneProduct: state.oneProduct,
    handlePage,
    count,
    setPage,
    deleteProduct,
    loading: state.loading,
    error: state.error,
    searchProduct,
    sortPrice,
    price,
    filterProduct,
  };
  return (
    <productContext.Provider value={values}>{children}</productContext.Provider>
  );
};

export default ProductContext;
