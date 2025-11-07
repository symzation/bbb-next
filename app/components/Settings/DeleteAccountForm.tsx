
import { useActionState, useEffect, useRef, useState } from "react"
import { styles } from "@/constants/constants"
import { cn } from "@/utils"
import { useAuthContext } from "@/providers/AuthProvider"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { deleteAccountAction } from "@/components/Settings/DeleteAccountFormAction"
import { signOutNoRedirect } from "@/actions/loginActions"  

type deleteAccountFormProps = {
  deleteTerm: string
  handleCancelAll: (e: React.MouseEvent<HTMLButtonElement>) => void
  isDeleteForm: boolean
  setIsDeleteForm: (open: boolean) => void
}

export default function DeleteAccountForm({
  deleteTerm,
  handleCancelAll,
  isDeleteForm,
  setIsDeleteForm,
}: deleteAccountFormProps) {
  const [isDeleteTermValid, setIsDeleteTermValid] = useState<boolean>(false)
  const [formState, formAction, isPending] = useActionState(deleteAccountAction, undefined)

  const deleteTermRef = useRef<HTMLInputElement>(null)
  const deleteInputTermRef = useRef<HTMLInputElement>(null)

  const siteName = process.env.NEXT_PUBLIC_SITENAME ?? ""
  
  const session = useAuthContext()

  useEffect(() => {
    if (formState && formState?.success) {
      setIsDeleteForm(false)
      redirectDeletedUser()
    }
  }, [formState])

  const redirectDeletedUser = async () => {
    await signOutNoRedirect()
    window.location.assign('/')
  }
  
  const checkDeleteTerm = () => {
    const value = deleteInputTermRef.current?.value
    const termTest = (value ?? "").length > 0 && 
      value === deleteTermRef.current?.value ? true : false
      
    setIsDeleteTermValid(termTest)
  }

  return (
    <Dialog open={isDeleteForm} onOpenChange={setIsDeleteForm}>
      <DialogOverlay className="bg-primary/90"/>
      <DialogContent className="w-min-[450px] bg-white py-6">
        <DialogHeader>
          <DialogTitle className="text-2xl text-left">Delete Account</DialogTitle>
          <DialogDescription>
            We&apos;re sorry to see you go. Once your account is deleted from ${siteName}, all of your content will be permanently gone, including your profile, stories, publications, notes, and responses. If you&apos;re not sure about that, we suggest you deactivate your account instead as this action is irreversible.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction}>
          <input 
              ref={deleteTermRef} 
              type="hidden" 
              name="deleteTerm" 
              defaultValue={deleteTerm} 
            />
            <input 
              type="hidden" 
              name="userEmail" 
              defaultValue={session?.user?.email ?? ""} 
            />
          <div className="flex flex-col">
            <label htmlFor="deleteInputTerm" className="text-sm font-bold tracking-wide pb-2">
              To confirm deletion, type {`"${deleteTerm}"`} below:
            </label>
            <input 
              ref={deleteInputTermRef} 
              type="text" 
              name="deleteInputTerm" 
              defaultValue=""
              className={cn(styles.formInput)}
              onChange={checkDeleteTerm}
            />
            {formState?.errors && typeof formState.errors === "object" && !Array.isArray(formState.errors) && "email" in formState.errors && (
              <span className="text-error text-sm italic mt-1">
                {(formState.errors as { email?: string[] }).email}
              </span>
            )}
          </div>
          <div className="flex flex-col md:flex-row md:justify-end space-x-0 md:space-x-3 space-y-2 md:space-y-0 mt-3">
            <Button 
              variant="default"
              disabled={isPending}
              className={cn("bg-white text-warning hover:bg-white hover:text-warning border border-warning disabled:bg-error/50  tracking-wider py-5 px-12 ring-0 focus:ring-0 ring-offset-0 focus:ring-offset-0 focus-visible:ring-0 outline-none cursor-pointer data-[state=open]:bg-transparent w-full md:w-fit px-5", isPending && "opacity-7 cursor-not-allowed")}
              onClick={(e) => handleCancelAll(e)}
            >
              Cancel
            </Button>
            <Button 
              variant="default"
              type="submit" 
              disabled={isPending || !isDeleteTermValid}
              className={cn("w-full bg-error/85 text-white hover:bg-error hover:text-white disabled:bg-error/50  tracking-wider py-5 px-12 ring-0 focus:ring-0 ring-offset-0 focus:ring-offset-0 focus-visible:ring-0 outline-none cursor-pointer data-[state=open]:bg-transparent w-full md:w-fit px-5", isPending && "opacity-7 cursor-not-allowed")}
            >
              {isPending ? "Deleting Account..." : "Delete Account"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}