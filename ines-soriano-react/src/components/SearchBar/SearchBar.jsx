import "./SearchBar.css";

function SearchBar({ value, onChange }) {
  return (
    <section className="search-bar">
      <form className="search-bar__form" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="search" className="visually-hidden">
          Buscar
        </label>
        <input
          id="search"
          className="search-bar__input"
          type="text"
          placeholder="Buscar por título…"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {value && (
          <button
            type="button"
            className="search-bar__clear"
            onClick={() => onChange("")}
          >
            Limpiar
          </button>
        )}
      </form>
    </section>
  );
}
export default SearchBar;
