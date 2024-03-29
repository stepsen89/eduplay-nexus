"use client";

import { javascript } from "@codemirror/lang-javascript";
import { basicDark } from "@uiw/codemirror-theme-basic";
import createTheme from "@uiw/codemirror-themes";
import { tags as t } from "@lezer/highlight";

import CodeMirror, { highlightActiveLine } from "@uiw/react-codemirror";

import Link from "next/link";
import React from "react";
import { useUserContext } from "@/context/UserDataContext";
import { GPTLearningContent, GPTSingleLearningContent } from "@/utils/types";
import { capitalizeFirstLetter } from "@/utils/helpers";

function LearningPath({
  generatedPath,
  resetMyPath,
}: {
  generatedPath: { name: string; value: GPTSingleLearningContent[] };
  resetMyPath: (module: string) => void;
}) {
  return (
    <div>
      <div className="pt-8 flex justify-between items-center w-3/5">
        <h2 className="font-bold py-3 text-lg">
          JavaScript Module: {capitalizeFirstLetter(generatedPath.name)}
        </h2>
        {generatedPath.value.length > 1 && (
          <button
            type="button"
            className={`text-white bg-purple-500 rounded-lg px-4 py-2 text-sm tracking-widest	`}
            onClick={() => resetMyPath(generatedPath.name)}
          >
            Reset
          </button>
        )}
      </div>
      <div>
        {generatedPath.value.length === 1 ? (
          <p> No path generated yet, start the module to see your path </p>
        ) : (
          <div className="">
            {generatedPath.value.slice(0, -1).map((section, index) => (
              <>
                <div key={index} className="flex justify-between w-3/5 py-2">
                  <h2 className="w-4/5 font-bold">
                    <span className="font-bold"> {index + 1}. </span> {section.challengeInstruction}{" "}
                  </h2>
                  <span>
                    <span className="font-bold"> {section.points}</span>/100
                  </span>
                </div>
                <div className="w-3/5">
                  <h3 className="pt-2 pb-3 font-semibold"> Your answer: </h3>
                  <CodeMirror
                    value={section.answerGiven}
                    height="auto"
                    theme={basicDark}
                    width="auto"
                    extensions={[javascript({ jsx: true })]}
                    readOnly={true}
                    basicSetup={{ highlightActiveLine: false, highlightActiveLineGutter: false }}
                  />
                  <h3 className="py-2 font-semibold"> Your feedback: </h3>
                  <p className="italic pb-4"> {section.feedback} </p>
                </div>
                <hr className="w-3/5 pb-4 text-black border-t-gray-950" />
              </>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default LearningPath;
