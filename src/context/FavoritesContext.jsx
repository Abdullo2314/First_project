import { createContext, useContext, useState, useEffect } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(storedFavorites);
    }, []);

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (product) => {
        setFavorites((prev) => {
            const exists = prev.some((item) => item.id === product.id);
            if (exists) {
                return prev.filter((item) => item.id !== product.id);
            } else {
                return [...prev, product];
            }
        });
    };

    const isInFavorites = (productId) => {
        return favorites.some((item) => item.id === productId);
    };

    return (
        <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isInFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
    );
}

export const useFavorites = () => useContext(FavoritesContext);