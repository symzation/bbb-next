"use client"

import { useState } from "react"
import { styles } from "@/utils/constants"
import { cn } from "@/utils"
import { Button } from "@/components/ui/button"
import { getRandomInt } from "@/utils/helpers"
import DeleteAccountConfirmation from "@/components/Settings/DeleteAccountConfirmation"
import DeleteAccountForm from "@/components/Settings/DeleteAccountForm"

export default function DeleteAccount() {
  const [isDeleteConfirmation, setIsDeleteConfirmation] = useState(false)
  const [isDeleteForm, setIsDeleteForm] = useState(false)

  const deleteWords = (process.env.NEXT_PUBLIC_DELETE_WORDS ?? "delete").split(",")
  const randomInt = getRandomInt(1, deleteWords.length - 1)
  const deleteTerm = deleteWords[randomInt]

  const handleDeleteConfirmationOpen = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    console.log('handleDeleteConfirmationOpen called')
    setIsDeleteConfirmation(true)
  }

  const handleDeleteFormOpen = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    console.log('handleDeleteFormOpen called')
    setIsDeleteConfirmation(false)
    setIsDeleteForm(true)
  }

  const handleCancelAll = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    console.log('handleCancelAll called')
    setIsDeleteConfirmation(false)
    setIsDeleteForm(false)
  }

  return (
    <div className="flex flex-col">
      <Button
        variant="ghost"
        className={cn(styles.secondaryNavClass, 'p-0 hover:no-underline')}
        onClick={handleDeleteConfirmationOpen}
      >
        <div 
          className="flex flex-col justify-between items-start space-y-0 px-1 py-2 pl-3 border-b border-gray-200 hover:bg-gray-100 cursor-pointer transition-all duration-150 ease-in-out"
        >
          <div className="text-warning text-sm text-left">
            Delete Account
          </div>
          <div className="text-xs text-muted-foreground">
            Permanently delete your account and all of your content.
          </div>
        </div>
      </Button>

     <DeleteAccountConfirmation 
        handleCancelAll={handleCancelAll}
        handleDeleteFormOpen={handleDeleteFormOpen}
        isDeleteConfirmation={isDeleteConfirmation}
        setIsDeleteConfirmation={setIsDeleteConfirmation}
      />

      <DeleteAccountForm 
        deleteTerm={deleteTerm}
        isDeleteForm={isDeleteForm}
      />
    </div>
  )
}
