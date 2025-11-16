import "./CartSection.css";

function CartSection({ items }) {
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <section className="cart" aria-label="Cesta de la compra">
        <h2 className="cart__title">Tu cesta</h2>
        <p>Tu cesta está vacía.</p>
      </section>
    );
  }

  return (
    <section className="cart" aria-label="Cesta de la compra">
      <h2 className="cart__title">Tu cesta</h2>
      <ul className="cart__list">
        {items.map((item) => (
          <li key={item.id} className="cart__item">
            <span className="cart__name">{item.title}</span>
            <span className="cart__qty">x {item.quantity}</span>
            <span className="cart__price">{item.price.toFixed(2)} €</span>
            <span className="cart__subtotal">
              {(item.price * item.quantity).toFixed(2)} €
            </span>
          </li>
        ))}
      </ul>
      <p className="cart__total">
        Total: <strong>{total.toFixed(2)} €</strong>
      </p>
    </section>
  );
}

export default CartSection;
