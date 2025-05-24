import express from 'express'
import cors from 'cors'
const app = express();
const PORT = 8000;
app.use(cors());
app.use(express.json());
const products = [{
        id: 1,
        name: "Говяжья вырезка",
        description: "Свежая говяжья вырезка, идеальна для стейков и жаркого.",
        image: "https://e2.edimdoma.ru/data/ingredients/0000/1330/1330-ed4_wide.jpg?1533539128",
        price: 650,
        discount: 15,
        category: "meat",
    },
    {
        id: 2,
        name: "Куриное филе",
        description: "Нежное куриное филе без кожи и костей.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2dtHUZ9R1XjuDRVLjkYS9i67z2-WwRC6ydQ&s",
        price: 350,
        discount: null,
        category: "meat",
    },
    {
        id: 3,
        name: "Свиная шея",
        description: "Сочная свиная шея для гриля и запекания.",
        image: "https://cdn.food.ru/unsigned/fit/640/480/ce/0/czM6Ly9tZWRpYS9waWN0dXJlcy9wcm9kdWN0cy8zMjIvY292ZXJzL2dQZ1NrQy5qcGc.jpg",
        price: 480,
        discount: 10,
        category: "meat",
    },
    {
        id: 4,
        name: "Фарш говяжий",
        description: "Фарш из свежей говядины, подходит для котлет и фрикаделек.",
        image: "https://e0.edimdoma.ru/data/ingredients/0000/1285/1285-ed4_wide.jpg?1533138141",
        price: 400,
        discount: null,
        category: "meat",
    },
    {
        id: 5,
        name: "Индейка (грудка)",
        description: "Диетическое мясо индейки, низкокалорийное и богатое белком.",
        image: "https://www.indilight.ru/upload/resize_cache/iblock/22b/568_679_2/ntbumkba786fc28sl7xwecjy5yxk3fms.jpg",
        price: 420,
        discount: null,
        category: "meat",
    },
    {
        id: 6,
        name: "Молоко 3,2%",
        description: "Свежее пастеризованное молоко.",
        image: "https://vostok-moloko.kz/assets/template/files/images/katalog/moloko/moloko-3,2-peht.jpg",
        price: 80,
        discount: 5,
        category: "dairy",
    },
    {
        id: 7,
        name: "Творог 9%",
        description: "Натуральный творог с высоким содержанием белка.",
        image: "https://kmkk.ru/upload/iblock/937/k476zceifl0kikeurrwrdcypt9afgp47.jpg",
        price: 120,
        discount: null,
        category: "dairy",
    },
    {
        id: 8,
        name: "Сыр Гауда",
        description: "Голландский сыр с нежным сливочным вкусом.",
        image: "https://backend.magnit.tj/uploads/images/75ea036cef2215cad022813f8335f752-1024x1024.jpg",
        price: 350,
        discount: 20,
        category: "dairy",
    },
    {
        id: 9,
        name: "Йогурт греческий",
        description: "Густой йогурт без добавок, богатый белком.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhKRP-KxA427J2FdMMVGkaGgMkslOAcFeYPA&s",
        price: 90,
        discount: null,
        category: "dairy",
    },
    {
        id: 10,
        name: "Сметана 20%",
        description: "Натуральная сметана для заправки и выпечки.",
        image: "https://example.com/sour_cream.jpg",
        price: 70,
        discount: null,
        category: "dairy",
    },
    {
        id: 11,
        name: "Яблоки Гренни Смит",
        description: "Зелёные яблоки с кисло-сладким вкусом.",
        image: "https://marr.ru/upload/resize_cache/webp/iblock/b94/az559al8h5d7ikaotseum00zf17hts4z.webp",
        price: 150,
        discount: 10,
        category: "fruits",
    },
    {
        id: 12,
        name: "Бананы",
        description: "Спелые бананы, богатые калием.",
        image: "https://static.insales-cdn.com/images/products/1/2774/299748054/%D0%B1%D0%B0%D0%BD%D0%B0%D0%BD%D1%8B.jpg",
        price: 90,
        discount: null,
        category: "fruits",
    },
    {
        id: 13,
        name: "Помидоры",
        description: "Свежие томаты с насыщенным вкусом.",
        image: "https://e3.edimdoma.ru/data/ingredients/0000/2167/2167-ed4_wide.jpg?1482765277",
        price: 200,
        discount: null,
        category: "vegetables",
    },
    {
        id: 14,
        name: "Огурцы",
        description: "Хрустящие огурцы, идеальны для салатов.",
        image: "https://foodcity.ru/storage/products/October2018/eP9jt5L6V510QjjT4a1B.jpg",
        price: 120,
        discount: 5,
        category: "vegetables",
    },
    {
        id: 15,
        name: "Картофель",
        description: "Молодой картофель, подходит для варки и жарки.",
        image: "https://images.gastronom.ru/Qrcd2kD275Wl2bTVuInGJNWTtjsbage70QtvhEb1ZYg/pr:product-cover-image/g:ce/rs:auto:0:0:0/L2Ntcy9hbGwtaW1hZ2VzL2FhZTEyZGI0LTczODMtNDkzNC04Zjc4LTc3OGI1NDA5MTkwNS5qcGc.webp",
        price: 60,
        discount: null,
        category: "vegetables",
    },
    {
        id: 16,
        name: "Морковь",
        description: "Свежая морковь, богатая витаминами.",
        image: "https://cdnn21.img.ria.ru/images/07e5/03/17/1602534385_239:0:1091:852_1920x0_80_0_0_b21bbcc0f0e7fababf552ddb2e108637.jpg",
        price: 50,
        discount: null,
        category: "vegetables",
    },
    {
        id: 17,
        name: "Апельсины",
        description: "Сочные апельсины с высоким содержанием витамина C.",
        image: "https://images.gastronom.ru/79bcsAhEUFs2rOXBK8xz6pD9mmkHLfpEYCChtj9wN8I/pr:product-cover-image/g:ce/rs:auto:0:0:0/L2Ntcy9hbGwtaW1hZ2VzLzQxNDMwYmQwLThiZmUtNDJkYi04MTdjLTQzYmUzOTRjNWM0OS5qcGc.webp",
        price: 180,
        discount: 15,
        category: "fruits",
    },
    {
        id: 18,
        name: "Клубника",
        description: "Свежая клубника, сладкая и ароматная.",
        image: "https://calorizator.ru/sites/default/files/imagecache/product_512/product/strawberry-1.jpg",
        price: 300,
        discount: null,
        category: "fruits",
    },
    {
        id: 19,
        name: "Брокколи",
        description: "Полезная брокколи, богатая клетчаткой.",
        image: "https://ss.sport-express.ru/userfiles/materials/192/1927192/full.jpg",
        price: 220,
        discount: 10,
        category: "vegetables",
    },
    {
        id: 20,
        name: "Виноград",
        description: "Сладкий виноград без косточек.",
        image: "https://images.gastronom.ru/ZuZIpfaWAUpb74OY3jCbtQjJeQMO7jDgO09lp77qpe4/pr:product-cover-image/g:ce/rs:auto:0:0:0/L2Ntcy9hbGwtaW1hZ2VzL2ZlMDU1Y2ExLTA2MTMtNDAzOC1hMjc1LTI0NDBhZmYxM2Y4ZC5qcGc.webp",
        price: 250,
        discount: null,
        category: "fruits",
    },
];

let nextId = Math.max(...products.map(p => p.id)) + 1;

app.get("/api", (req, res) => {
    res.json(products);
});

app.post("/api", (req, res) => {
    const newProduct = {
        id: nextId++,
        ...req.body
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

app.put("/api/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Товар не найден" });
    }

    products[index] = { ...products[index], ...req.body };
    res.json(products[index]);
});

app.delete("/api/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Товар не найден" });
    }

    const deletedProduct = products.splice(index, 1)[0];
    res.json({ message: "Товар удалён", product: deletedProduct });
});

app.listen(PORT, () => {
    console.log(`Сервер работает на http://localhost:${PORT}/api`);
});
