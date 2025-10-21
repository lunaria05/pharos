"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { raffles, calculateTimeRemaining } from '@/data/raffle';
import Button from '@/Components/UI/Button';
import pyusd from "@/app/assets/pyusd.png";
import { FaArrowRight } from 'react-icons/fa6';
import { FcAlarmClock } from 'react-icons/fc';

const RaffleList: React.FC = () => {
  const [timeRemainingList, setTimeRemainingList] = useState(
    raffles.map(raffle => calculateTimeRemaining(raffle.endDate))
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Update countdown every second
    const countdownInterval = setInterval(() => {
      setTimeRemainingList(
        raffles.map(raffle => calculateTimeRemaining(raffle.endDate))
      );
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pharos-yellow/20 to-pharos-orange/10 py-12 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-rubik font-black uppercase text-black mb-4 drop-shadow-[4px_4px_0px_rgba(243,162,15,0.3)]">
            All Raffles
          </h1>
          <p className="text-lg md:text-xl font-rubik font-semibold text-gray-700">
            Browse all available raffles and find your next win!
          </p>
        </div>

        {/* Raffle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 xl:gap-6 2xl:gap-8">
          {raffles.map((raffle, index) => {
            const availableTickets = raffle.totalTickets - raffle.ticketsSold;
            const timeRemaining = timeRemainingList[index];

            return (
              <div
                key={raffle.id}
                className={`transition-all duration-700 ${
                  mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="bg-white border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,0.8)] rounded-xl overflow-hidden hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_rgba(0,0,0,0.8)] transition-all duration-300 group">
                  {/* Image Section */}
                  <div className="relative aspect-square overflow-hidden bg-gray-100">
                    {/* Browser-style top bar */}
                    <div className="absolute top-0 left-0 w-full h-8 bg-gray-200 border-b-4 border-black flex items-center px-3 space-x-2 z-10">
                      <span className="w-3 h-3 bg-red-500 rounded-full border-2 border-gray-700"></span>
                      <span className="w-3 h-3 bg-yellow-500 rounded-full border-2 border-gray-700"></span>
                      <span className="w-3 h-3 bg-green-500 rounded-full border-2 border-gray-700"></span>
                    </div>

                    {/* Image */}
                    <div className="relative w-full h-full pt-8">
                      <Image
                        src={raffle.image}
                        alt={raffle.title}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-500 group-hover:scale-110 group-hover:rotate-2"
                      />
                    </div>

                    {/* Completion Badge */}
                    <div className="absolute top-10 right-3 bg-pharos-orange text-black px-3 py-1 border-3 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] font-rubik font-black text-sm rounded">
                      {raffle.completionPercentage}%
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6">
                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl font-rubik font-black uppercase text-black mb-4 leading-tight">
                      {raffle.title}
                    </h3>

                    {/* Countdown Timer */}
                    <div className="mb-4">
                      <p className="text-xs flex gap-2 items-center font-rubik font-bold text-gray-600 uppercase mb-2 tracking-wide">
                        <FcAlarmClock/> Time Remaining
                      </p>
                      <div className="flex items-center justify-between gap-2">
                        {/* Hours */}
                        <div className="flex-1 flex flex-col items-center">
                          <div className="w-full bg-pharos-orange text-white border-3 border-black rounded-lg py-2 text-2xl font-black shadow-[3px_3px_0px_#000] text-center font-rubik bg-[#f3a20f]">
                            {timeRemaining?.hours || '00'}
                          </div>
                          <span className="text-xs font-bold text-black uppercase mt-1 font-rubik">Hours</span>
                        </div>

                        <div className="text-xl font-bold text-pharos-orange">:</div>

                        {/* Minutes */}
                        <div className="flex-1 flex flex-col items-center">
                          <div className="w-full bg-pharos-orange text-white border-3 border-black rounded-lg py-2 text-2xl font-black shadow-[3px_3px_0px_#000] text-center font-rubik bg-[#f3a20f]">
                            {timeRemaining?.minutes || '00'}
                          </div>
                          <span className="text-xs font-bold text-black uppercase mt-1 font-rubik">Minutes</span>
                        </div>

                        <div className="text-xl font-bold text-pharos-orange">:</div>

                        {/* Seconds */}
                        <div className="flex-1 flex flex-col items-center">
                          <div className="w-full bg-pharos-orange text-white border-3 border-black rounded-lg py-2 text-2xl font-black shadow-[3px_3px_0px_#000] text-center font-rubik bg-[#f3a20f]">
                            {timeRemaining?.seconds || '00'}
                          </div>
                          <span className="text-xs font-bold text-black uppercase mt-1 font-rubik">Seconds</span>
                        </div>
                      </div>
                    </div>

                    {/* Price Per Ticket */}
                    <div className="bg-pharos-orange/10 border-l-4 border-pharos-orange px-4 py-3 mb-4 rounded">
                      <p className="text-xs font-rubik font-semibold text-gray-600 uppercase mb-1">
                        Price Per Ticket
                      </p>
                      <div className="flex items-center gap-2">
                        <Image src={pyusd} alt="PYUSD" width={24} height={24} className="object-contain" />
                        <p className="text-xl font-rubik font-black text-pharos-orange">
                          {raffle.pricePerTicket}
                        </p>
                      </div>
                    </div>

                    {/* Tickets Available */}
                    <div className="bg-gray-50 border-2 border-black rounded-lg px-4 py-3 mb-4">
                      <p className="text-xs font-rubik font-semibold text-gray-600 uppercase mb-1">
                        Tickets Available
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-2xl font-rubik font-black text-black">
                          {availableTickets.toLocaleString()}
                        </p>
                        <p className="text-xs font-rubik text-gray-500">
                          of {raffle.totalTickets.toLocaleString()}
                        </p>
                      </div>
                      {/* Mini Progress Bar */}
                      <div className="mt-2 w-full h-2 bg-gray-200 border-2 border-black rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#f97028] transition-all duration-300"
                          style={{ width: `${raffle.completionPercentage}%` }}
                        />
                      </div>
                    </div>

                    {/* View Button */}
                    <Link href={`/raffle/${raffle.id}`}>
                      <Button
                        color="pharos-orange"
                        shape="medium-rounded"
                        className="w-full flex items-center gap-2 justify-center text-lg py-3 px-6 uppercase"
                      >
                        View Raffle <FaArrowRight />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* No Raffles Message */}
        {raffles.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-white border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,0.8)] rounded-xl p-12 max-w-md mx-auto">
              <p className="text-2xl font-rubik font-black text-gray-700 mb-4">
                No raffles available at the moment
              </p>
              <p className="text-base font-rubik text-gray-600">
                Check back soon for new raffles!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RaffleList;
