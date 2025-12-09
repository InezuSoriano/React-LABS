import { useState } from "react";
import "./Modal.css";

function AddProductModal({ onClose, onSubmit }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      ...form,
      price: Number(form.price),
      rating: { rate: 0, count: 0 },
    });
    onClose();
  }

  function handleOverlayClick(e) {
    if (e.target.classList.contains("modal-overlay")) {
      onClose();
    }
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal">
        <h2>Añadir nuevo producto</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="title"
            placeholder="Título"
            value={form.title}
            onChange={handleChange}
            required
          />

          <input
            name="price"
            placeholder="Precio"
            type="number"
            value={form.price}
            onChange={handleChange}
            required
          />

          <input
            name="category"
            placeholder="Categoría"
            value={form.category}
            onChange={handleChange}
            required
          />

          <input
            name="image"
            placeholder="URL imagen"
            value={form.image}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Descripción"
            value={form.description}
            onChange={handleChange}
            required
          />

          <button type="submit">Crear</button>
        </form>

        <button className="modal-close" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}

export default AddProductModal;