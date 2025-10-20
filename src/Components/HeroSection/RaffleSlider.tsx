"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Button from '@/Components/UI/Button';
import Link from 'next/link';
import { raffles, calculateTimeRemaining } from '@/data/raffle';
import pyusd from "@/app/assets/pyusd.png";
import { FaArrowRight } from 'react-icons/fa6';

const RaffleSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Calculate time remaining for each raffle dynamically
  const [timeRemainingState, setTimeRemainingState] = useState(
    raffles.map(raffle => calculateTimeRemaining(raffle.endDate))
  );

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % raffles.length);
    }, 5000); // Change slide every 5 seconds

    // Update countdown every second based on actual end dates
    const countdownInterval = setInterval(() => {
      setTimeRemainingState(
        raffles.map(raffle => calculateTimeRemaining(raffle.endDate))
      );
    }, 1000);

    return () => {
      clearInterval(slideInterval);
      clearInterval(countdownInterval);
    };
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full overflow-hidden border-b-4 border-black bg-white py-14 xs:py-24 "> {/* Default font for general text */}
      {/* You would import 'Alfa Slab One' or your custom 'Runik' font in your global CSS or _app.tsx */}
      {/* For Google Fonts, add <link href="https://fonts.googleapis.com/css2?family=Alfa+Slab+One&display=swap" rel="stylesheet"> to your _document.tsx or _app.tsx */}
      <h2 className="text-4xl xs:text-5xl xl:text-6xl font-rubik font-black uppercase text-center text-black mb-28 drop-shadow-[4px_4px_0px_rgba(0,0,0,0.2)]">
        Live Raffles
      </h2>
      <div className="flex justify-center items-center px-3 xs:px-4 bp-xs:px-6 md:px-8 lg:px-12">
        <div
          className="flex gap-4 transition-transform duration-500 ease-in-out w-[90%] lg:w-[100%]"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {raffles.map((raffle, index) => (
            <div key={raffle.id} className="w-full flex-shrink-0 flex justify-center">
              <div className="relative bg-gradient-to-br from-white to-gray-50 border-2 xs:border-3 md:border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8)] xs:shadow-[6px_6px_0px_rgba(0,0,0,0.8)] md:shadow-[8px_8px_0px_rgba(0,0,0,0.8)] rounded-lg xs:rounded-xl overflow-hidden w-full max-w-6xl">
                <Link href={`/raffle/${raffle.id}`} className="block group">
                  <div className="flex flex-col md:flex-row gap-3 xs:gap-4 bp-xs:gap-5 md:gap-8 p-3 xs:p-4 bp-xs:p-5 md:p-10">
                    {/* Left Content Section - Takes majority of space */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl xs:text-2xl bp-xs:text-3xl md:text-4xl lg:text-5xl font-rubik font-black uppercase text-black mb-3 xs:mb-4 bp-xs:mb-5 md:mb-6 leading-tight drop-shadow-[2px_2px_0px_rgba(0,0,0,0.1)] md:drop-shadow-[3px_3px_0px_rgba(0,0,0,0.1)]">
                          {raffle.title}
                        </h3>

                        <div className="bg-pharos-orange/10 border-l-2 xs:border-l-3 md:border-l-4 border-pharos-orange px-2 xs:px-3 bp-xs:px-4 py-2 xs:py-2.5 bp-xs:py-3 mb-3 xs:mb-4 bp-xs:mb-5 md:mb-6 rounded">
                          <p className="text-xs xs:text-sm bp-xs:text-base md:text-lg font-semibold text-gray-700 mb-0.5 xs:mb-1 font-rubik">
                            Ticket Price
                          </p>
                          <div className='flex items-center gap-1'>
                          <Image src={pyusd} alt="PYUSD" width={40} height={40} className='size-5 xs:size-6 bp-xs:size-7 md:size-8 object-contain'/>
                          <p className="text-lg xs:text-xl bp-xs:text-2xl md:text-3xl font-black text-pharos-orange font-rubik">
                            {raffle.pricePerTicket}
                          </p>
                          </div>
                        </div>

                        {/* Countdown Timer */}
                        <div className="mb-3 xs:mb-4 bp-xs:mb-5 md:mb-6">
                          <p className="text-xs bp-xs:text-sm md:text-base font-bold text-gray-600 uppercase mb-2 xs:mb-2.5 bp-xs:mb-3 tracking-wide font-rubik">
                            Time Remaining
                          </p>
                          <div className="flex items-center space-x-1.5 xs:space-x-2 bp-xs:space-x-3 md:space-x-4 font-rubik">
                            {/* Days */}
                            <div className="flex flex-col items-center">
                              <div className="bg-[#f3a20f] text-white border border-black xs:border-2 rounded-md xs:rounded-lg px-1.5 xs:px-2 bp-xs:px-3 md:px-4 py-1.5 xs:py-2 bp-xs:py-2.5 md:py-3 text-lg xs:text-xl bp-xs:text-2xl md:text-3xl lg:text-4xl font-bold shadow-[2px_2px_0px_#000] xs:shadow-[3px_3px_0px_#000] md:shadow-[4px_4px_0px_#000] min-w-[45px] xs:min-w-[50px] bp-xs:min-w-[60px] md:min-w-[70px] text-center">
                                {timeRemainingState[index]?.days || '00'}
                              </div>
                              <span className="text-[10px] xs:text-xs md:text-sm font-bold text-black uppercase mt-1 xs:mt-1.5 md:mt-2">Days</span>
                            </div>

                            <div className="text-lg xs:text-xl bp-xs:text-2xl md:text-3xl lg:text-4xl font-bold text-pharos-orange">:</div>

                            {/* Hours */}
                            <div className="flex flex-col items-center">
                            <div className="bg-[#f3a20f] text-white border border-black xs:border-2 rounded-md xs:rounded-lg px-1.5 xs:px-2 bp-xs:px-3 md:px-4 py-1.5 xs:py-2 bp-xs:py-2.5 md:py-3 text-lg xs:text-xl bp-xs:text-2xl md:text-3xl lg:text-4xl font-bold shadow-[2px_2px_0px_#000] xs:shadow-[3px_3px_0px_#000] md:shadow-[4px_4px_0px_#000] min-w-[45px] xs:min-w-[50px] bp-xs:min-w-[60px] md:min-w-[70px] text-center">
                                {timeRemainingState[index]?.hours || '00'}
                              </div>
                              <span className="text-[10px] xs:text-xs md:text-sm font-bold text-black uppercase mt-1 xs:mt-1.5 md:mt-2">Hours</span>
                            </div>

                            <div className="text-lg xs:text-xl bp-xs:text-2xl md:text-3xl lg:text-4xl font-bold text-pharos-orange">:</div>

                            {/* Minutes */}
                            <div className="flex flex-col items-center">
                            <div className="bg-[#f3a20f] text-white border border-black xs:border-2 rounded-md xs:rounded-lg px-1.5 xs:px-2 bp-xs:px-3 md:px-4 py-1.5 xs:py-2 bp-xs:py-2.5 md:py-3 text-lg xs:text-xl bp-xs:text-2xl md:text-3xl lg:text-4xl font-bold shadow-[2px_2px_0px_#000] xs:shadow-[3px_3px_0px_#000] md:shadow-[4px_4px_0px_#000] min-w-[45px] xs:min-w-[50px] bp-xs:min-w-[60px] md:min-w-[70px] text-center">
                                {timeRemainingState[index]?.minutes || '00'}
                              </div>
                              <span className="text-[10px] xs:text-xs md:text-sm font-bold text-black uppercase mt-1 xs:mt-1.5 md:mt-2">Mins</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Button
                        color="pharos-orange"
                        shape="medium-rounded"
                        className="w-full flex gap-2 items-center justify-center md:w-auto text-sm xs:text-base bp-xs:text-lg md:text-xl py-2.5 xs:py-3 bp-xs:py-3.5 md:py-4 px-4 xs:px-5 bp-xs:px-6 md:px-8 mt-3 xs:mt-4 bp-xs:mt-5 md:mt-6 font-black uppercase"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent Link from triggering twice
                        }}
                      >
                        View Raffle <FaArrowRight />
                      </Button>
                    </div>

                    {/* Right Image Section - Compact size with 1:1 ratio */}
                    <div className="relative w-full xs:max-w-[200px] bp-xs:max-w-[240px] md:w-[280px] lg:w-[320px] aspect-square h-fit flex-shrink-0 rounded-lg xs:rounded-xl overflow-hidden border-2 xs:border-3 md:border-4 border-black bg-white shadow-[4px_4px_0px_rgba(0,0,0,0.8)] xs:shadow-[6px_6px_0px_rgba(0,0,0,0.8)] md:shadow-[8px_8px_0px_rgba(0,0,0,0.8)] mx-auto md:mx-0">
                      <Image
                        src={raffle.image}
                        alt={`Raffle ${raffle.id}`}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-2 rounded-lg"
                      />
                      {/* Browser-style top bar */}
                      <div className="absolute top-0 left-0 w-full h-5 xs:h-6 bp-xs:h-7 md:h-8 bg-gray-200 border-b border-black xs:border-b-2 flex items-center px-1.5 xs:px-2 space-x-1 xs:space-x-1.5 bp-xs:space-x-2">
                        <span className="w-2 h-2 xs:w-2.5 xs:h-2.5 bp-xs:w-3 bp-xs:h-3 bg-red-500 rounded-full border border-gray-600"></span>
                        <span className="w-2 h-2 xs:w-2.5 xs:h-2.5 bp-xs:w-3 bp-xs:h-3 bg-yellow-500 rounded-full border border-gray-600"></span>
                        <span className="w-2 h-2 xs:w-2.5 xs:h-2.5 bp-xs:w-3 bp-xs:h-3 bg-green-500 rounded-full border border-gray-600"></span>
                        <div className="flex-1 bg-white border border-gray-400 rounded-sm xs:rounded-md h-3 xs:h-4 bp-xs:h-5 ml-2 xs:ml-3 bp-xs:ml-4"></div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center mt-8 space-x-3">
        {raffles.map((_, index) => (
          <button
            key={index}
            className={`w-4 h-4 rounded-full border-2 border-black transition-all duration-300
                        ${index === currentSlide ? 'bg-pharos-orange shadow-[2px_2px_0px_#000]' : 'bg-gray-300 hover:bg-pharos-yellow'}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default RaffleSlider;