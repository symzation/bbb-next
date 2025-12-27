import { FcGoogle } from "react-icons/fc"
import { MdFacebook } from "react-icons/md"
import { BsTwitterX } from "react-icons/bs"
import { login } from "@/actions/loginActions"

export const appLogin = async (provider: string) => {
  await login(provider)
}

export default function SocialLoginButtons() {
  return (
    <div className="flex flex-row justify-center items-center w-full gap-5 my-1">
      {/* Google Login */}
      <div className="flex justify-center items-center px-6 py-2 border rounded-md cursor-pointer hover:opacity-70" onClick={() => appLogin("google")}>
        <FcGoogle className="w-6 h-6" />
      </div>
      {/* Facebook Login */}
      <div className="flex justify-center items-center px-6 py-2 border rounded-md cursor-pointer hover:opacity-70" onClick={() => appLogin("facebook")}>
        <MdFacebook className="w-6.5 h-6.5 rounded-sm text-facebook-blue" />
      </div>
      {/* Twitter Login */}
      <div className="flex justify-center items-center px-6 py-2 border rounded-md cursor-pointer hover:opacity-70" onClick={() => appLogin("twitter")}>
        <BsTwitterX className="w-6.5 h-6.5 rounded-sm text-twitter-blue" />
      </div>
    </div>
  )
}