import Link from 'next/link'
import Image from 'next/image'
import { styles } from '@/utils/constants'
import { cn } from '@/utils'

import Logo from "../../../public/BNBLogoWht.png"

type NavigationProps = {
  navLinkClass?: string
  navigationClass?: string
  posValue: number
}

export default function Navigation({ 
  navLinkClass,
  navigationClass,
  posValue
}: NavigationProps) {

  const linkClass = cn(
		styles.linkClass,
		"text-xl font-bold text-secndary no-underline hover:text-white tracking-wide transition-all duration-300 ease-in-out",
		(posValue ?? 0) > 0 ? "text-secondary hover:text-white" : "-mt-2.5",
    navLinkClass
  )

  return (
    <div className={cn(
      "flex flex-col md:flex-row items-center gap-4 py-3 px-6", 
      navigationClass
      )}
    >
      <Link href='/' 
        className={cn(
          'w-full h-full drop-shadow-xl/50', 
          posValue > 0 ? 'drop-shadow-none' : ''
        )}
      >
        <Image
          src={Logo}
          alt="Bourbon N' Brews Logo"
          className={cn('duration-300 ease-in-out', posValue > 0 ? "w-10 h-10" : "w-15 h-15")}
        />
      </Link>
      <Link href='/reviews' className={linkClass}>
        Reviews
      </Link>
      <Link href='/rankings' className={linkClass}>
        Rankings
      </Link>
      <Link href='/about' className={linkClass}>
        About
      </Link>
      {/* <Link href='/contact' className={linkClass}>
        Contact
      </Link> */}
    </div>
  )
}