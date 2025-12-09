import { useNavigate, useLoaderData, useOutletContext } from "react-router-dom";

function ProductDetailPage() {
  const navigate = useNavigate();
  const { user, onAddToCart } = useOutletContext();
  const product = useLoaderData();

  if (!product) {
    return (
      <div className="container">
        <p>Producto no encontrado.</p>
        <button
          type="button"
          onClick={() => navigate("/")}
          style={{ marginTop: "1rem" }}
        >
          Volver a la tienda
        </button>
      </div>
    );
  }

  const { title, description, price, image, category, rating } = product;

  const handleAddToCart = () => {
    onAddToCart(product);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="container">
      <button
        type="button"
        onClick={handleBack}
        style={{ margin: "1rem 0" }}
      >
        ← Volver
      </button>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 1fr)",
          gap: "2rem",
        }}
      >
        <div>
          {image && (
            <img
              src={image}
              alt={title}
              style={{
                width: "100%",
                maxHeight: 400,
                objectFit: "cover",
                borderRadius: 8,
              }}
            />
          )}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
          }}
        >
          <h1 style={{ margin: 0 }}>{title}</h1>

          <p style={{ margin: 0, fontSize: "0.95rem", opacity: 0.8 }}>
            {category}
          </p>

          <p style={{ margin: 0 }}>{description}</p>

          <p
            style={{
              margin: 0,
              fontWeight: 700,
              fontSize: "1.2rem",
            }}
          >
            {price} €
          </p>

          {rating && (
            <p style={{ margin: 0, fontSize: "0.9rem", opacity: 0.85 }}>
              Valoración: {rating.rate} · {rating.count} reseñas
            </p>
          )}

          {user ? (
            <button
              type="button"
              onClick={handleAddToCart}
              style={{ marginTop: "1rem" }}
            >
              Añadir a la cesta
            </button>
          ) : (
            <p style={{ marginTop: "1rem", opacity: 0.8 }}>
              Inicia sesión para poder añadir este producto a tu cesta.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

export default ProductDetailPage;