
import {
  Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger,
} from "@/components/ui/sheet"
import { GiHamburgerMenu } from "react-icons/gi"
import { MdOutlineClose } from "react-icons/md"
import Navigation from "@/components/Header/Navigation"

type MobileNavigationProps = {
  posValue: number
}

export default function MobileNavigation({ posValue }: MobileNavigationProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div
          className="p-3 block md:hidden cursor-pointer ring-none ring-offset-0 hover:ring-0 cursor-pointer transition-all duration-150 ease-in-out" 
          aria-label="Mobile navigation menu"
        >
          <GiHamburgerMenu 
            className="w-6 h-6 text-primary font-bold cursor-pointer"
          />
          <span className="sr-only">Open navigation menu</span>
        </div>
      </SheetTrigger>
      <SheetContent 
        side="left" 
        className="bg-secondary w-64 gap-4 [&>button:first-of-type]:hidden"
      >
        <SheetTitle></SheetTitle>
        <SheetClose asChild>
          <MdOutlineClose 
            className="w-6 h-6 text-primary font-bold cursor-pointer absolute top-2 right-2"
          />
        </SheetClose>
        <Navigation 
          posValue={posValue} 
          navigationClass="w-full flex flex-col gap-4 mt-8" 
        />
      </SheetContent>
    </Sheet>
  )
}