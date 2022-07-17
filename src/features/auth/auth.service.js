import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createAuthUser,
  createUserDocumentFromAuth,
  signInAuthUser,
  signInWithGooglePopup,
  signOutUser,
  getUserDocument,
} from "../../utils/firebase/firebase.utils";

//register user
export const registerUser = createAsyncThunk("auth/register", async (data, thunkApi) => {
  try {
    const { email, password, displayName } = data;
    const { user } = await createAuthUser(email, password);
    const userDoc = await createUserDocumentFromAuth(user, { displayName });
    return {
      email: userDoc.email,
      uid: userDoc.uid,
      displayName,
    };
  } catch (error) {
    let message = "";
    if (error.code === "auth/email-already-in-use") {
      message = "User already exists";
    } else {
      message = "Error encountered";
    }
    return thunkApi.rejectWithValue(message);
  }
});

//login with google
export const loginWithGoogle = createAsyncThunk(
  "auth/login-with-google",
  async (_, thunkApi) => {
    try {
      const { user } = await signInWithGooglePopup();
      const { displayName } = user;
      const userDoc = await createUserDocumentFromAuth(user, { displayName });
      return {
        email: userDoc.email,
        uid: userDoc.uid,
        displayName: userDoc.displayName,
      };
    } catch (error) {
      let message = "";
      if (error.code === "auth/popup-blocked") {
        message = "Google popup is blocked";
      } else if (error.code === "auth/popup-closed-by-user") {
        message = "Google popup is closed by user";
      } else if (error.code === "cancelled-popup-request") {
        message = "Google request cancelled";
      } else {
        message = "Google auth error occured";
      }
      return thunkApi.rejectWithValue(message);
    }
  }
);

//login with email and password
export const login = createAsyncThunk("auth/login", async (user, thunkApi) => {
  try {
    const { email, password } = user;
    const res = await signInAuthUser(email, password);
    const { displayName } = await getUserDocument(res.user.uid);

    return { email, displayName, uid: res.user.uid };
  } catch (error) {
    let message = "";
    if (error.code === "auth/wrong-password") {
      message = "Wrong password";
    } else if (error.code === "auth/user-not-found") {
      message = "Wrong email address";
    } else {
      message = "Login error occured";
    }

    return thunkApi.rejectWithValue(message);
  }
});

// log out
export const logout = createAsyncThunk("auth/logout", async (_, thunkApi) => {
  try {
    return await signOutUser();
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
