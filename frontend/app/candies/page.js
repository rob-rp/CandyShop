'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function AllCandiesPage() {
  const [candies, setCandies] = useState([])

  useEffect(() => {
    const fetchCandies = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/candies`)
        const data = await res.json()
        setCandies(data)
      } catch (err) {
        console.error('Failed to fetch candies:', err)
      }
    }

    fetchCandies()
  }, [])

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
}
