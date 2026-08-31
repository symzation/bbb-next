import { useState } from "react"
import Link from "next/link"
import { styles } from "@/utils/constants"
import { cn } from "@/utils"
import { MdOutlineDashboard } from "react-icons/md"
import { RiEdit2Line } from "react-icons/ri"
import { LuNotebookText } from "react-icons/lu"
import { GrResources } from "react-icons/gr"
import { GetAuthSession } from "@/providers/AuthSessionProvider"
import { UserDataProps } from "@/types/types"
import { Separator } from "../ui/separator"
import { hasRole, ROLE_GROUPS } from "@/lib/roles"
import { ENUM_ROLE } from "@/types/enums"

type SessionLinksProps = {
  assignLink: (event: React.MouseEvent<HTMLAnchorElement>, url: string) => void, seporatorClass: string
}

export default function SessionLinks(
  {assignLink, seporatorClass}: SessionLinksProps
) {
  const { session } = GetAuthSession()

  const canSeeAuthorLinks = hasRole(
    (session?.user as UserDataProps | undefined)?.role, 
    ROLE_GROUPS.CAN_CREATE_POST
  )

  const getSessionLinks = (user?: UserDataProps | null) => {
    const links = []

    if (user?.role === ENUM_ROLE.ADMIN) {
      links.push(
        <Link key="dashboard" href="#" className={styles.profileMenuLink} 
          onClick={(e) => assignLink(e, '/dashboard')}
        >
          <MdOutlineDashboard className={styles.profileMenuLinkIcon} /> Dashboard
        </Link>
      )
    }

    if (canSeeAuthorLinks) {
      links.push(
        <Link key="compose" href="#" className={styles.profileMenuLink} 
          onClick={(e) => assignLink(e, '/compose')}
        >
          <RiEdit2Line className={styles.profileMenuLinkIcon} /> Write
        </Link>,
        <Link key="guide" href="#" className={styles.profileMenuLink} 
          onClick={(e) => assignLink(e, '/guide')}
        >
          <LuNotebookText className={styles.profileMenuLinkIcon} /> Guide
        </Link>,
        <Link key="resources" href="#" className={styles.profileMenuLink} 
          onClick={(e) => assignLink(e, '/resources')}
        >
          <GrResources className={styles.profileMenuLinkIcon} /> Resources
        </Link>
      )
    }

    if (user?.role === ENUM_ROLE.AUTHOR_WAITING_APPROVAL) {
      links.push(
        <div className="text-error text-sm italic px-3" key="pending-author">
          Author account is pending approval
        </div>
      )
    }
    /* if (user?.role === ENUM_ROLE.USER) {
      links.push(
        <Link href="/author" className={styles.profileMenuLink} 
          onClick={(e) => assignLink(e, '/author')}
        >
          <MdOutlineRateReview className={styles.profileMenuLinkIcon} /> Become a Reviewer
        </Link>
      )
    } */

    return links.length > 0 ? links : null
  }

  const links = getSessionLinks(session?.user as UserDataProps | undefined)

  return links ? (
    <>
      <Separator className={seporatorClass} />
      <div className="flex flex-col">
        {links}
      </div>
    </>
  ) : null
}