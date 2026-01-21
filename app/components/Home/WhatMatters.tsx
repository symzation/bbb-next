"use client"

import Image from "next/image"
import { styles } from "@/constants/constants"
import { cn } from "@/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"

import heroBg from "../../../public/whiskey_tasting_photo.jpg"

export default function WhatMatters() {

  return (
    <div 
      className={cn(
        styles.homeSection, 
        'flex-col-reverse md:flex-row gap-5 md:gap-10 bg-secondary w-full'
      )}
    >
      <div className="justify-self-center md:justify-self-start flex-1">
        <h2 className="text-6xl font-bold tracking-wide">
          Taste what matters, read what's honest
        </h2>
        <p className={styles.paragraph}>
          Find real reviews of bourbon, coffee, beers and food from people who know the difference. Share your own palate experiences, discover new favorites and join a community that values the craft.
        </p>
        <div className="flex justify-start items-center space-x-4">
          <Button className="bg-third text-white rounded p-0">
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
