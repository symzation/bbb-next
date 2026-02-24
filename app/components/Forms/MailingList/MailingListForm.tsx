"use client"
import { useActionState, useEffect, useState } from "react"
import Image from "next/image"
import { styles } from "@/utils/constants"
import { cn } from "@/utils"
import { Button } from "@/components/ui/button"
import { RegisterAction } from "@/components/Forms/Register/RegisterFormAction"

import heroBg from "../../../public/categoriesImage.jpg"

export default function MailingListForm() {
  const [email, setEmail] = useState<string>("")
  const [showSuccess, setShowSuccess] = useState<boolean>(false)
  const [formState, formAction, isPending] = useActionState(RegisterAction, undefined)

  useEffect(() => {
    if (formState && formState?.success) {
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 10000)
    }
  }, [formState])
  
  return (
    <>
      {!showSuccess ? (
        <form 
          action={formAction} 
          className="flex flex-col md:flex-row justify-center items-center gap-2 w-full"
        >
          <div className="flex flex-col w-full md:w-4/6">
            <input type="text" name="email" defaultValue={email}
              placeholder="Email" className={cn(styles.formInput, "w-full font-bold")}
              onBlur={(e) => setEmail(e.target.value)}
            />
            {formState?.errors && typeof formState.errors === "object" && !Array.isArray(formState.errors) && "email" in formState.errors && (
              <span className="text-error text-sm italic mt-1">
                {Array.isArray((formState.errors as any).email)
                  ? (formState.errors as any).email.join(", ")
                  : String((formState.errors as any).email)
                }
              </span>
            )}
          </div>
          <div className="w-full md:w-32">
            <Button 
              type="submit" 
              disabled={isPending}
              className={cn("w-full text-white hover:text-secondary hover:translate-y-[-2px] hover:shadow-md hover:shadow-black/50 tracking-wider py-5 px-12 ring-0 focus:ring-0 ring-offset-0 focus:ring-offset-0 focus-visible:ring-0 outline-none cursor-pointer data-[state=open]:bg-transparent", isPending && "opacity-70 cursor-not-allowed")}
            >
              {isPending ? "Registering..." : "Continue"}
            </Button>
          </div>
        </form>
      ) : (
        <div>Success Message</div>
      )}
    </>
  )
}