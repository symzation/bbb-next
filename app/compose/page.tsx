"use client"

import { useState } from "react"
import { styles } from "@/constants/constants"
import { cn } from "@/utils"
import { Button } from "@/components/ui/button"

export default function BecomeReviewer() {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className={cn(styles.pageClass, "px-10")}>
      <h1 className="text-3xl font-bold mb-4">Want To Become A Reviewer</h1>
      <p className={styles.paragraph}>
        Becoming a reviewer for Bourbon Brew & Bites is easier than pouring your first glass. With just a few simple steps, you can join a growing community of enthusiasts who share their love for bourbon, beer, coffee, and delicious small bites from around the country. Whether you're a seasoned taster or someone who simply enjoys a great pour and good company, your voice matters. The process is designed to be effortless — sign up, create your reviewer profile, and start writing reviews about your favorite local spots, distilleries, breweries, coffee shops, or hidden gems in your city or state.
      </p>
      <p className={styles.paragraph}>
        As a reviewer, you’ll have the chance to spotlight the rich flavors, craftsmanship, and atmosphere that make your local experiences unique. Share tasting notes, personal stories, or recommendations that help others discover the best sips and bites near them. Each review adds value to the community — guiding newcomers, highlighting local businesses, and celebrating the artistry behind every roast, brew, and pour.
      </p>
      <p className={styles.paragraph}>
        Whether you’re writing about a smooth single barrel bourbon, a small-batch coffee roast, a craft IPA, or a perfectly paired plate of bites, Bourbon Brew & Bites gives you the stage to express your passion. So grab your glass, take that first sip, and let your tastebuds tell the story — your journey as a reviewer begins with just a few easy steps.
      </p>
      <div className="mt-4 text-xl font-bold tracking-wide uppercase">Registration Coming Soon...</div>
      <div className="hidden">
        <Button
          variant="outline"
          className={cn("mt-4", !showForm ? "" : "hidden")}
          onClick={() => setShowForm(true)}
        >
          Sign Up
        </Button>
        <form className={cn("mt-10", showForm ? "" : "hidden")}>
          {/* Spacer to push footer to bottom */}
          <h2>Register to be a Reviewer Form</h2>
        </form>
      </div>
    </div>
  )
}