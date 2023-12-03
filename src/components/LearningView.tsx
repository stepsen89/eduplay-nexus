"use client";

import { javascript } from "@codemirror/lang-javascript";
import { basicDark } from "@uiw/codemirror-theme-basic";
import createTheme from "@uiw/codemirror-themes";
import { tags as t } from "@lezer/highlight";

import CodeMirror from "@uiw/react-codemirror";

import Link from "next/link";
import React from "react";
import { useUserContext } from "@/context/UserDataContext";

const styles = {
  Card: {
    backgroundColor: "#ECEFF4",
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

type LearningContent = {
  question: string;
  labels: string[];
};

function LearningView({
  currentLearning,
  submitting,
  handleSubmitCall,
  handleNext,
  explanation,
}: {
  currentLearning: LearningContent;
  submitting: boolean;
  handleSubmitCall: (value: string) => void;
  handleNext: () => void;
  explanation?: string;
}) {
  const [value, setValue] = React.useState("// Type your code here");
  const onChange = React.useCallback((val: string) => {
    setValue(val);
  }, []);

  const handleSubmit = () => {
    handleSubmitCall(value);
  };

  React.useEffect(() => {
    setValue("// Type your code here");
  }, [currentLearning.question]);

  return (
    <div className="h-full flex w-full flex-col md:flex-row pb-8">
      <div className="md:w-1/2 w-full h-2/6 md:h-5/6">
        <div className="h-1/8">
          <button style={styles.Input} className="mb-4">
            Instructions
          </button>
        </div>
        <div style={styles.Card} className="md:h-555 text-black bg-green-500">
          <h2> {currentLearning.question}</h2>
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
              height="400px"
              theme={basicDark}
              width="auto"
              extensions={[javascript({ jsx: true })]}
              onChange={onChange}
            />
          </div>
          <div className="h-24 p-2 scroll-m-2 overflow-auto scr">
            <p>{explanation}</p>
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
                submitting || value === "// Type your code here" || !!explanation
                  ? "opacity-50 bg-slate-200 "
                  : "bg-purple-500"
              } rounded-lg px-4 py-2}`}
              // style={styles.InputTwo}
              onClick={handleSubmit}
              disabled={value === "// Type your code here" || !!explanation}
            >
              {submitting ? "Thinking ... " : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LearningView;
