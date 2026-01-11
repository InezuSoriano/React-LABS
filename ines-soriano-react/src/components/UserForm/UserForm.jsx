import { useEffect } from "react";
import { useForm } from "react-hook-form";

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function UserForm({ user, onLogin, onLogout }) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      repeatPassword: "",
    },
  });

  const password = watch("password");

  useEffect(() => {
    if (user) {
      reset({
        email: "",
        password: "",
        repeatPassword: "",
      });
    }
  }, [user, reset]);

  const onSubmit = (values) => {
    if (typeof onLogin !== "function") {
      console.error(
        "UserForm: onLogin no es una función. Revisa LoginPage.jsx."
      );
      return;
    }

    onLogin({
      email: normalizeEmail(values.email),
    });
  };

  if (user) {
    return (
      <div style={{ display: "grid", gap: "1rem", maxWidth: 520 }}>
        <p style={{ margin: 0 }}>
          Sesión iniciada como <strong>{user.email}</strong> ({user.role})
        </p>

        <button
          type="button"
          onClick={() =>
            typeof onLogout === "function" ? onLogout() : null
          }
        >
          Cerrar sesión
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: "grid", gap: "1rem", maxWidth: 520 }}
      noValidate
    >
      <label style={{ display: "grid", gap: "0.35rem" }}>
        <span>Email</span>
        <input
          type="email"
          placeholder="tu@email.com"
          {...register("email", {
            required: "El email es obligatorio.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Introduce un email válido.",
            },
          })}
        />
        {errors.email && (
          <p style={{ margin: 0, color: "#b3261e" }}>
            {errors.email.message}
          </p>
        )}
      </label>

      <label style={{ display: "grid", gap: "0.35rem" }}>
        <span>Contraseña</span>
        <input
          type="password"
          placeholder="••••••••"
          {...register("password", {
            required: "La contraseña es obligatoria.",
            minLength: { value: 6, message: "Mínimo 6 caracteres." },
            maxLength: { value: 32, message: "Máximo 32 caracteres." },
          })}
        />
        {errors.password && (
          <p style={{ margin: 0, color: "#b3261e" }}>
            {errors.password.message}
          </p>
        )}
      </label>

      <label style={{ display: "grid", gap: "0.35rem" }}>
        <span>Repetir contraseña</span>
        <input
          type="password"
          placeholder="••••••••"
          {...register("repeatPassword", {
            required: "Repite la contraseña.",
            validate: (value) =>
              value === password || "Las contraseñas no coinciden.",
          })}
        />
        {errors.repeatPassword && (
          <p style={{ margin: 0, color: "#b3261e" }}>
            {errors.repeatPassword.message}
          </p>
        )}
      </label>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Accediendo..." : "Iniciar sesión"}
      </button>

      <p style={{ margin: 0, opacity: 0.75, fontSize: "0.9rem" }}>
        Si tu email contiene <strong>admin</strong>, entrarás como administrador.
      </p>
    </form>
  );
}

export default UserForm;