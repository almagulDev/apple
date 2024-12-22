import React, { useEffect, useState } from "react";
import scss from "./ProductList.module.scss";
import { useProduct } from "../../context/ProductContext";
import ProductCard from "./ProductCard";
import ProductPagination from "./ProductPagination";
import LoaderProduct from "./LoaderProduct";
import {
  Alert,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

const ProductList = () => {
  const {
    readProduct,
    product,
    handlePage,
    error,
    loading,
    count,
    sortPrice,
    price,
    filterProduct,
  } = useProduct();

  const [loader, setLoader] = useState(true);
  useEffect(() => {
    readProduct();
    setLoader(loading);
    product.map((el) => filterProduct(el.category));
  }, []);

  if (error) {
    return <div>Error Loading Products: {error}</div>;
  }

  return (
    <div className={scss.list}>
      <div className="container">
        <Box sx={{ minWidth: 120, marginBottom: "10px" }}>
          <FormControl>
            <InputLabel htmlFor="all" id="demo-simple-select-label">
              Price
            </InputLabel>
            <Select
              onChange={(e) => sortPrice(e.target.value)}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={price}
              label="price"
              name="all"
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="max">Expensive</MenuItem>
              <MenuItem value="min">Cheap</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <div className={scss.content}>
          {product.length > 0 ? (
            handlePage().map((item, index) => (
              <ProductCard item={item} key={index} />
            ))
          ) : (
            // <div>No Product Found</div>
            <LoaderProduct />
          )}
        </div>
        {count > 1 && <ProductPagination />}
      </div>
    </div>
  );
};

export default ProductList;
