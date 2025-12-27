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
      <h1 className="text-3xl font-bold mb-4">Admin Page</h1>
      
    </div>
  )
}