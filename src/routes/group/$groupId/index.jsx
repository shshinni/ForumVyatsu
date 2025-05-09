import {
  createFileRoute,
  useParams,
  useNavigate,
  Link,
} from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import Container from "../../../components/Container";
import PostButton from "../../../components/PostButton";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import photo from "/programming-background-with-person-working-with-codes-computer.jpg";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";

export const Route = createFileRoute("/group/$groupId/")({
  component: Group,
});

function Group() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const params = useParams({ strict: false });
  const { user } = useContext(UserContext);
  const [group, setGroup] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [isFollow, setIsFollow] = useState(false);

  const getGroup = useCallback(async () => {
    const response = await fetch(
      `http://127.0.0.1:8000/api/groups/${params.groupId}/`,
      {
        method: "GET",
      }
    );
    if (response.status === 200) {
      const result = await response.json();
      setGroup((item) => ({ ...item, ...result }));
    }
  }, [params.groupId]);
  const getMembers = useCallback(async () => {
    const response = await fetch(
      `http://127.0.0.1:8000/api/groups/${params.groupId}/members/`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.status === 200) {
      const result = await response.json();
      setIsAdmin(
        result.some((item) => item.user_id === user?.id && item.role_id === 1)
      );
    }
  }, [params.groupId, user?.id]);
  const getUserGroups = useCallback(async () => {
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

      setIsFollow(
        result.some((item) => item.group_id === Number(params.groupId))
      );
    }
  }, [user?.id, params.groupId]);
  const getPosts = useCallback(async () => {
    const response = await fetch(
      `http://127.0.0.1:8000/api/groups/${params.groupId}/posts`
    );
    if (response.status === 200) {
      setPosts(await response.json());
    }
  }, [params.groupId]);
  useEffect(() => {
    async function query() {
      await getGroup();
      if (user?.id) {
        await getUserGroups();
      }

      await getMembers();
      await getPosts();
    }
    query();
  }, [getGroup, getUserGroups, getMembers, getPosts, user?.id]);

  async function onClickFollow() {
    const response = await fetch(
      "http://127.0.0.1:8000/api/groups/members/join",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ user_id: user?.id, group_id: params.groupId }),
      }
    );
    if (response.status === 200) {
      setIsFollow(true);
    }
  }
  async function onDelete() {
    const response = await fetch(
      `http://127.0.0.1:8000/api/groups/${params.groupId}`,
      {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.status === 200) {
      navigate({ to: `/groups` });
    }
  }
  async function onClickLeft() {
    const response = await fetch(
      "http://127.0.0.1:8000/api/groups/members/left",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ user_id: user?.id, group_id: params.groupId }),
      }
    );
    if (response.status === 200) {
      setIsFollow(false);
    }
  }

  return (
    <Container>
      <div>
        <div className="grid grid-cols-[auto_1fr] gap-10">
          <img src={photo} className="rounded-3xl" alt="Picture Account" />
          <div className="bg-[#FFEFF3] rounded-xl flex-1 py-3 px-5">
            <div className="flex justify-between">
              <div className="flex-1">
                <h1 className="font-semibold text-xl mb-1">
                  {group.group_name}
                </h1>

                <div className="h-[1px] bg-black/50"></div>
              </div>
            </div>

            <div className="font-light mt-5">{group.description}</div>
            <div className="flex justify-end gap-5 mt-9">
              {user?.id &&
                !isAdmin &&
                (isFollow ? (
                  <button
                    onClick={onClickLeft}
                    className="text-[#A987DF] rounded-3xl py-1 px-4 cursor-pointer text-sm bg-white border border-[#A987DF]"
                  >
                    Отписаться
                  </button>
                ) : (
                  <button
                    onClick={onClickFollow}
                    className="bg-[#A987DF] rounded-3xl py-1 px-4 cursor-pointer text-sm text-white"
                  >
                    Подписаться
                  </button>
                ))}
              {user?.id && isFollow && (
                <Link
                  to={"/createPost"}
                  search={{ groupId: params.groupId }}
                  className="bg-[#A987DF] rounded-3xl py-1 px-4 cursor-pointer text-sm text-white"
                >
                  Добавить пост
                </Link>
              )}
              {user?.id && isAdmin && (
                <button
                  onClick={onDelete}
                  className="bg-[#A987DF] rounded-3xl py-1 px-4 cursor-pointer text-sm text-white"
                >
                  Удалить сообщество
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="border-[#8C64D8] border rounded-xl mt-15">
          <div className="flex justify-center">
            <h2 className="border-[#8C64D8] border rounded-xl px-15 py-0.5 my-5 font-medium text-[#8C64D8]">
              Посты сообщества
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
              />
            ))}
          </div>

          <button className="block ml-auto mr-6 mb-2 cursor-pointer">
            <ArrowRightIcon className="size-5 text-[#FA7D9F]" />
          </button>
        </div>
      </div>
    </Container>
  );
}
