'use client'

import { useActionState, useEffect, useRef, useState } from "react"
import { styles } from "@/utils/constants"
import { cn } from "@/utils"
import { Button } from "@/components/ui/button"
import { formatPhoneNumber } from "@/utils/helpers"
import { ContactFormAction } from "@/components/Forms/Contact/ContactFormAction"

export default function ContactForm() {
  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [phone, setPhone] = useState<string>()
  const [message, setMessage] = useState<string>("")
  const [formState, formAction, isPending] = useActionState(ContactFormAction, undefined)

  const phoneInput = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (formState && formState?.success) {
    }
  }, [formState])

  const formatPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    let digits = formatPhoneNumber(e.target.value)
    e.target.value = digits
  }

  return (
    <div className="mt-0 mb-2">
      <form action={formAction} className="flex flex-col space-y-4 w-full md:w-4/5 mx-auto">
        <div className="flex flex-col">
          <label htmlFor="firstName" className={cn(styles.formLabel, "text-sm font-bold tracking-wide")}>
            <span className="text-error">*</span> First Name 
          </label>
          <input type="text" name="firstName" defaultValue={firstName} 
            placeholder="Name" className={cn(styles.formInput)}
            onBlur={(e) => setFirstName(e.target.value)}
          />
          {formState?.errors && typeof formState.errors === "object" && !Array.isArray(formState.errors) && "firstName" in formState.errors && (
            <span className="text-error text-sm italic mt-1">
              {Array.isArray((formState.errors as any).firstName)
                ? (formState.errors as any).firstName.join(", ")
                : String((formState.errors as any).firstName)
              }
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="lastName" className={cn(styles.formLabel, "text-sm font-bold tracking-wide")}>
            <span className="text-error">*</span> Last Name
          </label>
          <input type="text" name="lastName" defaultValue={lastName} 
            placeholder="Last Name" className={cn(styles.formInput)}
            onBlur={(e) => setLastName(e.target.value)}
          />
          {formState?.errors && typeof formState.errors === "object" && !Array.isArray(formState.errors) && "lastName" in formState.errors && (
            <span className="text-error text-sm italic mt-1">
              {Array.isArray((formState.errors as any).lastName)
                ? (formState.errors as any).lastName.join(", ")
                : String((formState.errors as any).lastName)
              }
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className={cn(styles.formLabel, "text-sm font-bold tracking-wide")}>
            <span className="text-error">*</span> Email
          </label>
          <input type="text" name="email" defaultValue={email} 
            placeholder="Email" className={cn(styles.formInput)}
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
        <div className="flex flex-col">
          <label htmlFor="phone" className={cn(styles.formLabel, "text-sm font-bold tracking-wide")}>
            <span className="text-error">*</span> Phone
          </label>
          <input ref={phoneInput} type="tel" name="phone" defaultValue={phone} placeholder="Phone" className={cn(styles.formInput)}
            onChange={(e) => formatPhone(e)}
            onBlur={(e) => setPhone(e.target.value)}
          />
          {formState?.errors && typeof formState.errors === "object" && !Array.isArray(formState.errors) && "phone" in formState.errors && (
            <span className="text-error text-sm italic mt-1">
              {Array.isArray((formState.errors as any).phone)
                ? (formState.errors as any).phone.join(", ")
                : String((formState.errors as any).phone)
              }
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="message" className={cn(styles.formLabel, "text-sm font-bold tracking-wide")}>
            <span className="text-error">*</span> Message
          </label>
          <textarea name="message" defaultValue={message} placeholder="Message" 
            className={cn(styles.formInput, "h-32")}
            onBlur={(e) => setMessage(e.target.value)}
          />
          {formState?.errors && typeof formState.errors === "object" && !Array.isArray(formState.errors) && "message" in formState.errors && (
            <span className="text-error text-sm italic mt-1">
              {Array.isArray((formState.errors as any).message)
                ? (formState.errors as any).message.join(", ")
                : String((formState.errors as any).message)
              }
            </span>
          )}
        </div>
        <div className="w-full mt-3 text-right">
          <Button 
            type="submit" 
            disabled={isPending}
            className={cn(
              "w-full md:w-1/5 text-third tracking-wider py-5 px-12 ring-0 focus:ring-0 ring-offset-0 focus:ring-offset-0 focus-visible:ring-0 outline-none cursor-pointer data-[state=open]:bg-transparent", 
              isPending && "opacity-70 cursor-not-allowed"
            )}
          >
            {isPending ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  )
}