import React, { useEffect } from "react";
import scss from "./Header.module.scss";
import AppleIcon from "@mui/icons-material/Apple";
import WorkIcon from "@mui/icons-material/Work";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import AdminPanel from "../../admin/AdminPanel";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import {
  Avatar,
  Badge,
  Box,
  Card,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { useProduct } from "../../../context/ProductContext";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import { useAuth } from "../../../context/AuthContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ADMIN } from "../../../helpers/const";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  fontSize: "13.5px",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
  },
}));

const Header = () => {
  const { cart } = useCart();
  const { searchProduct, filterProduct } = useProduct();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    // logout();
    console.log(anchorEl, "anchorEl");
  };
  //!2
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  //!2

  return (
    <header className={scss.header}>
      <div className="container">
        <div className={scss.content}>
          <NavLink to="/">
            <AppleIcon className={scss.logo} />
          </NavLink>
          <NavLink to="/list">
            <p>Store</p>
          </NavLink>
          <NavLink to="/mac">
            <p>Mac</p>
          </NavLink>
          <NavLink to="/ipad">
            <p>iPad</p>
          </NavLink>
          <NavLink to="/iphone" onClick={() => filterProduct("iphone")}>
            <p>iPhone</p>
          </NavLink>
          <NavLink to="/watch">
            <p>Watch</p>
          </NavLink>
          <NavLink to="/vision">
            <p>Vision</p>
          </NavLink>
          <NavLink to="/airpods">
            <p>AirPods</p>
          </NavLink>
          <NavLink to="/tv">
            <p>TV & Home</p>
          </NavLink>
          <NavLink to="/entertainment">
            <p>Entertainment</p>
          </NavLink>
          <NavLink to="/accessories">
            <p>Accessories</p>
          </NavLink>
          <NavLink to="/support">
            <p>Support</p>
          </NavLink>
          {user
            ? ADMIN.map((el) => (el.email === user.email ? <AdminPanel /> : ""))
            : ""}
          <Search
            style={{
              backgroundColor: "rgba(235, 230, 230, 0.71)",
            }}
          >
            <SearchIconWrapper>
              <SearchIcon className={scss.search_icon} />
            </SearchIconWrapper>
            <StyledInputBase
              onChange={(e) => searchProduct(e.target.value)}
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Badge badgeContent={cart.products.length} color="primary">
            <WorkIcon onClick={() => navigate(`/cart`)} className={scss.bag} />
          </Badge>
          {user ? (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <Tooltip title={user.displayName}>
                  <Avatar alt={user.displayName} src={user.photoURL} />
                </Tooltip>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
              >
                <MenuItem>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <Typography>{user.email}</Typography>
                    <Avatar
                      alt={user.displayName}
                      src={user.photoURL}
                      sx={{ width: "30%", height: "30%" }}
                    />
                    <Typography variant="h6">{`Hi, ${user.displayName}`}</Typography>
                    <div onClick={() => logout()}>
                      <Card
                        sx={{
                          display: "flex",
                          gap: "6px",
                          padding: "3px 17px",
                          "&:hover": {
                            backgroundColor: "red",
                            color: "white",
                          },
                        }}
                      >
                        <ArrowBackIcon />
                        Logout
                      </Card>
                    </div>
                  </Box>
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
              >
                <NavLink to="/login">
                  <MenuItem onClick={handleClose}>Sign in</MenuItem>
                </NavLink>
                <NavLink to="/register">
                  <MenuItem onClick={handleClose}>Sign up</MenuItem>
                </NavLink>
              </Menu>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
