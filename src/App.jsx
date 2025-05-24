import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, matchPath, useLocation } from "react-router-dom";
import Header from "./page/Header";
import Main from "./page/Main";
import Footer from "./page/Footer";
import AdminPanel from "./components/AdminPanel";
import Catalog from "./page/Catalog";
import DairyProductsPage from "./page/DairyProductsPage";
import MeatProductsPage from "./page/MeatProductsPage";
import VegetablesPage from "./page/VegetablesPage";
import FruitsPage from "./page/FruitsPage";
import CartPage from './page/CartPage';
import ProductsCard from "./components/ProductsCard";
import ProductProfile from "./components/ProductProfile";
import ProductProfileSell from "./components/ProductProfileSell";
import FavoritesPage from "./page/FavoritesPage";
import { CartProvider } from "./context/CartContext";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAuthChecked, setIsAuthChecked] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        if (loggedInUser) {
            setIsAuthenticated(true);
        }
        setIsAuthChecked(true);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("loggedInUser");
        setIsAuthenticated(false);
    };

    if (!isAuthChecked) {
        return <div className="text-center mt-10">Загрузка...</div>;
    }

    const hiddenLayoutPaths = ["/admin", "/cart", "/favorites", "/product/:id"];
const shouldHideLayout = hiddenLayoutPaths.some(path =>
  matchPath({ path, end: false }, location.pathname)
);

    return (
        <CartProvider>
      {!shouldHideLayout && <Header />}

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/dairy" element={<DairyProductsPage />} />
        <Route path="/meat" element={<MeatProductsPage />} />
        <Route path="/vegetables" element={<VegetablesPage />} />
        <Route path="/fruits" element={<FruitsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/product/:id" element={<ProductProfile />} />
        <Route path="/ProductProfileSell/:id" element={<ProductProfileSell />} />
        <Route
          path="/admin"
          element={
            isAuthenticated ? (
              <AdminPanel onLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>

      {!shouldHideLayout && <Footer />}
    </CartProvider>
    );
}


export default App;