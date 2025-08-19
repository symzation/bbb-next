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

export default function Register() {
    const secondaryNavClass = 'text-md text-third hover:text-third font-normal no-underline hover:no-underline tracking-wide block transistion-all duration-300 ease-in-out cursor-pointer'
    
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="link" className={secondaryNavClass}>Register</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-white text-primary">
          <DialogHeader>
            <DialogTitle>Register</DialogTitle>
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
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}