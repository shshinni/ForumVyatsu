import React from "react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/post/$postId/")({
  component: Post,
});

function Post() {
  const post = {
    title: "Что сподвигло Вас пойти на ИВТ?",
    description:
      "Я абитуриент, планирую поступать на специальность “Информатика и вычислительная техника”. Подскажите, пожалуйста, трудно ли учиться на данной специальности и что сподвигло Вас выбрать именно это направление?",
    createdAt: "02.04.2024 в 23:22",
    urgent: true,
    answers: [
      {
        username: "Stsxvl",
        email: "raibcenkonasta18@gmail.com",
        createdAt: "02.04.2024 в 23:22",
      },
      {
        username: "Giraf",
        email: "ttttrrrbbb@gmail.com",
        createdAt: "02.04.2024 в 23:34",
      },
      {
        username: "Ctrreell",
        email: "hhhggfi@yandex.ru",
        createdAt: "02.04.2024 в 23:42",
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white p-8">
      <div className="bg-pink-100 p-8 rounded-3xl w-full max-w-3xl shadow-md">
        <h1 className="text-2xl font-bold mb-4">
          {post.title}
          {post.urgent && (
            <span className="ml-4 bg-pink-400 text-white px-3 py-1 rounded-full text-xs font-bold">
              СРОЧНО
            </span>
          )}
        </h1>
        <p className="mb-4">{post.description}</p>
        <div className="inline-block bg-white px-4 py-1 rounded-full font-bold mb-6">
          {post.createdAt}
        </div>

        {/* Ответы */}
        {post.answers.map((answer, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-2xl shadow-md mb-6 ${
              idx === 0 ? "bg-white" : "bg-purple-100"
            }`}
          >
            <p className="font-semibold">{answer.username}</p>
            <p className="text-gray-500">{answer.email}</p>
            {idx !== 0 && (
              <>
                <div className="mt-2 text-sm">Ответ на вопрос</div>
                <div className="inline-block bg-white px-4 py-1 rounded-full font-bold mt-2">
                  {answer.createdAt}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
