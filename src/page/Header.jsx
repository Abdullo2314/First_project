import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Menu, X } from "lucide-react";
import SearchInput from "./SearchInput";
import RegistrationModal from "../components/RegistrationModal";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";

function Header() {
  const { addToCart } = useCart();
    const { totalCount } = useCart();
    const { favorites } = useFavorites();
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    

    return (
        <header className="w-full shadow-sm">
      <div className="hidden md:flex w-full z-40 fixed top-0 left-0 justify-between items-center bg-[#F7F7F7] px-6 lg:px-[101px] py-2 text-sm text-gray-700">
        <div className="flex gap-4">
          <Link to="/">Доставка и оплата</Link>
          <Link to="/">Контакты</Link>
        </div>
        <div className="flex gap-6">
          <Link to="/favorites" className="relative flex items-center">
            <Heart size={22} className="hover:stroke-blue-500" />
            {favorites.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] rounded-full px-1.5">
                {favorites.length}
              </span>
            )}
          </Link>
          <Link to="/cart" className="relative flex items-center">
            <ShoppingCart size={22} />
            {totalCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] rounded-full px-1.5">
                {totalCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      <div className="flex mt-8 justify-between items-center px-4 py-4 md:px-6 lg:px-[101px]">
        <Link to="/">
          <img
            src="/Group 155.png"
            alt="Logo"
            className="w-[105px] h-[30px] md:w-[144px] md:h-[37px]"
          />
        </Link>

        <a href="tel:+74997199994" className="hidden sm:block text-xs lg:text-lg font-semibold">
          +7 (499) 719-99-94
        </a>

        <div className="flex gap-4 md:hidden items-center">
          <Link to="/favorites" className="relative">
            <Heart size={24} />
            {favorites.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5">
                {favorites.length}
              </span>
            )}
          </Link>
          <Link to="/cart" className="relative">
            <ShoppingCart size={24} />
            {totalCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5">
                {totalCount}
              </span>
            )}
          </Link>
            <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? (
                <X className="bg-blue-500 flex sm:hidden rounded-md stroke-white p-1" size={28} />
                ) : (
                <Menu className="bg-blue-500 flex sm:hidden rounded-md stroke-white p-1" size={28} />
                )}
          </button>
        </div>

        <div className="hidden sm:flex gap-4 items-center">
          <SearchInput />
          <RegistrationModal className="bg-blue-500 w-[37px] h-[40px] stroke-white p-2 rounded" />
        </div>
      </div>

      <nav className="hidden sm:block bg-gray-100">
        <ul className="flex gap-6 items-center justify-center py-3 text-sm font-medium">
          <li><Link to="/catalog">Все продукты</Link></li>
          <li><Link to="/dairy">Молочная продукция</Link></li>
          <li><Link to="/meat">Мясная продукция</Link></li>
          <li><Link to="/vegetables">Овощи</Link></li>
          <li><Link to="/fruits">Фрукты</Link></li>
        </ul>
      </nav>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white sm:hidden flex flex-col px-4 py-6 text-lg gap-4">
            <button className='justify-end flex' onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? (
                <X className="bg-blue-500 flex md:hidden rounded-md stroke-white p-1" size={28} />
                ) : (
                <Menu className="bg-blue-500 flex md:hidden rounded-md stroke-white p-1" size={28} />
                )}
          </button>
          <nav className="flex flex-col gap-4">          
            <Link to="/catalog" onClick={() => setMobileMenuOpen(false)}>Все продукты</Link>
            <Link to="/dairy" onClick={() => setMobileMenuOpen(false)}>Молочная продукция</Link>
            <Link to="/meat" onClick={() => setMobileMenuOpen(false)}>Мясная продукция</Link>
            <Link to="/vegetables" onClick={() => setMobileMenuOpen(false)}>Овощи</Link>
            <Link to="/fruits" onClick={() => setMobileMenuOpen(false)}>Фрукты</Link>
            <Link to="/admin" onClick={() => setMobileMenuOpen(false)}>Панел админка</Link>
          </nav>
          <div className="mt-auto">
            <SearchInput />
            <div className="mt-4">
              <RegistrationModal className="bg-blue-500 w-full h-[45px] stroke-white p-2 rounded" />
            </div>
          </div>
        </div>
      )}
    </header>
    );
}

export default Header;