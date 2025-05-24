import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Heart } from "lucide-react";
import axios from "axios";
import { useFavorites } from "../context/FavoritesContext";

function ProductProfileSell() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const { favorites, toggleFavorite } = useFavorites();

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

    const discountedPrice = product.discount > 0 ?
        Math.round(product.price * (1 - product.discount / 100)) :
        product.price;

    const isFavorite = (productId) => {
        return favorites.some((item) => item.id === productId);
    };

    return (
        <div className="max-w-[1140px] flex m-auto my-10 p-10">
            <div className="flex gap-10 bg-[#F7F7F7] p-6 rounded-md shadow-xl">
                <img src={product.image} alt={product.name} className="w-[400px] rounded-lg shadow-lg" />
                <div>
                    <div className="flex items-start justify-between">
                        <h1 className="text-3xl font-semibold mb-4">{product.name}</h1>
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

                    <p className="text-gray-600 mb-4">{product.description}</p>

                    <div className="text-2xl mb-4">
                        <span className="mr-2 font-semibold text-red-500">{discountedPrice} ₽</span>
                        {product.discount > 0 && (
                            <span className="line-through text-gray-400 ml-2">{product.price} ₽</span>
                        )}
                    </div>

                    <button className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors mt-6 flex items-center gap-2">
                        Добавить в корзину
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductProfileSell;