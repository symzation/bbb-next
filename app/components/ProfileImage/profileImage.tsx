
import Image from "next/image"
import { styles } from "@/utils/constants"
import { cn } from "@/utils"
import { useAuthSession } from "@/providers/AuthSessionProvider"

type ProfileImageProps = {
  avatarImgClassName?: string
} 

export default function ProfileImage(
  { avatarImgClassName }: ProfileImageProps
) {
  const { session, isAuthenticated } = useAuthSession()
  const profileImgUrl = session?.user?.image ?? "/default-avatar.png"
  
  return (
    <Image 
      src={profileImgUrl} 
      alt={`${session?.user?.name ?? "User"}'s profile image`} 
      width={40} 
      height={40}
      className={cn(
        styles.avatarImg, avatarImgClassName, 
        isAuthenticated ? "border-none" : ""
      )}
    />  
  )
}