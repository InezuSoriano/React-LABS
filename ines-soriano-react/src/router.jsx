import { createBrowserRouter } from "react-router-dom";
import axios from "axios";

import App from "./App.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import ProductDetailPage from "./pages/ProductDetailPage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const API_URL = "http://localhost:3000/data";

async function productDetailLoader({ params }) {
  try {
    const res = await axios.get(`${API_URL}/${params.id}`);
    return res.data;
  } catch (err) {
    if (err.response?.status === 404) {
      throw new Response("Producto no encontrado", {
        status: 404,
        statusText: "Producto no encontrado",
      });
    }

    throw new Response("Error al cargar el producto", {
      status: 500,
      statusText: "Error al cargar el producto",
    });
  }
}

const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/cart",
            element: <CartPage />,
          },
          {
            path: "/product/:id",
            element: <ProductDetailPage />,
            loader: productDetailLoader,
          },
        ],
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

export default router;