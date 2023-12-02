import { useUserContext } from "@/context/UserDataContext";
import Image from "next/image";

export default function NavProgressBar({ points = 786 }: { points: number }) {
  return (
    <div className="w-full  flex justify-end content-center h-16 items-center p-12">
      <p className="pr-6 font-bold"> {points} </p>
      <div>
        <Image src="/undraw_pic_profile.svg" alt="" height={50} width={50} />
      </div>
    </div>
  );
}
