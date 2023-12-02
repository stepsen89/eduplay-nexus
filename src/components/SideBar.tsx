"use client";

import signOutUser from "@/firebase/auth/logout";
import { useRouter } from "next/navigation";
import { HomeIcon, ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";
import { useUserContext } from "@/context/UserDataContext";
import Image from "next/image";
import { awardsMapping } from "@/utils/iconMapping";
import Link from "next/link";
import { useEffect } from "react";

function SideBar() {
  const router = useRouter();
  const { awards, showNewAward, updateNewAwardSwal } = useUserContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signOutUser();
    router.push("/");
  };

  const handleSetNoShowNewAward = () => {
    updateNewAwardSwal(false);
  };

  return (
    <div className="p-2 flex flex-col align-center justify-between h-screen w-24 shadow-[0_2px_10px_rgba(3,3,3,0.1)] bg-slate-200">
      <div>
        <div className="flex flex-col justify-center align-center pt-36">
          <Link
            href="/dashboard"
            className="flex flex-col flex-wrap justify-center content-center "
          >
            <HomeIcon className="h-6 w-6 self-center" />
            <span> Home </span>
          </Link>
        </div>
        <div className="flex flex-col justify-center align-center pt-12">
          <div className="flex flex-col flex-wrap justify-center content-center ">
            <span> Awards: </span>
          </div>
          {awards && (
            <div className="flex flex-col justify-center items-center pt-4">
              {awards?.map((award, index) => (
                <div key={index}>
                  <Image
                    src={awardsMapping[award].src}
                    alt={awardsMapping[award].alt}
                    width={50}
                    height={50}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <button onClick={handleSubmit} className="">
        <ArrowLeftOnRectangleIcon className="h-6 w-12" />
      </button>
      {showNewAward && awards && (
        <div className="absolute w-max-content h-8 bottom-36 ">
          <div className=" bg-slate-200 rounded-lg shadow h-36 ">
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
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
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
              <div className="flex flex-col justify-center">
                <h3 className="pb-2 text-lg font-bold text-black ">Congratulations!</h3>
                <p className="text-sm pb-2">
                  You&apos;ve just earned a new award: <strong>{awards[awards.length - 1]}</strong>{" "}
                  !
                </p>
                <button
                  type="button"
                  className="text-white w-24 self-end bg-purple-600 focus:ring-4  rounded-lg text-sm  items-center px-5 py-2.5 text-center"
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
