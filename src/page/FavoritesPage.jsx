import React from "react";
import { ShoppingCart, Heart } from "lucide-react";
import { useFavorites } from "../context/FavoritesContext";

function FavoritesPage() {
    const { favorites, toggleFavorite } = useFavorites();

    const addToCart = (product) => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const discountedPrice =
            product.discount > 0 ?
            Math.round(product.price * (1 - product.discount / 100)) :
            product.price;

        const existingProduct = cart.find((item) => item.id === product.id);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({
                ...product,
                price: discountedPrice,
                quantity: 1,
            });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
    };

    return (
        <div className="max-w-[375px] sm:max-w-[640px] md:max-w-[768px] md:mx-4 lg:mx-4 xl:mx-auto lg:max-w-[1140px] mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-bold">Избранное</h2>
        <a
          href="/"
          className="bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-2 px-4 rounded-md"
        >
          Назад
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {favorites.map((product) => {
          const hasDiscount = product.discount > 0;
          const discountedPrice = hasDiscount
            ? Math.round(product.price * (1 - product.discount / 100))
            : product.price;

          return (
            <div
              key={product.id}
              className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition"
            >
              <div className="relative bg-[#F7F7F7] h-[263px] flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-[220px] object-contain"
                />
                {hasDiscount && (
                  <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full shadow">
                    -{product.discount}%
                  </span>
                )}
                <button
                  onClick={() => toggleFavorite(product)}
                  className="absolute top-3 right-3 text-red-500"
                >
                  <Heart size={24} className="fill-red-500 stroke-red-500" />
                </button>
              </div>

              <div className="p-4 flex flex-col gap-2">
                <h4 className="text-lg font-semibold text-gray-800">
                  {product.title}
                </h4>
                <p className="text-sm text-gray-500">{product.description}</p>

                <div className="text-xl font-medium mt-1">
                  {hasDiscount ? (
                    <>
                      <span className="line-through text-gray-400 mr-2">
                        {product.price} ₽
                      </span>
                      <span className="text-red-500">{discountedPrice} ₽</span>
                    </>
                  ) : (
                    <span>{product.price} ₽</span>
                  )}
                </div>

                <button
                  onClick={() => addToCart(product)}
                  className="mt-3 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
                >
                  <ShoppingCart size={20} />
                  <span>В корзину</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    );
}

export default FavoritesPage;