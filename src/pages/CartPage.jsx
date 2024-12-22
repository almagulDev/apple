import React from "react";
import { useCart } from "../context/CartContext";
import CartTable from "../components/cart/CartTable";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const CartPage = () => {
  const { cart } = useCart();

  if (!cart || !cart.products) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      {cart.products.length > 0 ? (
        <CartTable cart={cart} />
      ) : (
        <h2>Your bag is empty.</h2>
      )}
    </div>
  );
};

export default CartPage;
