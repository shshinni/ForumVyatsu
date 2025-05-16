import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { Controller, useForm } from "react-hook-form";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { Input } from "../components/Input";
import { useState, useEffect } from "react";
import { TextArea } from "../components/TextArea";
import { RadioButton } from "../components/RadioButton";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";

export const Route = createFileRoute("/createPost")({
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
      groupId: Number(search?.groupId),
    };
  },
  component: CreatePost,
});

function CreatePost() {
  const { groupId } = Route.useSearch();
  console.log(groupId);
  const navigate = useNavigate();
  const [isTagsDropdownOpen, setIsTagsDropdownOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const { user } = useContext(UserContext);
  const [tags, setTags] = useState([]);
  useEffect(() => {
    getTags();
  }, []);
  const { control, formState, handleSubmit } = useForm({
    mode: "onChange",

    defaultValues: {
      isUrgently: 0, // Устанавливаем числовое значение по умолчанию
    },
  });
  async function getTags() {
    const response = await fetch(`http://127.0.0.1:8000/api/tags/`, {
      method: "GET",
    });
    if (response.status === 200) {
      const result = await response.json();
      setTags(result);
    }
  }
  async function onSubmit(data) {
    const newData = {
      ...data,
      user_id: user.id,
      group_id: isNaN(groupId) ? 0 : groupId,
    };
    console.log("Отправляемые данные:", newData);
    try {
      let response = await fetch("http://127.0.0.1:8000/api/posts/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newData),
      });

      if (response.status === 200) {
        const result = await response.json();
        selectedTags.forEach(async (tag) => {
          response = await fetch(
            `http://127.0.0.1:8000/api/posts/${result.post_id}/tags/${tag.tag_name}/add/`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
        });

        navigate({ to: `/post/${result.post_id}` });
      }
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="px-2">
      <div className="max-w-md bg-[#FFEFF3] rounded-2xl mx-auto py-15 px-10">
        <h1 className="text-black font-medium text-center uppercase text-sm">
          Новый пост
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mt-6">
          <Controller
            defaultValue={""}
            control={control}
            name="post_text"
            rules={{
              required: "Это поле обязательно",
              maxLength: {
                value: 500,
                message: "Не более 500 символов",
              },
            }}
            render={({ field }) => (
              <TextArea
                rows={10}
                placeholder="Текст поста"
                error={formState.errors.post_text?.message}
                {...field}
                className="bg-[#FFFFFF] w-full p-4 text-Unbounded text-gray-800 rounded-4xl resize-none shadow-[4px_4px_10px_#ffd3d3] focus:outline-none"
              />
            )}
          />

          <Controller
            defaultValue={""}
            control={control}
            name="post_name"
            rules={{
              required: "Это поле обязательно",
              maxLength: {
                value: 50,
                message: "Не более 50 символов",
              },
            }}
            render={({ field }) => (
              <Input
                type="text"
                placeholder="Название темы поста"
                error={formState.errors.post_name?.message}
                {...field}
                className="bg-[#FFFFFF] w-full p-3 text-Unbounded rounded-full shadow-[4px_4px_10px_#ffd3d3] focus:outline-none"
              />
            )}
          />
          <div className="relative mt-4">
            <button
              type="button"
              onClick={() => setIsTagsDropdownOpen(!isTagsDropdownOpen)}
              className="w-full px-3 py-2 bg-purple-100 text-purple-800 rounded-full hover:bg-purple-200 transition-colors text-left "
            >
              Выбрать тег
            </button>

            {isTagsDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-purple-200 rounded-lg shadow-lg p-4 z-10">
                <div className="space-y-2">
                  {tags.map((tag) => (
                    <label
                      key={tag.id}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedTags.some((t) => t.id === tag.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedTags([...selectedTags, tag]);
                          } else {
                            setSelectedTags(
                              selectedTags.filter((t) => t.id !== tag.id)
                            );
                          }
                        }}
                        id={`tag-${tag.id}`}
                        className="
              appearance-none 
              h-5 w-5 
              border-2 border-purple-400 
              rounded 
              relative
              mr-2
              checked:border-purple-600
              checked:bg-purple-100
              checked:after:content-['']
              checked:after:absolute
              checked:after:left-1/2
              checked:after:top-1/2
              checked:after:-translate-x-1/2
              checked:after:-translate-y-1/2
              checked:after:w-2
              checked:after:h-3
              checked:after:border-purple-600
              checked:after:border-r-[1.5px]
              checked:after:border-b-[1.5px]
              checked:after:rotate-45
            "
                      />
                      <span className="text-gray-700 font-light text-sm">
                        {tag.tag_name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {selectedTags.map((tag) => (
              <span
                key={tag.id}
                className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
              >
                #{tag.tag_name}
              </span>
            ))}
          </div>

          <Controller
            control={control}
            name="isUrgently"
            render={({ field }) => (
              <label className="flex items-center space-x-2 cursor-pointer mt-3">
                <input
                  type="checkbox"
                  checked={field.value === 1}
                  onChange={(e) => field.onChange(e.target.checked ? 1 : 0)}
                  className="appearance-none 
              h-5 w-5 
              border-2 border-pink-300 
              rounded 
              relative
              mr-2
              checked:border-pink-500
              checked:bg-pink-100
              checked:after:content-['']
              checked:after:absolute
              checked:after:left-1/2
              checked:after:top-1/2
              checked:after:-translate-x-1/2
              checked:after:-translate-y-1/2
              checked:after:w-2
              checked:after:h-3
              checked:after:border-pink-500
              checked:after:border-r-[1.5px]
              checked:after:border-b-[1.5px]
              checked:after:rotate-45
            "
                />
                <span className="text-sm font-light">
                  Добавить статус "Срочно"
                </span>
              </label>
            )}
          />

          <div className="flex justify-center mt-10">
            <button className="relative text-white bg-[#FE6B91] rounded-3xl w-full py-2 px-3 cursor-pointer">
              <span className="inline-block w-full text-center">
                Добавить пост
              </span>
              <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 size-5 text-white rotate-270" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
