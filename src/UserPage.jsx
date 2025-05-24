import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
    name: z.string().min(1, "Имя обязательно").max(50, "Максимум 50 символов"),
    email: z.string().email("Введите корректный email"),
    password: z
        .string()
        .min(6, "Пароль должен содержать хотя бы 6 символов")
        .max(20, "Пароль не может быть длиннее 20 символов"),
    confirmPassword: z
        .string()
        .min(6, "Пароль должен содержать хотя бы 6 символов")
        .max(20, "Пароль не может быть длиннее 20 символов")
}).refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
});

function UserPage() {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: zodResolver(schema)
    });

    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
        const currentUser = storedUsers.find((user) => user.id === Number(userId));

        if (currentUser) {
            setUser(currentUser);
            setValue("name", currentUser.name);
            setValue("email", currentUser.email);
            setValue("phone", currentUser.phone || "");
            setValue("gender", currentUser.gender || "");
            setValue("birthDate", currentUser.birthDate || "");
            setValue("address", currentUser.address || "");
        }

        setLoading(false);
    }, [userId, setValue]);

    const handleDelete = () => {
        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
        const updatedUsers = storedUsers.filter((user) => user.id !== Number(userId));
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        navigate("/");
    };

    const handleSaveChanges = (data) => {
        try {
            const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
            const updatedUsers = storedUsers.map((storedUser) =>
                storedUser.id === Number(userId) ? { ...storedUser, ...data } :
                storedUser
            );
            localStorage.setItem("users", JSON.stringify(updatedUsers));
            navigate("/");
        } catch (error) {
            setErrorMessage("Произошла ошибка при сохранении данных.");
        }
    };

    if (loading) return <p>Загрузка...</p>;

    return (
            <div className="p-6 max-w-xl mx-auto bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Профиль пользователя</h2>

            {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

            <form onSubmit={handleSubmit(handleSaveChanges)} className="space-y-6">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2">Ф.И.О</label>
                    <input
                        {...register("name")}
                        className="border-2 border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
                    <input
                        {...register("email")}
                        className="border-2 border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2">Пароль</label>
                    <input
                        {...register("password")}
                        type="password"
                        placeholder="Пароль"
                        className="border-2 border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2">Подтверждение пароля</label>
                    <input
                        {...register("confirmPassword")}
                        type="password"
                        placeholder="Подтверждение пароля"
                        className="border-2 border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
                </div>

                {/* Новые поля */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2">Номер телефона</label>
                    <input
                        {...register("phone")}
                        className="border-2 border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2">Пол</label>
                    <select {...register("gender")} className="border-2 border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="male">Мужской</option>
                        <option value="female">Женский</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2">Дата рождения</label>
                    <input
                        {...register("birthDate")}
                        type="date"
                        className="border-2 border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2">Адрес</label>
                    <textarea
                        {...register("address")}
                        rows="4"
                        className="border-2 border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                </div>

                <div className="flex space-x-4">
                    <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-200">
                        Сохранить изменения
                    </button>
                    <button
                        onClick={() => setIsDeleteModalOpen(true)}
                        className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition duration-200"
                    >
                        Удалить пользователя
                    </button>
                </div>
            </form>

            {isDeleteModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-md w-1/3">
                        <h3 className="text-xl font-semibold mb-4">Подтвердите удаление</h3>
                        <p>Вы уверены, что хотите удалить этого пользователя?</p>
                        <div className="mt-4 flex justify-end space-x-4">
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                            >
                                Отмена
                            </button>
                            <button
                                onClick={handleDelete}
                                className="bg-red-500 text-white px-6 py-2 rounded-md"
                            >
                                Удалить
                            </button>
                        </div>
                    </div> 
        </div>
        )
} 
</div>
);
}

export default UserPage;