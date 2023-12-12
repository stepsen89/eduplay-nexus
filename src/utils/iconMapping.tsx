import Awards from "@/components/Awards/Awards";
import Image from "next/image";
import { Award } from "./types";

type Mapping = {
  alt: string;
  src: string;
  title: string;
  description: string;
};

type AwardsToMapping = {
  [key in Award]: Mapping;
};

const awardsMapping: AwardsToMapping = {
  basic: {
    alt: "Hacker Icon",
    src: "/icons8-hacker-100-2.png",
    title: "New User",
    description: "First login to your journey!",
  },
  arrays: {
    alt: "Array Icon",
    src: "/icons8-outline-100.png",
    title: "JS Arrays",
    description: "All about push, put, post",
  },
  functions: {
    alt: "Functions Icon",
    src: "/icons8-function-100-2.png",
    title: "JS Functions",
    description: "First login to your journey!",
  },
  variables: {
    alt: "Variables Icon",
    src: "/icons8-code-100.png",
    title: "JS Variables",
    description: "Variables completed!",
  },
  firstCompleted: {
    alt: "Hacker Icon",
    src: "/icons8-hacker-100-2.png",
    title: "First Challenge Completed!",
    description: "First login to your journey!",
  },
  fiveCompleted: {
    alt: "Hacker Icon",
    src: "/icons8-heat-map-100.png",
    title: "Five Completed!",
    description: "5 completed!",
  },
  tenCompleted: {
    alt: "Hacker Icon",
    src: "/icons8-inspect-code-100.png",
    title: "10 Completed!",
    description: "10 challenges completed!",
  },
  fifteenCompleted: {
    alt: "Hacker Icon",
    src: "/icons8-static-view-level1-100.png",
    title: "15 Completed!",
    description: "15 challenges completed!",
  },
  "250Points": {
    alt: "Hacker Icon",
    src: "/icons8-inspect-code-100.png",
    title: "250 points!",
    description: "First login to your journey!",
  },
  "500Points": {
    alt: "Hacker Icon",
    src: "/icons8-inspect-code-100.png",
    title: "500 points!",
    description: "First login to your journey!",
  },
  objects: {
    alt: "Hacker Icon",
    src: "/icons8-objects-100.png",
    title: "Objects",
    description: "Object module completed",
  },
};
const iconMapping = {
  basic: (
    <Image
      alt="Hacker Icon"
      className="rounded-lg"
      src="/icons8-hacker-100-2.png"
      width={50}
      height={50}
    />
  ),
  arrays: (
    <Image
      alt="Outline icon"
      className="rounded-lg"
      src="/icons8-outline-100.png"
      width={50}
      height={50}
    />
  ),
  variables: (
    <Image
      alt="Code Icon"
      className="rounded-lg"
      src="/icons8-code-100.png"
      width={50}
      height={50}
    />
  ),
  functions: (
    <Image
      alt="Functions Icon"
      className="rounded-lg"
      src="/icons8-function-100-2.png"
      width={50}
      height={50}
    />
  ),
  scopes: (
    <Image
      alt="Robot Icon"
      className="rounded-lg"
      src="/icons8-static-view-level1-100.png"
      width={50}
      height={50}
    />
  ),
  firstCompleted: (
    <Image
      alt="Robot Icon"
      className="rounded-lg"
      src="/icons8-bot-100.png"
      width={50}
      height={50}
    />
  ),
  tenCompleted: (
    <Image
      alt="Robot Icon"
      className="rounded-lg"
      src="/icons8-bot-100.png"
      width={50}
      height={50}
    />
  ),
  fiveCompleted: (
    <Image
      alt="Robot Icon"
      className="rounded-lg"
      src="/icons8-bot-100.png"
      width={50}
      height={50}
    />
  ),
};

export { iconMapping, awardsMapping };
