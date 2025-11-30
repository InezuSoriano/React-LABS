import { useNavigate } from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard.jsx";

function normalize(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

function ProductSection({
  products,
  filterText,
  onAddToCart,
  onBuyNow,
  isAuthenticated,
}) {
  const navigate = useNavigate();

  const normFilter = normalize(filterText);

  const filtered = products.filter((p) =>
    normalize(p.title).includes(normFilter)
  );

  if (filtered.length === 0) {
    return <p>No hay productos que coincidan con “{filterText}”.</p>;
  }

  const handleOpenDetail = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <section aria-label="Listado de productos">
      <div className="products-container">
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "1rem",
          }}
        >
          {filtered.map((p) => (
            <li key={p.id}>
              <ProductCard
                product={p}
                onAddToCart={onAddToCart}
                onBuyNow={onBuyNow}
                onOpenDetail={() => handleOpenDetail(p.id)}
                isAuthenticated={isAuthenticated}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default ProductSection;