import React, { useState, useEffect } from "react";
import { User, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

function RegistrationModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const [loggedInUser, setLoggedInUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
        if (storedUser) {
            setLoggedInUser(storedUser);
        }
    }, []);

    const toggleModal = () => {
        setIsOpen(!isOpen);
        setError("");
        setFormData({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        });
    };

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, password, confirmPassword } = formData;
        const users = JSON.parse(localStorage.getItem("users") || "[]");

        if (isLoginMode) {
            const user = users.find(
                (u) => u.email === email && u.password === password
            );
            if (!user) return setError("Неверный email или пароль");

            localStorage.setItem("loggedInUser", JSON.stringify(user));
            setLoggedInUser(user);
            setIsOpen(false);
            navigate("/admin");
        } else {
            if (!name || !email || !password || !confirmPassword) {
                return setError("Все поля обязательны");
            }
            if (password !== confirmPassword) {
                return setError("Пароли не совпадают");
            }
            if (users.find((u) => u.email === email)) {
                return setError("Email уже используется");
            }

            const newUser = { name, email, password };
            users.push(newUser);
            localStorage.setItem("users", JSON.stringify(users));
            localStorage.setItem("loggedInUser", JSON.stringify(newUser));
            setLoggedInUser(newUser);
            setIsOpen(false);
            navigate("/admin");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("loggedInUser");
        setLoggedInUser(null);
        navigate("/");
    };

    return (
        <div>
            {loggedInUser ? (
                <div className="flex items-center gap-2">
                    <span className="text-sm">Привет, {loggedInUser.name}!</span>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                    >
                        Выйти
                    </button>
                </div>
            ) : (
                <button onClick={toggleModal}>
                    <User className="bg-blue-500 w-[37px] h-[40px] stroke-white p-2 rounded" />
                </button>
            )}

            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md relative">
                        <button onClick={toggleModal} className="absolute top-2 right-2">
                            <X className="w-5 h-5 text-gray-500 hover:text-black" />
                        </button>

                        <h2 className="text-2xl font-bold mb-4 text-center">
                            {isLoginMode ? "Вход" : "Регистрация"}
                        </h2>

                        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {!isLoginMode && (
                                <div>
                                    <label className="block mb-1">Имя</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full border p-2 rounded"
                                    />
                                </div>
                            )}

                            <div>
                                    <label className="block mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded"
                                />
                            </div>

                            <div>
                                <label className="block mb-1">Пароль</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded"
                                />
                            </div>

                            {!isLoginMode && (
                                <div>
                                    <label className="block mb-1">Подтверждение пароля</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="w-full border p-2 rounded"
                                    />
                                </div>
                            )}

                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                            >
                                {isLoginMode ? "Войти" : "Зарегистрироваться"}
                            </button>
                        </form>

                        <div className="text-center mt-4 text-sm">
                            {isLoginMode ? "Нет аккаунта?" : "Уже есть аккаунт?"}{" "}
                            <button
                                onClick={() => {
                                    setIsLoginMode(!isLoginMode);
                                    setError("");
                                }}
                                className="text-blue-500 underline"
                            >
                                {isLoginMode ? "Зарегистрироваться" : "Войти"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default RegistrationModal;