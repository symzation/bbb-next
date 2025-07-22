//import { FC, useEffect, useState } from "react"
import { styles } from "@/constants/constants"
import { cn } from "@/utils"

async function getProducts() {
  const res = await fetch('http://localhost:3000/api/data/products')
  if (!res.ok) {
    throw new Error('Failed to fetch posts')
  }
  return res.json() || []
}

export default async function Home() {
  const products = await getProducts()

  return (
    <div className={cn(styles.pageClass, 'flex flex-col items-center justify-center w-full')}>
      <h1>Home</h1>
      {products.data.map((product: any) => (
        <div key={product.id} className="border p-4 m-2 rounded-lg shadow-md w-80">
          <h2 className="text-xl font-bold">{product.name}</h2>
          <p className="text-gray-700">{product.description}</p>
          <p className="text-lg font-semibold">{product.notes}</p>
        </div>
      ))}
      {/* <p className="text-gray-500 mt-4">Welcome to Bourbon Brew & Bites!</p>
      <p className="text-gray-500">Explore our collection of fine bourbons and delicious bites.</p>
      <p className="text-gray-500">Join us for a unique culinary experience that tantalizes your taste buds.</p>
      <p className="text-gray-500">Discover the perfect pairing of bourbon and bites.</p>
      <p className="text-gray-500">Experience the rich flavors and aromas of our curated selection.</p>
      <p className="text-gray-500">Indulge in the art of bourbon brewing and culinary delights.</p>
      <p className="text-gray-500">Savor the moments with our exquisite offerings.</p>
      <p className="text-gray-500">Join us on a journey of taste and discovery.</p>
      <p className="text-gray-500">Cheers to great bourbon and unforgettable bites!</p>
      <p className="text-gray-500">Explore our menu and find your new favorite pairing.</p>
      <p className="text-gray-500">Experience the warmth and hospitality of Bourbon Brew & Bites.</p>
      <p className="text-gray-500">Join us for tastings, events, and special offers.</p> */}
    </div>
  )
}