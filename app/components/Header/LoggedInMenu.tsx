import Image from "next/image"
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuthContext } from "@/providers/AuthProvider"
import { AiOutlineQuestionCircle, AiOutlineSetting, AiOutlineEdit } from "react-icons/ai"
import { GoSignOut } from "react-icons/go"

export default function LoggedInMenu() {
  const sessionData = useAuthContext()
  console.log('sessionData:', sessionData)

  const seporatorClass = "bg-primary h-1 my-0"
  const linkClass = "text-[16px] block hover:bg-gray-100 py-1 px-3 cursor-pointer"
  const linkIconClass = "inline-block mr-1 text-lg"

  return (
    <Sheet>
      <SheetTrigger>
        <div 
          className="flex justify-center items-center rounded-full hover:bg-gray-200 p-1 cursor-pointer mt-0.5 mr-2"
          aria-label="User menu"
        >
          <span className="sr-only">Open user menu</span>
          <Image
            src={sessionData?.user?.image ?? "/default-avatar.png"}
            width={64}
            height={64}
            className={cn(styles.avatarClass)}
            alt="User Avatar"
          />
        </div>
      </SheetTrigger>
      <SheetContent side="right" className="bg-white text-primary w-64 gap-4">
        <SheetHeader className="">
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="flex justify-start items-center font-bold px-2">
          <div 
            className="flex justify-center items-center rounded-full p-1 cursor-pointer mr-0.5"
            aria-label="Menu User Avatar"
          >
            <span className="sr-only">Open user menu</span>
            <Image
              src={sessionData?.user?.image ?? "/default-avatar.png"}
              width={64}
              height={64}
              className={cn(styles.avatarClass)}
              alt="User Avatar"
            />
          </div>
          <div className="text-[16px]">
            Hello, {
              sessionData?.user?.name ? sessionData?.user.name.split(" ")[0] : "Guest"
            }
          </div>
        </div>
        <Separator className={seporatorClass} />
        <div className="flex flex-col">
          <Link href="/become-a-reviewer" className={linkClass}>
            <AiOutlineEdit className={linkIconClass} /> Become a Reviewer
          </Link>
        </div>
        <Separator className={seporatorClass} />
        <div className="flex flex-col">
          <Link href="/settings" className={linkClass}>
            <AiOutlineQuestionCircle className={linkIconClass} /> Settings
          </Link>
          <Link href="/help" className={linkClass}>
            <AiOutlineSetting className={linkIconClass} /> Help
          </Link>
        </div>
        <Separator className={seporatorClass} />
        <form action={socialLogout}>
          <Button
            variant='ghost'
            type='submit'
            className={cn(linkClass, "text-start cursor-pointer w-full hover:no-underline")}
            onClick={() => socialLogout()}
          >
            <GoSignOut className={linkIconClass} /> Sign out
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  )
}
