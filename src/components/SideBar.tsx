"use client";

import { useAuthContext } from "@/context/AuthContext";
import signOutUser from "@/firebase/auth/logout";
import Image from "next/image";
import { useRouter } from "next/navigation";

function SideBar() {
  const router = useRouter();
  const { user } = useAuthContext();

  console.log(user);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await signOutUser();
  };

  return (
    <div className="p-2 flex flex-col align-center justify-between h-screen w-80 bg-primary p-10">
      <div className="flex flex-col justify-center align-center">
        <Image
          src="/undraw_pic_profile.svg"
          height={100}
          width={100}
          alt="profile"
          className="p-2"
        />
        <h4 className="text-center font-sm font-semibold pt-2"> Testuser #2 </h4>
      </div>
      <button
        onClick={handleSubmit}
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-primary bg-white mt-10 text-semibold text-white"
      >
        Log out{" "}
      </button>
    </div>
  );
}

export default SideBar;
