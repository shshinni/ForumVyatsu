import { forwardRef } from "react";

const TextArea = forwardRef((props, ref) => {
  const { error, ...updatedProps } = props;

  return (
    <div className="grid">
      <textarea
        ref={ref}
        {...updatedProps}
        className="bg-white rounded-3xl mt-4 w-full p-2.5 text-sm font-light border border-white shadow-[0_4px_16px_rgba(254,107,145,0.25)] focus:border-[#FE6B91] outline-none resize-none"
      />
      {error && (
        <div className="text-red-500 mt-1 text-left text-[12px] font-light">
          {error}
        </div>
      )}
    </div>
  );
});

TextArea.displayName = "TextArea";
export { TextArea };
