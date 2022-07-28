import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sing-in-form/sing-in-form.component";
import { selectUser } from "../../features/auth/auth.slice";

const Authentication = () => {
  const user = useSelector(selectUser);

  if (user) return <Navigate to="/" replace={true} />;

  return (
    <div className="container w-full mx-auto md:flex md:flex-row justify-evenly items-start">
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default Authentication;
