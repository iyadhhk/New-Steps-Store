const BUTTON_TYPE_CLASSES = {
  google: "bg-secondary",
  signing: "bg-primary hover:bg-secondary",
  product: "mt-2 bg-secondary hover:bg-primary",
};

const CustomButton = ({ children, variant, ...otherProps }) => {
  return (
    <button
      className={`w-full py-3 text-white font-medium text-sm uppercase ${BUTTON_TYPE_CLASSES[variant]}`}
      {...otherProps}>
      {children}
    </button>
  );
};

export default CustomButton;
