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
import { Button } from "@/components/ui/button"

type deleteAccountConfirmationProps = {
  isDeleteConfirmation: boolean
  handleCancelAll: (e: React.MouseEvent<HTMLButtonElement>) => void
  handleDeleteFormOpen: (e: React.MouseEvent<HTMLButtonElement>) => void
  setIsDeleteConfirmation: (open: boolean) => void
}

export default function DeleteAccountConfirmation({
  isDeleteConfirmation,
  handleCancelAll,
  handleDeleteFormOpen,
  setIsDeleteConfirmation
}: deleteAccountConfirmationProps) {
  return (
    <AlertDialog open={isDeleteConfirmation} onOpenChange={setIsDeleteConfirmation}>
      <AlertDialogTrigger asChild >
        <Button variant="destructive">Delete Account</Button>
      </AlertDialogTrigger>
      <AlertDialogOverlay className="bg-primary/90" />
      <AlertDialogContent className="w-min-[450px] bg-white py-6">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-warning text-2xl text-left">
            Are you sure you want to delete your account?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action is irreversible and all your data will be permanently removed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-white text-warning border border-warning cursor-pointer" onClick={(e) => handleCancelAll(e)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction 
            className="bg-warning/80 hover:bg-warning text-white cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              handleDeleteFormOpen(e)
            }}
          >
            Delete My Account
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}