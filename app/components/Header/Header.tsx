"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { styles } from "@/constants/constants"
import { cn } from "@/utils"
import Login from "@/components/Header/Login"
import Register from "@/components/Header/Register"


type HeaderProps = {
    classNames?: string
    mobileLinkStyles?: string
    mobileNavCloseFunc?: Function
}

export default function Header({
    classNames, mobileLinkStyles, mobileNavCloseFunc 
}: HeaderProps) {
    const isLoggedIn = false // Placeholder for authentication state
    const isAdmin = false // Placeholder for admin state
    const isAuthenticated = isLoggedIn || isAdmin

    const [isMobile, setisMobile] = useState<boolean>(false)
    const [scrollPosition, setScrollPosition] = useState<number>(0)

    const navLinkClass = cn(styles.linkClass, 'text-xl font-bold text-primary no-underline hover:text-fifth tracking-wide transistion-all duration-300 ease-in-out',)
    
    const handleScroll = () => {
      const position = window.pageYOffset || window.scrollY
      setScrollPosition(position)
    }
  
    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true })
        setisMobile(window.innerWidth < 768)
        window.addEventListener('resize', handleWindowSizeChange)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    useEffect(() => {
        setisMobile(window.innerWidth < 768)
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
          window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, [])
    
    const handleWindowSizeChange = () => {
        setisMobile(window.innerWidth <= 768);
    }

    const showRegister = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault()
        // Implement dialog display logic here
        alert('Show register dialog')
    }

    const showLogin = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault()
        // Implement dialog display logic here
        alert('Show login dialog')
    }

    return (
        <div className={cn(styles.header, scrollPosition > 0 ? styles.headerScrolled : '')}>
            <div 
                className={cn(
                    "flex justify-end items-center bg-fifth text-third text-center py-1.5 text-base tracking-wide pr-6", 
                    scrollPosition > 0 ? 'py-2' : '')
                }
            >
                <Login /> | <Register />
            </div>
            <div className='flex flex-col md:flex-row justify-between items-start'>
                <div 
                    className="flex flex-col md:flex-row items-center space-x-0 md:space-x-6 space-y-4 md:space-y-0 mt-2.5 px-6"
                >
                    <div>
                        <Link href="/" className={navLinkClass}>
                            [Logo]
                        </Link>
                    </div>
                    <div>
                        <Link href="/reviews" className={navLinkClass}>
                            Reviews
                        </Link>
                    </div>
                    <div>
                        <Link href="/rankings" className={navLinkClass}>
                            Rankings
                        </Link>
                    </div>
                    <div>
                        <Link href="/about" className={navLinkClass}>About</Link>
                    </div>
                    <div>
                        <Link href="/contact" className={navLinkClass}>
                            Contact
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}