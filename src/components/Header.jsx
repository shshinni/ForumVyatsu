import { Link } from "@tanstack/react-router";
import React from "react";
import Container from "./Container";
import LogoVyatsu from "/LogoVyatsu.svg";
import { UserContext } from "../context/UserContext";
import { useContext, useState } from "react";

export default function Header() {
  const { user } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="py-3 mx-2 mt-2 bg-[#B75DF8] rounded-4xl shadow-[0_4px_16px_rgba(152,16,250,0.35)]">
      <Container>
        <div className="flex items-center gap-4 justify-between flex-wrap">
          <Link href="/" className="flex items-center gap-2">
            <img
              src={LogoVyatsu}
              className="logo w-[48px] h-[37px]"
              alt="Vyatsu logo"
            />
            <span className="text-white">Навигатор студента</span>
          </Link>

          {/* Кнопка бургера для мобильных */}
          <button
            onClick={toggleMenu}
            className="sm:hidden text-white focus:outline-none"
            aria-label="Меню"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Основное меню - скрывается на мобильных */}
          <nav className="hidden sm:flex items-center py-[5px] flex-wrap space-x-2">
            <Link
              href="/groups"
              className="px-[20px] py-[5px] text-white transition-colors hover:underline cursor-pointer"
            >
              Сообщества
            </Link>
            <Link
              href="/posts"
              className="text-white transition-colors hover:underline cursor-pointer"
            >
              Посты
            </Link>

            {user ? (
              <Link
                href="/account"
                className="px-[25px] py-[5px] rounded-3xl text-black bg-white transition-colors hover:shadow-[0_4px_12px_rgba(255,255,255,0.5)] cursor-pointer"
              >
                {user.username}
              </Link>
            ) : (
              <Link
                href="/login"
                className="px-[25px] py-[5px] ml-5 rounded-3xl text-black bg-white transition-colors hover:shadow-[0_4px_12px_rgba(255,255,255,0.5)] cursor-pointer"
              >
                Вход
              </Link>
            )}
          </nav>
        </div>

        {/* Мобильное меню - появляется при клике на бургер */}
        {isMenuOpen && (
          <div className="sm:hidden mt-3 pb-2 space-y-2">
            <Link
              href="/groups"
              className="block px-4 py-2 text-white transition-colors hover:underline cursor-pointer"
              onClick={toggleMenu}
            >
              Сообщества
            </Link>
            <Link
              href="/posts"
              className="block px-4 py-2 text-white transition-colors hover:underline cursor-pointer"
              onClick={toggleMenu}
            >
              Посты
            </Link>
            {user ? (
              <Link
                href="/account"
                className="block px-4 py-2 rounded-3xl text-black bg-white transition-colors hover:shadow-[0_4px_12px_rgba(255,255,255,0.5)] cursor-pointer"
                onClick={toggleMenu}
              >
                {user.username}
              </Link>
            ) : (
              <Link
                href="/login"
                className="block px-4 py-2 rounded-3xl text-black bg-white transition-colors hover:shadow-[0_4px_12px_rgba(255,255,255,0.5)] cursor-pointer"
                onClick={toggleMenu}
              >
                Вход
              </Link>
            )}
          </div>
        )}
      </Container>
    </header>
  );
}
