import { useEffect, useState } from "react";
import "./UserForm.css";

function UserForm({ user, onLogin, onLogout }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setError("");
    } else {
      setName("");
      setEmail("");
    }
  }, [user]);

  function handleSubmit(event) {
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) {
      setError("El nombre es obligatorio.");
      return;
    }

    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setError("Introduce un e-mail válido.");
      return;
    }

    setError("");
    onLogin({ name: trimmedName, email: trimmedEmail });
  }

  return (
    <section className="user-form">
      <h2 className="user-form__title">Acceso de usuario</h2>

      {user ? (
        <>
          <p className="user-form__welcome">
            Sesión iniciada como{" "}
            <strong>
              {user.name} ({user.email})
            </strong>
            .
          </p>
          <button type="button" onClick={onLogout}>
            Cerrar sesión
          </button>
        </>
      ) : (
        <form className="user-form__form" onSubmit={handleSubmit}>
          <div className="user-form__field">
            <label htmlFor="name">Nombre</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="user-form__field">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {error && <p className="user-form__error">{error}</p>}
          <button type="submit">Iniciar sesión</button>
        </form>
      )}
    </section>
  );
}

export default UserForm;