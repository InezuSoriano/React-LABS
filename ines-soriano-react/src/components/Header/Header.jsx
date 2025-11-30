import "./Header.css";
import { Link } from "react-router-dom";
import IconList from "../IconList/IconList.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";

function Header({
  value,
  onChange,
  cartCount,
  theme,
  onToggleTheme,
}) {
  return (
    <header className={`header header--${theme}`}>
      <div className="container">
        <div className="header__top">
          <h1 className="header__title header__title--clickable">
            <Link to="/" className="header__title-link">
              Ines Shopping
            </Link>
          </h1>
          <SearchBar value={value} onChange={onChange} />
          <IconList
            cartCount={cartCount}
            theme={theme}
            onToggleTheme={onToggleTheme}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
