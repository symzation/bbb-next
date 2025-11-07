import { FcGoogle } from "react-icons/fc"
import { FaFacebook } from "react-icons/fa"
import { RiTwitterXLine } from "react-icons/ri"
import { FaGithub } from "react-icons/fa"
import { socialLogin } from "@/actions/loginActions"
import { createCookie } from "@/lib/cookies"

export const connect = async (provider: string) => {
  await socialLogin(provider)
  createCookie('login-provider', provider, 0.002) // expires in ~3 minutes
}

export default function AppConnects() {
  const connectWraperClass = "flex flex-row items-center space-x-4 px-1 py-2.5 pl-3 hover:bg-gray-100 rounded-md cursor-pointer transition-all duration-150 ease-in-out"
  const connectClass = "text-sm block"
  const connectSubClass = "text-xs block"
  
  return (
    <>
      {/* Google Login */}
      <div className={connectWraperClass} onClick={() => connect("google")}>
        <FcGoogle className="w-8 h-8" />
        <div>
          <span className={connectClass}>Connect with Google</span>
          <span className={connectSubClass}>
            We will never post to Google or message your friends without your permission.
          </span>
        </div>
      </div>
      {/* Facebook Login */}
      <div className={connectWraperClass} onClick={() => connect("facebook")}>
        <FaFacebook className="w-8 h-8 text-facebook-blue" />
        <div>
          <span className={connectClass}>Connect with Facebook</span>
          <span className={connectSubClass}>
            We will never post to Facebook or message your friends without your permission.
          </span>
        </div>
      </div>
      {/* Twitter Login */}
      <div className={connectWraperClass} onClick={() => connect("twitter")}>
        <RiTwitterXLine className="w-8 h-8 text-twitter-blue" />
        <div>
          <span className={connectClass}>Connect with Twitter</span>
          <span className={connectSubClass}>
            We will never post to Twitter or message your friends without your permission.
          </span>
        </div>
      </div>
      {/* GitHub Login */}
      <div className={connectWraperClass} onClick={() => connect("github")}>
        <FaGithub className="w-8 h-8 text-github-black" />
        <div>
          <span className={connectClass}>Connect with GitHub</span>
          <span className={connectSubClass}>
            We will never post to GitHub or message your friends without your permission.
          </span>
        </div>
      </div>
    </>
  )
}