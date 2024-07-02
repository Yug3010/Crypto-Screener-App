"use client";
import Link from "next/link";
import React from "react";
// import logoSvg from '@/public/logo.svg';
import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./Logo.module.css";

const Logo = () => {
  const session = useSession();

  return (
    <div className={styles.logoContainer}>
      <Link href="/" className={styles.logoLink}>
        <img src="/logo.svg" alt="CryptoBucks" className={styles.logoImage} />
        <span className={styles.logoText}>CryptoBucks</span>
      </Link>
      {session?.data ? (
        <div className={styles.userInfo}>
          <button className={styles.button} onClick={() => signOut()}>
            Sign Out
          </button>
          <p className={styles.userName}>{session.data.user?.name}</p>
        </div>
      ) : (
        <button className={styles.button} onClick={() => signIn("google")}>
          Sign In
        </button>
      )}
    </div>
  );
};

export default Logo;
