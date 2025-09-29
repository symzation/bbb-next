import LoginRegisterForms from "@/components/LoginRegisterForms/LoginRegisterForms"
import LoggedInMenu from "@/components/Header/LoggedInMenu"
import { useAuthContext } from "@/providers/AuthProvider"

type AuthenticatedButtonsProps = {
  loginLinkRef: React.RefObject<HTMLButtonElement | null>
}

export default function AuthenticatedButtons({
  loginLinkRef
}: AuthenticatedButtonsProps) {
  const session = useAuthContext()

	return (
		<>
			{session?.isAuthenticated ? (
				<LoggedInMenu />
			) : (
				<LoginRegisterForms loginLinkRef={loginLinkRef} />
			)}
		</>
	)
}
