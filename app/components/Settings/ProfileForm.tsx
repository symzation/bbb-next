"use client"

import { useActionState, useEffect, useRef, useState } from "react"
import { styles } from "@/constants/constants"
import { cn } from "@/utils"
import { useAuthContext } from "@/providers/AuthProvider"
import { Button } from "@/components/ui/button"
import ProfileImage from "@/components/ProfileImage/profileImage"
import TextareaInput from "@/components/Forms/Elements/TextareaInput"
import { profileFormAction } from "@/components/Settings/ProfileFormAction"
import { createUsername,getImageDimensions, validateUsername} from "@/utils/helpers"

type ProfileFormProps = {
  onProfileInfoClose?: (open: boolean) => void
}

type ImageDimensions = { 
  width: number
  height: number
} | { error?: string }

export default function ProfileForm({ 
  onProfileInfoClose
}: ProfileFormProps) {
  const session = useAuthContext()
  console.log('session:', session)

  const [formState, formAction, isPending] = useActionState(profileFormAction, undefined)
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null)
  const [inputName, setInputName] = useState<string>(session?.user?.name ?? "")
  const [inputUsername, setInputUsername] = useState<string>(session?.user?.username ?? "")
  const [inputEmail, setInputEmail] = useState<string>(session?.user?.email ?? "")
  const [inputProfileImage, setInputProfileImage] = useState<File | null>(null)
  
  const fileInputRef = useRef<HTMLInputElement | null>(null)
/*   const bioRef = useRef<HTMLTextAreaElement | null>(null)
  const bioCountRef = useRef<HTMLSpanElement | null>(null)
  
  const bioMaxLength = Number(process.env.NEXT_PUBLIC_BIO_MAX_LENGTH) */
  const prevImageUrl = session?.user?.image ?? ""

  useEffect(() => {
    if (session?.user?.email && session?.user?.username === "" && inputUsername === "") {
      const getUserName = async () => {
        const username = await createUsername(session?.user?.email ?? "")
        setInputUsername(username)
      }
      getUserName()
    }

    /* bioRef.current?.focus()
    bioRef.current?.blur() */
  }, [])

  useEffect(() => {
    if (formState && formState?.success && onProfileInfoClose) {
      onProfileInfoClose(false)
    }
  }, [formState, onProfileInfoClose])

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
    if (session?.user?.image !== prevImageUrl) {
      setImagePreviewUrl(prevImageUrl)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }
  
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUsername = e.target.value

    if (newUsername !== "") {
      const test = validateUsername(newUsername)
      console.log('Username RegEx test:', test)
      setInputUsername(newUsername)
    }
  }

  return (
    <form action={formAction} className="mt-2 mb-2">
      <input type="hidden" name="profileId" value={session?.user?.id} />
      <div className="flex flex-col space-y-8">
        <div className="relative flex flex-col items-start p-2 rounded-md border">
          <div className="text-sm font-bold tracking-wide">Photo</div>
          <div className="flex flex-row justify-center items-center space-x-5 mt-2">
            <ProfileImage />
            <div className="flex flex-col justify-start items-start space-y-1">
              <div className="flex flex-row justify-start items-center space-x-4">
                <a href="#" className="text-success text-base" onClick={addProfileImg}>Update</a>
                <a href="#" className="text-warning text-base" onClick={removeProfileImg}>Remove</a>
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
          <input type="text" name="name" defaultValue={inputName}
            placeholder="Name" className={cn(styles.formInput)}
            onBlur={(e) => setInputName(e.target.value)}
          />
          {formState?.errors && typeof formState.errors === "object" && !Array.isArray(formState.errors) && "name" in formState.errors && (<div className="text-error text-sm italic mt-1">{(formState.errors as { name?: string }).name}</div>)}
        </div>
        <div className="relative flex flex-col items-start mt-3.5">
          <label htmlFor="username" className="absolute -top-6.5 left-1 text-sm font-bold tracking-wide">
            Username
          </label>
          <input type="text" name="username" defaultValue={inputUsername}
            placeholder="Username" className={cn(styles.formInput)}
            onBlur={(e) => handleUsernameChange(e)}
          />
          {formState?.errors && typeof formState.errors === "object" && !Array.isArray(formState.errors) && "username" in formState.errors && (<div className="text-error text-sm italic mt-1">{(formState.errors as { username?: string[] }).username}</div>)}
        </div>
        <div className="relative flex flex-col items-start mt-3.5">
          <label htmlFor="email" className="absolute -top-6.5 left-1 text-sm font-bold tracking-wide">
            Email
          </label>
          <input type="text" name="email" defaultValue={inputEmail}
            placeholder="Email" className={cn(styles.formInput)}
            onBlur={(e) => setInputEmail(e.target.value)}
          />
          {formState?.errors && typeof formState.errors === "object" && !Array.isArray(formState.errors) && "email" in formState.errors && (<div className="text-error text-sm italic mt-1">{(formState.errors as { email?: string[] }).email}</div>)}
        </div>
      </div>
      {/* <TextareaInput
        ref={bioRef}
        defaultValue={session?.user?.bio ?? ""} 
        inputClassName="mt-12 mb-1.5" 
        inputErrors={formState}   
        inputName="bio"
        labelName="Bio"
        placeholderText="Write a short bio about yourself."
      /> */}
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