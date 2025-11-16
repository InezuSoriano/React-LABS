function ProductCard({ product, onAddToCart, onBuyNow }) {
  const { title, description, price, image, category, rating } = product;

  return (
    <article
      style={{
        border: "1px solid #ddd",
        borderRadius: 8,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <img
        src={image}
        alt={title}
        loading="lazy"
        style={{ display: "block", width: "100%", height: 160, objectFit: "cover" }}
      />
      <div style={{ padding: "0.75rem", display: "flex", flexDirection: "column", gap: "0.35rem", flex: 1 }}>
        <h3 style={{ margin: 0 }}>{title}</h3>
        <p style={{ margin: 0, fontSize: "0.9rem", opacity: 0.8 }}>{category}</p>
        <p style={{ margin: 0, opacity: 0.85 }}>{description}</p>
        <p style={{ margin: 0, fontWeight: 700 }}>{price.toFixed(2)} €</p>
        {rating && (
          <p style={{ margin: 0, fontSize: "0.9rem", opacity: 0.85 }}>
            Valoración: {rating.rate} · {rating.count} reseñas
          </p>
        )}
        <div
          style={{
            marginTop: "0.5rem",
            display: "flex",
            gap: "0.5rem",
            justifyContent: "space-between",
          }}
        >
          <button type="button" onClick={() => onAddToCart(product)}>
            Añadir a la cesta
          </button>
          <button type="button" onClick={() => onBuyNow(product)}>
            Comprar
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
