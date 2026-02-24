
//import { useEffect, useState } from "react"
import Image from "next/image"
import { styles } from "@/utils/constants"
import { cn } from "@/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getProductTypes } from "@/lib/db/actions/productTypes"
import Marquee from "react-fast-marquee"
import { Card, CardContent } from "@/components/ui/card"
import MailingListForm from "../Forms/MailingList/MailingListForm"

import heroBg from "../../../public/categoriesImage.jpg"

    {/* <div 
      className={cn(
        styles.homeSection, 
        'flex-col justify-center items-center gap-4 bg-secondary text-black w-full px-4 py-10 md:p-10'
      )}
    >
      <h2 className="text-4xl md:text-6xl font-bold text-center">
        Stay in the Loop
      </h2>
      <h3 className="text-base md:text-xl font-bold font-frauncestracking-wide mb-3 text-center">
        Get new reviews, event announcements and tasting updates delivered to your inbox
      </h3>
      <MailingListForm />
      <div className="w-full md:w-5/6 h-auto relative mt-3 rotateScaleBounce">
        <Image
          src={heroBg}
          alt="Hero Background"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    </div> */}
export default function StayInTheLoop() {
  return (
    <div 
      className={cn(
        styles.homeSection, 
        'flex-col md:flex-row gap-5 md:gap-10 bg-secondary w-full py-12 px-5 md:px-0'
      )}
    >
      <div className="justify-self-end w-full md:w-1/2 px-8 md:px-0 text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-1">
          Stay in the Loop
        </h2>
        <p className={cn(styles.paragraph, 'mb-2')}>
          Get new reviews, event announcements and tasting updates delivered to your inbox
        </p>
        <MailingListForm />
      </div>
      <div className="justify-self-start w-1/2 rotateScaleBounce hidden md:block">
        <Image
          src={heroBg}
          alt="Hero Background"
          className="w-full h-96 object-cover"
        />
      </div>
    </div>
  )
}