import { createFileRoute } from "@tanstack/react-router";
import Container from "../components/Container";
import searchIcon from "/searchIcon.svg";
import { Link } from "@tanstack/react-router";
import GroupItem from "../components/GroupItem";

export const Route = createFileRoute("/groups")({
  component: Groups,
});

function Groups() {
  return (
    <Container>
      <div className="flex justify-between items-center gap-5 mb-5">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Поиск"
            className="bg-F6F3FC rounded-3xl p-2.5 text-sm font-light w-full border border-[#A987DF] focus:ring focus:ring-[#A987DF] outline-none"
          />
        </div>
        <button>
          <img
            src={searchIcon}
            className="cursor-pointer max-w-7"
            alt="Поиск"
          />
        </button>
      </div>
      <div className="grid-cols-4 grid gap-8 ">
        <GroupItem />
        <GroupItem />
        <GroupItem />
        <GroupItem />
        <GroupItem />
        <GroupItem />
      </div>
    </Container>
  );
}
