import { useState } from "react"
import Link from "next/link"
import { 
  Dialog, 
  DialogOverlay, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog"
import FormButtonLink from "@/components/Forms/FormButtonLink"
import SocialLoginButtons from "@/components/Forms/SocialLoginButtons"
import RegisterForm from "@/components/Forms/Register/RegisterForm"
import LoginDisclaimer from "@/components/Disclaimer/LoginDisclaimer"

type RefgisterProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onTransitionToLogin: () => void
}

export default function Register({
  isOpen,
  onOpenChange,
  onTransitionToLogin
}: RefgisterProps) {
  const [showRegistrationOptions, setShowRegistrationOptions] = useState(true)
  const [showRegistrationForm, setShowRegistrationForm] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogOverlay className="bg-primary/90"/>
      <DialogContent 
        className="w-[450px] bg-white text-primary"
        closeButtonClass=" focus:ring-0 focus:ring-offset-0 cursor-pointer"
      >
        <DialogHeader>
          <DialogTitle className="text-2xl text-left font-bold mt-2">
            {`Join ${process.env.NEXT_PUBLIC_SITENAME}!`}
          </DialogTitle>
          <DialogDescription className="text-base text-black text-left -mt-2.5 mb-1">
            Your seat at the tasting table awaits.
          </DialogDescription>
        </DialogHeader>
        <SocialLoginButtons />
        <div className="flex items-center py-1">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500">or sign up with</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <RegisterForm onOpenChange={onOpenChange} />
        <FormButtonLink
          buttonSentence="Already have an account?"
          buttonSentenceClass="text-gray-500"
          buttonClass=""
          buttonText="Sign in"
          buttonWrapperClass="text-sm text-center"
          onTransitionFunc={onTransitionToLogin}
          buttonVariant="link"
        />
        <LoginDisclaimer actionLabel={`Signing up or clicking "Continue"`} />
      </DialogContent>
    </Dialog >
  )
}