import {
  createFileRoute,
  redirect,
  useNavigate,
  Link,
} from "@tanstack/react-router";
import lkPhoto from "/lkphoto.svg";
import editInfo from "/edit-info.svg";
import exit from "/exit.svg";
import Container from "../components/Container";
import PostButton from "../components/PostButton";
import GroupButton from "../components/GroupButton";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";

export const Route = createFileRoute("/account")({
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
      throw redirect({ to: "/login" });
    }
  },
  component: Account,
});

function Account() {
  const [groups, setGroups] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const { setUser, user } = useContext(UserContext);
  const navigate = useNavigate();
  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      setIsEdit(false);

      const response = await fetch(
        `http://127.0.0.1:8000/api/users/changename/${event.target.value}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          //body: JSON.stringify({ new_name: event.target.value }),
        }
      );
      console.log(response);
    }
  };
  function onChange(event) {
    console.log(event.target.value);
    setUser((data) => ({ ...data, username: event.target.value }));
  }
  function onClickExit() {
    localStorage.removeItem("token");
    setUser(null);
    navigate({ to: "/" });
  }
  async function onClickSave() {
    if (isEdit) {
      await fetch(
        `http://127.0.0.1:8000/api/users/changename/${user.username}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setIsEdit(false);
    } else {
      setIsEdit(true);
    }
  }
  useEffect(() => {
    getUserGroups();
    getUserPosts();
  }, []);
  async function getUserGroups() {
    const response = await fetch(
      `http://127.0.0.1:8000/api/users/${user.id}/groups/`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.status === 200) {
      const result = await response.json();
      setGroups((items) => [...items, ...result]);
    }
  }
  async function getUserPosts() {
    const response = await fetch(
      `http://127.0.0.1:8000/api/users/${user.id}/posts/`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.status === 200) {
      const result = await response.json();
      setPosts((items) => [...items, ...result]);
      console.log(result);
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
    } catch (error) {
      console.error("Ошибка при удалении:", error.message);
      alert("Не удалось удалить пост");
    }
  }
  return (
    <Container>
      <div className="mb-10">
        <div className="flex items-center gap-10">
          <img
            src={lkPhoto}
            className="max-w-54 w-full"
            alt="Picture Account"
          />
          <div className="bg-[#FFEFF3] rounded-xl flex-1 py-3 px-5">
            <div className="flex justify-between">
              <div className="flex-1">
                {isEdit ? (
                  <div className="mb-1">
                    <input
                      onChange={(event) => onChange(event)}
                      onKeyDown={handleKeyDown}
                      value={user?.username}
                      className="font-semibold text-xl border-2 border-[#FE6B91] focus:border-[#FE6B91] focus:outline-none px-1 rounded"
                      autoFocus
                    />
                  </div>
                ) : (
                  <h1 className="font-semibold text-xl mb-1">
                    {user?.username}
                  </h1>
                )}

                <div className="h-[1px] bg-black/50"></div>
              </div>
              <div className="flex gap-1 ml-4">
                <button onClick={onClickSave}>
                  <img
                    src={editInfo}
                    className="cursor-pointer max-w-6"
                    alt={isEdit ? "Сохранить" : "Редактировать имя"}
                  />
                </button>

                <button onClick={onClickExit}>
                  <img
                    src={exit}
                    className="cursor-pointer max-w-6"
                    alt="Выход из аккаунта"
                  />
                </button>
              </div>
            </div>

            <div className="font-light">
              {user?.is_student ? "Студент" : "Абитуриент"}
            </div>
            <div className="flex justify-end gap-5 mt-5">
              <Link
                href="/createPost"
                className="bg-[#A987DF] rounded-3xl py-1 px-4 cursor-pointer text-sm text-white"
              >
                Добавить пост
              </Link>
              <Link
                href="/createGroup"
                className="bg-[#A987DF] rounded-3xl py-1 px-4 cursor-pointer text-sm text-white"
              >
                Добавить сообщество
              </Link>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-[2fr_1fr] gap-6 mt-10">
          <div className="border-[#8C64D8] border rounded-xl ">
            <div className="flex justify-center">
              <h2 className="border-[#8C64D8] border rounded-xl px-15 py-0.5 my-5 font-medium text-[#8C64D8]">
                Посты
              </h2>
            </div>
            <div className="px-7">
              {posts.map((items) => (
                <PostButton
                  key={items.id}
                  idPost={items.id}
                  name={items.post_name}
                  comments_num={items.comments_num}
                  creation_time={items.creation_time}
                  onDelete={handleDeletePost}
                />
              ))}
            </div>

            {/* <button className="block ml-auto mr-6 mb-2 cursor-pointer">
              <ArrowRightIcon className="size-5 text-[#FA7D9F]" />
            </button> */}
          </div>
          <div className="border-[#8C64D8] border-dashed border rounded-xl bg-[#F6F3FC]">
            <div className="flex justify-center">
              <h2 className="text-[#8C64D8] px-15 py-0.5 my-5 font-medium">
                Сообщества
              </h2>
            </div>
            {groups.map((items) => (
              <GroupButton
                key={items.id}
                idGroup={items.group_id}
                name={items.group_name}
              />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
