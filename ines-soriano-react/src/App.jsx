import { useEffect, useState } from "react";
import data from "./fakeapi/data.json";
import Header from "./components/Header/Header.jsx";
import Banner from "./components/Banner/Banner.jsx";
import ProductsSection from "./components/ProductsSection/ProductsSection.jsx";
import Footer from "./components/Footer/Footer.jsx";
import CartSection from "./components/CartSection/CartSection.jsx";
import UserForm from "./components/UserForm/UserForm.jsx";

function useUser() {
  const [user, setUser] = useState(() => {
    try {
      const stored = window.localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (user) {
        window.localStorage.setItem("user", JSON.stringify(user));
      } else {
        window.localStorage.removeItem("user");
      }
    } catch {
    }
  }, [user]);

  return [user, setUser];
}

function App() {
  const [filterText, setFilterText] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [view, setView] = useState("products");
  const [theme, setTheme] = useState("light");
  const [user, setUser] = useUser();

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  function handleAddToCart(product) {
    setCartItems((items) => {
      const existing = items.find((item) => item.id === product.id);
      if (existing) {
        return items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...items,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          quantity: 1,
        },
      ];
    });
  }

  function handleBuyNow(product) {
    handleAddToCart(product);
    setView("cart");
  }

  function handleToggleTheme() {
    setTheme((current) => (current === "light" ? "dark" : "light"));
  }

  function handleLogin(newUser) {
    setUser(newUser);
  }

  function handleLogout() {
    setUser(null);
  }

  return (
    <>
      <Header
        value={filterText}
        onChange={setFilterText}
        cartCount={cartCount}
        onCartClick={() => setView("cart")}
        onLogoClick={() => setView("products")}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />
      <div className="container">
        <Banner user={user} />

        {view === "products" ? (
          <ProductsSection
            products={data}
            filterText={filterText}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
          />
        ) : (
          <CartSection items={cartItems} />
        )}

        <UserForm
          user={user}
          onLogin={handleLogin}
          onLogout={handleLogout}
        />
      </div>
      <Footer theme={theme} />
    </>
  );
}

export default App;