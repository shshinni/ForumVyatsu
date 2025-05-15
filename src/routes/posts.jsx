import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Container from "../components/Container";
import searchIcon from "/searchIcon.svg";
import PostButton from "../components/PostButton";
import { Link } from "@tanstack/react-router";
import GroupItem from "../components/GroupItem";

export const Route = createFileRoute("/posts")({
  component: Posts,
});

import React from "react";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [tags, setTags] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    getPosts();
    getTags();
    // Получаем ID текущего пользователя из токена
    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setCurrentUserId(payload.id);
    }
  }, []);

  async function getPosts() {
    const response = await fetch(`http://127.0.0.1:8000/api/posts/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.status === 200) {
      const result = await response.json();
      setPosts((items) => [...items, ...result]);
      setFilteredPosts((items) => [...items, ...result]);
    }
  }
  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      searchPosts();
    }
  };
  function searchPosts() {
    const newPosts = posts.filter((post) =>
      post.post_name.toLowerCase().includes(searchString)
    );
    setFilteredPosts(newPosts);
  }
  function onSearchPosts(event) {
    setSearchString(event.target.value.toLowerCase());
  }
  async function getTags() {
    const response = await fetch(`http://127.0.0.1:8000/api/tags/`, {
      method: "GET",
    });
    if (response.status === 200) {
      const result = await response.json();
      setTags(result);
    }
  }
  async function handleDeletePost(postId) {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/posts/${postId}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Ошибка удаления");
      }

      // Обновляем оба состояния
      setPosts((prev) => prev.filter((post) => post.id !== postId));
      setFilteredPosts((prev) => prev.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Ошибка при удалении:", error.message);
      alert("Не удалось удалить пост");
    }
  }
  return (
    <Container>
      <div className="min-h-screen flex flex-col bg-white p-4">
        {/* Главная сетка */}
        <div className="w-full max-w-6xl mx-auto flex gap-8">
          {/* Левая часть: Поиск + Темы */}
          <div className="flex-1 flex flex-col">
            {/* Поиск */}
            <div className="flex items-center gap-4 mb-20">
              <input
                onChange={onSearchPosts}
                onKeyDown={handleKeyDown}
                type="text"
                placeholder="Поиск"
                className="bg-F6F3FC rounded-3xl p-2.5 text-sm font-light w-full border border-[#A987DF] focus:ring focus:ring-[#A987DF] outline-none"
              />

              <button
                //onClick={() => console.log()}
                onClick={searchPosts}
                className="w-10 h-10 flex items-center justify-center p-0 border-none bg-transparent cursor-pointer"
                type="button"
              >
                <img
                  src={searchIcon}
                  alt="Поиск"
                  className="cursor-pointer max-w-7"
                />
              </button>
            </div>

            {/* Заголовки */}
            <div className="grid grid-cols-[1fr_auto_auto] px-3 py-2 items-center gap-4 text-sm border-2 border-pink-400 rounded-full mb-6 ">
              {/* Левая часть: Тема */}
              <span>Тема</span>
              <span>Ответы</span>
              <span>Дата публикации</span>
            </div>

            {/* Карточки тем */}

            <div className="space-y-4">
              {filteredPosts?.length ? (
                filteredPosts.map((items) => (
                  <PostButton
                    key={items.id}
                    idPost={items.id}
                    name={items.post_name}
                    comments_num={items.comments_num}
                    creation_time={items.creation_time}
                    onDelete={handleDeletePost}
                    isAuthor={items.user_id === currentUserId}
                  />
                ))
              ) : (
                <div className="text-sm font-light">Посты не найдены</div>
              )}
              {/* <button className="block ml-auto mr-6 mb-2 cursor-pointer">
                            <ArrowRightIcon className="size-5 text-[#FA7D9F]" />
                          </button> */}
            </div>

            {/* Стрелочка */}
            {/* <div className="flex justify-end mt-4">
            <button
              onClick={() => console.log()}
              className="w-8 h-8 flex items-center justify-center bg-transparent border-none cursor-pointer"
              type="button"
            >
              
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#FE6B91"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-8 h-8"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>*/}
          </div>
          {/* Правая панель: Недавние темы и Популярные теги */}
          {/* <div className="w-72 flex flex-col">
            {/* Недавние темы 
            <div className="border-2 border-dashed border-purple-400 p-4 rounded-lg mb-7">
              <h2 className="font-family mb-4 text-center">Недавние темы</h2>
              {["ИВТ", "ИВТ", "ИВТ"].map((tag, idx) => (
                <div
                  key={idx}
                  className="p-2 border-1 border-purple-400 rounded-full my-2 text-left"
                >
                  {tag}
                </div>
              ))}
            </div> */}
          {/* Популярные теги */}
          <div className="w-72">
            <h2 className="mb-8 text-center">Популярные теги</h2>
            {tags.map((tag) => (
              <div key={tag.id} className="flex items-center mb-3">
                {/* Кастомный квадратный чекбокс */}
                <input
                  type="checkbox"
                  id={`tag-${tag.id}`}
                  className="
          appearance-none 
          h-7 w-7 
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
                <label
                  htmlFor={`tag-${tag.id}`}
                  className="flex-1 py-1 border-2 border-purple-400 rounded-full text-sm font-light pl-3 cursor-pointer"
                >
                  {tag.tag_name}
                </label>
              </div>
            ))}
          </div>
        </div>
        {/* </div> */}
      </div>
    </Container>
  );
}
