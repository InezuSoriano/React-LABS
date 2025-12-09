function ProductCard({
  product,
  onAddToCart,
  onBuyNow,
  onOpenDetail,
  isAuthenticated,
  isAdmin,
  onEdit,
  onDelete,
}) {
  const { title, description, price, image, category, rating } = product;

  const handleCardClick = () => {
    if (onOpenDetail) onOpenDetail();
  };

  const handleAddToCart = (event) => {
    event.stopPropagation();
    onAddToCart(product);
  };

  const handleBuyNow = (event) => {
    event.stopPropagation();
    onBuyNow(product);
  };

  const handleEdit = (event) => {
    event.stopPropagation();
    if (onEdit) onEdit(product);
  };

  const handleDelete = (event) => {
    event.stopPropagation();
    if (onDelete) onDelete(product.id);
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
        cursor: "pointer",
      }}
    >
      <img
        src={image}
        alt={title}
        loading="lazy"
        style={{
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
        }}
      >
        <h3 style={{ margin: 0 }}>{title}</h3>
        <p>{category}</p>
        <p>{description}</p>
        <p style={{ fontWeight: 700 }}>{price} €</p>

        {rating && (
          <p>Valoración: {rating.rate} · {rating.count} reseñas</p>
        )}

        {isAuthenticated && (
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button onClick={handleAddToCart}>Añadir a la cesta</button>
            <button onClick={handleBuyNow}>Comprar</button>
          </div>
        )}

        {!isAuthenticated && <p>Inicia sesión para comprar.</p>}

        {isAdmin && (
          <div style={{ marginTop: "0.75rem", display: "flex", gap: "0.5rem" }}>
            <button onClick={handleEdit}>Editar</button>
            <button onClick={handleDelete}>Eliminar</button>
          </div>
        )}
      </div>
    </article>
  );
}

export default ProductCard;