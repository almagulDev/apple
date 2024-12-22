import React from "react";
import AdminPage from "../pages/AdminPage";
import EditPage from "../pages/EditPage";
import { Route, Routes } from "react-router-dom";
import ProductList from "../components/products/ProductList";
import DetailsPage from "../pages/DetailsPage";
import CartPage from "../pages/CartPage";
import Register from "../components/registrations/Register";
import Login from "../components/registrations/Login";
import { ADMIN } from "../helpers/const";
import { useAuth } from "../context/AuthContext";

const ADMIN_ROUTES = [
  {
    link: "/admin",
    element: <AdminPage />,
    id: 1,
  },
  {
    link: "/edit/:id",
    element: <EditPage />,
    id: 2,
  },
];

const PUBLIC_ROUTES = [
  {
    link: "/list",
    element: <ProductList />,
    id: 1,
  },
  {
    link: "/details/:id",
    element: <DetailsPage />,
    id: 2,
  },
  {
    link: "/cart",
    element: <CartPage />,
    id: 3,
  },
  {
    link: "/mac",
    element: <ProductList />,
    id: 4,
  },
  {
    link: "/iphone",
    element: <ProductList />,
    id: 5,
  },
  {
    link: "/register",
    element: <Register />,
    id: 6,
  },
  {
    link: "/login",
    element: <Login />,
    id: 7,
  },
];

const MainRoutes = () => {
  const { user } = useAuth();
  return (
    <Routes>
      {user
        ? ADMIN.map((el) =>
            el.email === user.email
              ? ADMIN_ROUTES.map((el) => (
                  <Route path={el.link} element={el.element} key={el.id} />
                ))
              : null
          )
        : null}
      {PUBLIC_ROUTES.map((el) => (
        <Route path={el.link} element={el.element} key={el.id} />
      ))}
    </Routes>
  );
};

export default MainRoutes;
