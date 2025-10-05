"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { styles } from "@/constants/constants"
import { cn } from "@/utils"
import { Button } from "@/components/ui/button"
import Login from "@/components/Forms/Login/Login"
import Register from "@/components/Forms/Register/Register"
import ForgotPassword from "@/components/Forms/ForgotPassword/ForgotPassword"

type LoginRegisterFormsProps = {
  loginLinkRef: React.RefObject<HTMLButtonElement | null>
}

export default function LoginRegisterForms({
  loginLinkRef
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
        className={cn(styles.secondaryNavClass, 'mt-[5px] font-bold')}
        onClick={() => setIsLoginOpen(true)}
      >
        <Image
          src="/default-avatar.png"
          alt="User Avatar"
          width={64}
          height={64}
          className={cn(styles.avatarClass, "-mt-1")}
        />
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
  );
}