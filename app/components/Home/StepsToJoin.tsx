
//import { useEffect, useState } from "react"
import Image from "next/image"
import { styles } from "@/utils/constants"
import { cn } from "@/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import heroBg from "../../../public/categoriesImage.jpg"
import { getProductTypes } from "@/lib/db/actions"

type ProductTypesResult = Awaited<ReturnType<typeof getProductTypes>>

export default function StepsToJoin() {
  //const productTypesData = await getProductTypes()

  const stepsData = [
    {
      name: "Sign Up For Account",
      description: "Create your reviewer account. Takes less than a minute to get going and it's free",
    },
    {
      name: "Become A Reviewer",
      description: "Take a step towards step into authorship with Bourbon Brew & Bites.",
    },
    {
      name: "Taste & Write", 
      description: "Try something new and share your honest take with the community", 
    }
  ]

  return (
    <div 
      className={cn(
        styles.homeSection, 
        'flex-col justify-center items-center gap-4 bg-black/95 text-white w-full py-12'
      )}
    >
      <div className="text-xl font-bold fontMerriweatherSans tracking-wider">
        Getting Started
      </div>
      <div className="text-4xl md:text-6xl fontFraunces font-bold">
        3 Easy Steps To Join In
      </div>
      <div className="text-xl font-bold fontMerriweatherSans tracking-wide">
        Start tasting, start writing, start sharing what you know
      </div>
      <div className="flex flex-col md:flex-row justify-center gap-4 w-full mt-8">
        {stepsData.map((step, idx) => (
          <div 
            key={step.name}
            className="group relative inline-grid place-items-center w-full md:max-w-[300px] p-1 overflow-hidden hover:cursor-pointer hover:translate-y-[-4px] transition-all duration-300 ease-in-out rounded-xl scrollFadeInSlam"
          >
            <div 
              className="absolute inset-0 group-hover:bg-[conic-gradient(from_0deg,var(--color-fourth),var(--color-caution),var(--color-warning),var(--color-fourth))] w-full h-full rounded-xlopacity-0 group-hover:opacity-100 animate-none group-hover:animate-[ringPulse_2s_linear_infinite] group-hover:transition-all group-hover:duration-300 group-hover:ease-in-out"
            >
              <div className="h-full w-full"></div>
            </div>

            <div className="relative z-[2] w-full h-full rounded-xl bg-zinc-900 grid place-items-center p-4">
              <div className="text-5xl text-white group-hover:text-fourth fontFraunces font-bold no-underline w-full pb-5">
                {idx + 1}.
              </div>
              <div className="text-4xl text-white group-hover:text-fourth fontFraunces font-bold w-full mb-4 tracking-wide min-h-24">
                {step.name}
              </div>
              <p className="text-sm fontMerriweatherSans tracking-wide w-full">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
