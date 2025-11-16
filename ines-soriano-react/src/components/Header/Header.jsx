import "./Header.css";
import IconList from "../IconList/IconList.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";

function Header({
  value,
  onChange,
  cartCount,
  onCartClick,
  onLogoClick,
  theme,
  onToggleTheme,
}) {
  return (
    <header className={`header header--${theme}`}>
      <div className="container">
        <div className="header__top">
          <h1
            className="header__title header__title--clickable"
            onClick={onLogoClick}
          >
            Ines Shopping
          </h1>
          <SearchBar value={value} onChange={onChange} />
          <IconList
            cartCount={cartCount}
            onCartClick={onCartClick}
            theme={theme}
            onToggleTheme={onToggleTheme}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
