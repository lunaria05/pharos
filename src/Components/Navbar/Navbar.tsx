// src/components/Navbar/Navbar.tsx
"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import Button from '@/Components/UI/Button';
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

// Menu items configuration
const menuItems = [
  { name: 'Raffles', href: '/raffle', color: 'bg-[#FFE455]' },
  { name: 'Leaderboard', href: '/leaderboard', color: 'bg-[#A6FAFF]' },
  { name: 'Profile', href: '/profile', color: 'bg-[#FF6B9D]' },
  { name: 'Admin Dashboard', href: '/admin', color: 'bg-[#C0F7B4]' },
];

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="flex font-rubik items-center justify-between p-4 border-b-4 border-black bg-white relative z-50">
      {/* Logo on the left */}
      <div className="flex items-center">
        <Link href="/" className="flex items-center">
          <Image src={logo} alt="" className='w-40'/>
        </Link>
      </div>

      {/* Menu button in the middle */}
      <div className="hidden md:flex items-center relative">
        <Button
          onClick={handleMenuClick}
          color="pharos-yellow"
          shape="medium-rounded"
          className="cursor-pointer  px-6 py-2 text-lg flex items-center"
        >
          <MenuIcon />
          Menu
        </Button>

        {/* Dropdown Menu - Expands from Center */}
        <div
          className={`absolute top-full mt-4 left-1/2 -translate-x-1/2 transition-all duration-300 ease-out origin-center ${
            isMenuOpen
              ? 'opacity-100 scale-100 visible'
              : 'opacity-0 scale-0 invisible'
          }`}
        >
          <div className="bg-white border-4 border-black shadow-[8px_8px_0px_#000] p-3">
            <div className="flex gap-3">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`${item.color} border-4 border-black px-6 py-3 font-black text-black uppercase tracking-tight
                    shadow-[4px_4px_0px_#000] hover:shadow-[2px_2px_0px_#000]
                    hover:translate-x-[2px] hover:translate-y-[2px]
                    active:shadow-none active:translate-x-[4px] active:translate-y-[4px]
                    transition-all duration-100 whitespace-nowrap text-center`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Connect Wallet button on the right */}
      <div className="flex items-center">
        <Button
          onClick={() => console.log('Connect Wallet clicked')}
          color="pharos-orange"
          shape="full-rounded"
          className="cursor-pointer px-6 py-2 text-lg"
        >
          Connect Wallet
        </Button>
      </div>

      {/* Mobile Hamburger Menu Button */}
      <div className="md:hidden relative">
        <button
          onClick={handleMenuClick}
          className="text-black text-3xl p-2 border-4 border-black shadow-[2px_2px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-100"
        >
          &#9776;
        </button>

        {/* Mobile Menu Dropdown */}
        <div
          className={`absolute top-full mt-4 right-0 transition-all duration-300 ease-out origin-top ${
            isMenuOpen
              ? 'opacity-100 scale-100 visible'
              : 'opacity-0 scale-0 invisible'
          }`}
        >
          <div className="bg-white border-4 border-black shadow-[8px_8px_0px_#000] p-3 min-w-[200px]">
            <div className="flex flex-col gap-3">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`${item.color} border-4 border-black px-6 py-3 font-black text-black uppercase tracking-tight
                    shadow-[4px_4px_0px_#000] hover:shadow-[2px_2px_0px_#000]
                    hover:translate-x-[2px] hover:translate-y-[2px]
                    active:shadow-none active:translate-x-[4px] active:translate-y-[4px]
                    transition-all duration-100 text-center text-sm`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Overlay to close menu when clicking outside */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-[-1]"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;