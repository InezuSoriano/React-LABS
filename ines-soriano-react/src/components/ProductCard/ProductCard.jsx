function ProductCard({ product }) {
  const { title, description, price, image, category, rating } = product;

  return (
    <article
      style={{
        border: "1px solid #ddd",
        borderRadius: 8,
        overflow: "hidden"
      }}
    >
      <img
        src={image}
        alt={title}
        loading="lazy"
        style={{ display: "block", width: "100%", height: 160, objectFit: "cover" }}
      />
      <div style={{ padding: "0.75rem" }}>
        <h3 style={{ margin: "0 0 0.25rem" }}>{title}</h3>
        <p style={{ margin: "0 0 0.25rem", fontSize: "0.9rem", opacity: 0.8 }}>
          {category}
        </p>
        <p style={{ margin: "0 0 0.5rem", opacity: 0.85 }}>{description}</p>
        <p style={{ margin: 0, fontWeight: 700 }}>{price.toFixed(2)} €</p>
        {rating && (
          <p style={{ margin: "0.25rem 0 0", fontSize: "0.9rem", opacity: 0.85 }}>
            Valoración: {rating.rate} · {rating.count} reseñas
          </p>
        )}
      </div>
    </article>
  );
}

export default ProductCard;
