"use client";

import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { createTheme } from "@uiw/codemirror-themes";
import { tags as t } from "@lezer/highlight";
import axios from "axios";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";

import { javascript } from "@codemirror/lang-javascript";
import FormAction from "./FormAction";

const myTheme = createTheme({
  theme: "light",
  settings: {
    background: "#ffffff",
    backgroundImage: "",
    foreground: "#4D4D4C",
    caret: "#AEAFAD",
    selection: "#D6D6D6",
    selectionMatch: "#D6D6D6",
    gutterBackground: "#FFFFFF",
    gutterForeground: "#4D4D4C",
    gutterBorder: "#dddddd",
    gutterActiveForeground: "",
    lineHighlight: "#EFEFEF",
  },
  styles: [
    { tag: t.comment, color: "#787b80" },
    { tag: t.definition(t.typeName), color: "#194a7b" },
    { tag: t.typeName, color: "#194a7b" },
    { tag: t.tagName, color: "#008a02" },
    { tag: t.variableName, color: "#1a00db" },
  ],
});

export default function LearningCard({ question }) {
  const [value, setValue] = React.useState("console.log('hello world!');");
  const onChange = React.useCallback((val: string) => {
    setValue(val);
  }, []);

  const handleCall = async () => {
    console.log(question);
    const { data } = await axios.post("/api/chat", {
      answer: value,
      areas: question.areas,
    });

    console.log(data);
  };

  return (
    <div className="w-10/12 h-min-4/6 flex flex-col bg-slate-300 p-12 rounded-lg ">
      <h2 className="py-6 text-primary font-semibold text-xl"> {question.questions[0]}</h2>
      <CodeMirror
        value="// Type your answer here"
        height="300px"
        theme={vscodeDark}
        width="500"
        extensions={[javascript({ jsx: true })]}
        onChange={onChange}
      />
      <button
        onClick={handleCall}
        disabled={value.length < 1}
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary mt-10 text-semibold text-white"
      >
        Submit your answer{" "}
      </button>
    </div>
  );
}
