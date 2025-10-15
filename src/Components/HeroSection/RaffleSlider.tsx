"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Button from '@/Components/UI/Button';
import Link from 'next/link';

// Import your raffle images here
import raffleImage1 from "@/app/assets/shoes-jordan.png"; // Replace with your actual image paths
import raffleImage2 from "@/app/assets/lottery.png";
import raffleImage3 from "@/app/assets/concert.png";
import pyusd from "@/app/assets/pyusd.png"

interface Raffle {
  id: string;
  image: any; // Use 'any' or 'StaticImageData' from 'next/image' for imported images
  timeRemaining: {
    days: string; // Added days
    hours: string;
    minutes: string;
    seconds: string; // Keeping seconds for consistency, though image only shows H/M
  };
  pricePerTicket: string;
  link: string;
  title: string; // Added title for each raffle
}

const raffles: Raffle[] = [
  {
    id: '1',
    image: raffleImage1,
    timeRemaining: { days: '02', hours: '10', minutes: '06', seconds: '30' },
    pricePerTicket: '10 PYUSD',
    link: '/raffles/1',
    title: 'The Golden Phoenix', // Example title
  },
  {
    id: '2',
    image: raffleImage2,
    timeRemaining: { days: '00', hours: '05', minutes: '45', seconds: '12' },
    pricePerTicket: '10 PYUSD',
    link: '/raffles/2',
    title: 'Mystic Dragon Egg', // Example title
  },
  {
    id: '3',
    image: raffleImage3,
    timeRemaining: { days: '01', hours: '00', minutes: '15', seconds: '05' },
    pricePerTicket: '5 PYUSD',
    link: '/raffles/3',
    title: 'Ancient Artifact', // Example title
  },
];

const RaffleSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // In a real application, you'd calculate these dynamically
  // For now, using the static data for demonstration
  const [timeRemainingState, setTimeRemainingState] = useState(raffles.map(r => r.timeRemaining));

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % raffles.length);
    }, 5000); // Change slide every 5 seconds

    // Example of a simple countdown logic (for demonstration)
    const countdownInterval = setInterval(() => {
      setTimeRemainingState(prevState => prevState.map(time => {
        let totalSeconds =
          parseInt(time.days) * 24 * 3600 +
          parseInt(time.hours) * 3600 +
          parseInt(time.minutes) * 60 +
          parseInt(time.seconds);

        if (totalSeconds <= 0) return { days: '00', hours: '00', minutes: '00', seconds: '00' };

        totalSeconds--;

        const days = String(Math.floor(totalSeconds / (24 * 3600))).padStart(2, '0');
        const hours = String(Math.floor((totalSeconds % (24 * 3600)) / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
        const seconds = String(totalSeconds % 60).padStart(2, '0');

        return { days, hours, minutes, seconds };
      }));
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
    <div className="relative w-full overflow-hidden border-t-4 border-black bg-white py-24 "> {/* Default font for general text */}
      {/* You would import 'Alfa Slab One' or your custom 'Runik' font in your global CSS or _app.tsx */}
      {/* For Google Fonts, add <link href="https://fonts.googleapis.com/css2?family=Alfa+Slab+One&display=swap" rel="stylesheet"> to your _document.tsx or _app.tsx */}
      <h2 className="text-5xl xl:text-6xl font-rubik font-black uppercase text-center text-black mb-28 drop-shadow-[4px_4px_0px_rgba(0,0,0,0.2)]">
        Live Raffles
      </h2>
      <div className="flex justify-center items-center px-4 md:px-8 lg:px-12">
        <div
          className="flex gap-4 transition-transform duration-500 ease-in-out w-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {raffles.map((raffle, index) => (
            <div key={raffle.id} className="w-full flex-shrink-0 flex justify-center">
              <div className="relative bg-gradient-to-br from-white to-gray-50 border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,0.8)] rounded-xl overflow-hidden w-full max-w-6xl">
                <Link href={raffle.link} className="block group">
                  <div className="flex flex-col md:flex-row gap-6 md:gap-8 p-6 md:p-10">
                    {/* Left Content Section - Takes majority of space */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-rubik font-black uppercase text-black mb-6 leading-tight drop-shadow-[3px_3px_0px_rgba(0,0,0,0.1)]">
                          {raffle.title}
                        </h3>

                        <div className="bg-pharos-orange/10 border-l-4 border-pharos-orange px-4 py-3 mb-6 rounded">
                          <p className="text-base md:text-lg font-semibold text-gray-700 mb-1 font-rubik">
                            Ticket Price
                          </p>
                          <div className='flex items-center gap-1'>
                          <Image src={pyusd} alt="PYUSD" width={40} height={40} className='size-8 object-contain'/>
                          <p className="text-2xl md:text-3xl font-black text-pharos-orange font-rubik">
                            {raffle.pricePerTicket}
                          </p>
                          </div>
                        </div>

                        {/* Countdown Timer */}
                        <div className="mb-6">
                          <p className="text-sm md:text-base font-bold text-gray-600 uppercase mb-3 tracking-wide font-rubik">
                            Time Remaining
                          </p>
                          <div className="flex items-center space-x-3 md:space-x-4 font-rubik">
                            {/* Days */}
                            <div className="flex flex-col items-center">
                              <div className="bg-[#f3a20f] text-white border-2 border-black rounded-lg px-4 py-3 text-3xl md:text-4xl font-bold shadow-[4px_4px_0px_#000] min-w-[70px] text-center">
                                {timeRemainingState[index]?.days || '00'}
                              </div>
                              <span className="text-xs md:text-sm font-bold text-black uppercase mt-2">Days</span>
                            </div>

                            <div className="text-3xl md:text-4xl font-bold text-pharos-orange">:</div>

                            {/* Hours */}
                            <div className="flex flex-col items-center">
                            <div className="bg-[#f3a20f] text-white border-2 border-black rounded-lg px-4 py-3 text-3xl md:text-4xl font-bold shadow-[4px_4px_0px_#000] min-w-[70px] text-center">
                                {timeRemainingState[index]?.hours || '00'}
                              </div>
                              <span className="text-xs md:text-sm font-bold text-black uppercase mt-2">Hours</span>
                            </div>

                            <div className="text-3xl md:text-4xl font-bold text-pharos-orange">:</div>

                            {/* Minutes */}
                            <div className="flex flex-col items-center">
                            <div className="bg-[#f3a20f] text-white border-2 border-black rounded-lg px-4 py-3 text-3xl md:text-4xl font-bold shadow-[4px_4px_0px_#000] min-w-[70px] text-center">
                                {timeRemainingState[index]?.minutes || '00'}
                              </div>
                              <span className="text-xs md:text-sm font-bold text-black uppercase mt-2">Mins</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Button
                        color="pharos-orange"
                        shape="medium-rounded"
                        className="w-full md:w-auto text-lg md:text-xl py-4 px-8 mt-6 font-black uppercase"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent Link from triggering twice
                        }}
                      >
                        View Raffle &rarr;
                      </Button>
                    </div>

                    {/* Right Image Section - Compact size with 1:1 ratio */}
                    <div className="relative w-full md:w-[280px] lg:w-[320px] aspect-square h-fit flex-shrink-0 rounded-xl overflow-hidden border-4 border-black bg-white shadow-[8px_8px_0px_rgba(0,0,0,0.8)]">
                      <Image
                        src={raffle.image}
                        alt={`Raffle ${raffle.id}`}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-2 rounded-lg"
                      />
                      {/* Browser-style top bar */}
                      <div className="absolute top-0 left-0 w-full h-8 bg-gray-200 border-b-2 border-black flex items-center px-2 space-x-2">
                        <span className="w-3 h-3 bg-red-500 rounded-full border border-gray-600"></span>
                        <span className="w-3 h-3 bg-yellow-500 rounded-full border border-gray-600"></span>
                        <span className="w-3 h-3 bg-green-500 rounded-full border border-gray-600"></span>
                        <div className="flex-1 bg-white border border-gray-400 rounded-md h-5 ml-4"></div>
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