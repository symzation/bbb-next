"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { styles } from "@/constants/constants"
import { cn } from "@/utils"
import { useAuthSession } from "@/providers/AuthSessionProvider"
//import { redirect } from "next/navigation"
import { setupWindowObservers } from "@/utils/helpers"
//import AnnouncementsBanner from "@/components/Header/AnnouncementsBanner"
import LoginRegisterForms from "@/components/Forms/LoginRegisterForms"
import LoggedInMenu from "@/components/Header/LoggedInMenu"

type HeaderProps = {
	classNames?: string
	mobileLinkStyles?: string
	mobileNavCloseFunc?: Function
}

export default function Login({
	classNames,
	mobileLinkStyles,
	mobileNavCloseFunc
}: HeaderProps) {
	const { session, isAuthenticated } = useAuthSession()
	const [isMobile, setisMobile] = useState<boolean>(false)
	const [posValue, setPosValue] = useState<number>(0)

	const headerRef = useRef<HTMLDivElement>(null)
	const loginLinkRef = useRef<HTMLButtonElement>(null)
	

	useEffect(() => {
		setupWindowObservers(updateScrollValues)
	}, [])
	
	const navLinkClass = cn(
		styles.linkClass,
		"text-xl font-bold text-primary no-underline hover:text-white tracking-wide transistion-all duration-300 ease-in-out",
		posValue > 0 ? "text-secondary hover:text-white" : ""
	)

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
			<div className='flex flex-col md:flex-row justify-between items-start'>
				<div className='flex flex-col md:flex-row items-center space-x-0 md:space-x-6 space-y-4 md:space-y-0 py-3 px-6'>
					<div>
						<Link href='/' className={navLinkClass}>
							[Logo]
						</Link>
					</div>
					<div>
						<Link href='/reviews' className={navLinkClass}>
							Reviews
						</Link>
					</div>
					<div>
						<Link href='/events' className={navLinkClass}>
							Events
						</Link>
					</div>
					{/* <div>
						<Link href='/rankings' className={navLinkClass}>
							Rankings
						</Link>
					</div> */}
					<div>
						<Link href='/about' className={navLinkClass}>
							About
						</Link>
					</div>
					<div>
						<Link href='/contact' className={navLinkClass}>
							Contact
						</Link>
					</div>
				</div>
				{isAuthenticated ? 
					<LoggedInMenu /> : <LoginRegisterForms loginLinkRef={loginLinkRef} />
				}
			</div>
		</div>
	)
}
