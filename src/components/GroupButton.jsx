import { Link } from "@tanstack/react-router";
import lkPhoto from "/lkphoto.svg";

export default function GroupButton({ name, idGroup }) {
  return (
    <div className="mx-7">
      <Link
        href={`/group/${idGroup}`}
        className="px-3 my-4 py-2 rounded-3xl w-full block bg-white border-[#8C64D8] border"
      >
        <div className="flex justify-between items-center">
          <img src={lkPhoto} className="max-w-7" alt="Picture Account Group" />
          <div className="flex gap-4">
            <span className="rounded-xl p-1 text-sm">{name}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
