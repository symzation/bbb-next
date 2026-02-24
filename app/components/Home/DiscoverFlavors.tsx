
//import { useEffect, useState } from "react"
import Image from "next/image"
import { styles } from "@/utils/constants"
import { cn } from "@/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getProductTypes } from "@/lib/db/actions/productTypes"
import Marquee from "react-fast-marquee"
import { Card, CardContent } from "@/components/ui/card"

import heroBg from "../../../public/categoriesImage.jpg"

type ProductTypesResult = Awaited<ReturnType<typeof getProductTypes>>

const productTypesData = [
    {
      name: "Whiskey", 
      description: "Explore bold pours worth savoring",
      tagline: "Take your time—these pours tell a story.",
      intro: "Discover in-depth whiskey reviews exploring flavor profiles, finishes, and craftsmanship behind every pour"
    },
    {
      name: "Coffee", 
      description: "Uncover roasts & blends worth waking up for",
      tagline: "From first sip to last note—find your kind of comfort",
      intro: "Explore coffee reviews focused on roast profiles, origins, brewing methods, and flavor notes—helping you find exceptional coffee worth your time"
    },
    {
      name: "Beer", 
      description: "Browse beers crafted with care, poured with purpose",
      tagline: "From crisp to complex, find beers that feel just right",
      intro: "Browse beer reviews covering craft brews, classic styles, and seasonal releases—evaluated for balance, flavor, and overall drinkability"
    },
    {
      name: "Food", 
      description: "Discover bites with lasting flavor impressions",
      tagline: "Find food experiences worth talking about, one bite at a time",
      intro: "Explore food reviews featuring restaurants, dishes, and pairings—focused on flavor, quality, and the experience behind every bite"
    },
  ]

export default function DiscoverFlavors() {
  //const productTypesData = await getProductTypes()

  return (
    <div 
      className={cn(
        styles.homeSection, 
        'flex-col justify-center items-center gap-4 bg-black/95 text-white w-full py-12'
      )}
    >
      <h3 className="text-xl font-bold font-frauncestracking-wider">
        Categories
      </h3>
      <h2 className="text-6xl font-bold text-center">
        Flavors To Discover
      </h2>
      <h4 className="text-xl font-bold font-frauncestracking-wide">
        Browse honest takes on what you drink and eat
      </h4>
      <Marquee pauseOnHover={true} autoFill={true} className="mb-6">
        {productTypesData.map((productType) => (
          <Link 
            href={`/reviews/${productType.name.toLowerCase()}`} 
            className="inline-block"
          >
            <Card 
              key={productType.name} 
              className="mx-2.5 w-[300px] h-[450px] mt-3 md:mt-8"
            >
              <CardContent className="px-4">
                <div className="text-sm font-frauncesmb-4 tracking-wide">
                  {productType.name}
                </div>
                <h3 className="text-2xl font-bold mb-4">
                  {productType.description}
                </h3>
                <p className="text-sm font-frauncestracking-wide">
                  {productType.tagline}
                </p>
                <div className="py-4">
                  <Image
                    src={heroBg}
                    alt="Hero Background"
                    className="w-full h-full object-cover"
                  />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </Marquee>
    </div>
  )
}
