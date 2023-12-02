"use client";

import Input from "@/components/Input";
import { useAuthContext } from "@/context/AuthContext";
import signIn from "@/firebase/auth/signin";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { loginFields } from "@/utils/formFields";
import FormAction from "@/components/FormAction";
import LoadingScreen from "@/components/LoadingScreen";

const styles = {
  Image: {
    backgroundColor: "#e9e9e9",
  },
};

interface SigninState {
  email: string;
  password: string;
}

const fields = loginFields;

const initialFieldsState = {
  email: "",
  password: "",
};

export default function Home() {
  const [signInState, setSignInState] = useState<SigninState>(initialFieldsState);

  const { user, loading } = useAuthContext();
  const router = useRouter();
  useEffect(() => {
    if (user != null) router.push("/dashboard");
  }, [user]);

  const handleChange = (e: { target: { id: any; value: any } }) =>
    setSignInState({ ...signInState, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await handleSignIn();
  };

  const handleSignIn = async () => {
    const { error } = await signIn(signInState.email, signInState.password);

    if (error) {
      console.error(error);
    }

    return router.push("/dashboard");
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex w-full justify-center items-center h-screen m-auto">
      <div
        className="flex flex-col justify-center items-center bg-gray-500 w-1/2 h-screen"
        style={styles.Image}
      >
        <Image
          src="/undraw_programming.svg"
          alt="A person sitting on a chair in front of a computer working"
          height="600"
          width="600"
        />
        <div className="flex flex-col items-center w-4/6">
          <h2 className="text-xl font-bold p-4 py-10 text-center">
            Learn Programming in a fun way and improve your skills
          </h2>
          <p className="text-center text-sm">
            By completing challenges, gaps will be analysed and focused on eliminating these so you
            can apply those skills in context. No more following tutorials, you will conquer the
            programming language.
          </p>
        </div>
      </div>
      <div className="flex justify-center flex-col items-center  w-1/2 rounded-xl h-5/6 ">
        <div className="w-1/2">
          <h1 className="font-bold text-xl"> Login </h1>
          <div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div>
                {fields.map((field) => (
                  <Input
                    key={field.id}
                    handleChange={handleChange}
                    value={signInState[field.id as keyof typeof signInState]}
                    labelText={field.labelText}
                    labelFor={field.labelFor}
                    id={field.id}
                    name={field.name}
                    type={field.type}
                    isRequired={field.isRequired}
                    placeholder={field.placeholder}
                  />
                ))}
              </div>
              <FormAction handleSubmit={handleSubmit} text="Log in" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
