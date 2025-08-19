//import { FC, useEffect, useState } from "react"
import Image from "next/image"
import { styles } from "@/constants/constants"
import { cn } from "@/utils"
import ParticleComponent from "@/components/Particles/particles"
import BlogLatest from "@/components/Blog/BlogLatest"

import heroBg from "/public/particleBg.svg"

export default async function Home() {
  return (
    <div className={cn(styles.pageClass, 'flex flex-col items-center justify-center')}>
      <div className="flex justify-center items-center space-x-2 w-full h-[430px] -mt-20 relative border-b border-b-secondary">
        <ParticleComponent />
        <div className="absolute top-[50%] mx-auto text-black text-center w-full h-8 py-1">
          <div className="text-2xl md:text-4xl font-bold tracking-wide px-2">
            Welcome to Bourbon Brew & Bites!
          </div>
          <div className="text-lg font-bold tracking-wide px-2">
            Explore our latest reviews and recommendations.
          </div>
        </div>
      </div>
      <BlogLatest />
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
