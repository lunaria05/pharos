"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Raffle, calculateTimeRemaining } from '@/data/raffle';
import Button from '@/Components/UI/Button';
import pyusd from "@/app/assets/pyusd.png";
import { FaCheckCircle } from 'react-icons/fa';

interface IndividualRaffleProps {
  raffle: Raffle;
}

const IndividualRaffle: React.FC<IndividualRaffleProps> = ({ raffle }) => {
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining(raffle.endDate));
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 2000); // Hide after 2 seconds
      return () => clearTimeout(timer);
    }
  }, [copied]);

  useEffect(() => {
    setMounted(true);
    const countdownInterval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(raffle.endDate));
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [raffle.endDate]);

  // Calculate available tickets
  const availableTickets = raffle.totalTickets - raffle.ticketsSold;

  // Format end date
  const endDate = new Date(raffle.endDate);
  const formattedEndDate = endDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const formattedEndTime = endDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  });

  const handleCopyClick = () => {
    navigator.clipboard.writeText(raffle.smartContractAddress);
    setCopied(true);
  };

  return (
    <div className="min-h-screen font-rubik bg-gradient-to-br from-[#f3a20f]/20 to-[#f97028]/10 py-12 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Raffle ID Badge - Top */}
        <div
          className={`inline-block mb-6 transition-all duration-700 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
        >
          <div className="bg-black text-white px-6 py-3 border-4 border-black shadow-[6px_6px_0px_rgba(243,162,15,1)] font-rubik font-black text-lg uppercase">
            Raffle ID: #{raffle.id}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Side - Image */}
          <div
            className={`transition-all duration-700 delay-100 ${
              mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <div className="sticky top-8">
              <div className="relative bg-white border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,0.8)] rounded-2xl overflow-hidden aspect-square group">
                {/* Browser-style top bar */}
                <div className="absolute top-0 left-0 w-full h-10 bg-gray-200 border-b-4 border-black flex items-center px-3 space-x-2 z-10">
                  <span className="w-4 h-4 bg-red-500 rounded-full border-2 border-gray-700"></span>
                  <span className="w-4 h-4 bg-yellow-500 rounded-full border-2 border-gray-700"></span>
                  <span className="w-4 h-4 bg-green-500 rounded-full border-2 border-gray-700"></span>
                  <div className="flex-1 bg-white border-2 border-gray-400 rounded-md h-6 ml-4"></div>
                </div>

                {/* Image */}
                <div className="relative w-full h-full pt-10">
                  <Image
                    src={raffle.image}
                    alt={raffle.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-500 group-hover:scale-110 group-hover:rotate-2"
                  />
                </div>

                {/* Completion Badge */}
                <div className="absolute bottom-6 right-6 bg-[#f97028] text-black px-6 py-3 border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] font-rubik font-black text-2xl rounded-lg">
                  {raffle.completionPercentage}%
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Details */}
          <div
            className={`transition-all duration-700 delay-200 ${
              mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-rubik font-black uppercase text-black mb-6 drop-shadow-[4px_4px_0px_rgba(243,162,15,0.3)] leading-tight">
              {raffle.title}
            </h1>

            {/* Description */}
            <div
              className="bg-white border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,0.8)] rounded-xl p-6 mb-6 font-rubik"
              dangerouslySetInnerHTML={{ __html: raffle.description }}
            />

            {/* Progress Bar */}
            <div className="bg-white border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,0.8)] rounded-xl p-6 mb-6">
              <div className="flex justify-between items-center mb-3">
                <span className="font-rubik font-bold text-gray-700 uppercase text-sm">Raffle Progress</span>
                <span className="font-rubik font-black text-[#f97028] text-xl">{raffle.completionPercentage}%</span>
              </div>
              <div className="relative w-full h-6 bg-gray-200 border-4 border-black rounded-lg overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-[#f97028] transition-all duration-1000 ease-out flex items-center justify-end pr-2"
                  style={{ width: `${raffle.completionPercentage}%` }}
                >
                  {raffle.completionPercentage > 10 && (
                    <span className="font-rubik font-black text-white text-xs drop-shadow-[2px_2px_0px_rgba(0,0,0,0.3)]">
                      {raffle.ticketsSold}/{raffle.totalTickets}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {/* Tickets Available */}
              <div className="bg-white border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,0.8)] rounded-xl p-5 hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_rgba(0,0,0,0.8)] transition-all duration-200">
                <p className="text-sm font-rubik font-bold text-gray-600 uppercase mb-2">Tickets Available</p>
                <p className="text-3xl font-rubik font-black text-black">{availableTickets.toLocaleString()}</p>
                <p className="text-xs font-rubik text-gray-500 mt-1">of {raffle.totalTickets.toLocaleString()} total</p>
              </div>

              {/* Participants */}
              <div className="bg-white border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,0.8)] rounded-xl p-5 hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_rgba(0,0,0,0.8)] transition-all duration-200">
                <p className="text-sm font-rubik font-bold text-gray-600 uppercase mb-2">Participants</p>
                <p className="text-3xl font-rubik font-black text-black">{raffle.participants.toLocaleString()}</p>
                <p className="text-xs font-rubik text-gray-500 mt-1">unique entries</p>
              </div>

              {/* Max Tickets Per User */}
              <div className="bg-white border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,0.8)] rounded-xl p-5 hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_rgba(0,0,0,0.8)] transition-all duration-200">
                <p className="text-sm font-rubik font-bold text-gray-600 uppercase mb-2">Max Per User</p>
                <p className="text-3xl font-rubik font-black text-black">{raffle.maxTicketsPerUser}</p>
                <p className="text-xs font-rubik text-gray-500 mt-1">tickets maximum</p>
              </div>

              {/* Price Per Ticket */}
              <div className="bg-white border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,0.8)] rounded-xl p-5 hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_rgba(0,0,0,0.8)] transition-all duration-200">
                <p className="text-sm font-rubik font-bold text-black uppercase mb-2">Price Per Ticket</p>
                <div className="flex items-center gap-2">
                  <Image src={pyusd} alt="PYUSD" width={32} height={32} className="object-contain" />
                  <p className="text-3xl font-rubik font-black text-black">{raffle.pricePerTicket}</p>
                </div>
              </div>
            </div>

            {/* Countdown Timer */}
            <div className="bg-gradient-to-br from-white to-gray-50 border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,0.8)] rounded-xl p-6 mb-6">
              <p className="text-base font-rubik font-bold text-gray-700 uppercase mb-4 tracking-wide">
                ⏱️ Time Remaining
              </p>
              <div className="flex items-center justify-between gap-3 mb-4">
                {/* Days */}
                <div className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-[#f3a20f] text-black border-4 border-black rounded-lg py-4 text-4xl font-black shadow-[4px_4px_0px_#000] text-center font-rubik">
                    {timeRemaining.days}
                  </div>
                  <span className="text-xs md:text-sm font-bold text-black uppercase mt-2 font-rubik">Days</span>
                </div>

                <div className="text-3xl font-bold text-black">:</div>

                {/* Hours */}
                <div className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-[#f3a20f] text-black border-4 border-black rounded-lg py-4 text-4xl font-black shadow-[4px_4px_0px_#000] text-center font-rubik">
                    {timeRemaining.hours}
                  </div>
                  <span className="text-xs md:text-sm font-bold text-black uppercase mt-2 font-rubik">Hours</span>
                </div>

                <div className="text-3xl font-bold text-black">:</div>

                {/* Minutes */}
                <div className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-[#f3a20f] text-black border-4 border-black rounded-lg py-4 text-4xl font-black shadow-[4px_4px_0px_#000] text-center font-rubik">
                    {timeRemaining.minutes}
                  </div>
                  <span className="text-xs md:text-sm font-bold text-black uppercase mt-2 font-rubik">Minutes</span>
                </div>

                <div className="text-3xl font-bold text-black">:</div>

                {/* Seconds */}
                <div className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-[#f3a20f] text-black border-4 border-black rounded-lg py-4 text-4xl font-black shadow-[4px_4px_0px_#000] text-center font-rubik">
                    {timeRemaining.seconds}
                  </div>
                  <span className="text-xs md:text-sm font-bold text-black uppercase mt-2 font-rubik">Seconds</span>
                </div>
              </div>

              {/* End Date Display */}
              <div className="bg-[#f3a20f]/20 border-l-4 border-[#f97028] px-4 py-3 rounded">
                <p className="text-sm font-rubik font-semibold text-gray-700 mb-1">Raffle Ends On</p>
                <p className="text-lg font-rubik font-black text-black">{formattedEndDate}</p>
                <p className="text-base font-rubik font-bold text-[#f97028]">{formattedEndTime}</p>
              </div>
            </div>

            {/* Smart Contract Address */}
            <div className="bg-black text-white border-4 border-black shadow-[6px_6px_0px_rgba(243,162,15,1)] rounded-xl p-6 mb-6 hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_rgba(243,162,15,1)] transition-all duration-200">
              <p className="text-sm font-rubik font-bold uppercase mb-3 text-[#f3a20f]">🔐 Smart Contract</p>
              <div className="bg-gray-900 border-2 border-pharos-orange rounded-lg px-4 py-3 font-mono text-xs md:text-sm break-all">
                {raffle.smartContractAddress}
              </div>
              <button
                onClick={handleCopyClick}
                className="cursor-pointer mt-3 flex items-center gap-2 text-[#f3a20f] hover:text-pharos-orange font-rubik font-bold text-sm uppercase transition-colors duration-200"
              >
                {copied ? (
                  <span className="text-green-500 flex items-center gap-1">
                    Copied! <FaCheckCircle />
                  </span>
                ) : (
                  <>
                    📋 Copy Address
                  </>
                )}
              </button>
            </div>

            {/* Buy Tickets Button */}
            <Button
              color="pharos-orange"
              shape="medium-rounded"
              className="text-xl md:text-2xl py-6 px-8 w-full cursor-pointer"
            >
              🎫 Buy Tickets Now
            </Button>

            {/* Additional Info */}
            <div className="mt-6 bg-white/50 border-2 border-black rounded-lg p-4">
              <p className="text-xs font-rubik text-gray-600 text-center">
                ⚡ Powered by blockchain technology • Fair & transparent draw • Instant payout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualRaffle;
