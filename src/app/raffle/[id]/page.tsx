import Navbar from '@/Components/Navbar/Navbar'
import IndividualRaffle from '@/Components/Raffle/IndividualRaffle'
import { getRaffleById } from '@/data/raffle'
import { notFound } from 'next/navigation'
import React from 'react'

interface PageProps {
  params: {
    id: string
  }
}

const page = ({ params }: PageProps) => {
  const raffle = getRaffleById(params.id)

  if (!raffle) {
    notFound()
  }

  return (
    <div className=" min-h-screen border-4 border-black shadow-[4px_4px_0px_#1a202c] my-10  max-w-[1200px] 2xl:max-w-[1400px] mx-auto bg-white">
        <Navbar/>
      <IndividualRaffle raffle={raffle} />
    </div>
  )
}

export default page
