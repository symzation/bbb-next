import { useState } from "react"
import { styles } from "@/constants/constants"
import { cn } from "@/utils"
import { MdOutlineMailOutline } from "react-icons/md"
import { FcGoogle } from "react-icons/fc"
import { FaFacebook } from "react-icons/fa"
import { RiTwitterXLine } from "react-icons/ri"
import { FaGithub } from "react-icons/fa"
import { signInNoRedirect, signOutNoRedirect, socialLogout } from "@/actions/loginActions"
import { createCookie } from "@/lib/cookies"
import { useAuthContext } from "@/providers/AuthProvider"
import { getUserById } from "@/actions/userDataActions"
import { signIn, signOut } from "@/lib/auth"
import { authConfig } from "@/root/auth.config"
import { redirect } from "next/navigation"

export default function AppConnects() {
  const session = useAuthContext()
  console.log('session in AppConnects:', session)

  const loginProvider = session?.user?.provider ?? ''

  //const [activeProvider, setActiveProvider] = useState<string>(loginProvider)

  const connectWraperClass = "group flex flex-row items-center space-x-4 px-1 py-2.5 pl-3 hover:bg-gray-100 rounded-md cursor-not-allowed transition-all duration-150 ease-in-out"
  const connectClass = "text-sm block"
  const connectSubClass = "text-xs block"

  const getProviderIcon = (providerId: string) => {
    const iconClass = "w-8 h-8"
    switch (providerId) {
      case "google":
        return <FcGoogle className={iconClass} />
      case "facebook":
        return <FaFacebook className={cn(iconClass, "text-facebook-blue")} />
      case "twitter":
        return <RiTwitterXLine className={cn(iconClass, "text-twitter-blue")} />
      case "github":
        return <FaGithub className={cn(iconClass, "text-github-black")} />
      default:
        return <MdOutlineMailOutline className={iconClass} />
    }
  }

  /* const connectUsingProvider = async (providerId: string, loginProvider: string) => {
    await socialLogout()
    setTimeout(async () => {
      console.log(providerId)
      await signInNoRedirect(providerId)
      createCookie('login-provider', providerId, 0.5) // expires in ~3 minutes
      //redirect('/settings') 
    }, 8000)
  } */

  console.log('authConfig:', authConfig)
  const providerInfo = authConfig.providers.find(provider => provider.id === loginProvider)
  console.log('providerInfo:', providerInfo)
  
  return (
    <>
      {providerInfo && providerInfo.id !== 'credentials' ? (
        <div 
          key={providerInfo.id}
          className={cn(connectWraperClass)} 
          data-state={loginProvider === providerInfo.id ? "active" : ""}
          //onClick={() => connectUsingProvider(providerInfo.id, loginProvider)}
        >
          {getProviderIcon(providerInfo.id)}
          <div>
            <span className={cn(connectClass, 'group-data-[state=active]:text-success font-semibold')}>
              {`${providerInfo.name} Connected`}
            </span>
            <span className={connectSubClass}>
              We will never post to {providerInfo.name} or message your friends without your permission.
            </span>
          </div>
        </div>
      ) : (
        <div className="text-sm text-muted-foreground">
          No social login providers connected.
        </div>
      )}
    </>
  )
}
