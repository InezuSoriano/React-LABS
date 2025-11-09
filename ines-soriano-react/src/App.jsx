import { useState } from "react";
import data from "./fakeapi/data.json";
import Header from "./components/Header/Header.jsx";
import Banner from "./components/Banner/Banner.jsx";
import ProductsSection from "./components/ProductsSection/ProductsSection.jsx";
import Footer from "./components/Footer/Footer.jsx";

function App() {
  const [filterText, setFilterText] = useState("");

  return (
    <>
      <Header value={filterText} onChange={setFilterText} />
      <div className="container">
        <Banner />
        <ProductsSection products={data} filterText={filterText} />
      </div>
      <Footer />
    </>
  );
}

export default App;

