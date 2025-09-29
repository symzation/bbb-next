"use client"

import { useActionState, useEffect } from "react"
import { styles } from "@/constants/constants"
import { cn } from "@/utils"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { forgotPasswordAction } from "@/components/LoginRegisterForms/ForgotPaswordAction"

type ForgotPasswordProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export default function ForgotPassword({
  isOpen,
  onOpenChange
}: ForgotPasswordProps) {
  const [formState, formAction, isPending] = useActionState(forgotPasswordAction, undefined)

  useEffect(() => {
    if (formState && formState?.success) {
      onOpenChange(false)
    }
  }, [formState])

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-white text-primary">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Forgot your password?
          </DialogTitle>
          <DialogDescription className="text-base">
            Please enter the email address associated with your account. We&apos;ll send you a secure link to reset your password.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction}>
          <div className="grid gap-3 flex flex-col space-y-2">
            <div className="grid gap-3">
              <input type="text" name="email" defaultValue=""
                placeholder="Email" className={cn(styles.formInput)}
              />
              {formState?.errors &&
                typeof formState.errors === 'object' &&
                !Array.isArray(formState.errors) &&
                'email' in formState.errors &&
                formState.errors.email && (
                  <span className="text-error text-sm italic">{formState.errors.email}</span>
                )}
            </div>
            <div className="grid gap-3">
              <Button type="submit" className={cn('text-third text-lg tracking-wider font-bold py-4 px-12 mx-auto ring-0 focus:ring-0 ring-offset-0 focus:ring-offset-0 focus-visible:ring-0 outline-none cursor-pointer data-[state=open]:bg-transparent', isPending ? 'cursor-not-allowed' : '')} disabled={isPending}>
                Reset Pasword
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}