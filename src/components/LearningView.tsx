"use client";

import { javascript } from "@codemirror/lang-javascript";
import { basicDark } from "@uiw/codemirror-theme-basic";
import createTheme from "@uiw/codemirror-themes";
import { tags as t } from "@lezer/highlight";

import CodeMirror from "@uiw/react-codemirror";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useUserContext } from "@/context/UserDataContext";
import { GPTSingleLearningContent } from "@/utils/types";

const styles = {
  Card: {
    // backgroundColor: "#ECEFF4",
    borderRadius: "12px 0 0 12px",

    padding: "16px",
    fontColor: "black",
  },
  Input: {
    top: "117px",
    left: "745px",
    width: "auto",
    height: "35px",
    padding: "0px 8px",
    border: "1px solid #9012ea",
    borderRadius: "12px",
    backgroundColor: "#ffffff",
    color: "#3f3f47",
    fontSize: "14px",
    lineHeight: "18px",
    outline: "none",
  },
  SkipButton: {
    top: "117px",
    left: "745px",
    width: "150px",
    height: "40px",
    padding: "0px 8px",
    border: "1px solid #9012ea",
    borderRadius: "12px",
    backgroundColor: "gray",
    // color: "#3f3f47",
    fontSize: "14px",
    lineHeight: "18px",
    outline: "none",
  },
};

function LearningView({
  currentChallenge,
  submitting,
  handleSubmitCall,
  handleNext,
  pointsToDisplay,
  explanation,
}: {
  currentChallenge: GPTSingleLearningContent;
  submitting: boolean;
  handleSubmitCall: (value: string) => void;
  handleNext?: () => void;
  explanation?: string;
  pointsToDisplay?: number;
}) {
  const [value, setValue] = React.useState("// Type your answer here");

  const onChange = React.useCallback((val: string) => {
    setValue(val);
  }, []);

  const handleSubmit = () => {
    handleSubmitCall(value);
  };

  React.useEffect(() => {
    setValue("// Type your answer here");
  }, [currentChallenge]);

  return (
    <div className="h-full flex w-full xl:w-10/12 flex-col md:flex-row pb-8">
      <div className="md:w-1/2 w-full h-2/6 md:h-5/6">
        <div className="h-1/8">
          <button style={styles.Input} className="mb-4">
            Instructions
          </button>
        </div>
        <div
          style={styles.Card}
          className="md:h-555 text-black bg-gray-100 flex flex-col justify-between"
        >
          {/* <h2 className="font-bold pb-2"> Question {questionNumber}:</h2> */}
          <h3>{currentChallenge.challengeInstruction}</h3>
          <div className="mb-4">
            <p className="font-light italic pb-4">
              TIP: If you need to answer the question with words you can type it as a comment,
              sometimes you need to explain your code. Please try to use code whenever possible
            </p>
            <div>
              <div className="flex flex-wrap items-center">
                <span>Labels:</span>
                {currentChallenge.labels.map((label) => (
                  <span
                    className={`text-white text-sm py-1.5 px-6 border bg-gray-500 italic ml-2
                rounded-full`}
                    key={label}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:w-1/2 w-full h-2/6 md:h-5/6">
        <div className="h-1/8">
          <button style={styles.Input} className="mb-4">
            Your solution
          </button>
        </div>
        <div className="flex flex-col justify-between md:h-555 h-2/6">
          <div>
            <CodeMirror
              value={value}
              height="250px"
              theme={basicDark}
              width="auto"
              extensions={[javascript({ jsx: true })]}
              onChange={onChange}
            />
          </div>
          <div className=" p-2 scroll-m-2 overflow-auto h-72">
            {explanation && (
              <p>
                <span className="font-bold"> {pointsToDisplay}/100 </span> - {explanation}
              </p>
            )}
          </div>
          <div className="flex flex-row justify-end  w-full contend-center md:pb-0 pb-12">
            {explanation && (
              <button
                type="button"
                className={`text-white bg-purple-500 rounded-lg px-8 py-2 mr-2`}
                onClick={handleNext}
              >
                Okay, got it! Next
              </button>
            )}
            <button
              type="button"
              className={`text-white py-2 px-8 border rounded-full   ${
                value === "// Type your answer here" || !!explanation
                  ? "opacity-30 bg-slate-500 "
                  : "bg-purple-500"
              } rounded-lg px-4 py-2}`}
              // style={styles.InputTwo}
              onClick={handleSubmit}
              disabled={value === "// Type your answer here" || !!explanation}
            >
              {submitting ? (
                <div className="col-3 flex justify-between content-center items-center w-32">
                  <span> Thinking </span>

                  <div className="snippet" data-title="dot-pulse">
                    <div className="stage">
                      <div className="dot-pulse"> </div>
                    </div>
                  </div>
                </div>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LearningView;
