import React from 'react';
import CustomLink from '../components/CustomLink'; 

const Navigation: React.FC = () => {
  return (
    <nav
      className="w-[40%] mt-16 flex justify-around align-middle border border-cyan rounded-lg"
    >
      <CustomLink
        href="/"
        className="w-full text-base text-center font-nunito m-2.5 border-0 cursor-pointer rounded capitalize font-semibold"
        activeClassName="bg-cyan text-gray-300"
      >
        Crypto
      </CustomLink>
      <CustomLink
        href="/trending"
        className="w-full text-base text-center font-nunito m-2.5 border-0 cursor-pointer rounded capitalize font-semibold"
        activeClassName="bg-cyan text-gray-300"
      >
        Trending
      </CustomLink>
      <CustomLink
        href="/saved"
        className="w-full text-base text-center font-nunito m-2.5 border-0 cursor-pointer rounded capitalize font-semibold"
        activeClassName="bg-cyan text-gray-300"
      >
        Saved
      </CustomLink>
    </nav>
  );
};

export default Navigation;
