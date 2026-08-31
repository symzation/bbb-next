import type { Metadata } from "next"
import { styles } from "@/utils/constants"
import { cn } from "@/utils"
import { ENUM_CHECK_STATE, ENUM_ROLE } from "@/types/enums"
import { GetAuthSession } from "@/actions/sessionActions"
import AuthorFormText from "@/components/Author/AuthorFormText"
import AuthorForm from "@/components/Author/AuthorForm"

export const metadata: Metadata = {
  title: 'Become a Reviewer',
  description: `Learn how to become a reviewer for ${process.env.NEXT_PUBLIC_SITENAME} and share your unique experiences with our community.`,
}

export default async function AuthorPage() {
  const session = await GetAuthSession()
  const userRole = (session?.user as { role?: string })?.role
  let showForm = userRole === ENUM_ROLE.AUTHOR_WAITING_APPROVAL || 
    userRole === ENUM_ROLE.AUTHOR ? false : true

  return (
    <>
      {showForm ? (
        <div className={cn(styles.pageClass, "mx-4 md:mx-20")}>
          <AuthorFormText />
          <AuthorForm />  
        </div>
      ) : (
        <div className="text-center text-primary">
          {userRole === ENUM_ROLE.AUTHOR_WAITING_APPROVAL ? 
            "Your author application is still under review." : userRole === ENUM_ROLE.AUTHOR ? 
            "You are already an author." :"Please log in to register as a reviewer."
          }
        </div>
      )}
    </>
  )
}