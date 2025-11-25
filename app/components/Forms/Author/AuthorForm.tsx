import { useActionState, useEffect, useRef, useState } from "react"
import { styles } from "@/constants/constants"
import { cn } from "@/lib/utils"
import { observeElementScroll } from "@/utils/helpers"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import TextareaInput from "@/components/Forms/Elements/TextareaInput"
import { authorFormAction } from "@/components/Forms/Author/AuthorFormAction"


type AuthorFormProps = {
  formChange: (open: boolean) => void
}

type ObserveValuesProps = {
  scrollY: number
  height: number
}

export default function AuthorForm({ 
  formChange 
}: AuthorFormProps) {
  const [isAtTermsEnd, setIsAtTermsEnd] = useState<boolean>(false)
  const [termsCheckedValue, setTermsCheckedValue] = useState<boolean>(false)
  const [whyReviewerValue, setWhyReviewerValue] = useState<string>("")
  const [formState, formAction, isPending] = useActionState(authorFormAction, undefined)
  const [scrollValues, setScrollValues] = useState<ObserveValuesProps>({ scrollY: 0, height: 0 })

  const authorTermsRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (formState && formState?.success) {
      formChange(false)
    }
  }, [formChange, formState])

  useEffect(() => {
    const updateScrollValues = (values: { scrollY: number; height: number }) => {
      setScrollValues(values)
    }
    observeElementScroll("termsContainer", updateScrollValues)
  }, [])

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.currentTarget
    const scrollY = target.scrollTop
    const height = target.scrollHeight - target.clientHeight

    setScrollValues({ scrollY, height })
    if (scrollY + 10 >= height) {
      setIsAtTermsEnd(true)
    } else {
      setIsAtTermsEnd(false)
    }
  }

  const handleReviewerTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('e.target.checked:', e.target.checked)
    setTermsCheckedValue(e.target.checked)
  }
  
  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="flex flex-col items-center">
        <div 
          ref={authorTermsRef}
          id="termsContainer"
          className="max-h-60 px-4 py-0 text-sm border rounded-md overflow-y-auto"
          onScroll={handleScroll}
        >
          <p className={styles.paragraph}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ipsum ligula, placerat eu nibh eget, sollicitudin malesuada magna. Aliquam fringilla efficitur viverra. Maecenas condimentum, urna non egestas pharetra, dolor libero mollis velit, quis tempor dui neque ac diam. Fusce lacinia aliquet dolor quis accumsan. Donec sapien risus, interdum faucibus suscipit et, iaculis in risus. Sed fringilla dictum feugiat. Phasellus vel placerat nunc, ut aliquet nisi. Praesent sollicitudin eleifend tempus. Phasellus vestibulum velit vitae ipsum pharetra, finibus blandit purus placerat. Mauris venenatis egestas elit, vel tempus ligula facilisis at. Etiam fringilla, eros nec faucibus tristique, mi neque varius lorem, quis cursus nulla nisi a ipsum. In in neque efficitur, eleifend magna ac, tincidunt urna. Sed vehicula, augue id tincidunt sodales, neque magna scelerisque nunc, ut dapibus velit risus et mauris. Duis lobortis tempus tincidunt. In lobortis consequat risus, id euismod sem auctor sed. In ultrices quam ut interdum ullamcorper.
          </p>
          <p className={styles.paragraph}>
            Donec sit amet porta eros, eget commodo tortor. Donec quis dui et diam tempus dignissim. Nulla vestibulum vel turpis non pellentesque. Nullam velit leo, interdum a arcu eu, imperdiet rutrum velit. Nulla vestibulum ligula vel cursus condimentum. Donec malesuada nulla et ligula scelerisque, vitae pulvinar massa volutpat. Cras faucibus tellus quis ultrices vulputate. Morbi scelerisque libero quis diam efficitur, sit amet condimentum ante vestibulum. Vivamus sodales commodo laoreet. Nulla sollicitudin orci ligula, id gravida mi aliquam id. Quisque tristique dui eget ipsum lobortis, a fringilla justo gravida. Curabitur viverra placerat tincidunt. Sed urna ligula, interdum a dui auctor, porta ullamcorper diam.
          </p>
          <p className={styles.paragraph}>
            Aenean rhoncus ante vel suscipit maximus. Vestibulum ornare, ex non pellentesque luctus, ante neque rutrum turpis, sit amet tincidunt urna lorem in odio. Integer semper tristique imperdiet. Etiam et faucibus lectus. Proin sit amet laoreet ante, id eleifend lacus. Integer dictum augue arcu, id ullamcorper velit tincidunt nec. Vestibulum faucibus mi vitae urna scelerisque faucibus. Nam sit amet nibh cursus, condimentum lacus vitae, dignissim ipsum.
          </p>
          <p className={styles.paragraph}>
            Nunc sed ante et sem tempus luctus in nec justo. Nullam maximus faucibus risus ac tempus. Fusce venenatis ante non nulla sodales sagittis. Sed lobortis efficitur massa, vel aliquam libero porta sed. Vestibulum sed finibus neque, quis bibendum odio. Donec dictum congue venenatis. Nulla egestas magna lorem, in consequat purus maximus quis. Nullam tempor tortor non velit fringilla, nec dapibus quam cursus. Aliquam et leo pellentesque, consectetur elit quis, malesuada turpis. Morbi vestibulum auctor molestie. Donec ultrices diam ligula, ut porttitor justo dapibus et.
          </p>
          <p className={styles.paragraph}>
            Praesent vitae tellus et sem faucibus gravida. Etiam non neque nunc. Duis facilisis nibh diam, consectetur tincidunt eros egestas sed. Nullam dapibus lacus nunc, a dapibus elit dapibus in. Vestibulum eu neque vel nulla pulvinar facilisis. Nam vitae velit lacinia sapien dapibus iaculis. Integer ultrices, odio vitae malesuada blandit, massa justo lacinia lorem, sit amet venenatis enim eros at tellus. Nam tempus nunc nec neque tristique semper quis eget nunc. Pellentesque non fringilla mi, et commodo felis. Proin pellentesque lobortis sem non maximus. Curabitur justo ipsum, interdum vitae ex ut, posuere ultricies lacus. Maecenas mauris mi, bibendum in cursus quis, maximus quis tortor. Aliquam venenatis sapien magna, nec sagittis ipsum tempor at.
          </p>
        </div>
        <div>
          <input type="hidden" name="isAtTermsEnd" value={isAtTermsEnd.toString()} />
          {formState?.errors && typeof formState.errors === "object" && !Array.isArray(formState.errors) && "isAtTermsEnd" in formState.errors && (
            <div className="text-error text-sm italic w-full mt-1">
              {(formState.errors as { isAtTermsEnd?: string[] }).isAtTermsEnd}
            </div>
          )}
        </div>
      </div>
      <TextareaInput 
        inputClassName="mt-8 mb-1.5"  
        inputErrors={formState}  
        inputName="whyReviewer"
        defaultValue={whyReviewerValue}
        labelName="Tell us why you want to be a reviewer?"
        placeholderText=""
        callbackFunc={(e) => setWhyReviewerValue(e.target.value)}
      />
      <div className="flex flex-col gap-1 w-full">
        <div className="flex items-center gap-3">
          <input 
            type="checkbox" 
            id="reviewerTerms"
            name="reviewerTerms" 
            className="data-[state=checked]:bg-primary data-[state=checked]:text-white"
            defaultChecked={termsCheckedValue}
            onChange={handleReviewerTermsChange}
          />
          <Label htmlFor="reviewerTerms">I agree to the Reviewer Terms and Conditions</Label>
        </div>
        {formState?.errors && typeof formState.errors === "object" && !Array.isArray(formState.errors) && "reviewerTerms" in formState.errors && (
          <div className="text-error text-sm italic w-full mt-1">
            {(formState.errors as { reviewerTerms?: string[] }).reviewerTerms}
          </div>
        )}
      </div>
      <div className="flex-col sm:flex-col sm:justify-center">
        <Button 
          type="submit" 
          disabled={isPending}
          className={cn("w-full text-third tracking-wider py-5 px-12 ring-0 focus:ring-0 ring-offset-0 focus:ring-offset-0 focus-visible:ring-0 outline-none cursor-pointer data-[state=open]:bg-transparent", isPending && "opacity-70 cursor-not-allowed")}
        >
          {isPending ? "Submitting.." : "Become A Reviewer"}
        </Button>
      </div>
    </form>
  )
}