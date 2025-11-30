function ProductCard({
  product,
  onAddToCart,
  onBuyNow,
  onOpenDetail,
  isAuthenticated,
}) {
  const { title, description, price, image, category, rating } = product;

  const handleCardClick = () => {
    if (onOpenDetail) {
      onOpenDetail();
    }
  };

  const handleAddToCart = (event) => {
    event.stopPropagation();
    onAddToCart(product);
  };

  const handleBuyNow = (event) => {
    event.stopPropagation();
    onBuyNow(product);
  };

  return (
    <article
      onClick={handleCardClick}
      style={{
        border: "1px solid #ddd",
        borderRadius: 8,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        cursor: onOpenDetail ? "pointer" : "default",
      }}
    >
      <img
        src={image}
        alt={title}
        loading="lazy"
        style={{
          display: "block",
          width: "100%",
          height: 160,
          objectFit: "cover",
        }}
      />
      <div
        style={{
          padding: "0.75rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.35rem",
          flex: 1,
        }}
      >
        <h3 style={{ margin: 0 }}>{title}</h3>
        <p style={{ margin: 0, fontSize: "0.9rem", opacity: 0.8 }}>
          {category}
        </p>
        <p style={{ margin: 0, opacity: 0.85 }}>{description}</p>
        <p style={{ margin: 0, fontWeight: 700 }}>
          {price.toFixed(2)} €
        </p>
        {rating && (
          <p style={{ margin: 0, fontSize: "0.9rem", opacity: 0.85 }}>
            Valoración: {rating.rate} · {rating.count} reseñas
          </p>
        )}

        {isAuthenticated ? (
          <div
            style={{
              marginTop: "0.5rem",
              display: "flex",
              gap: "0.5rem",
              justifyContent: "space-between",
            }}
          >
            <button type="button" onClick={handleAddToCart}>
              Añadir a la cesta
            </button>
            <button type="button" onClick={handleBuyNow}>
              Comprar
            </button>
          </div>
        ) : (
          <p
            style={{
              marginTop: "0.5rem",
              fontSize: "0.85rem",
              opacity: 0.8,
            }}
          >
            Inicia sesión para comprar.
          </p>
        )}
      </div>
    </article>
  );
}

export default ProductCard;