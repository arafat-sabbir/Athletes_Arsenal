import App from "@/App";
import MainLayout from "@/layout/MainLayout";
import Login from "@/pages/login/Login";
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
        path:"products",
        element: <Products />
      }
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
