"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { styles } from "@/constants/constants"
import { cn } from "@/utils"
import AuthenticatedButtons from "@/components/Header/AuthenticatedButtons"
import { useAuthContext } from "@/providers/AuthProvider"
import { redirect } from "next/navigation"

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
	const [scrollPosition, setScrollPosition] = useState<number>(0)

	const headerRef = useRef<HTMLDivElement>(null)
	const loginLinkRef = useRef<HTMLButtonElement>(null)

	const session = useAuthContext()
	console.log('AuthContext session:', session);


	const navLinkClass = cn(
		styles.linkClass,
		"text-xl font-bold text-primary no-underline hover:text-fifth tracking-wide transistion-all duration-300 ease-in-out"
	)

	useEffect(() => {
		window.addEventListener("scroll", handleScroll, { passive: true })
		setisMobile(window.innerWidth < 768)
		window.addEventListener("resize", handleWindowSizeChange)

		return () => {
			window.removeEventListener("scroll", handleScroll)
		}
	}, [])

	useEffect(() => {
		setisMobile(window.innerWidth < 768)
		window.addEventListener("resize", handleWindowSizeChange)
		return () => {
			window.removeEventListener("resize", handleWindowSizeChange)
		}
	}, [])

	const handleScroll = () => {
		const position = window.pageYOffset || window.scrollY
		setScrollPosition(position)
	}

	const handleWindowSizeChange = () => {
		setisMobile(window.innerWidth < 768)
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
			className={cn(
				styles.header,
				scrollPosition > 0 ? styles.headerScrolled : ""
			)}
		>
			<div
				className={cn(
					"flex justify-end items-center bg-fifth text-fourth text-center py-1.5 text-base tracking-wide pr-6 hidden md:block transition-all duration-200 ease-in-out",
					scrollPosition > 0 ? "py-2" : ""
				)}
			></div>
			<div className='flex flex-col md:flex-row justify-between items-start'>
				<div className='flex flex-col md:flex-row items-center space-x-0 md:space-x-6 space-y-4 md:space-y-0 py-2.5 px-6'>
					<div>
						<Link href='/' className={navLinkClass}>
							[Logo]
						</Link>
					</div>
					<div>
						<Link href='#' className={navLinkClass} onClick={checkSession('/reviews')}>
							Reviews
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
