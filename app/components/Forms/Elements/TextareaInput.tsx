import { useEffect, useRef, useState } from "react"
import { styles } from "@/utils/constants"
import { cn } from "@/utils"
import { Textarea } from "@/components/ui/textarea"

type TextareaInputProps = {
  bioMaxLength?: number
  blurFunc?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  defaultValue?: string
  inputClassName?: string
  inputErrors?: {
    [key: string]: any
  }
  inputName: string
  labelName: string
  placeholderText?: string
  orientation?: "horizontal" | "vertical" | "responsive"
}

export default function TextareaInput({
  bioMaxLength = Number(process.env.NEXT_PUBLIC_BIO_MAX_LENGTH),
  blurFunc,
  defaultValue = "",
  inputClassName,
  inputErrors,
  inputName,
  labelName,
  placeholderText = "",
  orientation = "horizontal",
}: TextareaInputProps) {
  const [inputValue, setInputValue] = useState<string>("")

  const inputRef = useRef<HTMLTextAreaElement | null>(null)
  const countRef = useRef<HTMLSpanElement | null>(null)
  
  useEffect(() => {
    inputRef.current?.focus()
    inputRef.current?.blur()
  }, [])

  const updateBioCount = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault()
    const bioInput = e.target
    const bioLength = bioInput.value.length

    countRef.current!.textContent = bioInput.value.slice(0, bioMaxLength).length.toString()

    if (bioLength >= bioMaxLength) {
      bioInput.value = bioInput.value.slice(0, bioMaxLength)
      countRef.current?.parentElement?.classList.add("text-error")
    } else {
      countRef.current?.parentElement?.classList.remove("text-error")
    }
  }

  return (
    <div className={cn("relative flex flex-col items-start gap-1", inputClassName)}>
      <label 
        htmlFor={inputName} 
        className={cn(styles.formLabel, "text-primary font-bold pb-1 pl-1")}
      >
        {labelName}
      </label>
      <Textarea 
        ref={inputRef} 
        name={inputName}
        defaultValue={defaultValue}
        placeholder={placeholderText}
        className="focus-visible:ring-0 w-full h-full resize-y" 
        onChange={updateBioCount} 
        onBlur={blurFunc} 
      />
      <div className="flex justify-between w-full -mt-1.5">
        <div>
          {inputErrors?.errors && typeof inputErrors.errors === "object" && !Array.isArray(inputErrors.errors) && inputName in inputErrors.errors && (<div className="text-error text-sm italic mt-1">{(inputErrors.errors as { [key: string]: string[] })[inputName]}</div>)}
        </div>
        <div className="justify-self-end text-muted-foreground text-sm mt-1.5 shrink">
          <span ref={countRef} className="inline-block">0</span>
          <span className="inline-block ml-0.5">/{bioMaxLength}</span>
        </div>
      </div>
    </div>
  )
} 