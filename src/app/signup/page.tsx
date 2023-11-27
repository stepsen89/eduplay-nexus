"use client";
import React from "react";
import signUp from "@/firebase/auth/signup";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { signupFields } from "@/utils/formFields";
import Input from "@/components/Input";
import FormAction from "@/components/FormAction";

interface SignUpState {
  email: string;
  password: string;
}
const fields = signupFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

function Page() {
  const router = useRouter();

  const [signupState, setSignupState] = React.useState<SignUpState>(fieldsState);

  const handleChange = (e: { target: { id: any; value: any } }) =>
    setSignupState({ ...signupState, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(signupState);
    await handleSignUp();
  };

  const handleSignUp = async () => {
    const { result, error } = await signUp(signupState.email, signupState.password);

    if (error) {
      return console.log(error);
    }

    // else successful
    console.log(result);
    return router.push("/dashboard");
  };
  return (
    <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* <Header
          heading="Login to your account"
          paragraph="Don't have an account yet? "
          linkName="Signup"
          linkUrl="/signup"
        /> */}
        <Header
          heading="Signup to create an account"
          paragraph="Already have an account? "
          linkName="Login"
          linkUrl="/"
        />
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            {fields.map((field) => (
              <Input
                key={field.id}
                handleChange={handleChange}
                value={signupState[field.id]}
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
          <FormAction handleSubmit={handleSubmit} text="SignUp" />
        </form>
        {/* <div >
        <h1 className="mt-60 mb-30">Sign up</h1>
        <form onSubmit={handleForm} className="form">
          <label htmlFor="email">
            <p>Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              name="email"
              id="email"
              placeholder="example@mail.com"
            />
          </label>
          <label htmlFor="password">
            <p>Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              name="password"
              id="password"
              placeholder="password"
            />
          </label>
          <button type="submit">Sign up</button>
        </form>
      </div> */}
      </div>
    </div>
  );
}

export default Page;

// const [loginState, setLoginState] = useState(fieldsState);

// const handleChange = (e) => {
//   setLoginState({ ...loginState, [e.target.id]: e.target.value });
// };

// return (
//   <form className="mt-8 space-y-6">
//     <div className="-space-y-px">
//       {fields.map((field) => (
//         <Input
//           key={field.id}
//           handleChange={handleChange}
//           value={loginState[field.id]}
//           labelText={field.labelText}
//           labelFor={field.labelFor}
//           id={field.id}
//           name={field.name}
//           type={field.type}
//           isRequired={field.isRequired}
//           placeholder={field.placeholder}
//         />
//       ))}
//     </div>
//   </form>
// );
