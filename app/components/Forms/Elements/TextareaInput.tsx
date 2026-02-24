import { useEffect, useRef, useState } from "react"
import { cn } from "@/utils"
import { Textarea } from "@/components/ui/textarea"

type TextareaInputProps = {
  bioMaxLength?: number
  callbackFunc?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  defaultValue?: string
  inputClassName?: string
  inputErrors?: {
    [key: string]: any
  }
  inputName: string
  labelName: string
  placeholderText?: string
}

export default function TextareaInput({
  bioMaxLength = Number(process.env.NEXT_PUBLIC_BIO_MAX_LENGTH),
  callbackFunc,
  defaultValue = "",
  inputClassName,
  inputErrors,
  inputName,
  labelName,
  placeholderText = "",
}: TextareaInputProps) {
  const [inputValue, setInputValue] = useState<string>(defaultValue)

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
    <div className={cn("relative flex flex-col items-start", inputClassName)}>
      <label htmlFor={inputName} className="absolute -top-6.5 left-1 text-sm font-bold tracking-wide">
        {labelName}
      </label>
      <Textarea 
        ref={inputRef}
        name={inputName}
        defaultValue={inputValue ?? ""}
        placeholder={placeholderText}
        className="focus-visible:ring-0 w-full h-full resize-y" 
        onChange={updateBioCount} 
        onBlur={(e) => {
          e.preventDefault();
          setInputValue(e.target.value);
          updateBioCount(e);
          if (typeof callbackFunc === "function") {
            callbackFunc(e);
          }
        }}
      />
      <div 
        className="flex flex-row justify-end items-center text-muted-foreground text-sm w-full mt-1.5"
      >
        <span ref={countRef} className="inline-block">0</span>
        <span className="inline-block ml-0.5">/{bioMaxLength}</span>
      </div>
        {inputErrors?.errors && typeof inputErrors.errors === "object" && !Array.isArray(inputErrors.errors) && inputName in inputErrors.errors && (<div className="text-error text-sm italic mt-1">{(inputErrors.errors as { [key: string]: string[] })[inputName]}</div>)}
    </div>
  )
} 