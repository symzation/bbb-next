"use client"

import { useActionState, useEffect, useState } from "react"
import { styles } from "@/utils/constants"
import { cn } from "@/utils"
import { Button } from "@/components/ui/button"
import { RegisterAction } from "@/components/Forms/Register/RegisterFormAction"

export default function MailingListForm() {
  const [email, setEmail] = useState<string>("")
  const [showForm, setShowForm] = useState<boolean>(true)
  const [formState, formAction, isPending] = useActionState(RegisterAction, undefined)

  useEffect(() => {
    if (formState && formState?.success) {
      setShowForm(false)
      setTimeout(() => setShowForm(true), 10000)
    }
  }, [formState])

  const updateShowForm = () => {
    setShowForm(true)
  }
  
  return (
    <>
      <form 
        action={formAction} 
        className={cn(
          "flex flex-col md:flex-row justify-center items-center gap-2 w-full",
          !showForm && "hidden"
        )}
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
      <div 
        className={cn(
          "text-success text-sm italic mt-1", 
          showForm && "hidden"
        )}
      >
        Success Message
      </div>
    </>
  )
}