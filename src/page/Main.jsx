import React, { useState } from 'react';
import { ArrowRight, HandCoins, ArrowLeft, ShieldPlus, UserPen, ShoppingCart } from 'lucide-react';
import ProductsCard from '../components/ProductsCard';
import ProductsSell from '../components/ProductsSell';

const features = [{
        icon: <ShoppingCart className="stroke-orange-500" />,
        title: 'Удобная доставка 24/7',
        description: 'Мы работаем с проверенными транспортными компаниями',
    },
    {
        icon: <HandCoins className="stroke-orange-500" />,
        title: 'Оплата любым способом',
        description: '7 способов оплаты для вашего удобства',
    },
    {
        icon: <ShieldPlus className="stroke-orange-500" />,
        title: 'Гарантия качества',
        description: 'Перед покупкой мы надежно проверяем товар',
    },
    {
        icon: <UserPen className="stroke-orange-500" />,
        title: 'Онлайн поддержка',
        description: 'Менеджеры оперативно ответят на звонок или заявку',
    },
];

function Main() {
    const [current, setCurrent] = useState(0);

    const next = () => setCurrent((prev) => (prev + 1) % features.length);
    const prev = () => setCurrent((prev) => (prev - 1 + features.length) % features.length);

    return (
        <div className="max-w-[375px] sm:max-w-[640px] md:max-w-[768px] md:mx-4 lg:mx-4 xl:mx-auto lg:max-w-[1140px] mx-auto">
      <div className="flex flex-row bg-[#EEF1F8] m-auto relative rounded-[20px] overflow-hidden justify-center mt-4">
        <h2 className="absolute text-white text-2xl sm:text-7xl w-4 md:w-[400px] left-[20px] sm:left-[150px] top-[120px] flex">
          Самые лучшие Мандарины
        </h2>
        <img src="./OIP.jpg" className="sm:w-full sm:h-[600px]" alt="" />
      </div>

      <ProductsCard />
      <ProductsSell />

      <div>
        <h2 className="text-3xl my-10 text-center md:text-left">Наши преимущества</h2>

        <div className="hidden md:flex flex-row sm:max-w-[1140px] m-auto my-14 justify-between">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col gap-4 items-center justify-center w-[263px] h-[250px] bg-[#F7F7F7]"
            >
              <div className="flex items-center justify-center w-[80px] h-[80px] bg-orange-200 rounded-full">
                {feature.icon}
              </div>
              <h4 className="text-[18px] text-center">{feature.title}</h4>
              <p className="text-center text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="md:hidden relative flex flex-col items-center my-10">
          <div className="w-[263px] h-[250px] bg-[#F7F7F7] flex flex-col items-center justify-center gap-4">
            <div className="flex items-center justify-center w-[80px] md:w-[300px] md:h-[300 px] h-[80px] bg-orange-200 rounded-full">
              {features[current].icon}
            </div>
            <h4 className="text-[18px] text-center">{features[current].title}</h4>
            <p className="text-center text-gray-600">{features[current].description}</p>
          </div>

          <div className="flex gap-8 mt-6">
            <button onClick={prev}>
              <ArrowLeft className="w-10 h-10 text-orange-500" />
            </button>
            <button onClick={next}>
              <ArrowRight className="w-10 h-10 text-orange-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
    );
}

export default Main;