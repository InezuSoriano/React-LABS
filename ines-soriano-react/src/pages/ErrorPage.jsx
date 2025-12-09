import { Link, useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();

  const status = error?.status || 500;
  const statusText = error?.statusText || "Error inesperado";

  const message =
    status === 404
      ? "El recurso que buscas no existe o ha sido eliminado."
      : "Ha ocurrido un error al procesar tu solicitud.";

  return (
    <div className="container" style={{ padding: "2rem 0" }}>
      <h1>Error {status}</h1>
      <p>{message}</p>

      {statusText && (
        <p style={{ opacity: 0.8, fontSize: "0.95rem" }}>{statusText}</p>
      )}

      <Link to="/" style={{ marginTop: "1rem", display: "inline-block" }}>
        Volver a la tienda
      </Link>
    </div>
  );
}

export default ErrorPage;