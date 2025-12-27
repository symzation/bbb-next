"use client"

import { createCookie, getCookie } from "@/lib/cookies"
import { useEffect, useState } from "react"
import { styles } from "@/constants/constants"
import { cn } from "@/utils"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useRouter } from "next/navigation"

export default function AgeConsent() {
  const [isAgeConsentOpen, setIsAgeConsentOpen] = useState(false)

  const router = useRouter()

  const consented = () => {
    createCookie('age-consent', 'true', 4)
    setIsAgeConsentOpen(false)
  }

  const notConsented = () => {
    router.replace("https://www.responsibility.org/")
  }

  const checkConsent = async () => {
    const consent = await getCookie('age-consent')
    if (consent === null || consent?.value !== 'true') {
      setIsAgeConsentOpen(true)
    }
  }

  useEffect(() => {
    checkConsent()
  }, [])

  return (
     <AlertDialog open={isAgeConsentOpen} onOpenChange={setIsAgeConsentOpen}>
      <AlertDialogOverlay className="bg-primary/90"/>
      <AlertDialogContent className="bg-white text-primary border-4 border-secondary rounded-none px-2">
        <AlertDialogHeader>
          <div className="flex justify-center items-center mt-4 mb-8">[Logo Goes Here]</div>
          <AlertDialogTitle className="mb-4 text-4xl font-bold text-center uppercase tracking-wide">
            Age Verification
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center mb-4 px-5">
            You must consent that you are of legal drinking age before continuing.
            Before entering, please confirm that you are of legal drinking age (21+). Your consent is required to proceed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex justify-center items-center">
          <AlertDialogCancel className="cursor-pointer" onClick={notConsented}>Under 21</AlertDialogCancel>
          <AlertDialogAction className="text-white cursor-pointer" onClick={consented}>Over 21</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

  )
}