import { Link } from "@tanstack/react-router";

function formatCreationTime(isoString) {
  const date = new Date(isoString);
  const options = { day: "numeric", month: "long", year: "numeric" };
  return date.toLocaleDateString("ru-RU", options);
}
export default function PostButton({
  name,
  idPost,
  comments_num,
  creation_time,
}) {
  return (
    <div className="rounded-2xl">
      <Link className="px-3 my-4 py-4 rounded-2xl bg-[#FFEFF3] w-full block">
        <div className="flex justify-between items-center text-sm ">
          <span>{name}</span>
          <div className="flex gap-6">
            <span className="bg-[#FE6B91] rounded-xl px-2 py-1 text-sm text-white">
              {comments_num}
            </span>
            <span className="bg-[#FE6B91] rounded-xl py-1 text-sm px-2 text-white">
              {formatCreationTime(creation_time)}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
