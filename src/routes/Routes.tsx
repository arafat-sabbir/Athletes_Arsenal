import App from "@/App";
import MainLayout from "@/layout/MainLayout";
import Cart from "@/pages/Cart/Cart";
import Login from "@/pages/login/Login";
import ProductDetail from "@/pages/ProductDetail/ProductDetail";
import Products from "@/pages/Products/Products";
import Register from "@/pages/Register/Register";
import { createBrowserRouter } from "react-router-dom";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "products",
        element: <Products />,
      },
      // {
      //   path: "/add-product",
      //   element: <AddProduct />,
      // },
      {
        path: "/product/:id",
        element: <ProductDetail />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
