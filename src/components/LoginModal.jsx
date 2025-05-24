import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";

function LoginModal({ onClose, onLoginSuccess }) {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("loggedInUser"));
        if (user) onLoginSuccess();
    }, [onLoginSuccess]);

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const loginSchema = z.object({
        email: z.string().email("Некорректный email"),
        password: z.string().min(1, "Введите пароль"),
    });

    const registerSchema = z
        .object({
            name: z.string().min(1, "Введите имя"),
            email: z.string().email("Некорректный email"),
            password: z.string().min(6, "Минимум 6 символов"),
            confirmPassword: z.string().min(6, "Подтвердите пароль"),
        })
        .refine((data) => data.password === data.confirmPassword, {
            message: "Пароли не совпадают",
            path: ["confirmPassword"],
        });

    const {
        register,
        handleSubmit,
        reset,
        setError: setFormError,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(isLoginMode ? loginSchema : registerSchema),
    });

    const onSubmit = (data) => {
        if (isLoginMode) {
            const user = users.find(
                (u) => u.email === data.email && u.password === data.password
            );
            if (!user) {
                setError("Неверный email или пароль");
                return;
            }
            localStorage.setItem("loggedInUser", JSON.stringify(user));
            onLoginSuccess();
            navigate("/")
        } else {
            const emailExists = users.some((u) => u.email === data.email);
            if (emailExists) {
                setError("Email уже используется");
                return;
            }
            const newUser = {
                name: data.name,
                email: data.email,
                password: data.password,
            };
            const updatedUsers = [...users, newUser];
            localStorage.setItem("users", JSON.stringify(updatedUsers));
            localStorage.setItem("loggedInUser", JSON.stringify(newUser));
            onLoginSuccess();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md relative">
                <button onClick={onClose} className="absolute top-2 right-2">
                    <X className="w-5 h-5 text-gray-500 hover:text-black" />
                </button>

                <h2 className="text-2xl font-bold mb-4 text-center">
                    {isLoginMode ? "Вход" : "Регистрация"}
                </h2>

                {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {!isLoginMode && (
                        <div>
                            <label className="block mb-1">Имя</label>
                            <input
                                {...register("name")}
                                className="w-full border p-2 rounded"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm">{errors.name.message}</p>
                            )}
                        </div>
                    )}

                    <div>
                        <label className="block mb-1">Email</label>
                        <input
                            type="email"
                            {...register("email")}
                            className="w-full border p-2 rounded"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm">{errors.email.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block mb-1">Пароль</label>
                        <input
                            type="password"
                            {...register("password")}
                            className="w-full border p-2 rounded"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm">{errors.password.message}</p>
                        )}
                    </div>

                    {!isLoginMode && (
                        <div>
                            <label className="block mb-1">Подтверждение пароля</label>
                            <input
                                type="password"
                                {...register("confirmPassword")}
                                className="w-full border p-2 rounded"
                            />
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
                            )}
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
                            reset();
                        }}
                        className="text-blue-500 underline"
                    >
                        {isLoginMode ? "Зарегистрироваться" : "Войти"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LoginModal;