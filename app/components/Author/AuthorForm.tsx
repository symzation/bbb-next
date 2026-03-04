"use client"

import { useActionState, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { styles } from "@/utils/constants"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import TextareaInput from "@/components/Forms/Elements/TextareaInput"
import { AuthorFormAction } from "@/components/Author/AuthorFormAction"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { HiOutlineQuestionMarkCircle } from "react-icons/hi2";
import { GetAuthSession } from "@/providers/AuthSessionProvider"
import { ENUM_ROLE } from "@/types/enums"


export default function AuthorForm() {
  const [termsCheckedValue, setTermsCheckedValue] = useState<boolean>(false)
  const [whyReviewerValue, setWhyReviewerValue] = useState<string>("")
  const [formState, formAction, isPending] = useActionState(AuthorFormAction, undefined)
  //const [showSuccess, setShowAuthorForm] = useState<boolean>(true)
  
  const showAuthorFormBtn = useRef<HTMLButtonElement>(null)
  
  const session = GetAuthSession()
  console.log('Session in AuthorForm: ', session)
  // If 'role' is not part of User, you may need to use a different property or extend the type.
  // Example: If you have a custom user object with 'role', use a type assertion:
  const userRole = (session?.session?.user as { role?: string })?.role
  let showForm = userRole === ENUM_ROLE.USER ? true : false

  useEffect(() => {
    if (formState && formState?.success) {
    }
  }, [formState])

  return (
    <>
      {showForm ? (
        <form 
          action={formAction} 
          className="flex flex-col justify-start items-center gap-4 w-full"
        >
          <TextareaInput 
            inputClassName="w-full h-40"  
            inputErrors={formState}  
            inputName="whyReviewer"
            defaultValue={whyReviewerValue}
            labelName="Tell us why you like to be a reviewer?"
            placeholderText=""
            blurFunc={(e) => setWhyReviewerValue(e.target.value)}
          />
          <div className="flex flex-col justify-start items-start w-full gap-1">
            <label 
              htmlFor="penName" 
              className={cn(
                styles.formLabel, 
                "flex flex-row justify-start items-center text-primary font-bold pb-1 pl-1"
              )}
            >
              <span>Pen Name</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HiOutlineQuestionMarkCircle />
                </TooltipTrigger>
                <TooltipContent side="right" className="w-2/6 md:w-4/6">
                  <div className="flex items-center gap-2 text-white">
                    A fictitious name adopted by an author to publish works instead of using their legal name. 
                  </div>
                </TooltipContent>
              </Tooltip>
            </label>
            <input 
              type="text" 
              name="penName" 
              defaultValue=""
              placeholder="Pen Name" 
              className={styles.formInput}
            />
            {formState?.errors && typeof formState.errors === "object" && !Array.isArray(formState.errors) && "penName" in formState.errors && (<div className="text-error text-sm italic mt-1">{formState.errors.penName}</div>)}
          </div>
          <div className="flex flex-col gap-1 w-full py-4">
            <div className="flex items-start md:items-center gap-2">
              <Checkbox 
                id="reviewerTerms"
                name="reviewerTerms" 
                className="data-[state=checked]:bg-primary data-[state=checked]:text-white data-[state=checked]:font-bold w-5 h-5 relative top-1 sm:top-0 shrink-0"
                defaultChecked={termsCheckedValue}
                onChange={() => setTermsCheckedValue(!termsCheckedValue)} 
              />
              <label 
                htmlFor="reviewerTerms" 
                className={cn(styles.formLabel, "text-sm text-primary")}
              >
                By checking this box, you have read and accepted {process.env.NEXT_PUBLIC_SITENAME}&apos; <Link 
                  href="/autthor-terms"
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sm underline hover:no-underline"
                >
                  Author Terms
                </Link>.
              </label>
            </div>
            {formState?.errors && typeof formState.errors === "object" && !Array.isArray(formState.errors) && "reviewerTerms" in formState.errors && (<div className="text-error text-sm italic mt-1">{formState.errors.reviewerTerms}</div>)}
          </div>
          <div className="justify-self-start w-full">
            <Button 
              type="submit" 
              disabled={isPending}
              className={cn("w-full md:w-40 py-5 px-12 text-white tracking-wider ring-0 focus:ring-0 ring-offset-0 focus:ring-offset-0 focus-visible:ring-0 outline-none cursor-pointer data-[state=open]:bg-transparent", isPending && "opacity-70 cursor-not-allowed")}
            >
              {isPending ? "Submitting.." : "Register"}
            </Button>
          </div>
        </form>
      ) : (
        <div className="text-center text-primary">
          {userRole === ENUM_ROLE.AUTHOR_WAITING_APPROVAL ? 
            "Your author account is under review." : "Please log in to register as a reviewer."
          }
        </div>
      )}
    </>
  )
}