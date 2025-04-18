import { createFileRoute, redirect } from "@tanstack/react-router";
import { Input } from "../components/Input";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { Link } from "@tanstack/react-router";
import { Controller, useForm } from "react-hook-form";
import { TextArea } from "../components/TextArea";

export const Route = createFileRoute("/createGroup")({
  beforeLoad: async () => {
    const response = await fetch(
      "http://127.0.0.1:8000/api/users/login_check",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.status !== 200) {
      throw redirect({ to: "/" });
    }
  },
  component: CreateGroup,
});

function CreateGroup() {
  const { control, formState, handleSubmit } = useForm({ mode: "onChange" });
  function onsubmit(data) {
    console.log(data);
  }
  return (
    <div className="max-w-md bg-[#FFEFF3] rounded-2xl mx-auto py-15 px-10">
      <h1 className="text-black font-medium text-center uppercase text-sm">
        Новое сообщество
      </h1>
      <form
        onSubmit={handleSubmit((data) => onsubmit(data))}
        className="mx-auto mt-6"
      >
        <Controller
          control={control}
          name="nameGroup"
          defaultValue={""}
          rules={{
            required: "Это поле обязательно",
          }}
          render={({ field }) => (
            <Input
              type="text"
              placeholder="Название сообщества"
              error={formState.errors.nameGroup?.message}
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name="descriptionGroup"
          defaultValue={""}
          rules={{
            required: "Это поле обязательно",
          }}
          render={({ field }) => (
            <TextArea
              type="text"
              rows={10}
              placeholder="Описание сообщества"
              error={formState.errors.descriptionGroup?.message}
              {...field}
            />
          )}
        />

        {/* <div className="flex justify-center mt-10">
          <input className="relative text-white bg-[#FE6B91] rounded-3xl w-full py-2 px-3 cursor-pointer">
            <span className="inline-block w-full text-center">
              Добавить фото
            </span>
            <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 size-5 text-white rotate-270" />
          </input>
        </div> */}
        <input
          type="file"
          placeholder="Добавить фото"
          className="mt-4 p-2.5 text-sm font-light bg-[#FBA9BF] rounded-3xl w-full py-2 px-3 cursor-pointer"
        />
        <div className="flex justify-center mt-10">
          <button className="relative text-white bg-[#FE6B91] rounded-3xl w-full py-2 px-3 cursor-pointer">
            <span className="inline-block w-full text-center">
              Добавить сообщество
            </span>
            <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 size-5 text-white rotate-270" />
          </button>
        </div>
      </form>
    </div>
  );
}
