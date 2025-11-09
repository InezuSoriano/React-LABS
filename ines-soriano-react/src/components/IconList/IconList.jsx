import "./IconList.css";
import UserIcon from "../../icons/UserIcon.svg";
import LikeIcon from "../../icons/LikeIcon.svg";
import CartIcon from "../../icons/CartIcon.svg";

function IconList() {
  const whiteIconStyle = { filter: "invert(100%)" };

  return (
    <ul className="icon-list">
      <li className="icon-list__item">
        <img src={UserIcon} alt="Usuario" style={whiteIconStyle} />
      </li>
      <li className="icon-list__item">
        <img src={LikeIcon} alt="Favoritos" style={whiteIconStyle} />
      </li>
      <li className="icon-list__item">
        <img src={CartIcon} alt="Carrito" style={whiteIconStyle} />
      </li>
    </ul>
  );
}

export default IconList;
