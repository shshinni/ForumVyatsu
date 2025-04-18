import { createFileRoute } from "@tanstack/react-router";
import Container from "../components/Container";
import PostButton from "../components/PostButton";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import photo from "/programming-background-with-person-working-with-codes-computer.jpg";

export const Route = createFileRoute("/group")({
  component: Group,
});

function Group() {
  return (
    <Container>
      <div>
        <div className="grid grid-cols-[auto_1fr] gap-10">
          <img src={photo} className="rounded-3xl" alt="Picture Account" />
          <div className="bg-[#FFEFF3] rounded-xl flex-1 py-3 px-5">
            <div className="flex justify-between">
              <div className="flex-1">
                <h1 className="font-semibold text-xl mb-1">
                  Название сообщества
                </h1>

                <div className="h-[1px] bg-black/50"></div>
              </div>
            </div>

            <div className="font-light mt-5">Описание</div>
            <div className="flex justify-end gap-5 mt-9">
              <button className="bg-[#A987DF] rounded-3xl py-1 px-4 cursor-pointer text-sm text-white">
                Подписаться
              </button>
              <a
                href="/createGroup"
                className="bg-[#A987DF] rounded-3xl py-1 px-4 cursor-pointer text-sm text-white"
              >
                Добавить пост
              </a>
            </div>
          </div>
        </div>
        <div className="border-[#8C64D8] border rounded-xl mt-15">
          <div className="flex justify-center">
            <h2 className="border-[#8C64D8] border rounded-xl px-15 py-0.5 my-5 font-medium text-[#8C64D8]">
              Посты сообщества
            </h2>
          </div>
          <PostButton />
          <button className="block ml-auto mr-6 mb-2 cursor-pointer">
            <ArrowRightIcon className="size-5 text-[#FA7D9F]" />
          </button>
        </div>
      </div>
    </Container>
  );
}
