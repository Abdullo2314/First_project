import React, { useState, useEffect } from "react";
import AddProductForm from "./AddProductForm";
import axios from 'axios'

function AdminPanel() {
    const [products, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activePage, setActivePage] = useState("home");
    const [searchQuery, setSearchQuery] = useState("");
    const [editingProduct, setEditingProduct] = useState(null);
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false);

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
    const handleDelete = async (id) => {
        if (confirm("Удалить продукт?")) {
            try {
                await axios.delete(`http://localhost:8000/api/${id}`);
                setProducts((prev) => prev.filter((p) => p.id !== id));
            } catch (error) {
                console.error("Ошибка при удалении продукта:", error);
                alert("Не удалось удалить продукт. Попробуйте позже.");
            }
        }
    };

    const filteredProducts = products.filter((product) => {
        const nameMatch = product?.name?.toLowerCase().includes(searchQuery.toLowerCase()) || false;
        const descriptionMatch = product?.description?.toLowerCase().includes(searchQuery.toLowerCase()) || false;
        const priceMatch =
            (minPrice === "" || product.price >= Number(minPrice)) &&
            (maxPrice === "" || product.price <= Number(maxPrice));

        return (nameMatch || descriptionMatch) && priceMatch;
    });

    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10;
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    return (
        <div className="flex flex-col min-h-screen md:flex-row font-sans">

      <aside
        className={`bg-blue-900 text-white w-full md:w-64 p-6 shadow-lg z-10 md:block`}
      >
        <div className="text-2xl font-bold mb-10">
          <a href="/">
            <img
              src="./public/Group 155.png"
              className="w-[120px] h-[30px]"
              alt="Logo"
            />
          </a>
        </div>
        <ul className="space-y-3 text-base">
          <li
            className={`cursor-pointer px-4 py-2 rounded-lg transition ${
              activePage === "home" ? "bg-blue-600 font-semibold" : "hover:bg-blue-700"
            }`}
            onClick={() => {
              setActivePage("home");
              setSidebarOpen(false);
            }}
          >
            Главная
          </li>
          <li
            className={`cursor-pointer px-4 py-2 rounded-lg transition ${
              activePage === "products" ? "bg-blue-600 font-semibold" : "hover:bg-blue-700"
            }`}
            onClick={() => {
              setActivePage("products");
              setSidebarOpen(false);
            }}
          >
            Таблица продуктов
          </li>
        </ul>
      </aside>

      <main className="flex-1 p-4 sm:p-6 md:p-10 bg-gray-100">
        {activePage === "home" && (
          <div className="text-center mt-24">
            <h1 className="text-3xl sm:text-5xl font-bold text-blue-800">Добро пожаловать!</h1>
            <p className="mt-4 text-gray-600 text-lg">
              Вы на главной странице админ-панели.
            </p>
          </div>
        )}

        {activePage === "products" && (
          <>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
              <h1 className="text-2xl sm:text-4xl font-bold text-blue-900">Продукты</h1>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition w-full sm:w-auto"
              >
                + Добавить продукт
              </button>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-6">
              <input
                type="text"
                placeholder="Поиск..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 shadow-sm w-full sm:max-w-xs"
              />
              <input
                type="number"
                placeholder="Мин. цена"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 shadow-sm w-full sm:w-40"
              />
              <input
                type="number"
                placeholder="Макс. цена"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 shadow-sm w-full sm:w-40"
              />
            </div>

            {isModalOpen && (
              <AddProductForm
                onClose={() => {
                  setIsModalOpen(false);
                  setEditingProduct(null);
                }}
                onProductAdded={setProducts}
                editingProduct={editingProduct}
              />
            )}

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-xl shadow-lg">
                <thead className="bg-blue-500 text-white text-sm uppercase">
                  <tr>
                    <th className="px-4 py-2 text-left">ID</th>
                    <th className="px-4 py-2 text-left">Изображение</th>
                    <th className="px-4 py-2 text-left">Название</th>
                    <th className="px-4 py-2 text-left">Описание</th>
                    <th className="px-4 py-2 text-left">Цена</th>
                    <th className="px-4 py-2 text-left">Действия</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 text-sm sm:text-base">
                  {currentProducts.map((p) => (
                    <tr key={p.id} className="border-b hover:bg-blue-50 transition">
                      <td className="px-4 py-2">{p.id}</td>
                      <td className="px-4 py-2">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="h-12 w-12 sm:h-14 sm:w-14 object-cover rounded-md border"
                        />
                      </td>
                      <td className="px-4 py-2 font-medium">{p.name}</td>
                      <td className="px-4 py-2 text-sm">{p.description}</td>
                      <td className="px-4 py-2 font-semibold">{p.price} ₽</td>
                      <td className="px-4 py-2 space-x-1 sm:space-x-2 flex flex-wrap">
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md text-sm"
                        >
                          Удалить
                        </button>
                        <button
                          onClick={() => {
                            setEditingProduct(p);
                            setIsModalOpen(true);
                          }}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded-md text-sm"
                        >
                          Редактировать
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-center mt-6 gap-2 flex-wrap">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg border ${
                    currentPage === page
                      ? "bg-blue-500 text-white"
                      : "bg-white text-blue-700 hover:bg-blue-100"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
    );
}

export default AdminPanel;
