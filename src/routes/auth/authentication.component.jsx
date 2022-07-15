import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sing-in-form/sing-in-form.component";

const Authentication = () => {
  return (
    <div className="container w-full mx-auto md:flex md:flex-row justify-evenly items-start">
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default Authentication;
