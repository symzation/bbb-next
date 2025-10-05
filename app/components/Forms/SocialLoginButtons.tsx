import { FcGoogle } from "react-icons/fc"
import { MdFacebook } from "react-icons/md"
import { BsTwitterX } from "react-icons/bs"
import { FaGithub } from "react-icons/fa"
import { socialLogin } from "@/actions/loginActions"
import { createCookie } from "@/lib/cookies"
import { useLoginContext } from "@/providers/LoginProvider"

export const login = async (provider: string) => {
  await socialLogin(provider)
  createCookie('login-provider', provider, 0.002) // expires in ~3 minutes
}

export default function SocialLoginButtons() {
  return (
    <div className="flex flex-row justify-center items-center w-full gap-5 my-1">
      {/* Google Login */}
      <div className="flex justify-center items-center px-6 py-2 border rounded-md cursor-pointer hover:opacity-70" onClick={() => login("google")}>
        <FcGoogle className="w-6 h-6" />
      </div>
      {/* Facebook Login */}
      <div className="flex justify-center items-center px-6 py-2 border rounded-md cursor-pointer hover:opacity-70" onClick={() => login("facebook")}>
        <MdFacebook className="w-6.5 h-6.5 rounded-sm text-facebook-blue" />
      </div>
      {/* Twitter Login */}
      <div className="flex justify-center items-center px-6 py-2 border rounded-md cursor-pointer hover:opacity-70" onClick={() => login("twitter")}>
        <BsTwitterX className="w-6.5 h-6.5 rounded-sm text-twitter-blue" />
      </div>
      {/* GitHub Login */}
      <div className="flex justify-center items-center px-6 py-2 border rounded-md cursor-pointer hover:opacity-70" onClick={() => login("github")}>
        <FaGithub className="w-6.5 h-6.5 rounded-sm text-github-black" />
      </div>
    </div>
  )
}