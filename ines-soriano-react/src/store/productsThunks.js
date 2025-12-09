import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getProductsApi,
  getProductByIdApi,
  addProductApi,
  updateProductApi,
  deleteProductApi,
} from "../api/productsApi.js";

export const getProductsThunk = createAsyncThunk(
  "products/getProducts",
  async (_, thunkAPI) => {
    try {
      const data = await getProductsApi();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Error al cargar productos.");
    }
  }
);

export const getProductByIdThunk = createAsyncThunk(
  "products/getProductById",
  async (id, thunkAPI) => {
    try {
      const product = await getProductByIdApi(id);
      return product;
    } catch (error) {
      if (error.response?.status === 404) {
        return thunkAPI.rejectWithValue("Producto no encontrado.");
      }
      return thunkAPI.rejectWithValue("Error al cargar el producto.");
    }
  }
);

export const addProductThunk = createAsyncThunk(
  "products/addProduct",
  async (newProduct, thunkAPI) => {
    try {
      const created = await addProductApi(newProduct);
      return created;
    } catch (error) {
      return thunkAPI.rejectWithValue("Error al añadir producto.");
    }
  }
);

export const updateProductThunk = createAsyncThunk(
  "products/updateProduct",
  async ({ id, updatedProduct }, thunkAPI) => {
    try {
      const updated = await updateProductApi({ id, updatedProduct });
      return updated;
    } catch (error) {
      if (error.response?.status === 404) {
        return thunkAPI.rejectWithValue("Producto no encontrado al modificar.");
      }
      return thunkAPI.rejectWithValue("Error al modificar producto.");
    }
  }
);

export const deleteProductThunk = createAsyncThunk(
  "products/deleteProduct",
  async (id, thunkAPI) => {
    try {
      const deletedId = await deleteProductApi(id);
      return deletedId;
    } catch (error) {
      if (error.response?.status === 404) {
        return thunkAPI.rejectWithValue("Producto ya no existe.");
      }
      return thunkAPI.rejectWithValue("Error al eliminar producto.");
    }
  }
);