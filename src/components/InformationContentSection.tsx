"use client";

import { javascript } from "@codemirror/lang-javascript";
import { basicDark } from "@uiw/codemirror-theme-basic";
import createTheme from "@uiw/codemirror-themes";
import { tags as t } from "@lezer/highlight";

import CodeMirror, { highlightActiveLine } from "@uiw/react-codemirror";

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

type Section = {
  section: string;
  explanation: string;
  example: string;
};

function InformationContentSection({ section }: { section: Section }) {
  return (
    <div>
      <div className="pt-8">
        <h3 className="font-bold py-3">{section.section}</h3>
        <p className="py-3"> {section.explanation}</p>
      </div>
      <div>
        <div>
          <CodeMirror
            value={section.example}
            height="auto"
            theme={basicDark}
            width="auto"
            extensions={[javascript({ jsx: true })]}
            readOnly={true}
            basicSetup={{ highlightActiveLine: false, highlightActiveLineGutter: false }}
          />
        </div>
      </div>
    </div>
  );
}

export default InformationContentSection;
