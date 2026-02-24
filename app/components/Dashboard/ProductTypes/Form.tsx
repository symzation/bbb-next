"use client"

import { useActionState, useEffect, useState } from "react"
import { styles } from "@/utils/constants"
import { cn } from "@/utils"
import { Button } from "@/components/ui/button"
import { useAuthSession } from "@/providers/AuthSessionProvider"
import { ProductTypeDataProps } from "@/types/types"
import { ProductTypesFormAction } from "@/components/Dashboard/ProductTypes/FormAction"

export default function ProductTypesForm({
  //onOpenChange
}) {
  const [name, setName] = useState<string>("")
  const [formState, formAction, isPending] = useActionState(ProductTypesFormAction, undefined)

  const { session } = useAuthSession()

  useEffect(() => {
    if (formState && formState?.success) {
      /* onOpenChange(false)
      redirect('/') */
    }
  }, [formState])

  return (
    <div className="my-5">
      <form 
        action={formAction} 
        className="flex flex-col space-y-3 w-full"
      >
        <input type="hidden" name="userId" value={session?.user?.id} />
        <div className="flex flex-col">
          <label htmlFor="name" className="text-sm font-bold tracking-wide py-1">
            Name
          </label>
          <input type="text" name="name" defaultValue={name}
            placeholder="Name" className={cn(styles.formInput)}
            onBlur={(e) => setName(e.target.value)}
          />
          {formState?.errors && typeof formState.errors === "object" && !Array.isArray(formState.errors) && "name" in formState.errors && (
            <span className="text-error text-sm italic mt-1">
              {Array.isArray((formState.errors as any).name)
                ? (formState.errors as any).name.join(", ")
                : String((formState.errors as any).name)
              }
            </span>
          )}
        </div>
        <div className="w-full text-right">
          <Button 
            type="submit" 
            disabled={isPending}
            className={cn("w-2/6 text-third tracking-wider py-5 px-12 ring-0 focus:ring-0 ring-offset-0 focus:ring-offset-0 focus-visible:ring-0 outline-none cursor-pointer data-[state=open]:bg-transparent", isPending && "opacity-70 cursor-not-allowed")}
            >
            {isPending ? "Adding..." : "Add Product Type"}
          </Button>
        </div>        
      </form>
    </div>
  )
}