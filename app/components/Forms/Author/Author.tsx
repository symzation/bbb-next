import { 
  Dialog, 
  DialogOverlay, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
} from "@/components/ui/dialog"
import AuthorForm from "@/components/Forms/Author/AuthorForm"
import { useAuthContext } from "@/providers/AuthProvider"

type AuthorFormProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export default function Author({ 
  isOpen, 
  onOpenChange 
}: AuthorFormProps) {
  const session = useAuthContext()
  //console.log('Author - Session', session)

  const formChange = (open: boolean) => {
    onOpenChange(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogOverlay className="bg-primary/90"/>
      <DialogContent 
        className="w-[450px] bg-white text-primary"
        closeButtonClass=" focus:ring-0 focus:ring-offset-0 cursor-pointer"
      >
        <DialogHeader>
          <DialogTitle className="text-2xl text-left font-bold mt-2">
            Become A Reviewer For Us!
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <AuthorForm formChange={formChange} />  
      </DialogContent>
    </Dialog >
  )
}