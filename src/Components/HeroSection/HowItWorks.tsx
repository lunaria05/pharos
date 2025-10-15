"use client"
import React from 'react';
import Image from 'next/image';
import Button from '@/Components/UI/Button';
import { FaUsers, FaDice, FaTrophy, FaDollarSign, FaRandom, FaEye } from 'react-icons/fa';

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: <FaDollarSign className="text-4xl" />,
      title: "JOIN & CONTRIBUTE",
      description: "Add PYUSD to a community pool to enter raffles for exclusive assets and experiences.",
      imagePlaceholder: "/api/placeholder/300/200"
    },
    {
      id: 2,
      icon: <FaRandom className="text-4xl" />,
      title: "PROVABLY FAIR SELECTION",
      description: "Winners are selected using Pyth Network's transparent and verifiable Random Number Generator.",
      imagePlaceholder: "/api/placeholder/300/200"
    },
    {
      id: 3,
      icon: <FaEye className="text-4xl" />,
      title: "SHARED SUCCESS",
      description: "One winner receives the asset, and the entire process is open and auditable on-chain.",
      imagePlaceholder: "/api/placeholder/300/200"
    }
  ];

  const PixelArrow = () => (
    <div className="hidden lg:flex items-center justify-center px-4 py-8">
      <div className="relative">
        {/* Pixel-style arrow body */}
        <div className="flex flex-col items-center space-y-1">
          <div className="w-12 h-3" style={{ backgroundColor: '#f3a20f' }}></div>
          <div className="w-16 h-3" style={{ backgroundColor: '#f3a20f' }}></div>
          <div className="w-20 h-3" style={{ backgroundColor: '#f3a20f' }}></div>
          <div className="w-16 h-3" style={{ backgroundColor: '#f3a20f' }}></div>
          <div className="w-12 h-3" style={{ backgroundColor: '#f3a20f' }}></div>
        </div>
        {/* Arrow head */}
        <div className="absolute -right-2 top-1/2 transform -translate-y-1/2">
          <div className="w-0 h-0 border-l-[12px] border-t-[8px] border-b-[8px] border-t-transparent border-b-transparent"
               style={{ borderLeftColor: '#f3a20f' }}></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full border-t-4 border-black bg-white py-24 px-4 md:px-8 lg:px-12">
      {/* Main Title */}
      <h2 className="text-5xl xl:text-6xl font-rubik font-black uppercase text-center text-black mb-16 drop-shadow-[4px_4px_0px_rgba(0,0,0,0.2)]">
        How it works
      </h2>

      {/* Three Step Components in Line */}
      <div className="flex flex-col lg:flex-row items-center justify-center max-w-7xl mx-auto">

        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            {/* Step Component */}
            <div className="flex flex-col items-center text-center mb-12 lg:mb-0">

              {/* Image Placeholder with Neo-Brutalism Design */}
              <div className="relative mb-6">
                <div className="w-80 h-48 bg-gradient-to-br from-gray-100 to-gray-200 border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,0.8)] overflow-hidden">
                  {/* Placeholder content - replace with actual images */}
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
                    <div className="text-gray-400 text-lg font-bold">Step {step.id} Visual</div>
                  </div>
                </div>

                {/* Step Number Badge */}
                <div
                  className="absolute -top-4 -left-4 w-12 h-12 border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] flex items-center justify-center text-2xl font-black text-white"
                  style={{ backgroundColor: '#f97028' }}
                >
                  {step.id}
                </div>
              </div>

              {/* Icon */}
              <div
                className="w-16 h-16 border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] flex items-center justify-center text-white mb-6"
                style={{ backgroundColor: '#f97028' }}
              >
                {step.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl md:text-2xl font-rubik font-black uppercase text-black mb-4 drop-shadow-[2px_2px_0px_rgba(0,0,0,0.1)] max-w-xs">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-base text-gray-700 font-medium font-rubik max-w-xs leading-relaxed">
                {step.description}
              </p>
            </div>

            {/* Pixel Arrow Between Steps */}
            {index < steps.length - 1 && <PixelArrow />}
          </React.Fragment>
        ))}
      </div>

      {/* Bottom Tagline */}
      <div className="text-center mt-20 mb-12">
        <h3 className="text-3xl md:text-4xl font-rubik font-black uppercase text-black mb-2 drop-shadow-[2px_2px_0px_rgba(0,0,0,0.1)]">
          Access is an <span style={{ color: '#f3a20f' }}>OPPORTUNITY</span>, not a{' '}
          <span style={{ color: '#f97028' }}>PRIVILEGE</span>
        </h3>
      </div>

      {/* CTA Button */}
      <div className="text-center">
        <Button
          color="pharos-orange"
          shape="medium-rounded"
          className="text-lg md:text-xl py-4 px-10 font-black uppercase"
          onClick={() => { /* Link to documentation or raffles */ }}
        >
          Explore Raffles &rarr;
        </Button>
      </div>
    </div>
  );
};

export default HowItWorks;