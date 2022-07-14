import { forwardRef } from "react";

const InputField = forwardRef(({ type, placeholder, ...otherProps }, ref) => (
  <input
    ref={ref}
    type={type}
    placeholder={placeholder}
    className="form-control block w-full px-4 py-2 text-md font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none"
    {...otherProps}
  />
));

export default InputField;
