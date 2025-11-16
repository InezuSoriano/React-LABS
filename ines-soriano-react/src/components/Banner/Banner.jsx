import "./Banner.css";

function Banner({ user }) {
  const message = user
    ? `¡${user.name}, aprovéchate de tu 20 % de descuento!`
    : "Crea una cuenta para disfrutar de nuestros descuentos.";

  return (
    <section className="banner" aria-label="Promoción">
      <div className="banner__inner">
        {user ? <strong>{message}</strong> : message}
      </div>
    </section>
  );
}

export default Banner;
