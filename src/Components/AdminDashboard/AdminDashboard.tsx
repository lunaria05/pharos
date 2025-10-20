"use client"
import React, { useEffect, useState } from 'react'
import { usePrivy } from '@privy-io/react-auth'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { MdAdminPanelSettings, MdImage, MdUpload } from 'react-icons/md'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

// Admin wallet addresses - Add your admin addresses here
const ADMIN_ADDRESSES = [
  '0xBb4c2baB6B2de45F9CC7Ab41087b730Eaa4adE31', // Example admin address
  '0x13F00AF21F24988528E79b57122EfD0000d62445',
  '0xa0f97344e9699F0D5d54c4158F9cf9892828C7F8'
  // Add more admin addresses as needed
]

interface RaffleFormData {
  image: File | null
  imagePreview: string
  title: string
  description: string
  pricePerTicket: string
  endDate: string
  endTime: string
  availableTickets: string
  contractAddress: string
  raffleId: string
  totalPrizePool: string
  category: string
}

const AdminDashboard = () => {
  const { authenticated, user, login } = usePrivy()
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [imageError, setImageError] = useState('')

  const [formData, setFormData] = useState<RaffleFormData>({
    image: null,
    imagePreview: '',
    title: '',
    description: '',
    pricePerTicket: '',
    endDate: '',
    endTime: '',
    availableTickets: '',
    contractAddress: '',
    raffleId: '',
    totalPrizePool: '',
    category: 'General'
  })

  useEffect(() => {
    // Check if user is authenticated and is an admin
    if (!authenticated) {
      setIsLoading(false)
      return
    }

    const userAddress = user?.wallet?.address?.toLowerCase()
    const isUserAdmin = ADMIN_ADDRESSES.some(
      addr => addr.toLowerCase() === userAddress
    )

    setIsAdmin(isUserAdmin)
    setIsLoading(false)
  }, [authenticated, user])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Reset error
      setImageError('')

      // Validate image is square
      const img = new window.Image()
      const objectUrl = URL.createObjectURL(file)

      img.onload = () => {
        if (img.width === img.height) {
          // Image is square, proceed
          setFormData(prev => ({
            ...prev,
            image: file,
            imagePreview: objectUrl
          }))
        } else {
          // Image is not square
          setImageError(`Image must be square (1:1 aspect ratio). Current dimensions: ${img.width}x${img.height}`)
          URL.revokeObjectURL(objectUrl)
          // Reset file input
          e.target.value = ''
        }
      }

      img.onerror = () => {
        setImageError('Failed to load image. Please try another file.')
        URL.revokeObjectURL(objectUrl)
        e.target.value = ''
      }

      img.src = objectUrl
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    console.log('Form submitted:', formData)

    setShowSuccess(true)
    setIsSubmitting(false)

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        image: null,
        imagePreview: '',
        title: '',
        description: '',
        pricePerTicket: '',
        endDate: '',
        endTime: '',
        availableTickets: '',
        contractAddress: '',
        raffleId: '',
        totalPrizePool: '',
        category: 'General'
      })
      setShowSuccess(false)
    }, 3000)
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="text-center">
          <AiOutlineLoading3Quarters className="animate-spin text-6xl text-[#f97028] mx-auto mb-4" />
          <p className="text-xl font-bold">Loading...</p>
        </div>
      </div>
    )
  }

  // Not authenticated
  if (!authenticated) {
    return (
      <div className="font-rubik min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_#000] p-8 max-w-md w-full">
          <div className="text-center">
            <MdAdminPanelSettings className="text-6xl text-[#f97028] mx-auto mb-4" />
            <h2 className="text-3xl font-black mb-4 uppercase">
              Admin Access Required
            </h2>
            <p className="text-gray-600 mb-6 text-lg">
              You need to connect your wallet to access the admin dashboard
            </p>
            <button
              onClick={() => login()}
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

  // Not admin
  if (!isAdmin) {
    return (
      <div className="font-rubik min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_#000] p-8 max-w-md w-full">
          <div className="text-center">
            <div className="mb-6">
              <svg
                className="w-20 h-20 mx-auto text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-black mb-4 uppercase text-red-600">
              Access Denied
            </h2>
            <p className="text-gray-600 mb-6 text-lg">
              You don&apos;t have permission to access this page
            </p>
            <button
              onClick={() => router.push('/')}
              className="bg-[#8b5cf6] border-4 border-black px-8 py-3 font-black text-white uppercase tracking-tight
                shadow-[4px_4px_0px_#000] hover:shadow-[2px_2px_0px_#000]
                hover:translate-x-[2px] hover:translate-y-[2px]
                active:shadow-none active:translate-x-[4px] active:translate-y-[4px]
                transition-all duration-100 w-full"
            >
              Go to Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Admin dashboard
  return (
    <div className="font-rubik min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_#000] p-6 mb-8">
          <div className="flex items-center gap-4">
            <MdAdminPanelSettings className="text-5xl text-[#8b5cf6]" />
            <div>
              <h1 className="text-3xl md:text-4xl font-black uppercase">Admin Dashboard</h1>
              <p className="text-gray-600 font-bold">Create and manage raffles</p>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="bg-green-500 border-4 border-black shadow-[8px_8px_0px_#000] p-6 mb-8 animate-pulse">
            <p className="text-white text-xl font-black uppercase text-center">
              Raffle Created Successfully!
            </p>
          </div>
        )}

        {/* Raffle Creation Form */}
        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_#000] p-6 md:p-8">
          <h2 className="text-2xl font-black mb-6 uppercase flex items-center gap-2">
            <span className="bg-[#f97028] border-4 border-black px-4 py-2 shadow-[4px_4px_0px_#000]">
              Create New Raffle
            </span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload */}
            <div>
              <label className="block font-black text-lg mb-2 uppercase">
                Raffle Image (Square - 1:1 Ratio) *
              </label>
              <div className={`border-4 ${imageError ? 'border-red-500' : 'border-black'} p-4 bg-gray-50`}>
                {formData.imagePreview ? (
                  <div className="relative">
                    <div className="w-full max-w-md mx-auto">
                      <Image
                        src={formData.imagePreview}
                        alt="Preview"
                        width={400}
                        height={400}
                        className="w-full aspect-square object-cover border-2 border-black"
                      />
                      <div className="mt-2 p-2 bg-green-100 border-2 border-green-600">
                        <p className="text-green-800 font-bold text-sm text-center">
                          ✓ Square image uploaded successfully
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, image: null, imagePreview: '' }))
                        setImageError('')
                      }}
                      className="mt-4 bg-red-500 border-4 border-black px-4 py-2 font-black text-white uppercase
                        shadow-[4px_4px_0px_#000] hover:shadow-[2px_2px_0px_#000]
                        hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-100 w-full"
                    >
                      Remove Image
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer flex flex-col items-center justify-center h-64 border-2 border-dashed border-black bg-white hover:bg-gray-100 transition-colors">
                    <div className="w-24 h-24 border-4 border-gray-300 mb-4 flex items-center justify-center">
                      <MdImage className="text-5xl text-gray-400" />
                    </div>
                    <span className="font-black text-gray-700 text-lg">Click to upload SQUARE image</span>
                    <span className="text-sm text-gray-600 mt-2 font-bold">Required: 1:1 aspect ratio (e.g., 500x500, 1000x1000)</span>
                    <span className="text-sm text-gray-500 mt-1">PNG, JPG up to 10MB</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      required
                    />
                  </label>
                )}
              </div>

              {/* Error Message */}
              {imageError && (
                <div className="mt-3 p-4 bg-red-100 border-4 border-red-500">
                  <p className="text-red-700 font-bold flex items-center gap-2">
                    <span className="text-2xl">⚠</span>
                    {imageError}
                  </p>
                  <p className="text-red-600 text-sm mt-2 font-bold">
                    Please upload a square image with equal width and height (e.g., 500x500px, 800x800px, 1000x1000px)
                  </p>
                </div>
              )}

              {/* Info Message */}
              {!formData.imagePreview && !imageError && (
                <div className="mt-3 p-3 bg-blue-50 border-2 border-blue-400">
                  <p className="text-blue-800 text-sm font-bold">
                    💡 Tip: Use square images (1:1 ratio) for best display. Examples: 500x500px, 800x800px, or 1000x1000px
                  </p>
                </div>
              )}
            </div>

            {/* Raffle Title */}
            <div>
              <label className="block font-black text-lg mb-2 uppercase">
                Raffle Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter raffle title"
                required
                className="w-full border-4 border-black px-4 py-3 font-bold text-lg focus:outline-none focus:ring-4 focus:ring-[#f97028]"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block font-black text-lg mb-2 uppercase">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter raffle description"
                rows={4}
                required
                className="w-full border-4 border-black px-4 py-3 font-bold resize-none focus:outline-none focus:ring-4 focus:ring-[#f97028]"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block font-black text-lg mb-2 uppercase">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="w-full border-4 border-black px-4 py-3 font-bold text-lg focus:outline-none focus:ring-4 focus:ring-[#f97028]"
              >
                <option value="General">General</option>
                <option value="Fashion">Fashion</option>
                <option value="Electronics">Electronics</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Luxury">Luxury</option>
                <option value="Crypto">Crypto</option>
              </select>
            </div>

            {/* Grid Layout for smaller fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Price Per Ticket */}
              <div>
                <label className="block font-black text-lg mb-2 uppercase">
                  Price Per Ticket (PYUSD) *
                </label>
                <input
                  type="number"
                  name="pricePerTicket"
                  value={formData.pricePerTicket}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  required
                  className="w-full border-4 border-black px-4 py-3 font-bold text-lg focus:outline-none focus:ring-4 focus:ring-[#f97028]"
                />
              </div>

              {/* Available Tickets */}
              <div>
                <label className="block font-black text-lg mb-2 uppercase">
                  Available Tickets *
                </label>
                <input
                  type="number"
                  name="availableTickets"
                  value={formData.availableTickets}
                  onChange={handleInputChange}
                  placeholder="100"
                  min="1"
                  required
                  className="w-full border-4 border-black px-4 py-3 font-bold text-lg focus:outline-none focus:ring-4 focus:ring-[#f97028]"
                />
              </div>

              {/* Total Prize Pool */}
              <div>
                <label className="block font-black text-lg mb-2 uppercase">
                  Total Prize Pool (PYUSD) *
                </label>
                <input
                  type="number"
                  name="totalPrizePool"
                  value={formData.totalPrizePool}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  required
                  className="w-full border-4 border-black px-4 py-3 font-bold text-lg focus:outline-none focus:ring-4 focus:ring-[#f97028]"
                />
              </div>

              {/* Raffle ID */}
              <div>
                <label className="block font-black text-lg mb-2 uppercase">
                  Raffle ID *
                </label>
                <input
                  type="text"
                  name="raffleId"
                  value={formData.raffleId}
                  onChange={handleInputChange}
                  placeholder="RAFFLE-001"
                  required
                  className="w-full border-4 border-black px-4 py-3 font-bold text-lg focus:outline-none focus:ring-4 focus:ring-[#f97028]"
                />
              </div>

              {/* End Date */}
              <div>
                <label className="block font-black text-lg mb-2 uppercase">
                  End Date *
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  required
                  className="w-full border-4 border-black px-4 py-3 font-bold text-lg focus:outline-none focus:ring-4 focus:ring-[#f97028]"
                />
              </div>

              {/* End Time */}
              <div>
                <label className="block font-black text-lg mb-2 uppercase">
                  End Time *
                </label>
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleInputChange}
                  required
                  className="w-full border-4 border-black px-4 py-3 font-bold text-lg focus:outline-none focus:ring-4 focus:ring-[#f97028]"
                />
              </div>
            </div>

            {/* Smart Contract Address */}
            <div>
              <label className="block font-black text-lg mb-2 uppercase">
                Smart Contract Address *
              </label>
              <input
                type="text"
                name="contractAddress"
                value={formData.contractAddress}
                onChange={handleInputChange}
                placeholder="0x..."
                required
                pattern="^0x[a-fA-F0-9]{40}$"
                className="w-full border-4 border-black px-4 py-3 font-mono font-bold text-lg focus:outline-none focus:ring-4 focus:ring-[#f97028]"
              />
              <p className="text-sm text-gray-600 mt-1 font-bold">
                Must be a valid Ethereum address (0x followed by 40 hexadecimal characters)
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#8b5cf6] border-4 border-black px-8 py-4 font-black text-white text-xl uppercase tracking-tight
                  shadow-[6px_6px_0px_#000] hover:shadow-[4px_4px_0px_#000]
                  hover:translate-x-[2px] hover:translate-y-[2px]
                  active:shadow-none active:translate-x-[6px] active:translate-y-[6px]
                  disabled:opacity-50 disabled:cursor-not-allowed
                  transition-all duration-100 flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <>
                    <AiOutlineLoading3Quarters className="animate-spin text-2xl" />
                    Creating Raffle...
                  </>
                ) : (
                  <>
                    <MdUpload className="text-2xl" />
                    Create Raffle
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
