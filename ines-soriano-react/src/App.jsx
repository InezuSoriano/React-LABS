import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";

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
    } catch {}
  }, [user]);

  return [user, setUser];
}

function App() {
  const [filterText, setFilterText] = useState("");

  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored = window.localStorage.getItem("cart");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem("cart", JSON.stringify(cartItems));
    } catch {}
  }, [cartItems]);

  const [theme, setTheme] = useState("light");
  const [user, setUser] = useUser();
  const navigate = useNavigate();

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
    navigate("/cart");
  }

  function handleClearCart() {
    setCartItems([]);
  }

  function handleCompletePurchase() {
    if (cartItems.length === 0) return;
    alert("Compra realizada con éxito");
    setCartItems([]);
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
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      <Outlet
        context={{
          user,
          onLogin: handleLogin,
          onLogout: handleLogout,
          cartItems,
          filterText,
          onAddToCart: handleAddToCart,
          onBuyNow: handleBuyNow,
          onClearCart: handleClearCart,
          onCompletePurchase: handleCompletePurchase,
        }}
      />

      <Footer theme={theme} />
    </>
  );
}

export default App;