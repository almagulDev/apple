import {
  Box,
  Button,
  Card,
  CardMedia,
  Container,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React from "react";
import { useCart } from "../../context/CartContext";
import scss from "./CartTable.module.scss";

const CartTable = ({ cart }) => {
  const { deleteProductFromCart, changeProductCount } = useCart();

  return (
    <div>
      <Container>
        <div className={scss.bagContent}>
          <h1>Review your bag.</h1>
          <p>Free delivery and free returns.</p>
          <div className={scss.content}>
            {cart.products.map((el, index) => (
              <Card
                key={index}
                sx={{
                  display: "flex",
                  width: "570px",
                  justifyContent: "space-between",
                  margin: "auto",
                  marginBlock: "30px",
                }}
              >
                <Box
                  sx={{
                    m: 3,
                  }}
                >
                  <Typography component="div" variant="h5" textAlign="center">
                    {el.item.title}
                    <br />
                  </Typography>
                  <CardMedia
                    image={el.item.image}
                    component="img"
                    sx={{
                      width: "100%",
                      maxWidth: "250px",
                      objectFit: "cover",
                      height: "220px",
                    }}
                    alt="Product-Image"
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "10px",
                    m: 3,
                  }}
                >
                  <Typography sx={{ fontSize: "25px" }}>
                    {el.item.price}$
                  </Typography>
                  <Select
                    onChange={(e) =>
                      changeProductCount(e.target.value, el.item._id)
                    }
                    labelId="custom-select-label"
                    id="custom-select"
                    sx={{ width: "150px" }}
                    value={el.count}
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={5}>6</MenuItem>
                  </Select>
                  <Box>
                    <Typography>SubPrice: {el.subPrice}$</Typography>
                  </Box>
                  <Button
                    onClick={() => deleteProductFromCart(el.item._id)}
                    variant="contained"
                    size="medium"
                    sx={{ m: "5 0", marginTop: "10px" }}
                  >
                    Remove
                  </Button>
                </Box>
              </Card>
            ))}
          </div>
          <Box className="bag_total-label">
            <Typography
              sx={{
                display: "flex",
                fontWeight: 600,
                fontSize: "24px",
                color: "1d1d1f",
                mt: 1,
                justifyContent: "space-between",
              }}
              variant="h6"
              component="div"
            >
              TotalPrice: {cart.totalPrice}
              <Button variant="contained" sx={{ height: "20px", p: 2 }}>
                BUY NOW
              </Button>
            </Typography>
          </Box>
        </div>
      </Container>
    </div>
  );
};

export default CartTable;
