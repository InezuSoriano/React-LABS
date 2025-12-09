import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard.jsx";
import AddProductModal from "../modals/AddProductModal.jsx";
import EditProductModal from "../modals/EditProductModal.jsx";
import { useProducts } from "../../context/ProductsContext.jsx";

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
  isAdmin,
}) {
  const navigate = useNavigate();
  const { addProduct, updateProduct, deleteProduct } = useProducts();

  const [modalAddOpen, setModalAddOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

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

  function handleEdit(product) {
    setEditingProduct(product);
    setModalEditOpen(true);
  }

  function handleDelete(id) {
    deleteProduct(id);
  }

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
                isAdmin={isAdmin}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </li>
          ))}
        </ul>

        {isAdmin && (
          <button
            style={{
              marginTop: "2rem",
              background: "red",
              color: "white",
              padding: "1rem",
            }}
            onClick={() => setModalAddOpen(true)}
          >
            Añadir nuevo producto
          </button>
        )}
      </div>

      {modalAddOpen && (
        <AddProductModal
          onClose={() => setModalAddOpen(false)}
          onSubmit={addProduct}
        />
      )}

      {modalEditOpen && editingProduct && (
        <EditProductModal
          product={editingProduct}
          onClose={() => setModalEditOpen(false)}
          onSubmit={updateProduct}
        />
      )}
    </section>
  );
}

export default ProductSection;