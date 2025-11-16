import "./Footer.css";

function Footer({ theme }) {
  return (
    <footer className={`footer footer--${theme}`}>
      <div className="container footer__inner">
        <small>
          © {new Date().getFullYear()} — Lab 02 React - Ines Soriano.
        </small>
      </div>
    </footer>
  );
}

export default Footer;
