import { createContext, useState, useEffect } from "react";

import { auth } from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
  setCurrentUser: () => null,
  setIsLoading: () => null,
  currentUser: null,
  isLoading: false,
});

export const UserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const value = { currentUser, setCurrentUser, isLoading, setIsLoading };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        setCurrentUser(userAuth);
        console.log("userContext => userAuth => ", userAuth);
      } else {
        setCurrentUser(null);
        console.log("userContext => currentUser is null");
      }
    });

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
