import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Banner from "../components/Banner/Banner.jsx";
import ProductsSection from "../components/ProductsSection/ProductsSection.jsx";
import {
  selectProducts,
  selectProductsLoading,
  selectProductsError,
} from "../store/productsSlice.js";
import { getProductsThunk } from "../store/productsThunks.js";

function HomePage() {
  const {
    user,
    filterText,
    onAddToCart,
    onBuyNow,
  } = useOutletContext();

  const dispatch = useDispatch();

  const products = useSelector(selectProducts);
  const isLoading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);

  const isAuthenticated = Boolean(user);
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    dispatch(getProductsThunk());
  }, [dispatch]);

  if (isLoading && products.length === 0) {
    return (
      <div className="container">
        <p>Cargando productos...</p>
      </div>
    );
  }

  if (error && products.length === 0) {
    return (
      <div className="container">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container">
      <Banner user={user} />

      <ProductsSection
        products={products}
        filterText={filterText}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
        isAuthenticated={isAuthenticated}
        isAdmin={isAdmin}
      />
    </div>
  );
}

export default HomePage;