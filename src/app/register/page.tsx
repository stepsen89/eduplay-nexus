"use client";

import Input from "@/components/Input";
import { useAuthContext } from "@/context/AuthContext";
import signIn from "@/firebase/auth/signin";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { signupFields } from "@/utils/formFields";
import FormAction from "@/components/FormAction";
import LoadingScreen from "@/components/LoadingScreen";
import Link from "next/link";
import signUp from "@/firebase/auth/signup";

interface SignUpState {
  email: string;
  password: string;
}

const fields = signupFields;

const initialFieldsState = {
  email: "",
  password: "",
};

export default function Home() {
  const [signUpState, setSignUpState] = useState<SignUpState>(initialFieldsState);
  const [errorSigningUp, setErrorSigningUp] = useState<boolean>(false);

  const { user, loading } = useAuthContext();
  const router = useRouter();
  useEffect(() => {
    if (user !== null && !loading) router.push("/dashboard");
  }, [user]);

  const handleChange = (e: { target: { id: any; value: any } }) =>
    setSignUpState({ ...signUpState, [e.target.id]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSignUp();
  };

  const handleSignUp = async () => {
    const { error } = await signUp(signUpState.email, signUpState.password);

    if (error) {
      setErrorSigningUp(true);
      console.error(error);
    } else {
      return router.push("/dashboard");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col w-full h-screen">
        <LoadingScreen />
      </div>
    );
  }

  return (
    <div className="flex w-full justify-center items-center h-screen m-auto">
      <div className="flex justify-center flex-col items-center  w-1/2 rounded-xl h-5/6 ">
        <div className="w-1/2">
          <h1 className="font-bold text-4xl pb-12"> Eduplay Nexus </h1>
          <h2 className="font-bold text-xl"> Register </h2>
          <div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div>
                {fields.map((field) => (
                  <Input
                    key={field.id}
                    handleChange={handleChange}
                    value={signUpState[field.id as keyof typeof signUpState]}
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
              {errorSigningUp && (
                <span className="text-red-500"> Sorry, there was an error signing you up. </span>
              )}
              <FormAction handleSubmit={handleSubmit} text="Register" />
            </form>
            <div className="flex justify-center pt-8">
              <p>
                Already have an account?{" "}
                <Link href="/register" className="underline rounded-md">
                  Log in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
