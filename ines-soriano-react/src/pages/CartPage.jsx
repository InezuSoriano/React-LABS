import { useOutletContext } from "react-router-dom";
import CartSection from "../components/CartSection/CartSection.jsx";

function CartPage() {
  const { cartItems, onClearCart, onCompletePurchase } = useOutletContext();

  return (
    <div className="container">
      <h1>Carrito</h1>
      <CartSection items={cartItems} />

      <div
        style={{
          marginTop: "1rem",
          display: "flex",
          gap: "0.75rem",
          justifyContent: "flex-end",
        }}
      >
        <button type="button" onClick={onClearCart}>
          Vaciar cesta
        </button>
        <button type="button" onClick={onCompletePurchase}>
          Finalizar compra
        </button>
      </div>
    </div>
  );
}

export default CartPage;
