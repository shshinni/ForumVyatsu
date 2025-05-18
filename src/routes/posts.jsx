import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Container from "../components/Container";
import searchIcon from "/searchIcon.svg";
import PostButton from "../components/PostButton";

export const Route = createFileRoute("/posts")({
  component: Posts,
});

function Posts() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [tags, setTags] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    getPosts();
    getTags();
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

  const handleTagToggle = (tagId) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };

  async function filterPostsByTags() {
    if (selectedTags.length === 0) {
      setFilteredPosts(posts);
      return;
    }

    try {
      const params = new URLSearchParams();
      selectedTags.forEach((id) => params.append("tag_ids", id));

      const response = await fetch(
        `http://127.0.0.1:8000/api/posts/by_tags/?${params.toString()}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 404) {
        setFilteredPosts([]);
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setFilteredPosts(result);
    } catch (error) {
      console.error("Ошибка при фильтрации по тегам:", error);
      setFilteredPosts([]);
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
        <div className="grid sm:grid-cols-[3fr_1.5fr] gap-8">
          <div className="flex-1 flex flex-col max-sm:order-2">
            <div className="flex items-center gap-4 mb-20">
              <input
                onChange={onSearchPosts}
                onKeyDown={handleKeyDown}
                type="text"
                placeholder="Поиск"
                className="bg-F6F3FC rounded-3xl p-2.5 text-sm font-light w-full border border-[#A987DF] focus:ring focus:ring-[#A987DF] outline-none"
              />
              <button
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

            <div className="grid grid-cols-[1fr_auto_auto] px-3 py-2 items-center gap-4 text-sm border-2 border-pink-400 rounded-full mb-6 ">
              <span>Тема</span>
              <span>Ответы</span>
              <span>Дата публикации</span>
            </div>

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
            </div>
          </div>

          <div className="max-sm:order-1">
            <h2 className="mb-8 text-center">Популярные теги</h2>
            {tags.map((tag) => (
              <div key={tag.id} className="flex items-center mb-3">
                <input
                  type="checkbox"
                  id={`tag-${tag.id}`}
                  checked={selectedTags.includes(tag.id)}
                  onChange={() => handleTagToggle(tag.id)}
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
            <button
              onClick={filterPostsByTags}
              className="
                w-full 
                mt-4 
                py-2 
                px-4 
                bg-[#B75DF8] 
                text-white 
                rounded-full 
                hover:bg-[#A550E0] 
                transition-colors
                hover:shadow-lg
                cursor-pointer
              "
            >
              Применить
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}
