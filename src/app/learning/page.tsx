"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import LearningView from "@/components/LearningView";
import { getUserGptLearningPath, getUserProgressInformation } from "@/firebase/getData";
import { useUserContext } from "@/context/UserDataContext";
import axios from "axios";
import { updateSingleFieldForUser, updateQuestions } from "@/firebase/updateFields";
import { Award, GPTLearningContent, GPTSingleLearningContent, Module } from "@/utils/types";
import { capitalizeFirstLetter } from "@/utils/helpers";
import LoadingScreen from "@/components/LoadingScreen";
import { useGPTContext } from "@/context/GPTContext";

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

  const { updateGPTConversation } = useGPTContext();

  const router = useRouter();

  const [submitting, setSubmitting] = useState(false);
  const [technicalProblem, setTechnicalProblem] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState<GPTSingleLearningContent | null>(null);
  const [challengeInWaiting, setChallengeInWaiting] = useState<GPTSingleLearningContent | null>(
    null
  );
  const [explanation, setExplanation] = useState<string>();
  const [pointsToDisplay, setPointsToDisplay] = useState<number>();
  const [dataIsLoading, setDataIsLoading] = useState<boolean>(false);
  const [displayTimer, setDisplayTimer] = useState<boolean>(true);

  const Ref = useRef(null);

  // The state for our timer
  const [timer, setTimer] = useState("00:00");

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    return {
      total,
      minutes,
      seconds,
    };
  };

  const startTimer = (e) => {
    let { total, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      // update the timer
      // check if less than 10 then we need to
      // add '0' at the beginning of the variable
      setTimer(
        (minutes > 9 ? minutes : "0" + minutes) + ":" + (seconds > 9 ? seconds : "0" + seconds)
      );
    }
  };

  const clearTimer = (e) => {
    // If you adjust it you should also need to
    // adjust the Endtime formula we are about
    // to code next
    setTimer("02:00");

    // If you try to remove this line the
    // updating of timer Variable will be
    // after 1000ms or 1sec
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();

    // This is where you need to adjust if
    // you entend to add more time
    deadline.setSeconds(deadline.getSeconds() + 120);
    return deadline;
  };

  useEffect(() => {
    clearTimer(getDeadTime());
  }, []);

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
            setCurrentChallenge({
              challengeInstruction:
                overallContent[currentModule as Module][
                  overallContent[currentModule as Module].length - 1
                ].challengeInstruction,
              labels: overallContent[currentModule as Module][
                overallContent[currentModule as Module].length - 1
              ].labels || [currentModule],
            });
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

    updateQuestions(
      user.uid,
      currentModule,
      data.response.points,
      answer,
      data.response.explanation,
      newChallengeAddedToPath
    );

    setExplanation(data.response.explanation);
    setChallengeInWaiting({
      challengeInstruction: data.response.newQuestion,
      labels: data.response.labels,
    });

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
    setDisplayTimer(false);
  };

  const handleNext = () => {
    updateSingleFieldForUser(user.uid, { ...progress });
    setCurrentChallenge(challengeInWaiting);
    setExplanation(undefined);
    setDisplayTimer(true);
    clearTimer(getDeadTime());
  };

  if (dataIsLoading) {
    return (
      <div className="flex flex-col p-12 h-5/6">
        <LoadingScreen />
      </div>
    );
  }

  return (
    <div className="flex flex-col pl-12 pr-12 h-5/6">
      {currentModule && currentChallenge && (
        <>
          <div className="flex items-center justify-between w-5/6">
            <h1 className="pb-6 pt-4 text-3xl font-bold">
              Module: {capitalizeFirstLetter(currentModule)}
            </h1>
            {displayTimer && <h2 className="font-bold text-2xl">{timer}</h2>}
          </div>

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
