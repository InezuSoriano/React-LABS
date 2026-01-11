import { useForm } from "react-hook-form";
import "./Modal.css";

const urlPattern = /^https?:\/\/.+/i;

function EditProductModal({ product, onClose, onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      title: product?.title ?? "",
      description: product?.description ?? "",
      price: product?.price ?? "",
      category: product?.category ?? "",
      image: product?.image ?? "",
    },
  });

  const submit = (values) => {
    onSubmit(product.id, {
      ...product,
      title: values.title.trim(),
      description: values.description.trim(),
      category: values.category.trim(),
      image: values.image.trim(),
      price: Number(values.price),
      rating: product.rating,
    });

    onClose();
  };

  function handleOverlayClick(e) {
    if (e.target.classList.contains("modal-overlay")) {
      onClose();
    }
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal">
        <h2>Editar producto</h2>

        <form onSubmit={handleSubmit(submit)} className="modal__form" noValidate>
          <label className="modal__field">
            <span>Título</span>
            <input
              autoComplete="off"
              {...register("title", {
                required: "El título es obligatorio.",
                minLength: { value: 3, message: "Mínimo 3 caracteres." },
                maxLength: { value: 60, message: "Máximo 60 caracteres." },
              })}
            />
            {errors.title && <p className="modal__error">{errors.title.message}</p>}
          </label>

          <label className="modal__field">
            <span>Precio</span>
            <input
              type="number"
              step="0.01"
              {...register("price", {
                required: "El precio es obligatorio.",
                valueAsNumber: true,
                validate: (v) =>
                  Number.isFinite(v) && v > 0 ? true : "El precio debe ser mayor que 0.",
              })}
            />
            {errors.price && <p className="modal__error">{errors.price.message}</p>}
          </label>

          <label className="modal__field">
            <span>Categoría</span>
            <input
              autoComplete="off"
              {...register("category", {
                required: "La categoría es obligatoria.",
                minLength: { value: 3, message: "Mínimo 3 caracteres." },
                maxLength: { value: 30, message: "Máximo 30 caracteres." },
              })}
            />
            {errors.category && (
              <p className="modal__error">{errors.category.message}</p>
            )}
          </label>

          <label className="modal__field">
            <span>URL de imagen</span>
            <input
              autoComplete="off"
              placeholder="https://..."
              {...register("image", {
                required: "La URL de imagen es obligatoria.",
                pattern: {
                  value: urlPattern,
                  message: "Introduce una URL válida (http o https).",
                },
              })}
            />
            {errors.image && <p className="modal__error">{errors.image.message}</p>}
          </label>

          <label className="modal__field">
            <span>Descripción</span>
            <textarea
              rows={3}
              {...register("description", {
                required: "La descripción es obligatoria.",
                minLength: { value: 10, message: "Mínimo 10 caracteres." },
                maxLength: { value: 200, message: "Máximo 200 caracteres." },
              })}
            />
            {errors.description && (
              <p className="modal__error">{errors.description.message}</p>
            )}
          </label>

          <div className="modal__actions">
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" disabled={isSubmitting || !isValid}>
              {isSubmitting ? "Guardando..." : "Guardar cambios"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProductModal;