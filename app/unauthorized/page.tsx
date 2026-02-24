"use client"

import { styles } from "@/utils/constants"
import { cn } from "@/utils"

export default function NotAuthorized() {
  return (
    <div className={cn(styles.pageClass, "mt-16 md:mt-40")}>
      <h1 className="text-6xl md:text-9xl font-extrabold text-center mb-3">401</h1>
      <h2 className="text-3xl md:text-6xl font-bold text-center mb-8 uppercase">
        Unauthorized Access
      </h2>
      <p className="text-lg text-center text-muted-foreground">
        Sorry, but you are not authorized to view this page
      </p>
    </div>
  )
}
