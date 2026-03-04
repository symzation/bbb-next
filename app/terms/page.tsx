import { Metadata } from 'next'
import { usePathname } from 'next/navigation'
import { styles } from "@/utils/constants"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: 'Terms And Conditions',
  description: `Read the terms and conditions for using ${process.env.NEXT_PUBLIC_SITENAME}.`,
}

export default function Terms() {
    const pathname = usePathname()
    const termType = pathname.split("/") // "author" or "reviewer"

  console.log("termType:", termType)

  return (
    <div className={cn(
      styles.pageClass, 
      'flex flex-col items-start justify-center px-4 md:px-20 lg:px-20 py-10'
    )}>
      <h1 className={styles.headingTitle}>Terms And Conditions</h1> 
    </div>
  )
}