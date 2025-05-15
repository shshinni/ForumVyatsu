import React from "react";
import { useCallback, useEffect, useState } from "react";
import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import Container from "../../../components/Container";
import lkPhoto from "/lkphoto.svg";

function formatCreationTime(isoString) {
  const date = new Date(isoString);
  const options = { day: "numeric", month: "long", year: "numeric" };
  return date.toLocaleDateString("ru-RU", options);
}

export const Route = createFileRoute("/post/$postId/")({
  component: Post,
});

function Post() {
  const params = useParams({ strict: false });
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [tags, setTags] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setCurrentUserId(payload.id);
      } catch (error) {
        console.error("Error parsing token:", error);
      }
    }
  }, []);

  const GetPost = useCallback(async () => {
    const response = await fetch(
      `http://127.0.0.1:8000/api/posts/${params.postId}/`,
      { method: "GET" }
    );
    if (response.ok) {
      const result = await response.json();
      setPost(result[0]);
    }
  }, [params.postId]);

  const GetComments = useCallback(async () => {
    const response = await fetch(
      `http://127.0.0.1:8000/api/posts/${params.postId}/comments/`,
      { method: "GET" }
    );
    if (response.ok) {
      const result = await response.json();
      setComments(result);
    }
  }, [params.postId]);

  const GetTags = useCallback(async () => {
    const response = await fetch(
      `http://127.0.0.1:8000/api/posts/${params.postId}/tags/`,
      { method: "GET" }
    );
    if (response.ok) {
      const result = await response.json();
      setTags(result);
    }
  }, [params.postId]);

  const handleDeleteComment = async (commentId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Требуется авторизация!");
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/comments/${commentId}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        await GetComments();
      } else {
        const errorData = await response.json();
        alert(`Ошибка: ${errorData.detail || "Неизвестная ошибка"}`);
      }
    } catch (error) {
      console.error("Ошибка:", error);
      alert("Не удалось соединиться с сервером");
    }
  };

  useEffect(() => {
    async function loadData() {
      await Promise.all([GetPost(), GetComments(), GetTags()]);
    }
    loadData();
  }, [GetPost, GetComments, GetTags]);

  return (
    <Container>
      <div className="flex flex-col items-center bg-white">
        <div className="bg-pink-100 px-5 py-4 rounded-3xl w-full shadow-md">
          <div className="flex justify-between">
            <div className="text-2xl font-bold mb-4">{post.post_name}</div>
            <div>
              {!!post.isUrgently && (
                <span className="bg-pink-400 text-white px-3 py-1 rounded-full text-sm font-light uppercase">
                  Срочно
                </span>
              )}
            </div>
          </div>
          <p className="mb-4">{post.post_text}</p>

          <div className="flex flex-wrap gap-4 mt-8 mb-4">
            {tags?.map((tag) => (
              <div
                key={tag.id}
                className="rounded-2xl px-3 py-2 bg-purple-100 text-purple-800 text-sm flex-shrink-0"
              >
                <span>#{tag.tag_name}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center">
            <div className="inline-block bg-white  rounded-full px-2 py-1 mb-6">
              {formatCreationTime(post.creation_time)}
            </div>
            <Link
              to={"/createComment"}
              search={{ postId: params.postId }}
              className="rounded-2xl bg-pink-300 px-2 py-1 mb-6 text-white font-light"
            >
              Ответить
            </Link>
          </div>
          <div className="flex items-center border-2 border-pink-400 rounded-2xl px-3 py-2 bg-white">
            <img
              src={lkPhoto}
              className="max-w-10 rounded-3xl"
              alt="Picture Account Group"
            />
            <span className="ml-5">{post.user_name}</span>
          </div>
        </div>

        {comments?.map((comment) => (
          <div
            key={comment.id}
            className="bg-[#F6EAFF] mt-8 rounded-2xl w-full px-5 py-4 "
          >
            <div className="flex items-center mb-2">
              <img
                src={lkPhoto}
                className="max-w-10 rounded-3xl"
                alt="Picture Account Group"
              />
              <span className="ml-3">{comment.user_name}</span>
            </div>

            <div className="h-[1px] bg-black/50 "></div>
            <div className="font-light mt-3 mb-2">{comment.comment_text}</div>
            <div className="flex justify-between">
              <div className="bg-white rounded-2xl px-2 py-1">
                {formatCreationTime(comment.creation_time)}
              </div>
              {/* <button>удалить комментарий</button> */}
              {currentUserId === comment.user_id && (
                <button
                  onClick={() => handleDeleteComment(comment.id)}
                  className="rounded-2xl bg-pink-300 px-2 py-1 text-white font-light hover:bg-pink-400 transition-colors"
                >
                  Удалить
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
