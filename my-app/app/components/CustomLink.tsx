"use client";
import { usePathname } from 'next/navigation';
import Link, { LinkProps } from 'next/link';
import React, { ReactNode } from 'react';

interface CustomLinkProps extends LinkProps {
  className?: string;
  activeClassName?: string;
  children: ReactNode;
}

const CustomLink: React.FC<CustomLinkProps> = ({ href, className = '', activeClassName = '', children, ...props }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  const combinedClassName = `${className} ${isActive ? activeClassName : ''}`;

  return (
    <Link href={href} className={combinedClassName} {...props}>
      {children}
    </Link>
  );
};

export default CustomLink;

