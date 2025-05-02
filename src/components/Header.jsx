import { Link } from "@tanstack/react-router";
import React from "react";
import Container from "./Container";
import LogoVyatsu from "/LogoVyatsu.svg";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";

export default function Header() {
  const { user } = useContext(UserContext);

  return (
    <header className="py-3 mx-2 mt-2 bg-[#B75DF8] rounded-4xl shadow-[0_4px_16px_rgba(152,16,250,0.35)]">
      <Container>
        <div className="flex items-center gap-4 justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img
              src={LogoVyatsu}
              className="logo w-[48px] h-[37px]"
              alt="Vyatsu logo"
            />
            <span className="text-white">Навигатор студента</span>
          </Link>
          <nav className="flex items-center ml-20 py-[5px]">
            <Link
              href="/groups"
              className="ml-20 px-[20px] py-[5px] text-white transition-colors hover:underline cursor-pointer"
            >
              Сообщества
            </Link>
            <Link
              href="/posts"
              className=" text-white transition-colors hover:underline cursor-pointer"
            >
              Посты
            </Link>

            {user ? (
              <Link
                href="/account"
                className="px-[25px] py-[5px] ml-5 rounded-3xl text-black bg-white  transition-colors  hover:shadow-[0_4px_12px_rgba(255,255,255,0.5)] cursor-pointer"
              >
                {user.username}
              </Link>
            ) : (
              <Link
                href="/login"
                className="px-[25px] py-[5px] ml-5 rounded-3xl text-black bg-white transition-colors  hover:shadow-[0_4px_12px_rgba(255,255,255,0.5)] cursor-pointer"
              >
                Вход
              </Link>
            )}
          </nav>

          {/* {textik} */}
        </div>
      </Container>
    </header>
  );
}
