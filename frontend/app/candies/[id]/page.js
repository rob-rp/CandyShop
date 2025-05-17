'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

export default function SingleCandyPage() {
  const { id } = useParams()
  const [candy, setCandy] = useState(null)

  useEffect(() => {
    const fetchCandy = async () => {
      try {
        const res = await fetch(`http://localhost:8000/candies/${id}`)
        const data = await res.json()
        setCandy(data)
      } catch (err) {
        console.error('Error fetching candy:', err)
      }
    }

    if (id) fetchCandy()
  }, [id]);

  if (!candy) return <div>Loading...</div>
  
  
  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{candy.name}</h1>
      <img src={candy.imageurl} alt={candy.name} className="w-full h-64 object-cover rounded mb-4" />
      <p className="mb-2">{candy.description}</p>
      <p className="font-semibold">You Have {candy.quantity} bags of {candy.name}.</p>
      <div>
            <button onClick={() => updateQuantity(1)}>Add Candy</button>
            <button onClick={() => updateQuantity(-1)}>Give Candy</button>
      </div>
    </div>
  )
}
