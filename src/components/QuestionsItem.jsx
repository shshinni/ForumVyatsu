import { ChevronDownIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { useState } from "react";
export default function QuestionsItem({ questions, answer }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={clsx([
          "bg-[#FFEFF3] w-full flex items-center justify-between py-3 px-4 cursor-pointer",
          isOpen ? "rounded-t-xl border-b border-b-[#FA7D9F]" : "rounded-xl",
        ])}
      >
        <span>{questions}</span>
        <ChevronDownIcon
          className={clsx(["size-5 text-[#FA7D9F]", isOpen && "rotate-180"])}
        />
      </button>
      {isOpen && (
        <div
          className={clsx([
            "bg-[#FFEFF3] w-full flex items-center justify-between py-3 px-4 font-light rounded-b-xl",
          ])}
        >
          {answer}
        </div>
      )}
    </div>
  );
}
