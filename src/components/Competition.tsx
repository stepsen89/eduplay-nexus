import Image from "next/image";
import Link from "next/link";
import { mock } from "node:test";
import React, { useEffect } from "react";

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
  { username: "programmingWizard", points: 1106, profilePicture: "/undraw_pic_profile.svg" },
  { username: "levelcoder", points: 1036, profilePicture: "/undraw_pic_profile.svg" },
  { username: "jsjames", points: 1032, profilePicture: "/undraw_pic_profile.svg" },
  { username: "theUltimateCoder", points: 945, profilePicture: "/undraw_pic_profile.svg" },
];

const CompetitionCard = ({ points }: CompetitionCard) => {
  return (
    <div
      style={styles.Card}
      className="w-500 h-40 shadow-[0px_2px_10px_rgba(3,3,3,0.1)] flex text-black mt-6"
    >
      <div className="flex flex-col my-4 ml-4  w-full h-auto overflow-auto ">
        {mockUserLeaderboard.map((user, index) => {
          return (
            <>
              <div className="flex justify-between items-center py-1 pr-6" key={index}>
                <div>
                  <p className="font-bold"> {index + 1}. </p>
                </div>
                <div className=" flex ">
                  <Image src={user.profilePicture} width={30} height={30} alt="Profile picture" />
                </div>
                <div className="w-4/6 flex items-center ">
                  <p className="font-extralight text-sm ">{user.username} </p>
                </div>
                <div>
                  <p className="text-sm font-bold"> {user.points} </p>
                </div>
              </div>
              <hr className=" pt-2 pb-2 pr-6 w-11/12" />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default CompetitionCard;
