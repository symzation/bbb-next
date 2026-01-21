import { useActionState, useEffect, useState } from "react"
import { styles } from "@/constants/constants"
import { cn } from "@/utils"
import { Button } from "@/components/ui/button"
import { RegisterAction } from "@/components/Forms/Register/RegisterFormAction"
import { redirect } from "next/navigation"

type RegisterFormProps = {
  onOpenChange: (open: boolean) => void
}

export default function RegisterForm({
  onOpenChange
}: RegisterFormProps) {
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [formState, formAction, isPending] = useActionState(RegisterAction, undefined)

  useEffect(() => {
    if (formState && formState?.success) {
      onOpenChange(false)
      redirect('/')
    }
  }, [formState])

  return (
    <div className="mt-0 mb-2">
      <form action={formAction} className="flex flex-col space-y-3">
        <div className="flex flex-col">
          <label htmlFor="name" className="text-sm font-bold tracking-wide">
            Name
          </label>
          <input type="text" name="name" defaultValue={name}
            placeholder="Name" className={cn(styles.formInput)}
            onBlur={(e) => setName(e.target.value)}
          />
          {formState?.errors && typeof formState.errors === "object" && !Array.isArray(formState.errors) && "name" in formState.errors && (
            <span className="text-error text-sm italic mt-1">
              {Array.isArray((formState.errors as any).name)
                ? (formState.errors as any).name.join(", ")
                : String((formState.errors as any).name)
              }
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-bold tracking-wide">
            Email
          </label>
          <input type="text" name="email" defaultValue={email}
            placeholder="Email" className={cn(styles.formInput)}
            onBlur={(e) => setEmail(e.target.value)}
          />
          {formState?.errors && typeof formState.errors === "object" && !Array.isArray(formState.errors) && "email" in formState.errors && (
            <span className="text-error text-sm italic mt-1">{(formState.errors as { email?: string[] }).email}</span>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="text-sm font-bold tracking-wide">
            Password
          </label>
          <input type="password" name="password" defaultValue={password}
            placeholder="Password" className={cn(styles.formInput)}
            onBlur={(e) => setPassword(e.target.value)}
          />
          {formState?.errors && typeof formState.errors === "object" && !Array.isArray(formState.errors) && "password" in formState.errors && (
            <span className="text-error text-sm italic mt-1">{(formState.errors as { password?: string[] }).password}</span>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="confirmPassword" className="text-sm font-bold tracking-wide">
            Confirm Password
          </label>
          <input type="password" name="confirmPassword" defaultValue={confirmPassword}
            placeholder="Confirm Password" className={cn(styles.formInput)}
            onBlur={(e) => setConfirmPassword(e.target.value)}
          />
          {formState?.errors && typeof formState.errors === "object" && !Array.isArray(formState.errors) && "confirmPassword" in formState.errors && (
            <span className="text-error text-sm italic mt-1">{(formState.errors as { confirmPassword?: string[] }).confirmPassword}</span>
          )}
        </div>
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