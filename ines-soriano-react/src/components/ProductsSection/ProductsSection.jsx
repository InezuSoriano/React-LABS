import ProductCard from "../ProductCard/ProductCard.jsx";

function normalize(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

function ProductSection({ products, filterText, onAddToCart, onBuyNow }) {
  const normFilter = normalize(filterText);

  const filtered = products.filter((p) =>
    normalize(p.title).includes(normFilter)
  );

  if (filtered.length === 0) {
    return <p>No hay productos que coincidan con “{filterText}”.</p>;
  }

  return (
    <section aria-label="Listado de productos">
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
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ProductSection;
