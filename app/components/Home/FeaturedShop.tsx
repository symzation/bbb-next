"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { styles } from "@/utils/constants"
import { cn } from "@/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getRandomShop } from "@/lib/db/actions"
import { PiCaretDoubleRightLight } from "react-icons/pi"

import heroBg from "../../../public/whiskey_tasting_photo.jpg"

type FeaturedShopProps = {
  id: number
  name: string | null
  description: string | null
  website: string | null
  typeName: string | null
}

export default function Featured() {
  const [shopData, setShopData] = useState<FeaturedShopProps | null>(null)

  useEffect(() => {
    async function fetchRandomShop() {
      const res = await getRandomShop()
      setShopData(res[0] ?? null)
    }

    fetchRandomShop()
  }, [])

  return (
    <div className={cn(
        styles.homeSection, 
        'flex-col justify-center items-center bg-third w-full md:py-8'
      )}> 
      <h2 className="text-6xl font-bold tracking-wide mb-8">
        Featured Shop
      </h2>
      <div className='flex flex-col md:flex-row justify-center items-center gap-5 md:gap-10 bg-third w-full'>
        <div className="scrollFadeInScaleLeft">
          <h3 className="text-lg text-white font-bold font-frauncestracking-wider mb-4">
            {shopData?.typeName}
          </h3>
          <h4 className="text-6xl text-black font-bold tracking-wide mb-1">
            {shopData?.name}
          </h4>
          <p className={cn(styles.paragraph, 'text-white mb-3')}>
            {shopData?.description}
          </p>
          <div className="flex justify-start items-center space-x-4">
            <Button 
              className="bg-primary hover:bg-white text-white hover:text-primary rounded p-0 transition-all duration-300 ease-in-out"
            >
              <Link href="/reviews?type=shops" className="p-4 block">Explore</Link>
            </Button>
            <Button 
              className="group relative overflow-hidden bg-transparent hover:bg-transparent text-white hover:text-black rounded p-0 transition-all duration-300 ease-in-out"
            >
              <Link 
                href={shopData?.website ?? "#"} 
                className="p-4 block" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <span className="absolute inset-0 w-0 bg-secondary/80 transition-all duration-300 ease-in-out group-hover:w-full"></span>
                <span className="relative z-[3]">
                  Official Website 
                  <PiCaretDoubleRightLight className="inline-block ml-0.5 font-bold" />
                </span>
              </Link>
            </Button>
          </div>
        </div>
        <div className="scrollFadeInScaleRight">
          <Image
            src={heroBg}
            alt="Hero Background"
            className="w-full h-96 object-cover"
          />
        </div>
      </div>
    </div>
  )
}
