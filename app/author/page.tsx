"use client"

import { useRef, useState } from "react"
import { styles } from "@/constants/constants"
import { cn } from "@/utils"
import { Button } from "@/components/ui/button"
import Author from "@/components/Forms/Author/Author"

export default function Write() {
  const [isAuthorFormOpen, setIsAuthorFormOpen] = useState(false)

  const authorFormBtn = useRef<HTMLButtonElement>(null)

 /*  const openRegister = () => {
    setIsAuthorFormOpen(true)
  }

  const openForgotPassword = () => {
    setIsAuthorFormOpen(true)
  } */
  
  return (
    <div className={cn(styles.pageClass, "px-4 md:px-20")}>
      <h1 className="text-3xl font-bold mb-4">Become A Reviewer For Bourbon Brew & Bites?</h1>
      <p className={styles.paragraph}>
        Becoming a reviewer for Bourbon Brew & Bites is easier than pouring your first glass. With just a few simple steps, you can join a growing community of enthusiasts who share their love for bourbon, beer, coffee, and delicious small bites from around the country. Whether you're a seasoned taster or someone who simply enjoys a great pour and good company, your voice matters. The process is designed to be effortless — sign up, create your reviewer profile, and start writing reviews about your favorite local spots, distilleries, breweries, coffee shops, or hidden gems in your city or state.
      </p>
      <p className={styles.paragraph}>
        As a reviewer, you&apos;ll have the chance to spotlight the rich flavors, craftsmanship, and atmosphere that make your local experiences unique. Share tasting notes, personal stories, or recommendations that help others discover the best sips and bites near them. Each review adds value to the community — guiding newcomers, highlighting local businesses, and celebrating the artistry behind every roast, brew, and pour.
      </p>
      <p className={styles.paragraph}>
        Whether you&apos;re writing about a smooth single barrel bourbon, a small-batch coffee roast, a craft IPA, or a perfectly paired plate of bites, Bourbon Brew & Bites gives you the stage to express your passion. So grab your glass, take that first sip, and let your tastebuds tell the story — your journey as a reviewer begins with just a few easy steps.
      </p>
      <Button
        ref={authorFormBtn}
        id="authorFormBtn"
        variant="default"
        className={cn("mt-4 bg-white text-primary hover:bg-primary hover:text-white border border-fifth hover:border-primary cursor-pointer transition-all duration-150 ease-in-out")}
        onClick={() => setIsAuthorFormOpen(true)}
      >
        Become A Reviewer For Us
      </Button>

      <Author
        isOpen={isAuthorFormOpen}
        onOpenChange={setIsAuthorFormOpen}
      />
    </div>
  )
}