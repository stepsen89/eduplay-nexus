import HeaderLandingPage from "@/components/HeaderLandingPage";
import HeroComponent from "@/components/Hero";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <HeaderLandingPage />
      <HeroComponent />
      {/* <h3> Homepage</h3> */}
      {/* <Link href="/signin"> Log in </Link> */}
      {/* <Link href="/signup"> Sign Up </Link> */}
    </main>
  );
}
