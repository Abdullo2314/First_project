import React, { useState } from 'react';
import { UserPen, ChevronDown } from 'lucide-react';

function Footer() {
    const [showInfo, setShowInfo] = useState(false);
    const [showSupport, setShowSupport] = useState(false);

    return (
        <div className="bg-[#383838] px-6 py-10 sm:px-0 md:h-[402px]">
            <div className="flex flex-col md:flex-row md:mx-5 lg:mx-[152px] md:justify-between items-start text-white h-full gap-10 sm:gap-0">

                <div className="text-[16px] flex w-full md:w-64 flex-col gap-4">
                    <div className="flex flex-row justify-between sm:flex-col sm:gap-2">
                        <img src="/Group 155.png" className="w-[100px] h-[25px]" alt="Логотип" />
                        <a href="tel:+74997199994">+7 (499) 719-99-94</a>
                    </div>
                    <div className="flex flex-row-reverse justify-between sm:flex-col sm:gap-2">
                        <a href="mailto:info@5kvt.ru">info@5kvt.ru</a>
                        <p>Ежедневно 9:30 - 20:00 (МСК)</p>
                    </div>
                    <p className="w-[245px] text-[#9C9C9C]">
                        117218, г. Москва, пр-кт Нахимовский, дом 30/43, кв. 81
                    </p>
                </div>

                <div className="md:hidden w-full text-[#9C9C9C] text-[16px]">
                    <button
                        onClick={() => setShowInfo(!showInfo)}
                        className="flex justify-between w-full items-center py-2 text-white"
                    >
                        <span className="text-[18px]">Информация</span>
                        <ChevronDown className={`transition-transform ${showInfo ? 'rotate-180' : ''}`} />
                    </button>
                    {showInfo && (
                        <div className="flex flex-col gap-2">
                            <button>Доставка</button>
                            <button>Оплата</button>
                            <button>Производители</button>
                            <button>Подарочные сертификаты</button>
                            <button>Партнерская программа</button>
                            <button>Акции</button>
                            <button>Все товары</button>
                        </div>
                    )}
                </div>

                <div className="hidden md:flex flex-col text-[#9C9C9C] gap-3 text-[16px]">
                    <h4 className="text-white text-[18px] pb-2">Информация</h4>
                    <p>Доставка</p>
                    <p>Оплата</p>
                    <p>Производители</p>
                    <p>Подарочные сертификаты</p>
                    <p>Партнерская программа</p>
                    <p>Акции</p>
                    <p>Все товары</p>
                </div>

                <div className="md:hidden w-full text-[#9C9C9C] text-[16px]">
                    <button
                        onClick={() => setShowSupport(!showSupport)}
                        className="flex justify-between w-full items-center py-2 text-white"
                    >
                        <span className="text-[18px]">Служба поддержки</span>
                        <ChevronDown className={`transition-transform ${showSupport ? 'rotate-180' : ''}`} />
                    </button>
                    {showSupport && (
                        <div className="flex flex-col gap-2">
                            <button>Возврат товара</button>
                            <button>Личный кабинет</button>
                            <button>История заказов</button>
                            <button>Избранное</button>
                            <button>Рассылка</button>
                        </div>
                    )}
                </div>

                <div className="hidden md:flex flex-col text-[#9C9C9C] gap-3 text-[16px]">
                    <h4 className="text-white text-[18px] pb-2">Служба поддержки</h4>
                    <p>Возврат товара</p>
                    <p>Личный кабинет</p>
                    <p>История заказов</p>
                    <p>Избранное</p>
                    <p>Рассылка</p>
                </div>

                <div className="flex flex-col gap-8">
                    <div className="flex gap-2 items-center">
                        <img src="/23-whatsapp.svg" alt="WhatsApp" />
                        <img src="/viber-svgrepo-com 1.svg" alt="Viber" />
                        <p className="text-[16px] text-[#9C9C9C]">Напишите нам</p>
                    </div>

                    <div className="flex items-center bg-[#1074EB] w-[262px] h-[55px] justify-center gap-4">
                        <UserPen />
                        <button>Служба поддержки</button>
                    </div>

                    <div>
                        <p className="text-white mb-2">Принимаем к оплате</p>
                        <div className="flex flex-row gap-2">
                            <img src="/Group 38.png" alt="Visa" />
                            <img src="/Group 39.png" alt="Mastercard" />
                            <img src="/Group 40.png" alt="МИР" />
                            <img src="/Group 41.png" alt="Maestro" />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Footer;