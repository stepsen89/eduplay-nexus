"use client";

import Image from "next/image";
import React from "react";

const styles = {
  Card: {
    // width: "584px",
    // height: "154px",
    // backgroundColor: "#ffffff",
    borderRadius: "24px",
    boxShadow: "0px 2px 10px rgba(3,3,3,0.1)",
  },
};

const text = {
  Text: {
    fontSize: "20px",
    fontWeight: 600,
    lineHeight: "24px",
  },
};

interface CompetitionCard {
  points: number;
}

const mockUserLeaderboard = [
  { username: "javaScriptHero123", points: 1276, profilePicture: "/undraw_pic_profile.svg" },
  { username: "codeWizard", points: 1106, profilePicture: "/undraw_pic_profile.svg" },
  { username: "levelcoder", points: 1036, profilePicture: "/undraw_pic_profile.svg" },
  { username: "jsjames", points: 1032, profilePicture: "/undraw_pic_profile.svg" },
  { username: "theUltimateCoder", points: 945, profilePicture: "/undraw_pic_profile.svg" },
  { username: "codingCat", points: 945, profilePicture: "/undraw_pic_profile.svg" },
];

const CompetitionCard = () => {
  return (
    <div
      style={styles.Card}
      className="w-auto h-48 shadow-[0px_2px_10px_rgba(3,3,3,0.1)] bg-white flex text-black mt-2"
    >
      <div className="flex flex-col my-4 ml-4 w-full h-auto overflow-auto ">
        {mockUserLeaderboard.map((user, index) => {
          return (
            <>
              <div className="flex justify-between items-center py-1 pr-6" key={index}>
                <div>
                  <p className="font-bold text-sm"> {index + 1}. </p>
                </div>

                <div className="w-4/6 flex items-center ">
                  <p className="font-extralight text-sm ">{user.username} </p>
                </div>
                <div>
                  <p className="text-sm font-bold"> {user.points} </p>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default CompetitionCard;
