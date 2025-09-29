import { useActionState, useEffect } from "react"
import { styles } from "@/constants/constants"
import { cn } from "@/utils"
import { Button } from "@/components/ui/button"
import { FaLock, FaUser } from "react-icons/fa"
import { emailLoginAction } from "@/components/LoginRegisterForms/LoginFormAction"
import FormButtonLink from "@/components/LoginRegisterForms/FormButtonLink"

type LoginFormProps = {
  onOpenChange: (open: boolean) => void
  onTransitionToForgotPassword: () => void
}

export default function LoginForm({
  onOpenChange,
  onTransitionToForgotPassword
}: LoginFormProps) {
  const [formState, formAction, isPending] = useActionState(emailLoginAction, undefined)

  useEffect(() => {
    if (formState && formState?.success) {
      onOpenChange(false)
    }
  }, [formState])

  return (
    <div className="mt-6 mb-2">
      <form action={formAction}>
        <div className="flex flex-col space-y-10">
          <div className="relative flex items-center">
            <label htmlFor="email" className="absolute -top-6 left-0 text-sm font-bold tracking-wide">
              Email
            </label>
            <FaUser className="absolute left-[10px] text-base" />
            <input type="text" name="email" defaultValue=""
              placeholder="Email" className={cn(styles.formInput, 'pl-[35px]')}
            />
          </div>
          <div className="relative flex items-center">
            <div className="flex justify-between items-center w-full absolute -top-8 left-0">
              <label htmlFor="password" className="text-sm font-bold tracking-wide">
                Password
              </label>
              <FormButtonLink
                buttonSentence=""
                buttonSentenceClass="text-gray-500"
                buttonClass=""
                buttonText="Forgot password?"
                onTransitionFunc={onTransitionToForgotPassword}
                buttonVariant="link"
              />
            </div>
            <FaLock className="absolute left-[10px] text-base" />
            <input type="password" name="password" defaultValue=""
              placeholder="Password" className={cn(styles.formInput, 'pl-[35px]')}
            />
          </div>
        </div>
        <div className="flex-col sm:flex-col sm:justify-center mt-5">
          <Button type="button" className="w-full text-third tracking-wider py-5 px-12 ring-0 focus:ring-0 ring-offset-0 focus:ring-offset-0 focus-visible:ring-0 outline-none cursor-pointer data-[state=open]:bg-transparent">
            Login
          </Button>
        </div>
      </form>
    </div>
  )
}