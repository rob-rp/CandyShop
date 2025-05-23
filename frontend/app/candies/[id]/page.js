'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useAuth } from "@clerk/nextjs";


export default function SingleCandyPage() {
  const { id } = useParams()
  const [candy, setCandy] = useState(null)
  const { userId } = useAuth()

  useEffect(() => {
    const fetchCandy = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/candies/${id}`)
        const data = await res.json()
        setCandy(data)
      } catch (err) {
        console.error('Error fetching candy:', err)
      }
    }

    if (id) fetchCandy()
  }, [id]);


const updateQuantity = async (changeAmount) => {
    if (!candy) return
    const updatedQuantity = candy.quantity + changeAmount
    if (updatedQuantity < 0) return //if the new quantity becomes -1 we do NOT want to update the quantity

    const updatedCandy = {
        name: candy.name,
        description: candy.description,
        quantity: updatedQuantity,
        imageurl: candy.imageurl,
        id: candy.id
    }

    try {

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/candies/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCandy),
      })
      console.log("Here is the updated candy", updatedCandy)

      const data = await res.json()

      setCandy(data)
    } catch (err) {
      console.error('Error updating candy:', err)
    }
  }

  if (!candy) return <div>Loading...</div>
  
  if (!userId) {
    return (
      <div className="p-6 flex items-center">
        <div className="p-8 max-w-xl mx-auto h-[30rem] ">
          <h1 className="text-3xl font-bold mb-4">{candy.name}</h1>
          <img src={candy.imageurl} alt={candy.name} className="w-full h-64 object-cover rounded mb-4" />
          <p className="mb-2">{candy.description}</p>
          <p className="font-semibold">You Have {candy.quantity} bags of {candy.name}.</p>
          <div className="mt-4 space-x-2">
            <button onClick={() => updateQuantity(1)} className="hover:cursor-pointer px-4 py-2 bg-green-500 text-white rounded">Add Candy</button>
            <button onClick={() => updateQuantity(-1)} className="hover:cursor-pointer px-4 py-2 bg-red-500 text-white rounded">Give Candy</button>
          </div>
        </div>
      </div>
    )
} else {
  return (
    <div className="min-h-screen bg-[url('/CandyMix2.png')] bg-cover bg-no-repeat bg-center p-6 flex items-center">
      <div className="p-8 max-w-xl mx-auto bg-black h-[30rem] ">
        <h1 className="text-3xl font-bold mb-4">{candy.name}</h1>
        <img src={candy.imageurl} alt={candy.name} className="w-full h-64 object-cover rounded mb-4" />
        <p className="mb-2">{candy.description}</p>
        <p className="font-semibold">You Have {candy.quantity} bags of {candy.name}.</p>
        <div className="mt-4 space-x-2">
          <button onClick={() => updateQuantity(1)} className="hover:cursor-pointer px-4 py-2 bg-green-500 text-white rounded">Add Candy</button>
          <button onClick={() => updateQuantity(-1)} className="hover:cursor-pointer px-4 py-2 bg-red-500 text-white rounded">Give Candy</button>
        </div>
      </div>
    </div>
  )
}
}
