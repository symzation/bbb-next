import { cn } from "@/utils"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RiCloseFill } from "react-icons/ri"

export default function Login() {
    const secondaryNavClass = 'text-md text-third hover:text-third font-normal no-underline hover:no-underline tracking-wide block transistion-all duration-300 ease-in-out cursor-pointer'
    
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="link" className={secondaryNavClass}>Login</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-white text-primary">
          <DialogHeader>
            <DialogTitle>Login</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Username</Label>
              <Input id="username-1" name="username" defaultValue="@peduarte" />
            </div>
          </div>
          <DialogFooter className="sm:justify-start">
           {/*  <DialogClose asChild>
              <Button type="button" variant="ghost" className="ring-0 focus:ring-0 ring-offset-0 focus:ring-offset-0 focus-visible:ring-0 outline-none cursor-pointer data-[state=open]:bg-transparent">
                Close
              </Button>
            </DialogClose> */}
            {/* <RiCloseFill className="text-fifth" /> */}
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}