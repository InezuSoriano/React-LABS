import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <small>© {new Date().getFullYear()} — Lasb 01 React - Ines Soriano - version pocha.</small>
      </div>
    </footer>
  );
}
export default Footer;
