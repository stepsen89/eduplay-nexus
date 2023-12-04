"use client";

import Image from "next/image";

export default function NavProgressBar({ points = 786 }: { points: number }) {
  return (
    <div className="w-full  flex justify-end content-center h-16 items-center px-12 py-2">
      <div className="flex justify-center pt-6">
        <Image src={"/cat-silhouette.svg"} alt={"Cat Silhouette"} width={50} height={50} />
      </div>
    </div>
  );
}
