import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24 border">
      <h3> Homepage</h3>
      <Link href="/signin"> Log in </Link>
      <Link href="/signup"> Sign Up </Link>
    </main>
  );
}
