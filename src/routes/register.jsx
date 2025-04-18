import { createFileRoute } from "@tanstack/react-router";
import { Input } from "../components/Input";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { Link } from "@tanstack/react-router";
import { Controller, useForm } from "react-hook-form";

export const Route = createFileRoute("/register")({
  component: Register,
});

function Register() {
  const { control, formState, handleSubmit, setError } = useForm({
    mode: "onChange",
  });
  async function onsubmit(data) {
    //console.log(data);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/users/create", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "asij@hs.ru", ...data }),
      });
      if (response.status === 409) {
        setError("login", { message: "Логин уже занят" });
      }
      if (response.status === 200) {
        console.log(response);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="px-2 max-w-md bg-[#FFEFF3] rounded-2xl mx-auto py-15">
      <h1 className="text-black font-medium text-center uppercase text-sm">
        Регистрация
      </h1>
      <form
        onSubmit={handleSubmit((data) => onsubmit(data))}
        className="mx-auto mt-6 max-w-[270px]"
      >
        <Controller
          control={control}
          name="user_name"
          defaultValue={""}
          rules={{
            required: "Это поле обязательно",
          }}
          render={({ field }) => (
            <Input
              type="text"
              placeholder="Имя пользователя*"
              error={formState.errors.username?.message}
              {...field}
            />
          )}
        />
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
              placeholder="Логин*"
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
              placeholder="Пароль*"
              error={formState.errors.password?.message}
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name="repeatPassword"
          defaultValue={""}
          rules={{
            required: "Это поле обязательно",
            validate: (value) =>
              value === control._formValues.password || "Пароли не совпадают",
          }}
          render={({ field }) => (
            <Input
              type="password"
              placeholder="Повторите пароль*"
              error={formState.errors.repeatPassword?.message}
              {...field}
            />
          )}
        />
        {/* <Input textPlaceholder={"Email*"} />
        <Input textPlaceholder={"Пароль*"} />
        <Input textPlaceholder={"Повторите пароль*"} />
        <Input textPlaceholder={"Имя пользователя*"} /> */}
        <span className="text-sm block mt-5 text-center">
          К какой категории вы относитесь?*
        </span>
        <div className="flex justify-between mt-3">
          <label className="flex items-center">
            <input
              type="radio"
              name="userType"
              value="applicant"
              className="mr-2 cursor-pointer accent-[#FE6B91]"
              defaultChecked
            />
            <span className="text-sm font-light">Абитуриент</span>
          </label>

          <label className="flex items-center">
            <input
              type="radio"
              name="userType"
              value="student"
              className="mr-2 cursor-pointer accent-[#FE6B91]"
            />
            <span className="text-sm font-light">Студент</span>
          </label>
        </div>
        <div className="flex justify-center mt-10">
          <button className="relative text-white bg-[#FE6B91] rounded-3xl w-full max-w-[260px] py-2 px-3 cursor-pointer">
            <span className="inline-block w-full text-center">
              Зарегистрироваться
            </span>
            <ChevronDownIcon className="absolute right-1 top-1/2 -translate-y-1/2 size-5 text-white rotate-270" />
          </button>
        </div>
      </form>

      <div className="text-center mt-8 font-light text-xs">
        <span>Уже есть аккаунт? </span>

        <Link href="/login" className="underline cursor-pointer">
          Войти
        </Link>
      </div>
    </div>
  );
}
