import "./Header.css";
import IconList from "../IconList/IconList.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";

function Header({ value, onChange }) {
  return (
    <header className="header">
      <div className="container">
        <div className="header__top">
          <h1 className="header__title">Ines Shopping</h1>
          <SearchBar value={value} onChange={onChange} />
          <IconList />
        </div>
      </div>
    </header>
  );
}

export default Header;
