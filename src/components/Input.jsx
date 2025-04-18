// export function Input({ textPlaceholder }) {
//   return (
//     <input
//       type="text"
//       placeholder={textPlaceholder}
//       className="bg-white rounded-3xl mt-4 w-full p-2.5 text-sm font-light border border-[#FEC9D7] focus:border-[#FE6B91] outline-none"
//     />
//   );
// }
import { forwardRef } from "react";

const Input = forwardRef((props, ref) => {
  const { error, ...updatedProps } = props;

  return (
    <div className="grid">
      <input
        ref={ref}
        {...updatedProps}
        className="bg-white rounded-3xl mt-4 w-full p-2.5 text-sm font-light border shadow-[0_4px_16px_rgba(254,107,145,0.25)] border-white focus:border-[#FE6B91] outline-none"
      />
      {error && (
        <div className="text-red-500 mt-1 text-left text-[12px] font-light">
          {error}
        </div>
      )}
    </div>
  );
});

Input.displayName = "Input";
export { Input };
