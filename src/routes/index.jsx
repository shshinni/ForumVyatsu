import { createFileRoute, Link } from "@tanstack/react-router";
import PhotoMain from "/PhotoMain.png";
import Container from "../components/Container";
import Questions from "../components/Questions";
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="">
      <Container>
        <div className="flex items-center gap-20">
          <img src={PhotoMain} className="max-w-96 w-full" alt="Picture Main" />
          <div>
            <h1 className="font-semibold text-3xl mb-4">Навигатор студента</h1>
            <p className="font-light">
              Форум, который позволит ответить на главные вопросы абитуриентов и
              студентов в рамках университета: “Куда идти? Что делать?”
            </p>
          </div>
          {/* <div className="mt-10 flex gap-4"> */}
          {/* <Link
                href="/login"
                className="pl-3 pr-9 py-3 w-48 rounded-2xl text-white bg-[#081F5C] block relative text-center cursor-pointer shadow-[0_4px_4px_rgba(52,78,172,0.25)] hover:shadow-[0_6px_6px_rgba(52,78,172,0.5)]"
              >
                Вход
                <ArrowRightCircleIcon className="size-6 text-white absolute right-2 top-1/2 -translate-y-1/2" />
              </Link> */}
          {/* </div> */}
        </div>
        <Questions />
      </Container>
    </main>
  );
}
