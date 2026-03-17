"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { styles } from "@/utils/constants"
import { cn } from "@/utils"
import { GetAuthSession } from "@/providers/AuthSessionProvider"
//import { redirect } from "next/navigation"
import { setupWindowObservers } from "@/utils/helpers"
//import AnnouncementsBanner from "@/components/Header/AnnouncementsBanner"
import Navigation from "@/components/Header/Navigation"
import MobileNavigation from "@/components/Header/MobileNavigation"
import LoginRegisterForms from "@/components/Forms/LoginRegisterForms"
import LoggedInMenu from "@/components/Header/LoggedInMenu"


export default function Login() {
	const { session, isAuthenticated } = GetAuthSession()

	const [isMobile, setisMobile] = useState<boolean>(false)
	const [posValue, setPosValue] = useState<number>(0)

	const headerRef = useRef<HTMLDivElement>(null)
	const loginLinkRef = useRef<HTMLButtonElement>(null)

	useEffect(() => {
		setupWindowObservers(updateScrollValues)
	}, [])

	const navScrolledLinkClass = cn(
		styles.linkClass,
		"text-white no-underline hover:text-secondary"
	)

	const updateScrollValues = (
		values: { innerWidth: number; innerHeight: number; scrollY: number }
	) => {
		setisMobile(values.innerWidth < 768)
		setPosValue(values?.scrollY ?? 0)
	}

	return (
		<div
			ref={headerRef}
			className={cn(styles.header, posValue > 0 ? styles.headerScrolled : "")}
		>
			{/* <AnnouncementsBanner /> */}
			<div className="flex flex-row justify-between items-start">
				<MobileNavigation posValue={posValue} />
				<div className="hidden md:block">
					<Navigation posValue={posValue} />
				</div>
				{isAuthenticated ? 
					<LoggedInMenu /> : <LoginRegisterForms loginLinkRef={loginLinkRef} />
				}
			</div>
		</div>
	)
}
