"use client";

import { awardsMapping } from "@/utils/iconMapping";
import { Award } from "@/utils/types";
import Image from "next/image";
import React from "react";

const Awards = ({ awards }: { awards: Award[] }) => {
  return (
    <div className="flex flex-col mt-12">
      <h2 className="text-lg font-bold"> Your awards: </h2>
      {awards.length > 0 ? (
        <div className="flex flex-wrap mt-4">
          {awards.map((award: Award, index) => (
            <div
              key={index}
              className="w-96 h-24 shadow-[0px_2px_10px_rgba(3,3,3,0.1)] flex text-black mt-4 mr-4 border rounded-3xl"
            >
              <div className="w-4/12 bg-blue border-blue-500 border ml-2 m-auto rounded-xl flex content-center items-center justify-center">
                <Image
                  alt={awardsMapping[award].alt}
                  src={awardsMapping[award].src}
                  width={70}
                  height={50}
                />
              </div>
              <div className="flex flex-col content-center my-4 ml-4  w-full h-auto  ">
                <h3 className="font-bold">{awardsMapping[award].title}</h3>
                <p className="font-extralight text-sm"> {awardsMapping[award].description} </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <h3 className="pt-4"> Oh no ... no awards yet :(</h3>
          <p className="text-sm font-extralight"> Keep learning to earn your first award!</p>
        </>
      )}
    </div>
  );
};

export default Awards;
