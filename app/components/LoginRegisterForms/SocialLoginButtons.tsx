import { FcGoogle } from "react-icons/fc"
import { MdFacebook } from "react-icons/md"
import { socialLogin } from "@/actions/loginActions"

const loginFacebook = async () => {
  await socialLogin('facebook')
}

const loginGoogle = async () => {
  await socialLogin('google')
}

export default function SocialLoginButtons() {
  return (
    <div className="flex flex-row justify-center items-center w-full gap-5 my-1">
      {/* Google Login */}
      <div className="flex justify-center items-center px-6 py-2 border rounded-md cursor-pointer hover:opacity-70" onClick={loginGoogle}>
        <FcGoogle className="w-6 h-6" />
      </div>
      {/* Facebook Login */}
      <div className="flex justify-center items-center px-6 py-2 border rounded-md cursor-pointer hover:opacity-70" onClick={loginFacebook}>
        <MdFacebook className="w-6.5 h-6.5 rounded-sm text-facebook-blue" />
      </div>

    </div>
  )
}