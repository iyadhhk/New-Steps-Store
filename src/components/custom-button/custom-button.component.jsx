const BUTTON_TYPE_CLASSES = {
  google: "bg-secondary",
  signing: "bg-primary hover:bg-secondary",
};

const CustomButton = ({ children, variant, ref, ...otherProps }) => {
  return (
    <button
      ref={ref}
      className={`w-full px-7 py-3 text-white font-medium text-sm uppercase ${BUTTON_TYPE_CLASSES[variant]}`}
      {...otherProps}>
      {children}
    </button>
  );
};

export default CustomButton;
