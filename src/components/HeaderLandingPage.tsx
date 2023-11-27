"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function HeaderLandingPage() {
  const [show, setShow] = useState(false);
  const showSideMenu = (e) => {
    show ? setShow(false) : setShow(true);
  };

  return (
    <div className="container p-8 ">
      <div className="flex sm:columns-2 justify-between w-full items-center ">
        <div className="md:flex">
          <div>
            <Image src="/owllogo.png" alt="Owl Logo" width="150" height="150" />
          </div>
        </div>
        <div className=" lg:flex gap-4 items-center">
          <a href="/signin" className="px-6 font-bold text-gray">
            Log In
          </a>
          <Link
            href="/signup"
            className="w-50 rounded-full bg-black p-2 px-8 font-bold text-white bg-primary"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
