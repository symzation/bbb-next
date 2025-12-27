"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { styles } from "@/constants/constants"
import { cn } from "@/utils"
import { useAuthContext } from "@/providers/AuthProvider"
import { redirect } from "next/navigation"
import { setupWindowObservers } from "@/utils/helpers"
import AnnouncementsBanner from "@/components/Header/AnnouncementsBanner"
import AuthenticatedButtons from "@/components/Header/AuthenticatedButtons"

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
	const [isMobile, setisMobile] = useState<boolean>(false)
	const [posValue, setPosValue] = useState<number>(0)

	const headerRef = useRef<HTMLDivElement>(null)
	const loginLinkRef = useRef<HTMLButtonElement>(null)
	
	const session = useAuthContext()

	useEffect(() => {
		setupWindowObservers(updateScrollValues)
	}, [])
	
	const navLinkClass = cn(
		styles.linkClass,
		"text-xl font-bold text-primary no-underline hover:text-fifth tracking-wide transistion-all duration-300 ease-in-out"
	)

	const updateScrollValues = (
		values: { innerWidth: number; innerHeight: number; scrollY: number }
	) => {
		setisMobile(values.innerWidth < 768)
		setPosValue(values?.scrollY ?? 0)
	}

	const checkSession = (redirectUrl: string) => {
		return async () => {
			if (!session?.isAuthenticated) {
				// You can implement a modal open function here
				if (loginLinkRef.current) {
					loginLinkRef.current?.click()
				}
			} else {
				// Session exists, redirect to the desired page
				redirect(redirectUrl)
			}
		}
	}

	return (
		<div
			ref={headerRef}
			className={cn(styles.header, posValue > 0 ? styles.headerScrolled : "")}
		>
			<AnnouncementsBanner />
			<div className='flex flex-col md:flex-row justify-between items-start'>
				<div className='flex flex-col md:flex-row items-center space-x-0 md:space-x-6 space-y-4 md:space-y-0 py-3 px-6'>
					<div>
						<Link href='/' className={navLinkClass}>
							[Logo]
						</Link>
					</div>
					<div>
						<Link href='#' className={navLinkClass} onClick={checkSession('/articles')}>
							Articles
						</Link>
					</div>
					<div>
						<Link href='#' className={navLinkClass} onClick={checkSession('/rankings')}>
							Rankings
						</Link>
					</div>
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
				<AuthenticatedButtons loginLinkRef={loginLinkRef} />
			</div>
		</div>
	)
}
