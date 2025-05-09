import { createFileRoute } from "@tanstack/react-router";
import { Controller, useForm } from "react-hook-form";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { Input } from "../components/Input";

import { TextArea } from "../components/TextArea";
import { RadioButton } from "../components/RadioButton";

export const Route = createFileRoute("/groupApproval")({
  //   beforeLoad: async () => {
  //     const response = await fetch(
  //       "http://127.0.0.1:8000/api/users/login_check",
  //       {
  //         method: "GET",
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     );
  //     if (response.status !== 200) {
  //       throw redirect({ to: "/" });
  //     }
  //   },
  //   validateSearch: (search) => {
  //     return {
  //       groupId: Number(search?.groupId),
  //     };
  //   },
  component: GroupApproval,
});

function GroupApproval() {
  const { control, formState } = useForm({
    mode: "onChange",
    defaultValues: {
      group_name: "название группы",
      group_description: "название группы",
    },
  });

  return (
    <div className="max-w-md bg-[#FFEFF3] rounded-2xl mx-auto py-15 px-10">
      <h1 className="text-black font-medium text-center uppercase text-sm">
        Заявка на одобрение сообщества
      </h1>

      <form className="mx-auto mt-6">
        <Controller
          defaultValue={"название"}
          control={control}
          name="group_name"
          //   rules={{
          //     required: "Это поле обязательно",
          //     maxLength: {
          //       value: 50,
          //       message: "Не более 50 символов",
          //     },
          //   }}
          render={({ field }) => (
            <Input
              type="text"
              //   placeholder="Название темы поста"
              error={formState.errors.post_title?.message}
              {...field}
              readOnly
              className="bg-[#FFFFFF] w-full p-3 text-Unbounded rounded-full shadow-[4px_4px_10px_#ffd3d3] focus:outline-none"
            />
          )}
        />
        <Controller
          defaultValue={"описание"}
          control={control}
          name="group_description"
          //   rules={{
          //     required: "Это поле обязательно",
          //     maxLength: {
          //       value: 500,
          //       message: "Не более 500 символов",
          //     },
          //   }}
          render={({ field }) => (
            <TextArea
              rows={7}
              //   placeholder="Текст поста : Ваш вопрос или история и #тег"
              error={formState.errors.post_content?.message}
              {...field}
              readOnly
              className="bg-[#FFFFFF] w-full p-4 text-Unbounded text-gray-800 rounded-4xl resize-none shadow-[4px_4px_10px_#ffd3d3] focus:outline-none"
            />
          )}
        />

        <div className="flex justify-between mt-10 gap-8">
          <button className="relative text-white bg-[#FE6B91] rounded-3xl w-full py-2 px-3 cursor-pointer">
            <span className="inline-block w-full text-center">Дa</span>
            <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 size-5 text-white rotate-270" />
          </button>
          <button className="relative text-white bg-[#FE6B91] rounded-3xl w-full py-2 px-3 cursor-pointer">
            <span className="inline-block w-full text-center">Нет</span>
            <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 size-5 text-white rotate-270" />
          </button>
        </div>
      </form>
    </div>
  );
}
