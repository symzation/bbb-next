import { ChangeEvent, FocusEvent, ReactNode, RefObject, useEffect, useRef, useState } from "react"
import { cn } from "@/utils"
import { styles } from "@/utils/constants"
import { ENUM_CHECK_STATE } from "@/types/enums"
import SearchInputState from "@/components/Search/SearchInputState"

type SearchInputProps = {
  apiUrl: string
  containerClass?: string
  defaultValue?: string
  handleBlur?: (e: FocusEvent<HTMLInputElement>) => void
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void
  inputClass?: string
  inputName?: string
  inputRef?: RefObject<HTMLInputElement>
  label: string | ReactNode
  labelClass?: string
  placeholder?: string
  validate?: (value: string) => { ok: boolean, state: ENUM_CHECK_STATE }
}

export default function SearchInput({
  apiUrl,
  containerClass,
  defaultValue,
  handleBlur,
  handleChange,
  inputClass,
  inputName,
  inputRef,
  label,
  labelClass,
  placeholder,
  validate
}: SearchInputProps) {
  const [inputValue, setInputValue] = useState<string>("")
  const [state, setState] = useState<ENUM_CHECK_STATE>()
  const [hasChanged, setHasChanged] = useState<boolean>(false)

  const abortRef = useRef<AbortController | null>(null)

   useEffect(() => {  
    if (!hasChanged) return

    const v = validate ? validate(inputValue) : { ok: false, state: ENUM_CHECK_STATE.ERROR as const }

    // reset/cancel if invalid or empty
    abortRef.current?.abort()
    abortRef.current = null

    if (!v.ok) {
      setState(v.state)
      return
    }

    setState(ENUM_CHECK_STATE.CHECKING)
    const timer = valueChecker(inputValue)
    return () => window.clearTimeout(timer)
  }, [inputValue])

  const valueChecker = (value: string) => {
    console.log("Checking value:", value)
    return setTimeout(async () => {
      const controller = new AbortController()
      abortRef.current = controller

      try {
        const res = await fetch(`${apiUrl}${encodeURIComponent(value)}`, {
          signal: controller.signal,
          cache: "no-store",
        })

        if (!res.ok) throw new Error("Request failed")

        const data: { available: boolean } = await res.json()
        setState(data.available ? ENUM_CHECK_STATE.AVAILABLE : ENUM_CHECK_STATE.TAKEN)
      } catch (err: any) {
        if (err?.name === "AbortError") return // expected
        setState(ENUM_CHECK_STATE.ERROR)
      }
    }, 600) // <-- debounce delay
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = handleChange?.(e) ?? e.target.value
    setHasChanged(newValue !== "" || newValue !== defaultValue ? true : false)
    setInputValue(newValue)
  }

  return (
    <div className={cn("w-full", containerClass ?? "")}>
      <label 
        htmlFor="penName" 
        className={cn(styles.formLabel, labelClass ?? "")}
      >
        {typeof label === "string" ? <span className="pr-1">{label}</span> : label}
        <SearchInputState state={state as ENUM_CHECK_STATE} />
      </label>
      <input 
        type="text" 
        ref={inputRef}
        name={inputName}
        defaultValue={defaultValue}
        placeholder={placeholder}
        data-state={state}
        className={cn(styles.formInput, inputClass ?? "")}
        onChange={(e) => handleInputChange(e)}
        onBlur={handleBlur}
        autoComplete="on"
        aria-autocomplete="list"
      />
    </div>
  )
}
