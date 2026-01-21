"use client"

import Image from "next/image"
import { styles } from "@/constants/constants"
import { cn } from "@/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"

import heroBg from "../../../public/whiskey_tasting_photo.jpg"

export default function Featured() {

  return (
    <div 
      className={cn(
        styles.homeSection, 
        'flex-col-reverse md:flex-row md:space-x-14 gap-10 md:gap- bg-third w-full'
      )}
    >
      <div className="justify-self-center md:justify-self-start flex-1">
        <h3 className="text-md text-white font-bold font-merriweather-sans tracking-wider mb-5">
          Featured Shop
        </h3>
        <h2 className="text-6xl text-whitefont-bold tracking-wide">
          Shop.name
        </h2>
        <p className={cn(styles.paragraph, 'text-white')}>
          Shop.description excerpt
        </p>
        <div className="flex justify-start items-center space-x-4">
          <Button className="bg-white text-third rounded p-0">
            <Link href="/reviews" className="p-4 block">Explore</Link>
          </Button>
        </div>
      </div>
      <div className="flex-1 justify-self-center md:justify-self-end md:align-self-start">
        <Image
          src={heroBg}
          alt="Hero Background"
          className="w-full h-96 object-cover"
        />
      </div>
    </div>
  )
}
