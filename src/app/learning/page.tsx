"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import LearningView from "@/components/LearningView";
import { getUserGptLearningPath, getUserProgressInformation } from "@/firebase/getData";
import { useUserContext } from "@/context/UserDataContext";
import axios from "axios";
import { updateSingleFieldForUser, updateQuestions } from "@/firebase/updateFields";
import { Award, GPTLearningContent, Module } from "@/utils/types";
import { capitalizeFirstLetter } from "@/utils/helpers";

const styles = {
  Text: {
    color: "#1c1c1c",
    fontSize: "32px",
    fontWeight: 500,
    lineHeight: "42px",
  },
};

export default function LearningPage() {
  const { user, loading } = useAuthContext();
  const {
    currentModule,
    progress,
    points,
    awards,
    totalChallenges,
    updateProgress,
    updatePoints,
    updateNewAwardSwal,
    setInitialUserInformation,
    updateAward,
    updateGPTLearningContent,
  } = useUserContext();

  const router = useRouter();

  const [submitting, setSubmitting] = useState(false);
  const [technicalProblem, setTechnicalProblem] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState<string>("");
  const [challengeInWaiting, setChallengeInWaiting] = useState<string>("");
  const [explanation, setExplanation] = useState<string>();
  const [pointsToDisplay, setPointsToDisplay] = useState<number>();
  const [dataIsLoading, setDataIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (user == null && !loading) router.push("/");
    else if (user) {
      getUserProgressInformation(user.uid).then((result) => {
        setInitialUserInformation(result.result);
        setDataIsLoading(true);
        getUserGptLearningPath(user.uid)
          .then((result) => {
            const overallContent = result.result as GPTLearningContent;
            updateGPTLearningContent(overallContent);
            setCurrentChallenge(
              overallContent[currentModule as Module][
                overallContent[currentModule as Module].length - 1
              ].challengeInstruction
            );
            setDataIsLoading(false);
          })
          .catch((error) => {
            console.log("sorry", error);
            setTechnicalProblem(true);
          });
      });
    }
  }, [loading, user, currentModule]);

  const handleCodeSubmit = async (answer: string) => {
    setSubmitting(true);
    const { data } = await axios.post("/api/chat", {
      answer: answer,
      areas: currentModule,
      question: currentChallenge,
    });

    updatePoints(data.response.points);
    updateSingleFieldForUser(user.uid, {
      points: points + data.response.points,
      totalChallenges: totalChallenges + 1,
    });
    const newChallengeAddedToPath = {
      challengeInstruction: data.response.newQuestion,
      labels: data.response.labels,
      points: 0,
    };

    updateQuestions(user.uid, currentModule, data.response.points, newChallengeAddedToPath);

    setExplanation(data.response.explanation);
    setChallengeInWaiting(data.response.newQuestion);

    if (totalChallenges + 1 === 1) {
      updateAward("firstCompleted");

      updateSingleFieldForUser(user.uid, {
        awards: [...awards, "firstCompleted"],
      });
      updateNewAwardSwal(true);
    }

    if (totalChallenges + 1 === 5) {
      updateAward("fiveCompleted");
      updateSingleFieldForUser(user.uid, {
        awards: [...awards, "fiveCompleted"],
      });
      updateNewAwardSwal(true);
    }

    if (totalChallenges + 1 === 10) {
      updateAward("tenCompleted");
      updateSingleFieldForUser(user.uid, {
        awards: [...awards, "tenCompleted"],
      });
      updateNewAwardSwal(true);
    }

    if (totalChallenges + 1 === 15) {
      updateSingleFieldForUser(user.uid, {
        awards: [...awards, "fifteenCompleted"],
      });
      updateAward("fifteenCompleted");
      updateNewAwardSwal(true);
    }

    if (data.response.points > 80) {
      updateProgress(currentModule, "awarded");
      if (
        progress[currentModule as keyof typeof progress]?.awarded > 3 &&
        !progress[currentModule as keyof typeof progress]?.completed
      ) {
        updateAward(currentModule as Award);
        updateProgress(currentModule, "completed");
        const newAwards = [...awards, currentModule];

        updateSingleFieldForUser(user.uid, {
          awards: newAwards,
        });
        updateNewAwardSwal(true);
      }
    }
    setPointsToDisplay(data.response.points);
    setSubmitting(false);
  };

  const handleNext = () => {
    updateSingleFieldForUser(user.uid, { ...progress });
    setCurrentChallenge(challengeInWaiting);
    setExplanation(undefined);
  };

  if (dataIsLoading) {
    return (
      <div className="flex flex-col p-12 h-5/6">
        <div className="flex items-center justify-center w-full  rounded-lg h-5/6">
          <div role="status" className="flex flex-col content-center items-center justify-center">
            <svg
              aria-hidden="true"
              className="w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="pt-4">Please wait ...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col pl-12 pr-12 h-5/6">
      {currentModule && currentChallenge && (
        <>
          <h1 className="pb-6 pt-4 text-3xl font-bold">
            Module: {capitalizeFirstLetter(currentModule)}
          </h1>
          <LearningView
            currentChallenge={currentChallenge}
            handleSubmitCall={handleCodeSubmit}
            submitting={submitting}
            handleNext={handleNext}
            explanation={explanation}
            pointsToDisplay={pointsToDisplay}
          />
        </>
      )}
    </div>
  );
}

// const styles = {
//   Text: {
//     color: "#1c1c1c",
//     fontSize: "32px",
//     fontWeight: 500,
//     lineHeight: "42px",
//   },
// };
