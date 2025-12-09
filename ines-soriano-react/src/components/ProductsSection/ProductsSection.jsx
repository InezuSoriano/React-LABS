import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import ProductCard from "../ProductCard/ProductCard.jsx";
import AddProductModal from "../modals/AddProductModal.jsx";
import EditProductModal from "../modals/EditProductModal.jsx";
import {
  addProductThunk,
  updateProductThunk,
  deleteProductThunk,
} from "../../store/productsThunks.js";

function normalize(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

function ProductsSection({
  products,
  filterText,
  onAddToCart,
  onBuyNow,
  isAuthenticated,
  isAdmin,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [modalAddOpen, setModalAddOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const normFilter = normalize(filterText || "");

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
    dispatch(deleteProductThunk(id));
  }

  function handleAddProduct(newProduct) {
    dispatch(addProductThunk(newProduct));
  }

  function handleUpdateProduct(id, updatedProduct) {
    dispatch(updateProductThunk({ id, updatedProduct }));
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
          onSubmit={handleAddProduct}
        />
      )}

      {modalEditOpen && editingProduct && (
        <EditProductModal
          product={editingProduct}
          onClose={() => setModalEditOpen(false)}
          onSubmit={handleUpdateProduct}
        />
      )}
    </section>
  );
}

export default ProductsSection;