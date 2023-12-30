// @ts-ignore

"use client";
// @ts-ignore
import React from "react";

//@ts-ignore
export const GPTConversationContext = React.createContext({});

export const useGPTContext = () => React.useContext(GPTConversationContext);

type Message = {
  role: string;
  message: string;
};

export const GPTContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [messages, setMessages] = React.useState<Message[]>([]);

  const updateGPTConversation = (message: Message) => {
    setMessages((prevState) => [...prevState, message]);
  };

  //@ts-ignore
  return (
    <GPTConversationContext.Provider
      value={{
        messages,
        updateGPTConversation,
      }}
    >
      {children}
    </GPTConversationContext.Provider>
  );
};
