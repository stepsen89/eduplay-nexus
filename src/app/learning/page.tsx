"use client";

import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { createTheme } from "@uiw/codemirror-themes";
import { tags as t } from "@lezer/highlight";
import axios from "axios";

import { javascript } from "@codemirror/lang-javascript";

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

export default function Home() {
  const [value, setValue] = React.useState("console.log('hello world!');");
  const onChange = React.useCallback((val, viewUpdate) => {
    console.log("val:", val);
    setValue(val);
  }, []);

  const makeCall = async () => {
    console.log("test");

    const { data } = await axios.post("/api/chat", {
      question: "What is 2 plus 4, really short answer",
    });
    console.log(data);
    return data.response;
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 border">
      <CodeMirror
        value="Type your answer here"
        height="200px"
        theme={myTheme}
        width="500px"
        extensions={[javascript({ jsx: true })]}
        onChange={onChange}
      />
      <button onClick={makeCall}> Click me </button>
    </main>
  );
}
