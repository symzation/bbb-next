
//import { useEffect, useState } from "react"
import { styles } from "@/utils/constants"
import { cn } from "@/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FiMinus, FiPlus } from "react-icons/fi"

const items = [
  {
    value: "payment",
    trigger: "Do I have to pay?",
    content:
      "No. Reading and writing reviews is a completely free. We offer memberships for exclusive content and event access, but the core platform consts nothing.",
    disable: false
  },
  {
    value: "reviewer",
    trigger: "How do I become a reviewer?",
    content:
      "Sign up for a free account and then apply to be a reviewer. Once approved, you can start submitting reviews.",
      disable: false
  },
  {
    value: "membership",
    trigger: "What's included in a membership?",
    content:
      "Members get access reviews, early event announcements and the ability to purchase for our tastings, gatherings, tours and events. It's the best way to stay connected and engaged with the community.",
    disable: true
  },
  {
    value: "edit",
    trigger: "Can I edit my reviews?",
    content:
      "Yes. you can update any review you've submitted during the editing period at any time during the editing period through your account dashboard. Once a review has been approved and published, it will no longer be editable.",
    disable: false
  },
  {
    value: "events",
    trigger: "How often are events held?",
    content:
      "We host tastings, gatherings, tours, and other events throughout the year. Check our events page for the latest schedule and details.",
    disable: true
  },
]

export default function Faq() {
  return (
    <div 
      className={cn(
        styles.homeSection, 
        'flex-col justify-center items-center gap-4 bg-black/95 text-white w-full py-8'
      )}
    >
      <h2 className="text-6xl font-bold">FAQ</h2>
      <p className={cn(styles.paragraph, "text-center max-w-3xl")}>
        Questions about how Bourbon Brew &amp; Bites review hub works and what you get as a member.
      </p>
      <Accordion type="multiple" className="w-[90%] md:w-3/4" defaultValue={[""]}>
        {items.map((item) => (
          !item.disable && 
            <AccordionItem key={item.value} value={item.value} 
              className="focus-visible:ring-[0px] py-2 px-4"
            >
              <AccordionTrigger 
                className="group hover:no-underline hover:cursor-pointer text-fourth" 
                useDefaultIcon={false}
              >
                <span className="text-lg font-bold tracking-wide">{item.trigger}</span>
                <FiMinus className="hidden group-data-[state=open]:block w-6 h-6" />
                <FiPlus className="hidden group-data-[state=closed]:block w-6 h-6" />
              </AccordionTrigger>
              <AccordionContent className="text-base">{item.content}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <h4 className="text-3xl font-bold tracker-widest">Still have questions</h4>
        <div className="-mt-1">Reach out and we'll be happy to help.</div>
        <Button className="bg-fourth hover:bg-fourth/85 mt-4">
          <Link href="/contact" className="block">Contact Us</Link>
        </Button>
    </div>
  )
}