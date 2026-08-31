"use client"

import { useSearchParams } from "next/navigation"
import { styles } from "@/utils/constants"
import { cn } from "@/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getErrorMessage } from "@/utils/helpers"
import { BiSolidError } from "react-icons/bi"

/* export const metadata = {
  title: 'Authentication Error',
  description: 'An error occurred during authentication. Please try again or contact support if the issue persists.',
}  */

export default function ErrorPage() {
  const searchParams = useSearchParams()

  console.log("Search params:", searchParams)

  const error = searchParams.get("error") ?? undefined
  const page = searchParams.get("page") ?? undefined

  const message = getErrorMessage(error)
  
  console.log("Error:", error)
  console.log("Page:", page)

  const handleOpenLoginForm = () => {
    const loginLinkRef = document.getElementById("loginLinkRef")
    if (loginLinkRef) loginLinkRef.click()
  }

  return (
    <div 
      className={cn(
        styles.pageClass, 
        "h-screen -m-14 sticky border-2 border-red-500 flex items-center justify-center"
      )}
    >
      <div className="m-auto max-w-md text-center">
        <h2 
          className="flex gap-2 items-center text-4xl text-warning font-bold uppercase tracking-wide"
        >
          <BiSolidError />
          <span>Sign-in Error</span>
          <BiSolidError />
        </h2>
        <p className={cn(styles.paragraph, "text-base")}>{message}</p>
        <Link 
          href="#" 
          className="inline-block text-base text-gray-600 underline hover:no-underline" 
          onClick={handleOpenLoginForm}
        >
          Back to sign in
        </Link>
      </div>
    </div>
  )
}
