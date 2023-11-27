import Image from "next/image";
import Link from "next/link";

function HeroComponent() {
  return (
    <div className="container h-4/6 pb-24 md:pt-24 pt-12">
      <div className="flex flex-col-reverse md:flex-row md:justify-around md:items-center">
        <div className="flex justify-center flex-col gap-4 items-center p-4 my-8 md:items-start md:w-1/2">
          <h1 className="text-4xl text-center font-bold md:text-5xl md:text-left">
            More than just learning
          </h1>
          <p className="text-center text-gray font-bold text-4xl md:text-left md:text-lg">
            Build a strong foundation in programming skills, not only following a tutorial. Get to
            know and understand the things you learn
          </p>
          <Link href="/signup" className="w-50 rounded-full bg-black p-4 px-8 font-bold text-white">
            Get Started For free
          </Link>
        </div>
        <div>
          <Image
            src="/undraw_programming.svg"
            alt="A person sitting on a chair in front of a computer working"
            height="600"
            width="600"
          />
        </div>
      </div>
    </div>
  );
}

export default HeroComponent;
