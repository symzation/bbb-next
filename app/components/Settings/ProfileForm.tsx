"use client"

import { useActionState, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { styles } from "@/utils/constants"
import { cn } from "@/utils"
import { Button } from "@/components/ui/button"
import ProfileImage from "@/components/ProfileImage/profileImage"
import { profileFormAction } from "@/components/Settings/ProfileFormAction"
import { getImageDimensions } from "@/utils/helpers"
import { ENUM_CHECK_STATE } from "@/types/enums"
import { useRouter } from 'next/navigation'
import { GetAuthSession } from "@/providers/AuthSessionProvider"
import { UserDataProps } from "@/types/types"
import SearchInput from "@/components/Search/SearchInput"
import { validateUsername } from "@/utils/helpers"

type ProfileFormProps = {
  onProfileInfoClose?: (open: boolean) => void
}

type ImageDimensions = { 
  width: number
  height: number
} | { error?: string }

export function validate(username: string) {
  if (username.length === 0) {
    return { ok: false, state: ENUM_CHECK_STATE.IDLE as const }
  }

  if (!validateUsername(username)) {
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

  const fileInputRef = useRef<HTMLInputElement>(null)

  const prevImageUrl = userData?.image ?? ""
  const defaultUsername = userData?.username ?? ""

  useEffect(() => {
    if (formState && formState?.success && onProfileInfoClose) {
      onProfileInfoClose(false)
      onFormSave()
    }
  }, [formState])

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
    const target = e.target
    const parentElement = target.parentElement

    if (target.value.length === 0) {
      parentElement?.querySelector("label")?.querySelector("span:last-of-type ")
        ?.classList.add("hidden")
      target.setAttribute("data-state", ENUM_CHECK_STATE.IDLE) 
    }
  }

  const handleValidate = (value: string) => {
    return validate(value)
  }

  const handleUsernameBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    const username = target?.dataset.state === ENUM_CHECK_STATE.AVAILABLE ? 
      target.value : ''
    setInputUsername(username)
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
          <SearchInput
            apiUrl="/api/check/username?username="
            defaultValue={defaultUsername}
            handleChange={handleUsernameChange}
            handleBlur={handleUsernameBlur}
            inputName="username"
            label="Username"
            labelClass="absolute -top-6.5 left-1 text-sm font-bold tracking-wide"
            placeholder="Username"
            validate={handleValidate}
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