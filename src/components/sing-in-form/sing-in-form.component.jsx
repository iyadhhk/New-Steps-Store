import { createRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUser,
} from "../../utils/firebase/firebase.utils";

import CustomButton from "../custom-button/custom-button.component";
import InputField from "../input-field/input-field.component";
import Spinner from "../spinner/spinner.component";
import Alert from "../alert/alert.component";

const formSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const SignInForm = () => {
  const ref = createRef();
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [authError, setAuthError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
    console.log("userDocRef ===>", userDocRef);
  };

  const onSubmitForm = async (data, e) => {
    setIsLoading(true);
    const { email, password } = data;
    try {
      const user = await signInAuthUser(email, password);
      console.log("singing in result ==>", user);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("user sign in failed", error);
      if (error.code === "auth/wrong-password") {
        setAuthError("Wrong password");
      } else if (error.code === "auth/user-not-found") {
        setAuthError("Wrong email address");
      }
      setShowAlert(true);
    }
  };
  const onAlert = () => {
    setShowAlert(!showAlert);
  };
  return (
    <div className="container p-4 flex flex-col justify-center items-center">
      <h2 className="font-bold text-2xl my-4 text-primary">Already have an account?</h2>
      <span className="text-gray-500 mb-5">Sign in with your email and password</span>

      {showAlert && <Alert color="red" message={authError} closeAlert={onAlert} />}

      <form onSubmit={handleSubmit(onSubmitForm)}>
        <div className="mb-6">
          <InputField
            ref={ref}
            type="text"
            {...register("email")}
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
            {...register("password")}
            placeholder="Password"
          />
          {errors.password && (
            <span className="text-sm text-red-400 mb-2">{errors.password.message}</span>
          )}
        </div>
        {isLoading ? (
          <CustomButton disabled variant="google">
            <Spinner />
            Loading...
          </CustomButton>
        ) : (
          <CustomButton type="submit" variant="signing">
            Sign in
          </CustomButton>
        )}
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
