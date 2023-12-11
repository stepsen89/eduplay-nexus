"use client";

import { updateSingleFieldForUser } from "@/firebase/updateFields";
import { capitalizeFirstLetter } from "@/utils/helpers";
import { Progress, Module } from "@/utils/types";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const moduleDescription = {
  functions: "All about functions in JavaScript.",
  variables: "Learn how to use variables in JavaScript.",
  arrays: "All you need to know about arrays.",
  objects: "Learn how to use objects in JavaScript.",
};

const Modules = ({ progress, userId }: { progress: Progress; userId: string }) => {
  const router = useRouter();
  const handleModuleChoice = (e: any, key: string) => {
    e.preventDefault();
    const updateCurrentModule = {
      currentModule: key,
    };
    updateSingleFieldForUser(userId, updateCurrentModule);
    router.push("/learning");
  };

  return (
    <div className="flex flex-col mt-10">
      <h2 className="text-lg font-bold"> Your modules: </h2>
      <div className="flex flex-wrap mt-2">
        {Object.keys(progress).map((key, index) => (
          <button
            onClick={(e) => handleModuleChoice(e, key)}
            disabled={progress[key as keyof Progress].completed}
            key={key}
            className={
              progress[key as keyof Progress].completed
                ? "w-96 h-24 shadow-[0px_2px_10px_rgba(3,3,3,0.1)] flex items-center mt-4 mr-4 border rounded-3xl bg-slate-200"
                : "w-96 h-24 shadow-[0px_2px_10px_rgba(3,3,3,0.1)] flex items-center mt-4 mr-4 border rounded-3xl"
            }
          >
            <div className="w-4/12 bg-blue-600  ml-2 rounded-xl flex content-center items-center justify-center ">
              <Image
                alt={"Module alt should be updated"}
                src={`/testpic-${index}.jpg`}
                width={100}
                height={70}
                className="rounded-xl self-center"
              />
            </div>
            {progress[key as keyof Progress].completed && (
              <div className="relative">
                <div>
                  <CheckCircleIcon
                    className="absolute left-64 bottom-4 text-green-700 z-20"
                    height={30}
                    width={23}
                  />
                </div>
              </div>
            )}
            <div className="flex flex-col items-start my-4 ml-4  w-full h-auto  ">
              <h3 className="font-bold">{capitalizeFirstLetter(key)}</h3>
              <p className="font-extralight text-xs text-left pb-1">
                {moduleDescription[key as Module]}
              </p>
              {progress[key as keyof Progress].completed ? (
                <p> Completed!</p>
              ) : progress[key as keyof Progress].awarded > 0 ? (
                <p> {progress[key as keyof Progress].awarded} challenges completed!</p>
              ) : (
                <p> Get started</p>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Modules;
