import { createSlice } from "@reduxjs/toolkit";
import {
  getProductsThunk,
  getProductByIdThunk,
  addProductThunk,
  updateProductThunk,
  deleteProductThunk,
} from "./productsThunks.js";

const initialState = {
  products: [],
  selectedProduct: null,
  isLoading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearSelectedProduct(state) {
      state.selectedProduct = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProductsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(getProductsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Error al cargar productos.";
      });

    builder
      .addCase(getProductByIdThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProductByIdThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(getProductByIdThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.selectedProduct = null;
        state.error = action.payload || "Error al cargar el producto.";
      });

    builder
      .addCase(addProductThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addProductThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products.push(action.payload);
      })
      .addCase(addProductThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Error al añadir producto.";
      });

    builder
      .addCase(updateProductThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProductThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        const updated = action.payload;
        state.products = state.products.map((p) =>
          p.id === updated.id ? updated : p
        );
        if (state.selectedProduct?.id === updated.id) {
          state.selectedProduct = updated;
        }
      })
      .addCase(updateProductThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Error al modificar producto.";
      });

    builder
      .addCase(deleteProductThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteProductThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        const id = action.payload;
        state.products = state.products.filter((p) => p.id !== id);
        if (state.selectedProduct?.id === id) {
          state.selectedProduct = null;
        }
      })
      .addCase(deleteProductThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Error al eliminar producto.";
      });
  },
});

export const { clearSelectedProduct } = productsSlice.actions;

export const selectProducts = (state) => state.products.products;
export const selectProductsLoading = (state) => state.products.isLoading;
export const selectProductsError = (state) => state.products.error;
export const selectSelectedProduct = (state) =>
  state.products.selectedProduct;

export default productsSlice.reducer;