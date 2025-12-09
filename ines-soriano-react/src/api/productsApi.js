import axios from "axios";

const API_URL = "http://localhost:3000/data";

export async function getProductsApi() {
  try {
    const res = await axios.get(API_URL);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function getProductByIdApi(id) {
  try {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function addProductApi(newProduct) {
  try {
    const res = await axios.post(API_URL, newProduct);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function updateProductApi({ id, updatedProduct }) {
  try {
    const res = await axios.put(`${API_URL}/${id}`, updatedProduct);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteProductApi(id) {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  } catch (error) {
    throw error;
  }
}