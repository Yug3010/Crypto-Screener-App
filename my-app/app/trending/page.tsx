import React from "react";
import Crypto from "../pages/Crypto";
import Home from "../page";
import Logo from "../components/Logo";
import Navigation from "../components/Navigation";

const page = () => {
  return (
    <>
    <main
        className="w-full h-full flex flex-col first-letter:
    content-center items-center relative text-white font-nunito
    "
      >

        <div className="w-screen h-screen bg-gray-300 fixed -z-10" />
        <Logo/>
        <Navigation/>
        Trending
        </main>
      
    </>
  );
};

export default page;
