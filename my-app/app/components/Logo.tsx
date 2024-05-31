import Link from 'next/link'
import React from 'react'
// import logoSvg from '@/public/logo.svg';


const Logo = () => {
  return (
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
  )
}

export default Logo