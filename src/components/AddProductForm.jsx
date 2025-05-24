import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";

const categories = [
    { name: "Молочная продукция", value: "dairy" },
    { name: "Мясная продукция", value: "meat" },
    { name: "Овощи", value: "vegetables" },
    { name: "Фрукты", value: "fruits" },
];

const productSchema = z.object({
    name: z.string().min(1, "Название обязательно"),
    description: z.string().min(1, "Описание обязательно"),
    price: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) >= 0, {
        message: "Цена должна быть положительным числом",
    }),
    image: z.string().url("Введите корректный URL изображения"),
    category: z.enum(["dairy", "meat", "vegetables", "fruits"], {
        message: "Выберите корректную категорию",
    }),
    discount: z.boolean().optional(),
});

function AddProductForm({ onClose, onProductAdded, editingProduct }) {
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: "",
            description: "",
            price: "",
            image: "",
            category: "",
            discount: false,
        },
    });

    useEffect(() => {
        if (!editingProduct) {
            reset();
            return;
        }
        Object.entries(editingProduct).forEach(([key, value]) => {
            if (key in productSchema.shape) {
                setValue(key, String(value || ""));
            }
        });
    }, [editingProduct, setValue, reset]);


    const onSubmit = async (data) => {
        const payload = {
            ...data,
            price: parseFloat(data.price) || 0, // Гарантируем корректное число
            discount: Boolean(data.discount),
        };
    
        console.log("Отправляемые данные:", payload); // Логирование перед отправкой
    
        const url = editingProduct
            ? `http://localhost:8000/api/${editingProduct.id}`
            : "http://localhost:8000/api";
        const method = editingProduct ? "put" : "post";
    
        try {
            const res = await axios({
                method,
                url,
                data: payload,
                headers: { "Content-Type": "application/json" },
            });
    
            console.log("Ответ сервера:", res.data); // Логирование ответа
    
            onProductAdded((prev) =>
                editingProduct
                    ? prev.map((p) => (p.id === res.data.id ? res.data : p))
                    : [...prev, res.data]
            );
    
            reset();
            onClose();
        } catch (error) {
            console.error("Ошибка при отправке:", error.response?.status, error.message);
        }
    };
    
    
    

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl p-8 shadow-xl w-full max-w-md relative">
                <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
                    onClick={() => {
                        reset();
                        onClose();
                    }}
                >
                    &times;
                </button>

                <h2 className="text-2xl font-bold mb-6 text-blue-800">
                    {editingProduct ? "Редактировать продукт" : "Добавить продукт"}
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <Input label="Название" name="name" register={register} error={errors.name} />
                    <Textarea label="Описание" name="description" register={register} error={errors.description} />
                    <Input label="Цена" name="price" register={register} error={errors.price} type="number" step="0.01" />
                    <Input label="Ссылка на изображение" name="image" register={register} error={errors.image} />
                    
                    <div>
                        <select
                            {...register("category")}
                            className="w-full border border-gray-300 rounded-lg p-2"
                        >
                            <option value="">Выберите категорию</option>
                            {categories.map((cat) => (
                                <option key={cat.value} value={cat.value}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                        {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
                    </div>

                    <div className="flex items-center gap-2">
                        <input type="checkbox" {...register("discount")} />
                        <label htmlFor="discount">Товар по акции (SELL)</label>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
                    >
                        {editingProduct ? "Сохранить изменения" : "Добавить продукт"}
                    </button>
                </form>
            </div>
        </div>
    );
}

const Input = ({ label, name, register, error, type = "text", step }) => (
    <div>
        <input
            type={type}
            placeholder={label}
            step={step}
            {...register(name)}
            className="w-full border border-gray-300 rounded-lg p-2"
        />
        {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
);

const Textarea = ({ label, name, register, error }) => (
    <div>
        <textarea
            placeholder={label}
            {...register(name)}
            className="w-full border border-gray-300 rounded-lg p-2"
        />
        {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
);

export default AddProductForm;
