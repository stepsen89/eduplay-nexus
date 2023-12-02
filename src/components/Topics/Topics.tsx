"use client";

import { updateSingleFieldForUser } from "@/firebase/updateFields";
import { Progress, Topic } from "@/utils/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const topicDescription = {
  functions: "All about functions in JavaScript.",
  variables: "Learn how to use variables in JavaScript.",
  scopes: "Don't be afraid of scopes in JavaScript.",
  arrays: "All you need to know about arrays.",
  objects: "Learn how to use objects in JavaScript.",
};

const Topics = ({ progress, userId }: { progress: Progress; userId: string }) => {
  const router = useRouter();
  const handleTopicChoice = (e: any, key: string) => {
    e.preventDefault();
    const updateCurrentTopic = {
      currentTopic: key,
    };
    updateSingleFieldForUser(userId, updateCurrentTopic);
    router.push("/learning");
  };

  return (
    <div className="flex flex-col mt-12">
      <h2 className="text-lg font-bold"> Your topics: </h2>
      <div className="flex flex-wrap mt-4">
        {Object.keys(progress).map((key) => (
          <button
            onClick={(e) => handleTopicChoice(e, key)}
            disabled={progress[key as Topic].completed}
            key={key}
            className={
              progress[key as Topic].completed
                ? "w-96 h-24 shadow-[0px_2px_10px_rgba(3,3,3,0.1)] flex items-center mt-4 mr-4 border rounded-3xl opacity-50 bg-slate-200"
                : "w-96 h-24 shadow-[0px_2px_10px_rgba(3,3,3,0.1)] flex items-center mt-4 mr-4 border rounded-3xl"
            }
          >
            <div className="w-4/12 bg-blue-600  ml-2 rounded-xl flex content-center items-center justify-center ">
              <Image
                alt={"Topic alt should be updated"}
                src="/javascript.jpg"
                width={100}
                height={70}
                className="rounded-xl self-center"
              />
            </div>
            <div className="flex flex-col items-start my-4 ml-4  w-full h-auto  ">
              <h3 className="font-bold">{key.toUpperCase()}</h3>
              <p className="font-extralight text-xs text-left pb-1">
                {topicDescription[key as Topic]}
              </p>
              {progress[key as Topic].completed ? (
                <p> Completed!</p>
              ) : progress[key as Topic].awarded > 0 ? (
                <p> {progress[key as Topic].awarded} completed!</p>
              ) : (
                <p> Nothing completed yet!</p>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Topics;
