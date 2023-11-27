"use client";

import { useAuthContext } from "@/context/AuthContext";
import signOutUser from "@/firebase/auth/logout";
import { useRouter } from "next/navigation";

function SideBar() {
  const router = useRouter();
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("sigb out", user);
    await signOutUser();
    router.push("/profile");
  };

  return (
    <div className="p-2 flex flex-col h-screen w-80">
      {" "}
      SideBar goes here
      <button onClick={handleSubmit}> Log out </button>
    </div>
  );
}

export default SideBar;
