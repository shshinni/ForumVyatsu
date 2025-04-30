import { forwardRef } from "react";

const RadioButton = forwardRef((props, ref) => {
  const { label, ...updatedProps } = props;

  return (
    <label className="flex items-center">
      <input
        ref={ref}
        {...updatedProps}
        type="radio"
        className="mr-2 cursor-pointer accent-[#FE6B91]"
      />
      <span className="text-sm font-light">{label}</span>
    </label>
  );
});

RadioButton.displayName = "RadioButton";
export { RadioButton };
