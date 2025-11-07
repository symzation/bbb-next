"use client"

import { useState } from "react"
import Image from "next/image"
import { styles } from "@/constants/constants"
import { cn } from "@/utils"
import { useAuthContext } from "@/providers/AuthProvider"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import ProfileForm from "@/components/Settings/ProfileForm"
import ProfileImage from "@/components/ProfileImage/profileImage"

export default function Profile() {
  const session = useAuthContext()
  //console.log('session:', session)
  
  const [isProfileInfoOpen, setIsProfileInfoOpen] = useState(false)

  return (
    <Dialog open={isProfileInfoOpen} onOpenChange={setIsProfileInfoOpen}>
      <DialogTrigger className="w-full">
        <div 
          className="flex justify-between items-center space-y-1 p-2 pl-3 hover:bg-gray-100 rounded-md cursor-pointer transition-all duration-150 ease-in-out"
        >
          <div className="text-sm text-left">
            <div>Profile Information</div>
            <div className="text-xs">Edit your photo, name, username, short bio, etc.</div>
          </div>
          <div className="items-self-end flex flex-col items-end space-y-1">
            <div className="flex flex-row items-center text-sm text-right space-x-5">
              <div>{session?.user?.name}</div>
              <ProfileImage />
            </div>
            {/* <div className="text-sm">{session?.user?.username}</div> */}
            <div className="text-sm">{session?.user?.email}</div>
          </div>
        </div>
      </DialogTrigger>
      <DialogOverlay className="bg-third/70"/>
      <DialogContent 
        className="w-[450px] bg-white text-primary overflow-x-auto" 
        closeButtonClass=" focus:ring-0 focus:ring-offset-0 cursor-pointer"
      >
        <DialogHeader className="">
          <DialogTitle className="text-xl text-left font-bold mt-2 tracking-wide gap-0 mt-3">
            Profile Information
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <ProfileForm onProfileInfoClose={setIsProfileInfoOpen} />
      </DialogContent>
    </Dialog>
  )
}