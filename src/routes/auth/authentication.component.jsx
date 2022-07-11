import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const Authentication = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
    console.log("userDocRef ===>", userDocRef);
  };

  return (
    <>
      <h1>This is the Authentication page</h1>;
      <button onClick={logGoogleUser}>Sign In with google</button>
    </>
  );
};

export default Authentication;
