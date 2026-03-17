import Link from 'next/link'
import { styles } from '@/utils/constants'
import { cn } from '@/utils'

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
		"text-xl font-bold text-primary no-underline hover:text-white tracking-wide transistion-all duration-300 ease-in-out",
    navLinkClass,
		posValue > 0 ? "text-secondary hover:text-white" : ""
  )

  return (
    <div className={cn(
      "flex flex-col md:flex-row items-center gap-4 py-3 px-6", 
      navigationClass
      )}
    >
      <Link href='/' className={linkClass}>
        [Logo]
      </Link>
      <Link href='/reviews' className={linkClass}>
        Reviews
      </Link>
      <Link href='/events' className={linkClass}>
        Events
      </Link>
      <Link href='/rankings' className={linkClass}>
        Rankings
      </Link>
      <Link href='/about' className={linkClass}>
        About
      </Link>
      <Link href='/contact' className={linkClass}>
        Contact
      </Link>
    </div>
  )
}