import React, { useState, useEffect } from "react";
import { ShoppingCart, ArrowLeft, ArrowRight, Heart } from "lucide-react";
import { useFavorites } from "../context/FavoritesContext";
import { Link } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";

const visibleCards = 4;
const cardWidth = 283;

function ProductsCard() {
  const {addToCart} = useCart()
    const [products, setProducts] = useState([]);
    const [index, setIndex] = useState(0);
    const maxIndex = Math.max(0, products.length - visibleCards);
    const { favorites, toggleFavorite } = useFavorites();

  useEffect(() => {
        fetchProducts()
    }, []);
    const fetchProducts = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api");
            setProducts(response.data);
        } catch (error) {
            console.error("Ошибка при получении продуктов:", error);
            alert("Не удалось загрузить продукты.");
        }
    };

    const next = () => {
        setIndex(index === maxIndex ? 0 : index + 1);
    };

    const prev = () => {
        setIndex(index === 0 ? maxIndex : index - 1);
    };
    const isFavorite = (productId) => {
        return favorites.some((item) => item.id === productId);
    };

    return (
        <div>
      <div className="flex justify-center m-auto md:justify-between py-10">
        <h2 className=" text-[36px]">Товары месяца</h2>
        <div className="hidden md:flex gap-4">
          <button onClick={prev}>
            <ArrowLeft className="bg-blue-500 w-[55px] h-[55px] rounded-md p-2 text-white" />
          </button>
          <button onClick={next}>
            <ArrowRight className="bg-blue-500 w-[55px] h-[55px] rounded-md p-2 text-white" />
          </button>
        </div>
      </div>
      <div className="overflow-hidden sm:w-full">
        <div
          className="grid grid-cols-2 md:flex sm:flex flex-wrap justify-around md:gap-1 md:flex-nowrap md:flex-row md:transition-transform md:duration-300"
          style={{ transform: `translateX(-${index * cardWidth}px)` }}
        >
                  {products.map((product) => (
                  <div key={product.id} className="w-[172px]  sm:w-[263px] md:mx-[10px] shrink-0 flex flex-col justify-between">
                    <div className="relative md:w-[263px] md:h-[263px] sm:bg-[#F7F7F7] flex items-center justify-center">
                      <Link to={`/product/${product.id}`}>
                        <img
                          src={product.image}
                          alt={product.name}
                          className=" sm:max-w-full sm:h-[263px] cursor-pointer"
                        />
                      </Link>
                      <button
                        onClick={() => toggleFavorite(product)}
                        className="absolute cursor-pointer top-2 right-2"
                      >
                        <Heart
                          size={24}
                          className={
                            isFavorite(product.id)
                              ? "fill-red-500 stroke-red-500"
                              : "stroke-blue-500"
                          }
                        />
                      </button>
                    </div>
                    <h4 className="text-[18px] w-[200px] truncate text-[#9C9C9C] h-[24px]">
                      {product.name}
                    </h4>
                    <p className="text-[18px] text-gray-800 h-[48px] overflow-hidden line-clamp-2">
                      {product.description}
                    </p>
                    <h3 className="text-[24px]">
                      {product.discount > 0 ? (
                        <>
                          <span className="mr-2">{product.price} ₽</span>
                          
                        </>
                      ) : (
                        <>{product.price} ₽</>
                      )}
                    </h3>
                    <div
                      className="flex hover:bg-blue-600 active:bg-red-500 items-center text-white gap-2 py-2 px-4 bg-blue-500 mt-2 rounded cursor-pointer"
                      onClick={() => addToCart(product)}
                    >
                       <ShoppingCart />
                      <span>В корзину</span>
                    </div>
                  </div>
                ))}
        </div>
      </div>
    </div>
    );
}

export default ProductsCard;