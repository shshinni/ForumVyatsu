import { createFileRoute, Navigate, useNavigate } from "@tanstack/react-router";
import { Input } from "../components/Input";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { Link } from "@tanstack/react-router";
import { Controller, useForm } from "react-hook-form";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
  const { control, formState, handleSubmit, setError } = useForm({
    mode: "onChange",
  });

  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  async function onSubmit(data) {
    try {
      let response = await fetch("http://127.0.0.1:8000/api/users/login", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.status === 401) {
        setError("password", { message: "Неверный логин или пароль" });
      }
      if (response.status === 200) {
        let result = await response.json();
        localStorage.setItem("token", result.access_JWT);

        response = await fetch("http://127.0.0.1:8000/api/users/login_check", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.status === 200) {
          result = await response.json();
          setUser(result);
          navigate({ to: "/account" });
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="max-w-md bg-[#FFEFF3] rounded-2xl mx-auto py-15">
      <h1 className="text-black font-medium text-center uppercase text-sm">
        Вход в аккаунт
      </h1>
      <form
        onSubmit={handleSubmit((data) => onSubmit(data))}
        className="max-w-[240px] mx-auto mt-6"
      >
        <Controller
          control={control}
          name="login"
          defaultValue={""}
          rules={{
            required: "Это поле обязательно",
          }}
          render={({ field }) => (
            <Input
              type="text"
              placeholder="Логин"
              error={formState.errors.login?.message}
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          defaultValue={""}
          rules={{
            required: "Это поле обязательно",
            minLength: {
              value: 8,
              message: "Не менее 8 символов",
            },
          }}
          render={({ field }) => (
            <Input
              type="password"
              placeholder="Пароль"
              error={formState.errors.password?.message}
              {...field}
            />
          )}
        />

        <div className="flex justify-center mt-10">
          <button className="relative text-white bg-[#FE6B91] rounded-3xl w-full max-w-[240px] py-2 px-3 cursor-pointer">
            <span className="inline-block w-full text-center">Войти</span>
            <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 size-5 text-white rotate-270" />
          </button>
        </div>
      </form>

      <div className="text-center mt-8 font-light text-xs">
        <a className="cursor-pointer block mb-1">Забыли пароль?</a>
        <br />
        <div>
          <span>Ещё нет аккаунта? </span>
          <Link href="/register" className="underline cursor-pointer">
            Зарегистрироваться
          </Link>
        </div>
      </div>
    </div>
  );
}
