import { useOutletContext } from "react-router-dom";
import data from "../fakeapi/data.json";
import Banner from "../components/Banner/Banner.jsx";
import ProductsSection from "../components/ProductsSection/ProductsSection.jsx";

function HomePage() {
  const {
    user,
    filterText,
    onAddToCart,
    onBuyNow,
  } = useOutletContext();
  const isAuthenticated = Boolean(user);
  return (
    <div className="container">
      <Banner user={user} />

      <ProductsSection
        products={data}
        filterText={filterText}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
        isAuthenticated={isAuthenticated}
      />
    </div>
  );
}

export default HomePage;
