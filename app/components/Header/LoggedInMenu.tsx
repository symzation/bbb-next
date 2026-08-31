import { useState } from "react"
import Link from "next/link"
import { styles } from "@/utils/constants"
import { cn } from "@/utils"
import { Button } from "@/components/ui/button"
import { logout } from "@/actions/loginActions"
import {
  Sheet, SheetContent, SheetClose, SheetHeader, SheetTitle, SheetTrigger
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { GetAuthSession } from "@/providers/AuthSessionProvider"
import { AiOutlineQuestionCircle, AiOutlineSetting } from "react-icons/ai"
import { MdOutlineClose } from "react-icons/md"
import { GoSignOut } from "react-icons/go"
import { useRouter } from "next/navigation"
import ProfileImage from "@/components/ProfileImage/profileImage"
import SessionLinks from "@/components/Header/SessionLinks"

export default function LoggedInMenu() {
  const router = useRouter()
  const { session } = GetAuthSession()

  const [isOpen, setIsOpen] = useState(false)
  
  const seporatorClass = "bg-primary h-1 my-0"

  const assignLink = (event: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    event.preventDefault()
    setIsOpen(false)
    router.push(url)
  }

  const userLogout = async () => {
    setIsOpen(false)
    await logout(false, '/')
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <div 
          className="flex justify-center items-center rounded-full mt-3 mx-4 ring-none ring-offset-0 hover:ring-0 cursor-pointer transition-all duration-150 ease-in-out" 
          aria-label="User menu"
        >
          <span className="sr-only">Open user menu</span>
          <ProfileImage />
        </div>
      </SheetTrigger>
      <SheetContent 
        side="right" 
        className="bg-white text-primary w-64 gap-4 [&>button:first-of-type]:hidden"
      >
        <SheetHeader className="h-1 p-0 m-0">
          <SheetTitle></SheetTitle>
          <SheetClose asChild>
            <MdOutlineClose 
              className="w-6 h-6 text-primary font-bold cursor-pointer absolute top-2 right-2"
            />
          </SheetClose>
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
              session?.user?.name ? session?.user.name.split(" ")[0] : "Guest"
            }
          </div>
        </div>
        <SessionLinks assignLink={assignLink} seporatorClass={seporatorClass} />
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
        <form action={userLogout}>
          <Button
            variant='ghost'
            type='submit'
            className={cn(styles.profileMenuLink, "text-start cursor-pointer w-full hover:no-underline")}
            //onClick={userLogout}
          >
            <GoSignOut className={styles.profileMenuLinkIcon} /> Sign out
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  )
}
