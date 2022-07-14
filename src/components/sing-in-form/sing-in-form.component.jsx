import { createRef } from "react";
import { useForm } from "react-hook-form";

import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";
import CustomButton from "../custom-button/custom-button.component";

import InputField from "../input-field/input-field.component";

const SignInForm = () => {
  const ref = createRef();

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
    console.log("userDocRef ===>", userDocRef);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmitForm = (data, e) => {
    console.log("data===>", data);
  };
  return (
    <div className="container p-4 flex flex-col justify-center items-center">
      <h2 className="font-bold text-2xl my-4 text-primary">Already have an account?</h2>
      <span className="text-gray-500 mb-5">Sign in with your email and password</span>

      <form onSubmit={handleSubmit(onSubmitForm)}>
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

        <CustomButton type="submit" variant="signing">
          Sign in
        </CustomButton>
        <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
          <p className="text-center font-semibold mx-4 mb-0">OR</p>
        </div>

        <CustomButton type="button" variant="google" onClick={logGoogleUser}>
          Continue with Google
        </CustomButton>
      </form>
    </div>
  );
};

export default SignInForm;
