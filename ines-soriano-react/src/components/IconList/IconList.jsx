import "./IconList.css";
import { Link } from "react-router-dom";
import UserIcon from "../../icons/UserIcon.svg";
import LikeIcon from "../../icons/LikeIcon.svg";
import CartIcon from "../../icons/CartIcon.svg";

function IconList({ cartCount, theme, onToggleTheme }) {
  const iconStyle =
    theme === "dark"
      ? { filter: "invert(100%)" }
      : { filter: "invert(0%)" };

  return (
    <ul className="icon-list">
      <li className="icon-list__item">
        <Link to="/login">
          <img src={UserIcon} alt="Usuario" style={iconStyle} />
        </Link>
      </li>

      <li className="icon-list__item">
        <img src={LikeIcon} alt="Favoritos" style={iconStyle} />
      </li>

      <li className="icon-list__item icon-list__item--cart">
        <Link to="/cart" className="icon-list__cart-wrapper">
          <img src={CartIcon} alt="Carrito" style={iconStyle} />
          {cartCount > 0 && (
            <span className="icon-list__badge">{cartCount}</span>
          )}
        </Link>
      </li>

      <li className="icon-list__item">
        <button
          type="button"
          className="icon-list__theme-button"
          onClick={onToggleTheme}
          aria-label="Cambiar modo claro u oscuro"
          style={{ filter: "none" }}
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </li>
    </ul>
  );
}

export default IconList;