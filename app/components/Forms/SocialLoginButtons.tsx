import { cn } from "@/utils"
import { FcGoogle } from "react-icons/fc"
import { MdFacebook } from "react-icons/md"
import { RiTwitterXFill } from "react-icons/ri"
import { login } from "@/actions/loginActions"

export const appLogin = async (provider: string) => {
  await login(provider)
}

export default function SocialLoginButtons() {
  const buttonClass = "flex justify-center items-center px-2 py-1 border rounded-sm cursor-pointer hover:opacity-70"
  const buttonIconClass = "w-6 h-6"
  
  return (
    <div className="flex flex-row justify-center items-center w-full gap-5 my-1">
      {/* Google Login */}
      <button className={buttonClass} onClick={() => appLogin("google")}>
        <FcGoogle className={buttonIconClass} />
      </button>
      {/* Facebook Login */}
      <button className={buttonClass} onClick={() => appLogin("facebook")}>
        <MdFacebook className={cn(buttonIconClass, "text-facebook-blue")} />
      </button>
      {/* Twitter Login */}
      <button className={cn(buttonClass)} onClick={() => appLogin("twitter")}>
        <RiTwitterXFill className={buttonIconClass} />
      </button>
    </div>
  )
}