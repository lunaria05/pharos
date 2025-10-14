// src/components/Navbar/Navbar.tsx (NO CHANGES NEEDED HERE)
"use client"
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Button from '@/Components/UI/Button'; // Ensure this path is correct
import logo from "@/app/assets/logo-p.png"

// Inline SVG for the Menu icon
const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 mr-2"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={3}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);


const Navbar: React.FC = () => {
  const handleMenuClick = () => {
    console.log('Menu button clicked! Open mobile/desktop menu.');
  };

  return (
    <nav className="flex items-center justify-between p-4 border-b-4 border-black bg-white relative z-50">
      {/* Logo on the left */}
      <div className="flex items-center">
        <Link href="/" className="flex items-center">
          {/* <span className="text-3xl font-black uppercase text-black tracking-tight drop-shadow-[2px_2px_0px_#f97028]">
            Pharos
          </span> */}
          <Image src={logo} alt="" className='w-40'/>
        </Link>
      </div>

      {/* Menu button in the middle */}
      <div className="hidden md:flex items-center">
        <Button
          onClick={handleMenuClick}
          color="pharos-yellow" // This should now apply correctly via inline style
          shape="medium-rounded"
          className="px-6 py-2 text-lg flex items-center"
        >
          <MenuIcon />
          Menu
        </Button>
      </div>
     

      {/* Connect Wallet button on the right */}
      <div className="flex items-center">
        <Button
          onClick={() => console.log('Connect Wallet clicked')}
          color="pharos-orange"
          shape="full-rounded"
          className="px-6 py-2 text-lg"
        >
          Connect Wallet
        </Button>
      </div>

      {/* Mobile Hamburger Menu Button */}
      <div className="md:hidden">
        <button onClick={handleMenuClick} className="text-black text-3xl p-2 border-4 border-black shadow-[2px_2px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-100">
          &#9776;
        </button>
      </div>
    </nav>
  );
};

export default Navbar;