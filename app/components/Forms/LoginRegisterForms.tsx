"use client"

import { useState } from "react"
import Image from "next/image"
import { styles } from "@/utils/constants"
import { cn } from "@/utils"
import { Button } from "@/components/ui/button"
import Login from "@/components/Forms/Login/Login"
import Register from "@/components/Forms/Register/Register"
import ForgotPassword from "@/components/Forms/ForgotPassword/ForgotPassword"
import { FaUserPlus, FaSignInAlt } from "react-icons/fa"

type LoginRegisterFormsProps = {
  loginLinkRef: React.RefObject<HTMLButtonElement | null>
  posValue?: number
}

export const openLoginMenu = () => {
  const loginLink = document.getElementById("loginLinkRef")
  if (loginLink) {
    loginLink.click()
  }
}

export default function LoginRegisterForms({
  loginLinkRef,
  posValue
}: LoginRegisterFormsProps) {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false)

  const openLogin = () => {
    setIsRegisterOpen(false) // Close the register dialog
    setIsLoginOpen(true) // Open the login dialog
  }

  const openForgotPassword = () => {
    setIsLoginOpen(false) // Close the login dialog
    setIsRegisterOpen(false) // Close the register dialog
    setIsForgotPasswordOpen(true) // Open the forgot password dialog
  }

  const openRegister = () => {
    setIsLoginOpen(false) // Close the login dialog
    setIsRegisterOpen(true) // Open the register dialog
  }

  return (
    <>
      <Button
        ref={loginLinkRef}
        id="loginLinkRef"
        variant="link"
        className={cn(
          styles.secondaryNavClass, 
          'text-base md:text-xl mt-3 mr-5 font-bold text-primary hover:text-white hover:no-underline transition-all duration-300 ease-in-out',
          (posValue ?? 0) > 0 ? 'text-secondary hover:text-white' : ''
        )}
        onClick={() => setIsLoginOpen(true)}
      >
        <div className={cn("flex items-center", (posValue ?? 0) > 0 ? "-mt-0.5" : "mt-0.5")}>
          Login
        </div>
      </Button>
      <Login
        isOpen={isLoginOpen}
        onOpenChange={setIsLoginOpen}
        onTransitionToRegister={openRegister}
        onTransitionToForgotPassword={openForgotPassword}
      />
      <ForgotPassword
        isOpen={isForgotPasswordOpen}
        onOpenChange={setIsForgotPasswordOpen}
      />
      <Register
        isOpen={isRegisterOpen}
        onOpenChange={setIsRegisterOpen}
        onTransitionToLogin={openLogin}
      />
    </>
  )
}