import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Heart, } from "lucide-react";
import { useFavorites } from "../context/FavoritesContext";
import { useCart } from "../context/CartContext";
import axios from "axios";

function ProductProfile() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const { favorites, toggleFavorite } = useFavorites();
    const { addToCart } = useCart();


    useEffect(() => {
        axios.get("http://localhost:8000/api")
            .then((res) => {
                const foundProduct = res.data.find((item) => String(item.id) === String(id));
                setProduct(foundProduct);
            })
            .catch((err) => console.error("Ошибка загрузки продукта:", err));
    }, [id]);
    

    if (!product) {
        return <div className="text-center mt-10">Продукт не найден или загружается...</div>;
    }

    const isFavorite = (productId) => {
        return favorites.some((item) => item.id === productId);
    };

    const handleAddToCart = () => {
        addToCart(product, quantity);
    };

    return (
        <div className="max-w-[1140px] m-auto my-10 px-4">
            <nav className="text-sm text-gray-600 mb-6">
                <Link to="/" className="hover:underline">Главная</Link> /{" "}
                <span className="text-red-500">{product.name}</span>
            </nav>

            <div className="flex gap-10 p-6">
                <img src={product.image} alt={product.name} className="w-[555px] h-[555px] object-cover rounded-md shadow-lg" />

                <div className='bg-[#F7F7F7] p-10 rounded-md shadow'>
                    <div className="flex items-start justify-between">
                        <h1 className="text-[36px] font-semibold mb-4">{product.name}</h1>
                        <button onClick={() => toggleFavorite(product)} className="ml-4 mt-1">
                            <Heart
                                size={28}
                                className={
                                    isFavorite(product.id)
                                        ? "fill-red-500 stroke-red-500"
                                        : "stroke-blue-500"
                                }
                            />
                        </button>
                    </div>

                    <p className="mb-4 text-gray-700">{product.description}</p>

                    <div className="text-2xl mb-6">
                        <span className="mr-2 text-red-500 font-semibold">{product.price} ₽</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                            className="w-16 text-center border rounded px-2 py-1"
                        />
                        <button
                            onClick={handleAddToCart}
                            className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
                        >
                            Добавить в корзину
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductProfile;