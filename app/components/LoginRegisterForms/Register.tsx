import { useState } from "react"
import Link from "next/link"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
/* import { jwtDecode } from "jwt-decode"
import { redirect } from "next/navigation"
import { createSession } from '@/lib/session' */
//import { useLoginContext } from "@/providers/LoginProvider"
import FormButtonLink from "@/components/LoginRegisterForms/FormButtonLink"
import SocialLoginButtons from "@/components/LoginRegisterForms/SocialLoginButtons"
import RegisterForm from "@/components/LoginRegisterForms/RegisterForm"

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
  //const { updateLoginState } = useLoginContext()
  const [showRegistrationOptions, setShowRegistrationOptions] = useState(true)
  const [showRegistrationForm, setShowRegistrationForm] = useState(false)

  /*  const handleShowSignInOptions = () => {
     setShowRegistrationForm(false)
     setShowRegistrationOptions(true)
   } */

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-white text-primary">
        <DialogHeader>
          <DialogTitle className="text-xl uppercase text-center font-bold mt-6">
            Join The Tasting Table today!
          </DialogTitle>
          <DialogDescription className="text-sm text-center -mt-1 mb-2.5">
            Register with Google or Facebook account.
          </DialogDescription>
        </DialogHeader>
        <SocialLoginButtons />
        <div className="flex items-center py-1">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500">or register with</span>
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
        <div className="text-xs text-gray-500 hidden">
          By clicking "Login", you accept Bourbon Brew &apos; Bites's <Link href="#" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">Terms of Service</Link> and <Link href="#" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">Privacy Policy</Link>.
        </div>
      </DialogContent>
    </Dialog >
  )
}