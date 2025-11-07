"use client"

import { useState } from "react"
import Link from "next/link"
import { styles } from "@/constants/constants"
import { cn } from "@/utils"
import { Button } from "@/components/ui/button"
import { socialLogout } from "@/actions/loginActions"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { useAuthContext } from "@/providers/AuthProvider"
import { AiOutlineQuestionCircle, AiOutlineSetting } from "react-icons/ai"
import { MdOutlineRateReview } from "react-icons/md"
import { GrResources } from "react-icons/gr"
import { LuNotebookText } from "react-icons/lu"
import { GoSignOut } from "react-icons/go"
import { useRouter } from "next/navigation"
import ProfileImage from "@/components/ProfileImage/profileImage"

export default function LoggedInMenu() {
  const [isOpen, setIsOpen] = useState(false)
  
  const router = useRouter()
  const sessionData = useAuthContext()
  
  const seporatorClass = "bg-primary h-1 my-0"

  const assignLink = (event: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    event.preventDefault()
    setIsOpen(false)
    router.push(url)
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <div 
          className="flex justify-center items-center rounded-full mt-1 mx-4 ring-none ring-offset-0 hover:ring-0 cursor-pointer transition-all duration-150 ease-in-out" 
          aria-label="User menu"
        >
          <span className="sr-only">Open user menu</span>
          <ProfileImage  />
        </div>
      </SheetTrigger>
      <SheetContent side="right" className="bg-white text-primary w-64 gap-4">
        <SheetHeader className="h-1 p-0 m-0">
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="flex justify-start items-center font-bold px-2">
          <div 
            className="flex justify-center items-center rounded-full p-1 mr-0.5"
            aria-label="Menu User Avatar"
          >
            <span className="sr-only">Open user menu</span>
            <ProfileImage />
          </div>
          <div className="text-[16px]">
            Hello, {
              sessionData?.user?.name ? sessionData?.user.name.split(" ")[0] : "Guest"
            }
          </div>
        </div>
        <Separator className={seporatorClass} />
        <div className="flex flex-col">
          {sessionData?.isAuthenticated && sessionData?.user?.role === 'AUTHOR' ? (
            <>
              <Link href="#" className={styles.profileMenuLink} onClick={(e) => assignLink(e, '/guide')}>
                <LuNotebookText className={styles.profileMenuLinkIcon} /> Guide
              </Link>
              <Link href="#" className={styles.profileMenuLink} onClick={(e) => assignLink(e, '/resources')}>
                <GrResources className={styles.profileMenuLinkIcon} /> Resources
              </Link>
            </>
          ) : (
            <Link href="#" className={styles.profileMenuLink} onClick={(e) => assignLink(e, '/write')}>
              <MdOutlineRateReview className={styles.profileMenuLinkIcon} /> Become a Reviewer
            </Link>
          )}
        </div>
        <Separator className={seporatorClass} />
        <div className="flex flex-col">
          <Link href="#" className={styles.profileMenuLink} onClick={(e) => assignLink(e, '/settings')}>
            <AiOutlineQuestionCircle className={styles.profileMenuLinkIcon} /> Settings
          </Link>
          <Link href="#" className={styles.profileMenuLink} onClick={(e) => assignLink(e, '/help')}>
            <AiOutlineSetting className={styles.profileMenuLinkIcon} /> Help
          </Link>
        </div>
        <Separator className={seporatorClass} />
        <form action={socialLogout}>
          <Button
            variant='ghost'
            type='submit'
            className={cn(styles.profileMenuLink, "text-start cursor-pointer w-full hover:no-underline")}
            onClick={() => socialLogout()}
          >
            <GoSignOut className={styles.profileMenuLinkIcon} /> Sign out
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  )
}
