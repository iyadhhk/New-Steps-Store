import { createRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { login, loginWithGoogle } from "../../features/auth/auth.service";

import CustomButton from "../custom-button/custom-button.component";
import InputField from "../input-field/input-field.component";
import Spinner from "../spinner/spinner.component";
import Alert from "../alert/alert.component";
import {
  selectActionType,
  selectErrorMessage,
  selectIsError,
  selectIsLoading,
} from "../../features/auth/auth.slice";

const formSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const SignInForm = () => {
  const dispatch = useDispatch();
  const ref = createRef();
  const [showAlert, setShowAlert] = useState(false);
  const [authError, setAuthError] = useState("empty error");

  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);
  const errorMessage = useSelector(selectErrorMessage);
  const actionType = useSelector(selectActionType);

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

  useEffect(() => {
    if (isError && errorMessage && actionType === "login") {
      setShowAlert(true);
      setAuthError(errorMessage);
    }
  }, [isError, errorMessage, actionType]);

  const googleAuthHandler = () => {
    dispatch(loginWithGoogle());
  };

  const onSubmitForm = (data, e) => {
    dispatch(login(data));
  };

  const onAlert = () => {
    setShowAlert(!showAlert);
  };
  return (
    <div className="container p-4 flex flex-col justify-center items-center">
      <h2 className="font-bold text-2xl my-4 text-primary">Already have an account?</h2>
      <span className="text-gray-500 mb-5">Sign in with your email and password</span>

      {showAlert && <Alert variant="error" message={authError} closeAlert={onAlert} />}

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
        {isLoading && actionType === "login" ? (
          <CustomButton disabled variant="google">
            <Spinner fill="#E5E7EB" size="md" />
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

        <CustomButton type="button" variant="google" onClick={googleAuthHandler}>
          Continue with Google
        </CustomButton>
      </form>
    </div>
  );
};

export default SignInForm;
