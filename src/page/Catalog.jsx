import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '/src/context/CartContext';
import { useFavorites } from '/src/context/FavoritesContext';
import { Heart } from 'lucide-react';

const categories = [
    { name: 'Молочная продукция', path: '/dairy' },
    { name: 'Мясная продукция', path: '/meat' },
    { name: 'Овощи', path: '/vegetables' },
    { name: 'Фрукты', path: '/fruits' },
];

const categoryMapping = {
    'Молочная продукция': 'dairy',
    'Мясная продукция': 'meat',
    'Овощи': 'vegetables',
    'Фрукты': 'fruits',
};

function Catalog() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [hasDiscountOnly, setHasDiscountOnly] = useState(false);

    const { addToCart } = useCart();
    const { favorites, toggleFavorite } = useFavorites();

    useEffect(() => {
        axios.get('http://localhost:8000/api')
            .then((res) => {
                setProducts(res.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Ошибка загрузки продуктов:', error);
                setLoading(false);
            });
    }, []);

    const filteredProducts = products.filter((product) => {
        const matchCategory = selectedCategory
            ? product.category === categoryMapping[selectedCategory]
            : true;
        const matchMinPrice = minPrice ? product.price >= Number(minPrice) : true;
        const matchMaxPrice = maxPrice ? product.price <= Number(maxPrice) : true;
        const matchDiscount = hasDiscountOnly ? product.discount !== null : true;
        return matchCategory && matchMinPrice && matchMaxPrice && matchDiscount;
    });

    if (loading) {
        return <div className="text-center mt-10">Загрузка товаров...</div>;
    }

    return (
        <div className="flex flex-col items-center lg:items-start lg:flex-row sm:max-w-[1140px] m-auto p-6 lg:gap-6">
            <aside className="w-64 pr-4">
                <h2 className="text-xl font-semibold mb-2">Категории</h2>
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full border border-gray-300 rounded p-2 mb-4"
                >
                    <option value="">Все категории</option>
                    {categories.map((cat) => (
                        <option key={cat.path} value={cat.name}>
                            {cat.name}
                        </option>
                    ))}
                </select>

                <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">Цена</h3>
                    <input
                        type="number"
                        placeholder="От"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="w-full mb-2 border border-gray-300 rounded p-2"
                    />
                    <input
                        type="number"
                        placeholder="До"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="w-full border border-gray-300 rounded p-2"
                    />
                </div>

                <div className="mt-4">
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            checked={hasDiscountOnly}
                            onChange={(e) => setHasDiscountOnly(e.target.checked)}
                            className="mr-2"
                        />
                        Только со скидкой
                    </label>
                </div>
            </aside>

            <main className="flex-1">
                <h1 className="text-2xl font-bold mb-6">Все товары</h1>

                {filteredProducts.length === 0 ? (
                    <p>
                        {hasDiscountOnly
                            ? 'Нет доступных товаров со скидкой.'
                            : 'Нет доступных товаров.'}
                    </p>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                        {filteredProducts.map((product) => (
                            <div key={product.id} className="lg:w-[263px] mx-[10px] shrink-0">
                                <div className="relative lg:w-[263px] h-[263px] bg-[#F7F7F7] flex items-center justify-center">
                                    <img
                                        className="lg:max-w-full h-[263px] object-cover"
                                        src={product.image}
                                        alt={product.name}
                                    />
                                    {product.discount !== null && (
                                        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                                            SELL
                                        </span>
                                    )}
                                    <div
                                        className="absolute top-2 right-2 cursor-pointer"
                                        onClick={() => toggleFavorite(product)}
                                    >
                                        {favorites.some((fav) => fav.id === product.id) ? (
                                            <Heart className="w-6 h-6 text-red-500 fill-red-500" />
                                        ) : (
                                            <Heart className="w-6 h-6 text-blue-500" />
                                        )}
                                    </div>
                                </div>

                                <h3 className="text-[18px] text-[#9C9C9C]">{product.name}</h3>

                                <div className="flex justify-between items-center">
                                    <span className="text-[24px]">{product.price} ₽</span>
                                    {product.discount && (
                                        <span className="text-sm text-red-500 line-through">
                                            {product.price + product.discount} ₽
                                        </span>
                                    )}
                                </div>

                                <div
                                    className="flex hover:bg-blue-600 active:bg-red-500 items-center text-white gap-2 py-2 px-4 bg-blue-500 mt-2 rounded cursor-pointer"
                                    onClick={() => addToCart(product)}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <circle cx="8" cy="21" r="1" />
                                        <circle cx="19" cy="21" r="1" />
                                        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 
                                            2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                                    </svg>
                                    <span>В корзину</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

export default Catalog;
