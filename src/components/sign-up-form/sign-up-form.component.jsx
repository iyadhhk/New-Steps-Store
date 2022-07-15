import { createRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import {
  createAuthUser,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import CustomButton from "../custom-button/custom-button.component";
import InputField from "../input-field/input-field.component";
import Spinner from "../spinner/spinner.component";
import Alert from "../alert/alert.component";

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
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmitForm = async (data, e) => {
    setIsLoading(true);
    const { displayName, email, password } = data;
    try {
      const { user } = await createAuthUser(email, password);
      const userDoc = await createUserDocumentFromAuth(user, { displayName });
      setIsLoading(false);
      console.log("userDoc ===>", userDoc);
    } catch (error) {
      setIsLoading(false);
      if (error.code === "auth/email-already-in-use") {
        setAuthError("User already exists");
      } else {
        setAuthError("Error encountered");
      }
      setShowAlert(true);
    }
  };
  const onAlert = () => {
    setShowAlert(!showAlert);
  };

  return (
    <div className="container p-4 flex flex-col justify-center items-center">
      <h2 className="font-bold text-2xl my-4 text-primary">Don't have an account?</h2>
      <span className="text-gray-500 mb-5">Sign up with your email and password</span>

      {showAlert && <Alert color="red" message={authError} closeAlert={onAlert} />}

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
        {isLoading ? (
          <CustomButton disabled variant="google">
            <Spinner />
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
