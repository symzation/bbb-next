"use client"

import { useState } from "react"
import Link from "next/link"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import FormButtonLink from "@/components/LoginRegisterForms/FormButtonLink"
import SocialLoginButtons from "@/components/LoginRegisterForms/SocialLoginButtons"
import LoginForm from "@/components/LoginRegisterForms/LoginForm"

type LoginProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onTransitionToRegister: () => void
  onTransitionToForgotPassword: () => void
}

export default function Login({
  isOpen,
  onOpenChange,
  onTransitionToRegister,
  onTransitionToForgotPassword
}: LoginProps) {
  //const { updateLoginState } = useLoginContext()
  const [showSignInOptions, setShowSignInOptions] = useState(true)
  const [showEmailLogin, setShowEmailLogin] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-white text-primary">
        <DialogHeader className="mb-2">
          <DialogTitle className="text-2xl font-bold text-center">
            Welcome Back, Taster!
          </DialogTitle>
          <DialogDescription className="text-base text-black -mt-1 text-center">
            Login with Google or Facebook account.
          </DialogDescription>
        </DialogHeader>
        <SocialLoginButtons />
        <div className="flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500">or continue with</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <LoginForm
          onOpenChange={onOpenChange}
          onTransitionToForgotPassword={onTransitionToForgotPassword}
        />
        <FormButtonLink
          buttonSentence="Don't have an account?"
          buttonSentenceClass="text-gray-500"
          buttonClass=""
          buttonText="Sign up"
          buttonWrapperClass="text-sm text-center"
          onTransitionFunc={onTransitionToRegister}
          buttonVariant="link"
        />
        <div className="text-xs text-gray-500 hidden">
          By clicking "Login", you accept Bourbon Brew &apos Bites's <Link href="#" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">Terms of Service</Link> and <Link href="#" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">Privacy Policy</Link>.
        </div>
      </DialogContent>
    </Dialog>
  )
}