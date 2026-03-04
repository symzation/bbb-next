"use client"

import { useActionState, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { styles } from "@/utils/constants"
import { cn } from "@/utils"
import { Button } from "@/components/ui/button"
import ProfileImage from "@/components/ProfileImage/profileImage"
import { profileFormAction } from "@/components/Settings/ProfileFormAction"
import { getImageDimensions, formatUsername} from "@/utils/helpers"
import { ENUM_CHECK_STATE } from "@/types/enums"
import { useRouter } from 'next/navigation'
import { GetAuthSession } from "@/providers/AuthSessionProvider"
import { UserDataProps } from "@/types/types"

type ProfileFormProps = {
  onProfileInfoClose?: (open: boolean) => void
}

type ImageDimensions = { 
  width: number
  height: number
} | { error?: string }

function normalizeUsername(raw: string) {
  return raw.trim().toLowerCase()
}

function validate(username: string) {
  if (username.length === 0) {
    return { ok: false, state: ENUM_CHECK_STATE.IDLE as const }
  }

  if (!/^[a-z0-9_]+$/.test(username) ||
    username.length < Number(process.env.NEXT_PUBLIC_USERNAME_LENGTH_MIN) || 
    username.length > Number(process.env.NEXT_PUBLIC_USERNAME_LENGTH_MAX) 
  ) {
    return { ok: false, state: ENUM_CHECK_STATE.INVALID as const }
  }
  
  return { ok: true, state: ENUM_CHECK_STATE.CHECKING as const }
}

export default function ProfileForm({ 
  onProfileInfoClose 
}: ProfileFormProps) {
  const router = useRouter()
  const { session, updateSession } = GetAuthSession()
  const userData = session?.user as UserDataProps

  const [formState, formAction, isPending] = useActionState(profileFormAction, undefined)
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null)
  const [inputName, setInputName] = useState<string>("")
  const [inputUsername, setInputUsername] = useState<string>("")
  const [inputEmail, setInputEmail] = useState<string>("")
  const [inputProfileImage, setInputProfileImage] = useState<File | null>(null)
  const [state, setState] = useState<ENUM_CHECK_STATE>()
  const [hasChanged, setHasChanged] = useState<boolean>(false)

  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const prevImageUrl = userData?.image ?? ""
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    if (formState && formState?.success && onProfileInfoClose) {
      onProfileInfoClose(false)
      onFormSave()
    }
  }, [formState])

  useEffect(() => {
    if (!hasChanged) return

    const u = normalizeUsername(inputUsername)
    const v = validate(u)

    // reset/cancel if invalid or empty
    abortRef.current?.abort()
    abortRef.current = null

    if (!v.ok) {
      setState(v.state)
      return
    }

    setState(ENUM_CHECK_STATE.CHECKING)
    const timer = userNameChecker(u)
    return () => window.clearTimeout(timer)
  }, [inputUsername])

  const userNameChecker = (u: string) => {
    return window.setTimeout(async () => {
      const controller = new AbortController()
      abortRef.current = controller

      try {
        const res = await fetch(`/api/username/check?username=${encodeURIComponent(u)}`, {
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

  const addProfileImg = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()
    fileInputRef.current?.focus()
    fileInputRef.current?.click()
  }

  const handleProfileImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const profileImage = e.target.files?.[0]

    if (!profileImage) {
        console.log("No file selected.")
        return 
    }

    // 1. Check File Type
    if (profileImage.type !== 'image/png' && profileImage.type !== 'image/jpeg') {
        console.log("Invalid file type. Please select a PNG or JPEG image.")
        e.target.value = "" // Clear the input
        return
    }

    // 2. Check Image Dimensions
    const dimensions = await getImageDimensions(profileImage) as ImageDimensions

    if (
      "width" in dimensions &&
      "height" in dimensions &&
      (dimensions.width > 512 || dimensions.height > 512)
    ) {
        console.log(`${dimensions.width}x${dimensions.height} image is too large. We recommended uploading a 512x512 image .`)
        e.target.value = "" // Clear the input
        return false
    }

    console.log("Image is valid:", profileImage.name)
    handleFileChange(profileImage)
  }
  
  const handleFileChange = (profileImage: File) => {
    const file = profileImage // Get the first selected file
    
    if (file) {
      setInputProfileImage(file)
      // Create an Object URL for the selected file
      const objectUrl = URL.createObjectURL(file)
      setImagePreviewUrl(objectUrl)
    } else {
      setImagePreviewUrl(null) // Clear the preview if no file is selected
    }
  }

  const removeProfileImg = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()
    if (userData?.image !== prevImageUrl) {
      setImagePreviewUrl(prevImageUrl)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUsername = formatUsername(e.target.value)
    setHasChanged(newUsername !== "" || newUsername !== userData?.username ? true : false)
    e.target.value = newUsername
    setInputUsername(newUsername)
  }

  const onFormSave = async () => {
    await updateSession({ user: { ...formState?.data } }) 
    router.refresh()
  }
  
  return (
    <form action={formAction} className="mt-2 mb-2">
      <div className="flex flex-col space-y-8">
        <div className="relative flex flex-col items-start p-2 rounded-md border">
          <div className="text-sm font-bold tracking-wide">Photo</div>
          <div className="flex flex-row justify-center items-center space-x-5 mt-2">
            <ProfileImage />
            <div className="flex flex-col justify-start items-start space-y-1">
              <div className="flex flex-row justify-start items-center space-x-4">
                <Link href="#" className="text-success text-base" onClick={addProfileImg}>
                  Update
                </Link>
                <Link href="#" className="text-warning text-base" onClick={removeProfileImg}>
                  Remove
                </Link>
              </div>
              <div className="text-sm text-gray-500 text-left">
                We recommend a square image of at least 512x512 pixels in JPG, PNG, or GIF format.
              </div>
              <input 
                ref={fileInputRef} 
                type="file" 
                name="profileImage"
                defaultValue={inputProfileImage ? inputProfileImage.name : ""} 
                hidden 
                onChange={handleProfileImageChange} 
              />
            </div>
          </div>
        </div>
        <div className="relative flex flex-col items-start mt-4">
          <label htmlFor="name" className="absolute -top-6.5 left-1 text-sm font-bold tracking-wide">
            Name
          </label>
          <input type="text" name="name" defaultValue={userData.name ?? ""}
            placeholder="Name" className={cn(styles.formInput)}
            onChange={(e) => setInputName(e.target.value)}
          />
          {formState?.errors && typeof formState.errors === "object" && !Array.isArray(formState.errors) && "name" in formState.errors && (<div className="text-error text-sm italic mt-1">{(formState.errors as { name?: string }).name}</div>)}
        </div>
        <div className="relative flex flex-col items-start mt-3.5">
          <label htmlFor="username" className="absolute -top-6.5 left-1 text-sm font-bold tracking-wide">
            <span className="pr-1">Username</span>
            {state === ENUM_CHECK_STATE.IDLE && <></>}
            {state === ENUM_CHECK_STATE.INVALID && 
              <span className="text-sm text-error">- Invalid</span>
            }
            {state === ENUM_CHECK_STATE.CHECKING && 
              <span className="text-sm font-bold">- Checking…</span>
            }
            {state === ENUM_CHECK_STATE.AVAILABLE && 
              <span className="text-sm text-success">- ✅Available</span>
            }
            {state === ENUM_CHECK_STATE.TAKEN && 
              <span className="text-sm text-error">- ❌ Taken</span>
            }
            {state === ENUM_CHECK_STATE.ERROR && 
              <span className="text-sm text-error">Something went wrong. Try again.</span>
            }
          </label>
          <input type="text" name="username" defaultValue={userData.username ?? ""}
            placeholder="Username" className={cn(styles.formInput)}
            onChange={(e) => handleUsernameChange(e)}
          />
          {formState?.errors && typeof formState.errors === "object" && !Array.isArray(formState.errors) && "username" in formState.errors && (<div className="text-error text-sm italic mt-1">{(formState.errors as { username?: string[] }).username}</div>)}
        </div>
        <div className="relative flex flex-col items-start mt-3.5 hidden">
          <label htmlFor="email" className="absolute -top-6.5 left-1 text-sm font-bold tracking-wide">
            Email
          </label>
          <input type="text" name="email" defaultValue={userData.email ?? ""}
            placeholder="Email" className={cn(styles.formInput)}
            onBlur={(e) => setInputEmail(e.target.value)}
          />
          {formState?.errors && typeof formState.errors === "object" && !Array.isArray(formState.errors) && "email" in formState.errors && (<div className="text-error text-sm italic mt-1">{(formState.errors as { email?: string[] }).email}</div>)}
        </div>
      </div>
      <div className="flex-col sm:flex-col sm:justify-center mt-5">
        <Button 
          type="submit" 
          disabled={isPending}
          className={cn("w-full text-third tracking-wider py-5 px-12 ring-0 focus:ring-0 ring-offset-0 focus:ring-offset-0 focus-visible:ring-0 outline-none cursor-pointer data-[state=open]:bg-transparent", isPending && "opacity-70 cursor-not-allowed")}
        >
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  )
}