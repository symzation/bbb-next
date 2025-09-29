import { styles } from "@/constants/constants"
import { cn } from "@/utils"
import { Button } from "@/components/ui/button"
import { socialLogout } from "@/actions/loginActions"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuthContext } from "@/providers/AuthProvider"

export default function LoggedInMenu() {
  const session = useAuthContext()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="focus:outline-none">
          <span className="sr-only">Open user menu</span>
          <Avatar className="mt-1 mr-3 cursor-pointer transition">
            <AvatarImage src={session?.user?.image ?? "/default-avatar.png"} />
            <AvatarFallback>User Avatar</AvatarFallback>
          </Avatar> 
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white text-primary mr-4" align="end">
        <DropdownMenuLabel className="flex justify-start items-center font-bold">
          <Avatar className="mt-1 mr-3 cursor-pointer transition">
            <AvatarImage src={session?.user?.image ?? "/default-avatar.png"} />
            <AvatarFallback>Img</AvatarFallback>
          </Avatar> 
          <div>
            Hello, {session?.user?.name ? session.user.name.split(" ")[0] : "Guest"}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-primary" />
        <DropdownMenuGroup>
          <DropdownMenuItem className="hover:bg-gray-100">
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:bg-gray-100">
            Settings
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="hover:bg-gray-100">
              More Options
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className="w-48 bg-white text-primary" sideOffset={2}>
                <DropdownMenuItem className="hover:bg-gray-100">
                  Option 1
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-100">
                  Option 2
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-primary" />
          <form action={socialLogout}>
            <DropdownMenuItem className="py-0 hover:bg-gray-100">
              <Button
                variant='link'
                type='submit'
                className="justify-start cursor-pointer w-full p-0 hover:no-underline"
              >
                Logout
              </Button>
            </DropdownMenuItem>
          </form>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

{/* <div className='flex flex-col md:flex-row justify-between items-center space-x-2'>
    <h4 className='text-sm text-primary font-bold'>
      {`Hello, ${
        session?.user?.name ? session.user.name.split(" ")[0] : "Guest"
      }`}
    </h4>
    <Image
      src={session?.user?.image ?? "/default-avatar.png"}
      alt="User Avatar"
      width={32}
      height={32}
      className="h-8 w-8 rounded-full"
    />
    <form action={socialLogout}>
      <Button
        variant='link'
        type='submit'
        className={cn(styles.secondaryNavClass, "mt-[5px] font-bold")}
      >
        Logout
      </Button>
    </form>
  </div> */}