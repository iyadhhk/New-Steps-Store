import { createRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import CustomButton from "../custom-button/custom-button.component";
import InputField from "../input-field/input-field.component";
import Spinner from "../spinner/spinner.component";
import Alert from "../alert/alert.component";
import { registerUser } from "../../features/auth/auth.service";
import {
  selectActionType,
  selectErrorMessage,
  selectIsError,
  selectIsLoading,
} from "../../features/auth/auth.slice";

const formSchema = Yup.object({
  displayName: Yup.string()
    .required("DisplayName is required")
    .min(3, "Must have at least 3 characters"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Must have at least 8 characters"),
  confirm_pwd: Yup.string()
    .required("Password is required")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
});

const SignUpForm = () => {
  const dispatch = useDispatch();
  const ref = createRef();
  const [showAlert, setShowAlert] = useState(false);
  const [authError, setAuthError] = useState("");

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
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (isError && errorMessage && actionType === "register") {
      setShowAlert(true);
      setAuthError(errorMessage);
    }
  }, [isError, errorMessage, actionType]);

  const onSubmitForm = async (data, e) => {
    dispatch(registerUser(data));
  };
  const onAlert = () => {
    setShowAlert(!showAlert);
  };

  return (
    <div className="container p-4 flex flex-col justify-center items-center">
      <h2 className="font-bold text-2xl my-4 text-primary">Don't have an account?</h2>
      <span className="text-gray-500 mb-5">Sign up with your email and password</span>

      {showAlert && <Alert variant="error" message={authError} closeAlert={onAlert} />}

      <form onSubmit={handleSubmit(onSubmitForm)}>
        <div className="mb-6">
          <InputField
            name="displayName"
            ref={ref}
            type="text"
            {...register("displayName")}
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
        <div className="mb-6">
          <InputField
            ref={ref}
            type="password"
            {...register("confirm_pwd")}
            placeholder="Confirm password"
          />
          {errors.confirm_pwd && (
            <span className="text-sm text-red-400 mb-2">
              {errors.confirm_pwd.message}
            </span>
          )}
        </div>
        {isLoading && actionType === "register" ? (
          <CustomButton disabled variant="google">
            <Spinner fill="#E5E7EB" size="md" />
            Loading...
          </CustomButton>
        ) : (
          <CustomButton type="submit" variant="signing">
            Sign up
          </CustomButton>
        )}
      </form>
    </div>
  );
};

export default SignUpForm;
