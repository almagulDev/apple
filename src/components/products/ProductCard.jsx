import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../../context/ProductContext";
import { ADMIN } from "../../helpers/const";
import { useAuth } from "../../context/AuthContext";

export default function ProductCard({ item }) {
  const { user } = useAuth();
  const { deleteProduct } = useProduct();
  const navigate = useNavigate();

  return (
    <div>
      <Card
        sx={{
          maxWidth: 450,
          textAlign: "center",
          width: "100%",
          borderRadius: "10px",
        }}
      >
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.title}
          </Typography>
        </CardContent>
        <img
          onClick={() => navigate(`/details/${item._id}`)}
          style={{ maxWidth: "400px", width: "100%" }}
          src={item.image}
          alt="image"
        />
        <CardContent>
          <Typography
            variant="body1"
            sx={{ color: "text.secondary", fontSize: "23px" }}
          >
            {item.price}$
          </Typography>
        </CardContent>
        {user
          ? ADMIN.map((el) =>
              el.email === user.email ? (
                <CardActions>
                  <Button
                    onClick={() => deleteProduct(item._id)}
                    variant="contained"
                    size="small"
                  >
                    Delete
                  </Button>
                </CardActions>
              ) : (
                ""
              )
            )
          : ""}
      </Card>
    </div>
  );
}
