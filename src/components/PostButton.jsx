import { Link } from "@tanstack/react-router";
function formatCreationTime(isoString) {
  const date = new Date(isoString);
  return date
    .toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, "."); // Заменяем слэши на точки
}
export default function PostButton({
  name,
  idPost,
  comments_num,
  creation_time,
}) {
  return (
    <div className="rounded-2xl ">
      <Link
        to={`/post/${idPost}`}
        className="px-3 my-4 py-4 rounded-2xl bg-[#FFEFF3] w-full block"
      >
        <div className="grid grid-cols-[2fr_auto_auto] text-sm gap-6 items-center">
          <span>{name}</span>
          <div className="w-16">
            <span className="bg-[#FE6B91] rounded-xl px-2 py-1 text-sm text-white">
              {comments_num}
            </span>
          </div>
          <span className="bg-[#FE6B91] rounded-xl py-1 mr-3 text-sm px-2 text-white">
            {formatCreationTime(creation_time)}
          </span>
        </div>
      </Link>
    </div>
  );
}
