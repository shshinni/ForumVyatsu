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
        <div className="flex items-center gap-20 max-sm:flex-wrap max-sm:justify-center">
          <img src={PhotoMain} className="max-w-96 w-full" alt="Picture Main" />
          <div className="max-sm:text-center">
            <h1 className="font-semibold text-3xl mb-4">Навигатор студента</h1>
            <p className="font-light">
              Форум, который позволит ответить на главные вопросы абитуриентов и
              студентов в рамках университета: “Куда идти? Что делать?”
            </p>
          </div>
        </div>
        <Questions />
      </Container>
    </main>
  );
}
