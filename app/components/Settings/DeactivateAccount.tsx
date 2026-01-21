"use client"

import { useAuthSession } from "@/providers/AuthSessionProvider"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { logout } from "@/actions/loginActions"
import { deactivateUser } from "@/lib/db/actions/index"
import { useRouter } from "next/navigation"

export default function deactivateAccount() {
  const session = useAuthSession()
  const router = useRouter()

  const deactivateAccount = async () => {
    const deactivatedUser = await deactivateUser(String(session?.user?.id))

    if (deactivatedUser) {
      await logout(false)
      //window.location.assign('/')
      router.push('/')
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full">
        <div 
          className="flex flex-col justify-between items-start space-y-0 px-1 py-2 pl-3 hover:bg-gray-100 cursor-pointer transition-all duration-150 ease-in-out"
        >
          <p className="text-2xl text-warning text-sm text-left">
            Deactivate Account
          </p>
          <p className="text-xs text-muted-foreground">
            Deactivating will suspend your account until you sign back in.
          </p>
        </div>
      </AlertDialogTrigger>
      <AlertDialogOverlay className="bg-primary/90"/>
      <AlertDialogContent className="w-min-[450px] bg-white text-primary py-6">
        <AlertDialogHeader>
          <AlertDialogTitle className="w-[450px] bg-white">
            Deactivate Account
          </AlertDialogTitle>
          <AlertDialogDescription className="mb-2">
            Deactivating your account will remove it from {process.env.NEXT_PUBLIC_SITENAME} within a few minutes and automatically cancel any active subscriptions. You can return anytime—simply sign back in to reactivate your account and restore all your content and experiences.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-white text-warning border border-warning cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction className="bg-warning/80 hover:bg-warning text-white cursor-pointer" onClick={deactivateAccount}>
            Deactivate Account
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>    
  )
}