import { createRef } from "react";
import { useForm } from "react-hook-form";
import CustomButton from "../custom-button/custom-button.component";

import InputField from "../input-field/input-field.component";

const SignUpForm = () => {
  const ref = createRef();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmitForm = async (data, e) => {
    console.log("data", data);
    console.log("event ==>", e);
  };

  return (
    <div className="container p-4 flex flex-col justify-center items-center">
      <h2 className="font-bold text-2xl my-4 text-primary">Don't have an account?</h2>
      <span className="text-gray-500 mb-5">Sign up with your email and password</span>

      <form onSubmit={handleSubmit(onSubmitForm)}>
        <div className="mb-6">
          <InputField
            ref={ref}
            type="text"
            {...register("displayName", {
              required: {
                value: true,
                message: "displayName is required",
              },
            })}
            placeholder="Display name"
          />
          {errors.displayName && (
            <span className="text-sm text-red-400 mb-2">
              {errors.displayName.message}
            </span>
          )}
        </div>
        <div className="mb-6">
          <InputField
            ref={ref}
            type="text"
            {...register("email", {
              required: {
                value: true,
                message: "email is required",
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "invalid email address",
              },
            })}
            placeholder="Email address"
          />
          {errors.email && (
            <span className="text-sm text-red-400 mb-2">{errors.email.message}</span>
          )}
        </div>

        <div className="mb-6">
          <InputField
            ref={ref}
            type="password"
            {...register("password", {
              required: { value: true, message: "password is required" },
            })}
            placeholder="Password"
          />
          {errors.password && (
            <span className="text-sm text-red-400 mb-2">{errors.password.message}</span>
          )}
        </div>
        <div className="mb-6">
          <InputField
            ref={ref}
            type="password"
            {...register("confirmPassword", {
              required: { value: true, message: "password is required" },
            })}
            placeholder="Confirm password"
          />
        </div>

        <CustomButton type="submit" variant="signing">
          Sign up
        </CustomButton>
      </form>
    </div>
  );
};

export default SignUpForm;
