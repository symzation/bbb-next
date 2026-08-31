
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { styles } from "@/utils/constants"
import { cn } from "@/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getCategories } from "@/lib/db/actions/categories"
import Marquee from "react-fast-marquee"
import { Card, CardContent } from "@/components/ui/card"
import { CategoryDataProps } from "@/types/types"
import { createCookie } from "@/lib/cookies"
import { useCategoryStore } from "@/store/store"
import { useShallow } from "zustand/react/shallow"

import heroBg from "../../../public/categoriesImage.jpg"

export default function DiscoverFlavors() {
  const router = useRouter()

  const { categories, categoryTypes } = useCategoryStore(
    useShallow(state => ({
      categories: state.categories,
      categoryTypes: state.categoryTypes,
    }))
  )
  // const [categories, setCategories] = 
  //   useState<CategoryDataProps[] | null>(null)

  /* useEffect(() => {
    async function fetchProductTypes() {
      const res = await getCategories()
      const resSort = res.sort((a, b) => (a?.name ?? "").localeCompare(b?.name ?? ""))
      // setCategories(resSort as CategoryDataProps[])
    }

    fetchProductTypes()
  }, []) */

  const handleNavigate = (productCategoryName: string) => {
    // Set a cookie with your hidden data
    createCookie('categorySelected', productCategoryName)
    router.push(`/reviews/${productCategoryName}`);
  }

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
        Browse honest takes on what interests you
      </h4>
      {/* <Marquee pauseOnHover={true} autoFill={true} className="mb-6"> */}
      <div className="flex flex-col md:flex-row justify-center -mt-3 pb-4">  
        {categories?.map((category) => (
          <Link 
            key={category?.name}
            //href={`/reviews/${category?.name?.toLowerCase()}`} 
            href='#'
            className="inline-block scrollFadeInSlam"
            onClick={() => handleNavigate(category?.name.toLowerCase())}
          >
            <Card 
              key={category?.name} 
              className="mx-2.5 width-full md:w-[300px] h-full md:h-[450px] mt-3 md:mt-8"
            >
              <CardContent className="px-4">
                <div className="text-base text-secondary font-fraunces mb-2 capitalize tracking-wide">
                  {category?.name}
                </div>
                <h3 className="text-2xl font-bold mb-4">
                  {category?.description}
                </h3>
                <p className="text-base text-secondary font-frauncestracking-wide">
                  {category?.tagline}
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
      </div>
      {/* </Marquee> */}
    </div>
  )
}
