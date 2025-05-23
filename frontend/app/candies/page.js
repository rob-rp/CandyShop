'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAuth } from "@clerk/nextjs";


export default function AllCandiesPage() {
  const { userId } = useAuth()


  const [candies, setCandies] = useState([])

  useEffect(() => {
    const fetchCandies = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/candies`)
        const data = await res.json()
        setCandies(data)
      } catch (err) {
        console.error('Failed to fetch candies:', err)
      }
    }

    fetchCandies()
  }, [])

  // update state to show changes in database?
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/candies/${id}`, {
        method: 'DELETE',
      });

      setCandies(candies.filter(candy => candy.id !== id));
      // setCandies((prevCandies) => prevCandies.filter((candy) => candy.id !== id));
    } catch (err) {
      console.error(err);
      alert('Error deleting candy');
    }
  };


  if (!userId) {
    return (
    <div id="the-candies" className="p-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {candies.map((candy) => (
        <div className="canDy p-4 border rounded shadow" key={candy.id}>
          <h2 className="text-xl font-semibold">{candy.name}</h2>
          <p className="mb-2">{candy.description}</p>
          <Link href={`/candies/${candy.id}`}>
            <img src={candy.imageurl} alt={candy.name} className="w-48 h-48 object-cover rounded hover:opacity-90 transition" />
          </Link>
        </div>
      ))}
    </div>
  )
  } else {
    return (
    <div id="the-candies" className="bg-[url('/CandyMix2.png')] bg-cover bg-no-repeat bg-center p-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {candies.map((candy) => (
        <div className="canDy p-4 border rounded bg-black" key={candy.id}>
          <h2 className="text-xl font-semibold">{candy.name}</h2>
          <p className="mb-2">{candy.description}</p>
          <Link href={`/candies/${candy.id}`}>
            <img src={candy.imageurl} alt={candy.name} className="w-48 h-48 object-cover rounded hover:opacity-90 transition" />
          </Link>
          <button className="bg-red-600 text-white px-4 py-2 rounded hover:cursor-pointer" onClick={() => handleDelete(candy.id)}>
            Delete Candy
          </button>
        </div>
      ))}
      <div className="max-w-md mx-auto p-4">
        <Link href="/candies/add">
          <button className="bg-green-600 text-white px-4 py-2 hover:cursor-pointer rounded hover:bg-blue-700 transition">
            Add More Candy
          </button>
        </Link>
      </div>
    </div>
  )
  }
}