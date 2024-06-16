import Image from "next/image";
import Link from "next/link";
import Crypto from "./pages/Crypto";
import Logo from "./components/Logo";
import Navigation from "./components/Navigation";

export default function Home() {
  return (
    <>
      <main
        className="w-full h-full flex flex-col first-letter:
    content-center items-center relative text-white font-nunito
    "
      >
        <div className="w-screen h-screen bg-gray-300 fixed -z-10" />
        <Logo />
        <Navigation />
        <Crypto />
      </main>
    </>
  );
}
