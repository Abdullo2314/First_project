import React, { useState, useEffect } from "react";
import axios from "axios";

function CartPage() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api")
            .then((res) => {
                const cart = JSON.parse(localStorage.getItem("cart")) || [];
                const cartIds = cart.map((item) => item.id);
                
                const filteredProducts = res.data
                    .filter((product) => cartIds.includes(product.id))
                    .map((item) => ({
                        ...item,
                        price: Number(item.price) || 0,
                        quantity: Number(cart.find((cartItem) => cartItem.id === item.id)?.quantity) || 1
                    }));
                
                setCartItems(filteredProducts);
            })
            .catch((err) => console.error("Ошибка загрузки корзины:", err));
    }, []);

    const updateCart = (newCart) => {
        localStorage.setItem("cart", JSON.stringify(newCart));
        setCartItems(newCart);
    };

    const removeFromCart = (id) => {
        const updatedCart = cartItems.filter(item => item.id !== id);
        updateCart(updatedCart);
    };

    const changeQuantity = (id, delta) => {
        const updatedCart = cartItems.map((item) => {
            if (item.id === id) {
                const newQuantity = item.quantity + delta;
                return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
            }
            return item;
        });

        updateCart(updatedCart);
    };

    const totalPrice = cartItems.reduce((total, item) => {
        const itemTotal = Number(item.price) * Number(item.quantity);
        return total + (isNaN(itemTotal) ? 0 : itemTotal);
    }, 0);

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <div className='flex items-center justify-between'>
                <h2 className="text-3xl font-bold mb-6">🛒 Ваша корзина</h2>
                <a className='text-2xl rounded-md font-bold p-2 mb-6 bg-blue-500' href="/">Назад</a>
            </div>

            {cartItems.length === 0 ? (
                <p className="text-gray-600 text-lg">Корзина пуста</p>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {cartItems.map((item) => (
                            <div key={item.id} className="border rounded-xl shadow p-4 flex flex-col items-center bg-white">
                                <img src={item.image} alt={item.title} className="w-40 h-40 object-cover mb-4 rounded" />
                                <h3 className="text-xl font-semibold mb-2 text-center">{item.title}</h3>
                                <p className="text-gray-600 mb-2">Цена: {item.price} ₽</p>
                                <div className="flex items-center gap-2 mb-2">
                                    <button onClick={() => changeQuantity(item.id, -1)} className="bg-gray-300 px-3 py-1 rounded text-lg">−</button>
                                    <span className="text-lg font-medium">{item.quantity}</span>
                                    <button onClick={() => changeQuantity(item.id, 1)} className="bg-gray-300 px-3 py-1 rounded text-lg">+</button>
                                </div>
                                <p className="text-gray-800 font-semibold mb-2">Итого: {item.quantity * item.price} ₽</p>
                                <button onClick={() => removeFromCart(item.id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Удалить</button>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 text-right">
                        <p className="text-xl font-bold">Общая сумма: {totalPrice.toFixed(2)} ₽</p>
                    </div>
                </>
            )}
        </div>
    );
}

export default CartPage;
