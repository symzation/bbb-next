"use client"

import { useEffect, useState } from "react"
import { createCookie, getCookie } from "@/lib/cookies"
import Image from "next/image"
import { cn } from "@/utils"
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

import Logo from "../../../public/BNBLogoWht.png"

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

  useEffect(() => {
    let isMounted = true

    void (async () => {
      const consent = await getCookie('age-consent')

      if (!isMounted) return

      if (consent === null || consent?.value !== 'true') {
        setIsAgeConsentOpen(true)
      }
    })()

    return () => {
      isMounted = false
    }
  }, [])

  return (
     <AlertDialog open={isAgeConsentOpen} onOpenChange={setIsAgeConsentOpen}>
      <AlertDialogOverlay className="bg-primary/90"/>
      <AlertDialogContent className="bg-white text-primary border-4 border-secondary rounded-none px-2">
        <AlertDialogHeader>
          <div className="flex justify-center items-center mb-2">
            <Image
              src={Logo}
              alt="Bourbon N' Brews Logo"
              className="w-[40%] h-auto"
            />
          </div>
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