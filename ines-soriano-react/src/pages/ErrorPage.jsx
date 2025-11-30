import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div className="container">
      <h1>Página no encontrada</h1>
      <p>La ruta que has solicitado no existe.</p>
      <Link to="/">Volver a la tienda</Link>
    </div>
  );
}

export default ErrorPage;