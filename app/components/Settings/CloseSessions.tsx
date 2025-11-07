
import { useAuthContext } from "@/providers/AuthProvider"
import { toast } from "sonner"
import { deleteDbSessions } from "@/actions/sessionDataActions"

export default function CloseSessions() {
  const session = useAuthContext()

  const handleSignOutSessions = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()

    const sessions = deleteDbSessions(String(session?.user?.id))

    toast.promise(sessions, {
      loading: 'Loading...',
      success: (sessions) => {  
        return sessions?.count
          ? 'Successfully signed out of all other sessions.' 
          : 'No other sessions to sign out from.'
      },
      error: 'Error signing out of sessions.',
    })
  }
  
  return (
    <div 
      className="flex flex-col space-y-1 px-1 py-2.5 pl-3 hover:bg-gray-100 cursor-pointer transition-all duration-150 ease-in-out"
      onClick={handleSignOutSessions}
    >
      <div className="text-sm text-warning text-left capitalize">
        Sign out of all other sessions
      </div>
      <div className="text-xs text-muted-foreground">
        Signing out will end all other active sessions in other browsers or on other computers except the current one.
      </div>
    </div>
  )
}