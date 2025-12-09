import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = "http://localhost:3000/data";

  async function getProducts() {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.get(API_URL);
      setProducts(res.data);
    } catch (err) {
      setError("Error al cargar productos.");
    } finally {
      setIsLoading(false);
    }
  }

  async function getProductById(id) {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${API_URL}/${id}`);
      return res.data;
    } catch (err) {
      if (err.response?.status === 404) {
        setError("Producto no encontrado.");
      } else {
        setError("Error al obtener el producto.");
      }
      return null;
    } finally {
      setIsLoading(false);
    }
  }

  async function addProduct(newProduct) {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.post(API_URL, newProduct);
      setProducts((prev) => [...prev, res.data]);
      return res.data;
    } catch (err) {
      setError("Error al añadir producto.");
    } finally {
      setIsLoading(false);
    }
  }

  async function updateProduct(id, updatedProduct) {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.put(`${API_URL}/${id}`, updatedProduct);
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? res.data : p))
      );
      return res.data;
    } catch (err) {
      if (err.response?.status === 404) {
        setError("Producto no encontrado al modificar.");
      } else {
        setError("Error al modificar producto.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteProduct(id) {
    setIsLoading(true);
    setError(null);
    try {
      await axios.delete(`${API_URL}/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      if (err.response?.status === 404) {
        setError("Producto ya no existe.");
      } else {
        setError("Error al eliminar producto.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        products,
        isLoading,
        error,
        getProducts,
        getProductById,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductsContext);
}