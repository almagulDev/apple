import React, { useEffect } from "react";
import scss from "./DetailsPage.module.scss";
import { useProduct } from "../context/ProductContext";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

const DetailsPage = () => {
  const { getOneProduct, oneProduct } = useProduct();
  const { addProductToCart, checkProductInCart } = useCart();

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getOneProduct(id);
  }, []);

  return (
    <div className={scss.details}>
      <div className={scss.content}>
        {oneProduct ? (
          <Card sx={{ maxWidth: "70%", borderRadius: "20px" }}>
            <CardActionArea sx={{ height: 500, display: "flex", p: 2 }}>
              <CardMedia
                sx={{ width: 500, objectFit: "contain" }}
                component="img"
                height="280"
                image={oneProduct.image}
                alt={oneProduct.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h3" component="div">
                  {oneProduct.title}
                </Typography>
                <Typography
                  variant="body2"
                  component="div"
                  sx={{ color: "text.secondary", lineHeight: "27px" }}
                >
                  {oneProduct.description}
                </Typography>
                <CardContent sx={{ padding: "20px 0" }}>
                  <Typography
                    variant="h4"
                    component="div"
                    sx={{ color: "text.secondary" }}
                  >
                    {oneProduct.price}$
                  </Typography>
                </CardContent>
              </CardContent>
            </CardActionArea>
            <CardActions>
              {checkProductInCart(oneProduct._id) ? (
                <>
                  <Button disabled>Add To Bag</Button>
                  <Button onClick={() => navigate("/list")}>
                    Continue shipping
                  </Button>
                </>
              ) : (
                <Button onClick={() => addProductToCart(oneProduct)}>
                  Add To Bag
                </Button>
              )}
            </CardActions>
          </Card>
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
    </div>
  );
};

export default DetailsPage;
