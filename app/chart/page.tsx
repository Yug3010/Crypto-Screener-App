"use client";
import React, { useEffect } from "react";
import Home from "../page";
import Logo from "../components/Logo";
import Navigation from "../components/Navigation";

const page = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "/api/charts?id=bitcoin&days=7&vs_currency=usd"
        );
        const result = await response.json();
        console.log("in side API =?> ", result.data);
        // setData(result.data);
      } catch (err) {
        // setError(err);
      } finally {
        // setLoading(false);
      }
    };

    fetchData();
  }, []);

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
        Chart
      </main>
    </>
  );
};

export default page;
