"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import LearningView from "@/components/LearningView";
import { getLearningContent, getUserProgressInformation } from "@/firebase/getData";
import { useUserContext } from "@/context/UserDataContext";
import axios from "axios";
import { updateSingleFieldForUser } from "@/firebase/updateFields";
import { Award } from "@/utils/types";

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
    currentTopic,
    progress,
    points,
    awards,
    overallProgress,
    updateProgress,
    updatePoints,
    updateNewAwardSwal,
    setInitialUserInformation,
    updateAward,
  } = useUserContext();

  const router = useRouter();

  const [submitting, setSubmitting] = useState(false);
  const [loadedUserContent, setLoadedUserContent] = useState(false);
  const [learningContent, setLearningContent] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState<number>();
  const [explanation, setExplanation] = useState<string>();

  useEffect(() => {
    if (user == null && !loading) router.push("/");
    else if (user) {
      getUserProgressInformation(user.uid).then((result) => {
        setInitialUserInformation(result.result);
        setLoadedUserContent(true);
      });
    }
  }, [loading, user, currentTopic]);

  useEffect(() => {
    if (currentTopic) {
      getLearningContent(currentTopic).then((result) => setLearningContent(result?.result));
      setCurrentQuestion(progress[currentTopic as keyof typeof progress]?.lastSeen);
    }
  }, [currentTopic, router, progress]);

  const submitAnswer = async (answer: string) => {
    setSubmitting(true);
    const { data } = await axios.post("/api/chat", {
      answer: answer,
      areas: currentTopic,
      question: learningContent[currentQuestion as keyof typeof learningContent]?.question,
    });

    updatePoints(data.response.points);

    if (data.response.areasToImprove.length === 0) {
      updateProgress(currentTopic, "lastSeen");
      updateProgress(currentTopic, "awarded");
      if (
        progress[currentTopic as keyof typeof progress]?.awarded > 3 &&
        !progress[currentTopic as keyof typeof progress]?.completed
      ) {
        updateAward(currentTopic as Award);
        updateProgress(currentTopic, "completed");
        const newAwards = [...awards, currentTopic];
        updateSingleFieldForUser(user.uid, { points: points, ...progress, awards: newAwards });
        updateNewAwardSwal(true);
      } else {
        updateSingleFieldForUser(user.uid, { points: points, ...progress });
      }
      setCurrentQuestion(currentQuestion + 1);
    } else {
      if (data.response.explanation.length > 0) setExplanation(data.response.explanation);
    }

    setSubmitting(false);
  };

  const handleNext = () => {
    setCurrentQuestion(currentQuestion + 1);
    setExplanation(undefined);
  };

  if (!learningContent || !loadedUserContent || loading) {
    return (
      <div className="flex flex-col p-12 h-5/6">
        <div className="flex items-center justify-center w-full  rounded-lg    h-5/6">
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
            <span className="pt-4">Content is loading ...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col pl-12 h-5/6 ">
      {loadedUserContent && learningContent && learningContent[currentQuestion] ? (
        <>
          <div className="w-72 rounded-full h-1 dark:bg-gray-700 bg-slate-500">
            <div
              className={`bg-blue-500 h-1 rounded-full`}
              style={{ width: `${overallProgress}%` }}
            ></div>
          </div>
          <p className="pt-2 text-xs"> {overallProgress}% of this course completed</p>
          <h1 style={styles.Text} className="pb-6 pt-4">
            JavaScript Course v1
          </h1>
          <LearningView
            currentLearning={learningContent[currentQuestion as keyof typeof learningContent]}
            handleSubmitCall={submitAnswer}
            submitting={submitting}
            handleNext={handleNext}
            explanation={explanation}
          />
        </>
      ) : (
        <div> No content </div>
      )}
    </div>
  );
}
