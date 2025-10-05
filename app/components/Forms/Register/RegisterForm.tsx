"use client"

import { useActionState, useEffect } from "react"
import { styles } from "@/constants/constants"
import { cn } from "@/utils"
import { Button } from "@/components/ui/button"
import DateOfBirth from "@/components/FormElements/DateOfBirth"
import { registerAction } from "@/components/Forms/Register/RegisterAction"


type RefgisterFormProps = {
  onOpenChange: (open: boolean) => void
}

export default function RegisterForm({
  onOpenChange
}: RefgisterFormProps) {
  const [formState, formAction, isPending] = useActionState(registerAction, undefined)

  useEffect(() => {
    if (formState && formState?.success) {
      onOpenChange(false)
    }
  }, [formState])

  return (
    <div className="mt-0 mb-2">
      <form action={formAction} className="flex flex-col space-y-3">
        <div className="flex flex-col">
          <label htmlFor="name" className="text-sm font-bold tracking-wide">
            Name
          </label>
          <input type="text" name="name" defaultValue=""
            placeholder="Name" className={cn(styles.formInput)}
          />
          {formState?.errors && typeof formState.errors === "object" && !Array.isArray(formState.errors) && "name" in formState.errors && (
            <span className="text-error text-sm italic mt-1">{(formState.errors as { name?: string[] }).name}</span>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-bold tracking-wide">
            Email
          </label>
          <input type="text" name="email" defaultValue=""
            placeholder="Email" className={cn(styles.formInput)}
          />
          {formState?.errors && typeof formState.errors === "object" && !Array.isArray(formState.errors) && "email" in formState.errors && (
            <span className="text-error text-sm italic mt-1">{(formState.errors as { email?: string[] }).email}</span>
          )}
        </div>
        {/* <div className="flex flex-col hidden">
          <DateOfBirth dobValue={formState?.data?.dateOfBirth} />
          {formState?.errors && typeof formState.errors === "object" && !Array.isArray(formState.errors) && "dateOfBirth" in formState.errors && (
            <span className="text-error text-sm italic mt-1">{(formState.errors as { dateOfBirth?: string[] }).dateOfBirth}</span>
          )}
        </div> */}
        {/* <div className="flex flex-col">
          <label htmlFor="password" className="text-sm font-bold tracking-wide">
            Password
          </label>
          <input type="password" name="password" defaultValue=""
            placeholder="Password" className={cn(styles.formInput)}
          />
          {formState?.errors && typeof formState.errors === "object" && !Array.isArray(formState.errors) && "password" in formState.errors && (
            <span className="text-error text-sm italic mt-1">{(formState.errors as { password?: string[] }).password}</span>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="confirmPassword" className="text-sm font-bold tracking-wide">
            Confirm Password
          </label>
          <input type="password" name="confirmPassword" defaultValue=""
            placeholder="Confirm Password" className={cn(styles.formInput)}
          />
          {formState?.errors && typeof formState.errors === "object" && !Array.isArray(formState.errors) && "confirmPassword" in formState.errors && (
            <span className="text-error text-sm italic mt-1">{(formState.errors as { confirmPassword?: string[] }).confirmPassword}</span>
          )}
        </div> */}
        <div className="flex-col sm:flex-col sm:justify-center mt-3">
          <Button 
            type="submit" 
            disabled={isPending}
            className={cn("w-full text-third tracking-wider py-5 px-12 ring-0 focus:ring-0 ring-offset-0 focus:ring-offset-0 focus-visible:ring-0 outline-none cursor-pointer data-[state=open]:bg-transparent", isPending && "opacity-70 cursor-not-allowed")}
          >
            {isPending ? "Registering..." : "Continue"}
          </Button>
        </div>
      </form>
    </div>
  )
}