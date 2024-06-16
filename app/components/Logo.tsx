"use client";

import Link from "next/link";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const Logo = () => {
  const session = useSession();

  console.log("session: ", session);
  return (
    <>
      <header>
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <Link
            href="/"
            className="
     absolute top-[1.5rem] left-[1.5rem] [text-decoration:none]
text-lg text-cyan flex items-center
     "
          >
            <img src="/logo.svg" alt="CryptoBucks" />
            <span>CryptoBucks</span>
          </Link>

          {session?.data ? (
            <div>
              <button onClick={() => signOut()}>Sign Out</button>
              <p>{session.data.user?.name}</p>
            </div>
          ) : (
            <button onClick={() => signIn("google")}>Sign In</button>
          )}
        </nav>
      </header>
    </>
  );
};

export default Logo;
