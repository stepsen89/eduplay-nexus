"use client";

import Image from "next/image";
import Link from "next/link";
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

interface CourseCardProps {
  title: string;
  description: string;
  overallProgress: number;
}

const CourseCard = ({ title, description, overallProgress = 0 }: CourseCardProps) => {
  return (
    <Link
      style={styles.Card}
      className="w-564 h-40 shadow-[0px_2px_10px_rgba(3,3,3,0.1)] flex text-black mt-6"
      href="/learning"
    >
      <div className="w-4/12 h-4/5 bg-primary my-4 ml-4 rounded-xl">
        <Image
          alt="Photo by Gabriel Heinzer on Unsplash"
          className="h-full w-full rounded-lg"
          src="/javascript.jpg"
          width={160}
          height={550}
        />
      </div>
      <div className="flex flex-col justify-center my-4 ml-4 pb-2  w-full h-auto ">
        <h3 style={text.Text} className="">
          {title}
        </h3>
        <p className="pb-6 font-extralight text-sm"> {description} </p>
        <div className="w-72 rounded-full h-1 dark:bg-gray-700 bg-slate-500">
          <div
            className={`bg-blue-500 h-1 rounded-full`}
            style={{ width: `${overallProgress}%` }}
          ></div>
          <p className="pt-2 text-xs"> {overallProgress}% completed</p>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
