"use client";
import React from "react";
import { onAuthStateChanged, getAuth, UserInfo } from "firebase/auth";
import firebase_app from "@/firebase/config";
import firebase from "firebase/compat/app";

const auth = getAuth(firebase_app);

export const AuthContext = React.createContext<any | null>(null);

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<any | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    console.log("test", user);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};
