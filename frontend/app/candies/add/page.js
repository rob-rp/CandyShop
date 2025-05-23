'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from "@clerk/nextjs";

export default function NewCandyPage() {
  const router = useRouter()
  const { userId } = useAuth()

  const [candyName, setCandyName] = useState('');
  const [candyDescription, setCandyDescription] = useState('');
  const [candyQuantity, setCandyQuantity] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/candies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: candyName,
            description: candyDescription,
            quantity: candyQuantity,
        }),
      })

      setCandyName('')
      setCandyDescription('')
      setCandyQuantity(1)

      router.push('/candies')
    } catch (err) {
      console.error(err)
      alert('Error creating candy')
    }
  }

  return (
    <div className="min-h-screen bg-[url('/CandyMix2.png')] bg-cover bg-no-repeat bg-center p-6 flex items-center">
      <div className="p-8 max-w-xl mx-auto bg-black bg-opacity-80 rounded text-white w-full">
        <h1 className="text-3xl font-bold mb-6">Add New Candy</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input type="text" placeholder="Candy Name" value={candyName} onChange={e => setCandyName(e.target.value )} required className="text-white w-full p-3 rounded border border-gray-300"
          />
          <textarea  placeholder="Candy Description" value={candyDescription} onChange={e => setCandyDescription(e.target.value)} required className="w-full p-3 rounded border border-gray-300 text-white"
          />
          <input type="number"  placeholder="Quantity" value={candyQuantity} onChange={e => setCandyQuantity(parseInt(e.target.value) )} required min={1} className="w-full p-3 rounded border border-gray-300 text-white"
          />
          <button type="submit" className="w-full py-3 bg-green-600 hover:bg-green-700 rounded font-semibold hover:cursor-pointer">
            Add Candy
          </button>
        </form>
      </div>
    </div>
  )
}
