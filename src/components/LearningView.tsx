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
    // top: "165px",
    // left: "128px",
    // width: "auto",
    height: "555px",
    backgroundColor: "#ECEFF4",
    borderRadius: "12px 0 0 12px",
    // border: "1px solid #9012ea",
    // boxSizing: "border-box",
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
  InputTwo: {
    top: "117px",
    left: "745px",
    width: "150px",
    height: "40px",
    padding: "0px 8px",
    border: "1px solid #9012ea",
    borderRadius: "12px",
    backgroundColor: "#9013E9",
    // color: "#3f3f47",
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
  currentLearning,
  submitting,
  handleSubmitCall,
  handleNext,
  explanation,
}: {
  currentLearning: {
    question: string;
    labels: string[];
  };
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
    <div className="h-full flex w-full">
      <div className="w-1/2 h-5/6">
        <div className="h-1/8">
          <button style={styles.Input} className="mb-4">
            Instructions
          </button>
        </div>
        <div style={styles.Card} className="text-black bg-green-500">
          <h2> {currentLearning.question}</h2>
        </div>
      </div>
      <div className="w-1/2 h-5/6">
        <div className="h-1/8">
          <button style={styles.Input} className="mb-4">
            Your solution
          </button>
        </div>
        <div className=" flex flex-col justify-between " style={{ height: "555px" }}>
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
          <div className="flex flex-row justify-center  w-full contend-center">
            <button
              type="button"
              className={`text-white  ${
                submitting || value === "// Type your code here" ? "opacity-50" : ""
              } rounded-lg px-4 py-2}`}
              style={styles.InputTwo}
              onClick={handleSubmit}
              disabled={value === "// Type your code here"}
            >
              {submitting ? "Processing ... " : "Submit"}
            </button>
            {explanation && (
              <button
                type="button"
                className={`text-white bg-slate-400 rounded-lg px-4 py-2}`}
                style={styles.InputTwo}
                onClick={handleNext}
              >
                Skip
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LearningView;
