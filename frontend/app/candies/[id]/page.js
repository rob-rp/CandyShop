'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

export default function SingleCandyPage() {
  const { id } = useParams()
  const [candy, setCandy] = useState(null)

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

      const res = await fetch(`http://localhost:8000/candies/${id}`, {
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
  
  console.log("The candy.imageUrl and candy.imageurl->", candy.imageUrl, candy.imageurl)
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
