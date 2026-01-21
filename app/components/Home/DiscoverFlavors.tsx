
//import { useEffect, useState } from "react"
import Image from "next/image"
import { styles } from "@/constants/constants"
import { cn } from "@/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getProductTypes } from "@/lib/db/actions/productTypes"
import Marquee from "react-fast-marquee"
import { Card, CardContent } from "@/components/ui/card"

import heroBg from "../../../public/categoriesImage.jpg"

type ProductTypesResult = Awaited<ReturnType<typeof getProductTypes>>

export default async function DiscoverFlavors() {
  //const productTypesData = await getProductTypes()
  const productTypesData = [
    {
      name: "Whiskey", 
      description: "Explore bold pours worth savoring",
      tagline: "Discover whiskeys defined by character & complexity",
      intro: "Discover in-depth whiskey reviews exploring flavor profiles, finishes, and craftsmanship behind every pour"
    },
    {
      name: "Coffee", 
      description: "Uncover roasts worth waking up for",
      tagline: "Discover blends that go beyond the brew",
      intro: "Explore coffee reviews focused on roast profiles, origins, brewing methods, and flavor notes—helping you find exceptional coffee worth your time"
    },
    {
      name: "Beer", 
      description: "Dive into beers crafted with flavor & balance",
      tagline: "Explore beers that go beyond the pint",
      intro: "Browse beer reviews covering craft brews, classic styles, and seasonal releases—evaluated for balance, flavor, and overall drinkability"
    },
    {
      name: "Food", 
      description: "Discover bites with lasting impressions",
      tagline: "Explore food experiences worth talking about",
      intro: "Explore food reviews featuring restaurants, dishes, and pairings—focused on flavor, quality, and the experience behind every bite"
    },
  ]

  return (
    <div 
      className={cn(
        styles.homeSection, 
        'flex-col justify-center items-center gap-4 bg-black/95 text-white w-full'
      )}
    >
      <h3 className="text-xl font-bold font-merriweather-sans tracking-wider">
        Categories
      </h3>
      <h2 className="text-6xl font-bold">
        Flavors To Discover
      </h2>
      <h4 className="text-xl font-bold font-merriweather-sans tracking-wide">
        Browse honest takes on what you drink and eat
      </h4>
      <Marquee pauseOnHover={false} autoFill={true} className="mb-6">
        {productTypesData.map((productType) => (
          <Card key={productType.name} className="mx-4 w-full md:w-[300px] h-[450px] mt-3 md:mt-8">
            <CardContent className="px-4">
              <div className="text-sm font-merriweather-sans mb-4 tracking-wide">
                {productType.name}
              </div>
              <h3 className="text-2xl font-bold mb-4">
                {productType.description}
              </h3>
              <p className="text-sm font-merriweather-sans tracking-wide">
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
        ))}
      </Marquee>
    </div>
  )
}
