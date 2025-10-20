"use client"
import React, { useEffect, useState } from 'react'
import { usePrivy } from '@privy-io/react-auth'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import user1 from "@/app/assets/Leaderboard/user1.svg"
import { IoCopy } from 'react-icons/io5'
import { MdVerified } from 'react-icons/md'
import lottery from "@/app/assets/lottery.png"
import shoes from "@/app/assets/shoes-jordan.png"
import ticket from "@/app/assets/concert.png"

// Dummy data for raffles
const dummyParticipatedRaffles = [
  {
    id: 1,
    title: "Premium Sneakers Raffle",
    image: shoes,
    entryDate: "2025-10-15",
    tickets: 5,
    status: "ongoing",
    prizeValue: "500 PYUSD"
  },
  {
    id: 2,
    title: "Concert Tickets Giveaway",
    image:ticket,
    entryDate: "2025-10-10",
    tickets: 3,
    status: "ended",
    prizeValue: "300 PYUSD"
  },
  {
    id: 3,
    title: "Luxury Watch Raffle",
    image: lottery,
    entryDate: "2025-10-08",
    tickets: 2,
    status: "ongoing",
    prizeValue: "1000 PYUSD"
  }
]

const dummyWonRaffles = [
  {
    id: 101,
    title: "Limited Edition Jordans",
    image: shoes,
    wonDate: "2025-10-12",
    prizeValue: "600 PYUSD",
    claimStatus: "claimed"
  },
  {
    id: 102,
    title: "PYUSD Prize Pool",
    image: lottery,
    wonDate: "2025-10-05",
    prizeValue: "250 PYUSD",
    claimStatus: "claimed"
  }
]

