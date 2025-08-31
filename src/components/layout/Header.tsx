import React from "react";
import Image from "next/image";
import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className="bg-[#734ccd] text-white p-4 flex items-center justify-between shadow-md">
      <Link href="/">
        <Image src={"/logo.png"} alt="SEM Automations Center Logo" width={150} height={50} className="cursor-pointer" />
      </Link>
      <nav className="flex gap-6">
        <Link href="/rsa" className="text-white hover:underline">
          RSA Builder
        </Link>
        <Link href="/keywords" className="text-white hover:underline">
          Keywords Tool
        </Link>
      </nav>
    </header>
  );
};

export default Header;
