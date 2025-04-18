import { Link } from "@tanstack/react-router";
import photo from "/programming-background-with-person-working-with-codes-computer.jpg";

export default function GroupItem() {
  return (
    <div className="mt-7 flex flex-col items-center gap-2">
      <div className="rounded-3xl w-full h-40 mb-2 border-[#FE6B91] border-2 relative">
        <img
          src={photo}
          className="w-full absolute -bottom-3 -right-2 rounded-3xl rotate-2"
          alt="Picture Account"
        />
      </div>
      <span className="text-sm">Название сообщества</span>
      <button className="bg-[#FE6B91] rounded-3xl px-3 py-1 mt-2 cursor-pointer">
        <span className="text-sm text-white font-light">Узнать больше</span>
      </button>
    </div>
  );
}
