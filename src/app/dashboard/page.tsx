"use client";

import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { createTheme } from "@uiw/codemirror-themes";
import { tags as t } from "@lezer/highlight";
import axios from "axios";

import { javascript } from "@codemirror/lang-javascript";
import { useAuthContext } from "@/context/AuthContext";
import addData from "@/firebase/addData";

export default function Home() {
  const { user } = useAuthContext();

  const makeCall = async () => {
    const data = {
      name: "John snow",
      house: "Stark",
    };
    console.log(user);
    const { result, error } = await addData(data);

    console.log(result);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 border">
      <button onClick={makeCall}> Click me </button>
    </main>
  );
}
