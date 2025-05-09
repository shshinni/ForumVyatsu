import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { Input } from "../components/Input";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { Link } from "@tanstack/react-router";
import { Controller, useForm } from "react-hook-form";
import { TextArea } from "../components/TextArea";
export const Route = createFileRoute("/createComment")({
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
  validateSearch: (search) => {
    return {
      postId: Number(search?.postId),
    };
  },
  component: CreateComment,
});

function CreateComment() {
  const { postId } = Route.useSearch();
  const navigate = useNavigate();
  const { control, formState, handleSubmit } = useForm({
    mode: "onChange",
  });

  async function onsubmit(data) {
    const newData = {
      ...data,
      post_id: postId,
    };
    try {
      let response = await fetch("http://127.0.0.1:8000/api/comments/create", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newData),
      });

      if (response.status === 200) {
        //const result = await response.json();
        navigate({ to: `/post/${postId}` });
      }

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="max-w-md bg-[#FFEFF3] rounded-2xl mx-auto py-15 px-10">
      <h1 className="text-black font-medium text-center uppercase text-sm">
        Добавить ответ
      </h1>
      <form
        onSubmit={handleSubmit((data) => onsubmit(data))}
        className="mx-auto mt-6"
      >
        <Controller
          control={control}
          name="comment_text"
          defaultValue={""}
          rules={{
            required: "Это поле обязательно",
            maxLength: {
              value: 150,
              message: "Не более 150 символов",
            },
          }}
          render={({ field }) => (
            <TextArea
              type="text"
              rows={10}
              placeholder="Ваш ответ"
              error={formState.errors.description?.message}
              {...field}
            />
          )}
        />

        <div className="flex justify-center mt-10">
          <button className="relative text-white bg-[#FE6B91] rounded-3xl w-full py-2 px-3 cursor-pointer">
            <span className="inline-block w-full text-center">
              Добавить ответ
            </span>
            <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 size-5 text-white rotate-270" />
          </button>
        </div>
      </form>
    </div>
  );
}
