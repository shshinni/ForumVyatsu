import { Link } from "@tanstack/react-router";
import photo from "/programming-background-with-person-working-with-codes-computer.png";

export default function GroupItem({ name, idGroup }) {
  return (
    <div className="mt-7 flex flex-col items-center gap-4 w-full">
      <div className="rounded-3xl w-full h-40 mb-2 border-[#FE6B91] border-2 relative">
        <img
          src={photo}
          className="w-full absolute -bottom-3 -right-2 rounded-3xl rotate-2"
          alt="Picture Account"
        />
      </div>
      <div className="w-full text-center">
        <span className="text-sm break-words px-2 inline-block max-w-full">
          {name}
        </span>
      </div>
      <Link
        href={`/group/${idGroup}`}
        className="bg-[#FE6B91] rounded-3xl px-3 py-1 cursor-pointer"
      >
        <span className="text-sm text-white font-light">Узнать больше</span>
      </Link>
    </div>
  );
}
