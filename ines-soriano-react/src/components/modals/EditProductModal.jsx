import { useState } from "react";
import "./Modal.css";

function EditProductModal({ product, onClose, onSubmit }) {
  const [form, setForm] = useState({
    title: product.title ?? "",
    description: product.description ?? "",
    price: product.price ?? "",
    category: product.category ?? "",
    image: product.image ?? "",
  });

  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function validate() {
    const newErrors = {};

    if (!form.title.trim()) {
      newErrors.title = "El título es obligatorio.";
    }

    if (!form.description.trim()) {
      newErrors.description = "La descripción es obligatoria.";
    }

    if (!form.category.trim()) {
      newErrors.category = "La categoría es obligatoria.";
    }

    const priceNumber = Number(form.price);
    if (form.price === "" || form.price === null) {
      newErrors.price = "El precio es obligatorio.";
    } else if (Number.isNaN(priceNumber) || priceNumber <= 0) {
      newErrors.price = "El precio debe ser un número mayor que 0.";
    }

    if (form.image.trim()) {
      const looksLikeUrl = /^https?:\/\/.+/i.test(form.image.trim());
      if (!looksLikeUrl) {
        newErrors.image = "Introduce una URL de imagen válida (http o https).";
      }
    }

    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit(product.id, {
      ...form,
      price: Number(form.price),
      rating: product.rating,
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
        <h2>Editar producto</h2>

        <form onSubmit={handleSubmit} className="modal__form">
          <label className="modal__field">
            <span>Título</span>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              autoComplete="off"
            />
            {errors.title && (
              <p className="modal__error">{errors.title}</p>
            )}
          </label>

          <label className="modal__field">
            <span>Precio</span>
            <input
              name="price"
              type="number"
              step="0.01"
              value={form.price}
              onChange={handleChange}
            />
            {errors.price && (
              <p className="modal__error">{errors.price}</p>
            )}
          </label>

          <label className="modal__field">
            <span>Categoría</span>
            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              autoComplete="off"
            />
            {errors.category && (
              <p className="modal__error">{errors.category}</p>
            )}
          </label>

          <label className="modal__field">
            <span>URL de imagen (opcional)</span>
            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              autoComplete="off"
            />
            {errors.image && (
              <p className="modal__error">{errors.image}</p>
            )}
          </label>

          <label className="modal__field">
            <span>Descripción</span>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
            />
            {errors.description && (
              <p className="modal__error">{errors.description}</p>
            )}
          </label>

          <div className="modal__actions">
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit">
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProductModal;