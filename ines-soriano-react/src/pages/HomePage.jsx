import { useOutletContext } from "react-router-dom";
import Banner from "../components/Banner/Banner.jsx";
import ProductsSection from "../components/ProductsSection/ProductsSection.jsx";
import { useProducts } from "../context/ProductsContext.jsx";

function HomePage() {
  const {
    user,
    isAuthenticated,
    isAdmin,
    filterText,
    onAddToCart,
    onBuyNow,
  } = useOutletContext();

  const { products, isLoading, error } = useProducts();

  if (isLoading) {
    return <div className="container">Cargando productos...</div>;
  }

  if (error) {
    return <div className="container">{error}</div>;
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