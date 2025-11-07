
import Image from "next/image"
import { styles } from "@/constants/constants"
import { cn } from "@/utils"
import { useAuthContext } from "@/providers/AuthProvider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type ProfileImageProps = {
  avatarImgClassName?: string
} 

export default function ProfileImage({ avatarImgClassName }: ProfileImageProps) {
  const sessionData = useAuthContext()
  const profileImgUrl = sessionData?.user?.image ?? "/default-avatar.png"
  
  return (
    <Image 
      src={profileImgUrl} 
      alt={`${sessionData?.user?.name}'s profile image`} 
      width={40} 
      height={40}
      className={cn(
        styles.avatarImg, avatarImgClassName, 
        sessionData?.isAuthenticated ? "border-none" : ""
      )}
    />  
  )
}