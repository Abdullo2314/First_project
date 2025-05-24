import React, { useState, useEffect } from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import axios from 'axios';
function VegetablesPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();
    const { toggleFavorite, favorites } = useFavorites();
    useEffect(() => {
        axios.get("http://localhost:8000/api")
            .then((res) => {
                const vegetableProducts = res.data.filter(product => product.category === "vegetables");
                setProducts(vegetableProducts);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Ошибка загрузки продуктов:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="text-center mt-10">Загрузка овощей...</div>;
    }

    return (
        <div className="container max-w-[1140px] mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Овощи</h1>
            {products.length === 0 ? (
                <p>Нет доступных мясных продуктов.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => {
                        const isFavorite = favorites.some((item) => item.id === product.id);

                        return (
                            <div key={product.id} className="product-card bg-white p-4 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                                <div className="relative">
                                    <img
                                        className="w-full h-48 object-cover mb-4 rounded-md"
                                        src={product.image}
                                        alt={product.name}
                                    />
                                    {product.discount && (
                                        <div className="absolute top-2 left-2 rotate-12 bg-red-500 text-white px-4 py-2 text-lg font-bold rounded-lg">
                                            SELL
                                        </div>
                                    )}
                                    <Heart
                                        onClick={() => toggleFavorite(product)}
                                        className={`absolute top-0 right-2 cursor-pointer transition ${
                                            isFavorite ? 'fill-blue-500 stroke-blue-500' : 'stroke-blue-500'
                                        }`}
                                    />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                                <p className="text-sm text-gray-600 mb-4">{product.description}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-xl font-semibold">{product.price} ₽</span>
                                    {product.discount && (
                                        <span className="text-sm text-red-500 line-through">
                                            {product.price + product.discount} ₽
                                        </span>
                                    )}
                                </div>
                                <button
                                    onClick={() => addToCart(product)}
                                    className="flex justify-center active:bg-red-500 items-center gap-2 mt-4 w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
                                >
                                    <ShoppingCart />
                                    Добавить в корзину
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default VegetablesPage;