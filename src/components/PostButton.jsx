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
  onDelete,
  isAdmin,
  isAuthor,
}) {
  const canDelete = isAdmin || isAuthor;

  return (
    <div className="rounded-2xl">
      <Link
        to={`/post/${idPost}`}
        className="px-3 my-4 py-3 rounded-2xl bg-[#FFEFF3] w-full block"
      >
        <div className="grid sm:grid-cols-[2fr_auto] grid-cols-1 text-sm gap-6 items-center my-1">
          <div className="flex gap-4 justify-between items-center ">
            <span className="break-all">{name}</span>
            {canDelete && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onDelete?.(idPost);
                }}
                className="text-[#FE6B91] rounded-3xl py-1 px-4 my-2 cursor-pointer text-sm bg-white border border-[#FE6B91] w-fit"
              >
                Удалить
              </button>
            )}
          </div>

          <div className="grid grid-cols-[1fr_auto] items-center gap-6">
            <div className="sm:w-16 flex max-sm:justify-end">
              <div className="bg-[#FE6B91] rounded-xl px-2 py-1 max-sm:mr-9 text-sm text-white">
                {comments_num}
              </div>
            </div>

            <span className="bg-[#FE6B91] rounded-xl py-1 mr-3 text-sm px-2 text-white">
              {formatCreationTime(creation_time)}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
