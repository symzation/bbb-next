"use client"

import { styles } from "@/utils/constants"
import { cn } from "@/utils"

export default function NotFound() {
  return (
    <div className={cn(styles.pageClass, "flex flex-col-reverse md:flex-row justify-center items-center space-x-0 md:space-x-20 h-screen m-auto")}>
      <div className="text-center md:texe-left">
        <div className="font-frauncestext-xl font-bold">
          Qops!
        </div>
        <div className="font-sans
         text-3xl font-bold">
          Page not found...
        </div>
        <p className={styles.paragraph}>
          Sorry, We&apos;re unable to find the page you are looking for.
        </p>
      </div>
      <div className="font-sans
       text-6xl md:text-9xl font-extrabold mb-1 md:mb-0">404</div>
    </div>
  )
}
