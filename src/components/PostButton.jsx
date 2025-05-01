import { Link } from "@tanstack/react-router";

export default function PostButton({ name, idPost }) {
  return (
    <div className="mx-7 rounded-2xl">
      <Link className="px-3 my-4 py-4 rounded-2xl bg-[#FFEFF3] w-full block">
        <div className="flex justify-between items-center text-sm ">
          <span>{name}</span>
          <div className="flex gap-6">
            <span className="bg-[#FE6B91] rounded-xl px-2 py-1 text-sm text-white">
              10
            </span>
            <span className="bg-[#FE6B91] rounded-xl py-1 text-sm px-2 text-white">
              1 день назад
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
