"use client";

import signOutUser from "@/firebase/auth/logout";
import { useRouter } from "next/navigation";
import { HomeIcon, ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";
import { useUserContext } from "@/context/UserDataContext";
import Image from "next/image";
import { awardsMapping } from "@/utils/iconMapping";
import Link from "next/link";
import LoadingScreen from "./LoadingScreen";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import CompetitionCard from "./Competition";
import { capitalizeFirstLetter } from "@/utils/helpers";
import { updateSingleFieldForUser } from "@/firebase/updateFields";

function SideBar() {
  const router = useRouter();
  const {
    awards,
    showNewAward,
    points,
    awardNotifications,
    updateNewAwardSwal,
    updateAward,
    updateProgress,
    resetUserContext,
  } = useUserContext();
  const { user } = useAuthContext();
  const [signingOut, setSigningOut] = useState<boolean>(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signOutUser();
    resetUserContext();
    setSigningOut(true);
    router.push("/");
    setSigningOut(false);
  };

  if (signingOut)
    return (
      <div className="flex flex-col w-full h-screen">
        <LoadingScreen />
      </div>
    );

  const handleSetNoShowNewAward = () => {
    updateNewAwardSwal(false);
  };

  const getUserName = (email: string) => {
    return email.slice(0, email.indexOf("@"));
  };

  return (
    <div className="p-2 flex flex-col align-center h-screen w-300 shadow-[0_2px_10px_rgba(3,3,3,0.1)] bg-slate-200">
      <div>
        <div className="flex flex-col justify-center align-center pt-16">
          <Link
            href="/dashboard"
            className="flex flex-col flex-wrap justify-center content-center "
          >
            <HomeIcon className="h-6 w-6 self-center" />
            <span> Home </span>
          </Link>
        </div>
        <div className="flex flex-col items-center pt-8 ">
          <Image src="/undraw_pic_profile.svg" alt="Profile Picture" height={70} width={70} />
          <span className="pt-2 text-sm"> {getUserName(user.email)} </span>
        </div>
        {awards && awards.length > 0 ? (
          <div className="flex flex-col justify-center align-center pt-12 h-48">
            <>
              <div className="flex justify-center">
                <span className="font-bold"> Awards: </span>
              </div>
              <div className="flex flex-wrap pt-4 h-auto px-4 w-auto  ml-1">
                {awards?.map((award, index) => (
                  <div key={index}>
                    <Image
                      src={awardsMapping[award].src}
                      alt={awardsMapping[award].alt}
                      className="m-1"
                      width={40}
                      height={40}
                    />
                  </div>
                ))}
              </div>
            </>
          </div>
        ) : (
          <div className=" h-48"></div>
        )}
        <div className="flex justify-center pt-12 flex-col items-center">
          <h4 className=""> Points </h4>
          <p className="text-3xl font-bold"> {points}</p>
        </div>
        <h2 className=" text-center pt-6"> Leaderboard: </h2>

        <CompetitionCard />
      </div>
      <div className="flex justify-center pt-3">
        <button onClick={handleSubmit} className="">
          <ArrowLeftOnRectangleIcon className="h-8 w-12" />
        </button>
      </div>
      {showNewAward && awards && (
        <div className="absolute w-600 h-8 bottom-40 left-6 ">
          <div className=" bg-slate-300 rounded-lg shadow drop-shadow-2xl h-40 ">
            <button
              type="button"
              className="absolute top-3 end-2.5 text-gray-800 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="popup-modal"
              onClick={handleSetNoShowNewAward}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-5 flex">
              <div className="flex justify-center items-center w-1/5 ">
                <div>
                  <Image
                    src={awardsMapping[awards[awards.length - 1]].src}
                    alt={awardsMapping[awards[awards.length - 1]].alt}
                    width={100}
                    height={100}
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center pl-2 w-4/5">
                <h3 className="pb-2 text-xl font-bold text-black ">Congratulations</h3>
                <p className="text-md pb-2">
                  You&apos;ve earned a new award:{" "}
                  <strong className="text-lg">
                    {capitalizeFirstLetter(awards[awards.length - 1])}
                  </strong>{" "}
                  !
                </p>
                <button
                  type="button"
                  className="text-white w-32 self-end bg-purple-600 focus:ring-4  rounded-lg text-sm  items-center py-2.5 text-center"
                  onClick={handleSetNoShowNewAward}
                >
                  Cool!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SideBar;