const ProfilePage = () => {
  const { authenticated, user, login } = usePrivy()
  const router = useRouter()
  const [copySuccess, setCopySuccess] = useState(false)
  const [showWalletModal, setShowWalletModal] = useState(false)

  useEffect(() => {
    if (!authenticated) {
      setShowWalletModal(true)
    } else {
      setShowWalletModal(false)
    }
  }, [authenticated])

  const handleCopyAddress = async () => {
    if (user?.wallet?.address) {
      await navigator.clipboard.writeText(user.wallet.address)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    }
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 8)}...${address.slice(-6)}`
  }

  const handleConnectWallet = () => {
    login()
  }

  // Show wallet connection modal
  if (showWalletModal) {
    return (
      <div className="font-rubik min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_#000] p-8 max-w-md w-full">
          <div className="text-center">
            <div className="mb-6">
              <svg
                className="w-20 h-20 mx-auto text-[#f97028]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-black mb-4 uppercase">
              Wallet Connection Required
            </h2>
            <p className="text-gray-600 mb-6 text-lg">
              You need to connect your wallet to view your profile page
            </p>
            <button
              onClick={handleConnectWallet}
              className="bg-[#f97028] border-4 border-black px-8 py-3 font-black text-white uppercase tracking-tight
                shadow-[4px_4px_0px_#000] hover:shadow-[2px_2px_0px_#000]
                hover:translate-x-[2px] hover:translate-y-[2px]
                active:shadow-none active:translate-x-[4px] active:translate-y-[4px]
                transition-all duration-100 w-full"
            >
              Connect Wallet
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="font-rubik min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_#000] p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Profile Image */}
            <div className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 border-4 rounded-full border-black shadow-[4px_4px_0px_#000] overflow-hidden">
                <Image
                  src={user1}
                  alt="Profile"
                  width={160}
                  height={160}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-[#f97028] border-4 border-black rounded-full p-2">
                <MdVerified className="text-white text-2xl" />
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-black mb-2 uppercase">
                {user?.wallet?.address ? 'Crypto Enthusiast' : 'Anonymous User'}
              </h1>

              {/* Wallet Address */}
              {user?.wallet?.address && (
                <div className="mb-4">
                  <div className="flex items-center justify-center md:justify-start gap-2 bg-gray-100 border-2 border-black px-4 py-2">
                    <span className="font-mono font-bold text-sm md:text-base">
                      {formatAddress(user.wallet.address)}
                    </span>
                    <button
                      onClick={handleCopyAddress}
                      className="text-[#f97028] hover:text-[#d85f20] transition-colors"
                      title="Copy address"
                    >
                      <IoCopy className="text-xl" />
                    </button>
                  </div>
                  {copySuccess && (
                    <p className="text-green-600 text-sm mt-1 font-bold">
                      Address copied!
                    </p>
                  )}
                </div>
              )}

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="bg-[#f489a3] border-4 border-black p-4 shadow-[4px_4px_0px_#000]">
                  <div className="text-3xl font-black">{dummyParticipatedRaffles.length}</div>
                  <div className="text-sm font-bold uppercase">Participated</div>
                </div>
                <div className="bg-[#f0bb0d] border-4 border-black p-4 shadow-[4px_4px_0px_#000]">
                  <div className="text-3xl font-black">{dummyWonRaffles.length}</div>
                  <div className="text-sm font-bold uppercase">Won</div>
                </div>
                <div className="bg-[#8b5cf6] border-4 border-black p-4 shadow-[4px_4px_0px_#000]">
                  <div className="text-3xl font-black text-white">
                    {dummyParticipatedRaffles.reduce((sum, r) => sum + r.tickets, 0)}
                  </div>
                  <div className="text-sm font-bold uppercase text-white">Total Tickets</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Won Raffles Section */}
        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_#000] p-6 md:p-8 mb-8">
          <h2 className="text-2xl md:text-3xl font-black mb-6 uppercase flex items-center gap-2">
            <span className="bg-[#f0bb0d] border-4 border-black px-4 py-2 shadow-[4px_4px_0px_#000]">
              Won Raffles
            </span>
          </h2>

          {dummyWonRaffles.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-xl font-bold">No raffles won yet</p>
              <p className="mt-2">Keep participating to win prizes!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dummyWonRaffles.map((raffle) => (
                <div
                  key={raffle.id}
                  className="bg-gradient-to-br from-pink-50 to-purple-50 border-4 border-black shadow-[6px_6px_0px_#000] hover:shadow-[4px_4px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-100"
                >
                  <div className="p-4">
                    {/* <div className="bg-white border-2 border-black h-40 mb-4 flex items-center justify-center">
                      <span className="text-gray-400 text-sm">Image Placeholder</span>
                    </div> */}
                    <Image src={raffle.image} alt="" className='bg-white border-2 border-black h-52 object-cover mb-4'/>
                    <h3 className="font-black text-lg mb-2 uppercase">{raffle.title}</h3>
                    <div className="space-y-1 text-sm">
                      <p className="font-bold">Won: {raffle.wonDate}</p>
                      <p className="font-bold text-[#f97028]">Prize: {raffle.prizeValue}</p>
                      <span className="inline-block bg-green-500 text-white px-3 py-1 border-2 border-black font-bold uppercase text-xs">
                        {raffle.claimStatus}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Participated Raffles Section */}
        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_#000] p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-black mb-6 uppercase flex items-center gap-2">
            <span className="bg-[#f489a3] border-4 border-black px-4 py-2 shadow-[4px_4px_0px_#000]">
              Participated Raffles
            </span>
          </h2>

          {dummyParticipatedRaffles.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-xl font-bold">No raffles participated yet</p>
              <p className="mt-2">Start participating in raffles now!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dummyParticipatedRaffles.map((raffle) => (
                <div
                  key={raffle.id}
                  className="bg-gradient-to-br from-pink-50 to-purple-50 border-4 border-black shadow-[6px_6px_0px_#000] hover:shadow-[4px_4px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-100"
                >
                  <div className="p-4">
                    {/* <div className="bg-white border-2 border-black h-40 mb-4 flex items-center justify-center">
                      <span className="text-gray-400 text-sm">Image Placeholder</span>
                    </div> */}
                    <Image src={raffle.image} alt="" className='bg-white border-2 border-black h-52 object-cover mb-4'/>
                    <h3 className="font-black text-lg mb-2 uppercase">{raffle.title}</h3>
                    <div className="space-y-1 text-sm">
                      <p className="font-bold">Entered: {raffle.entryDate}</p>
                      <p className="font-bold">Tickets: {raffle.tickets}</p>
                      <p className="font-bold text-[#f97028]">Prize: {raffle.prizeValue}</p>
                      <span
                        className={`inline-block text-white px-3 py-1 border-2 border-black font-bold uppercase text-xs ${
                          raffle.status === 'ongoing' ? 'bg-blue-500' : 'bg-gray-500'
                        }`}
                      >
                        {raffle.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
