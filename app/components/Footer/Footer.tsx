import { FC } from "react"
import { styles } from "@/constants/constants"
import { cn } from "@/utils"

export default function Footer() {
    const getCopyRightText = () => {
        const currentYear = new Date().getFullYear()
        return `${currentYear} ${process.env.SITENAME} - All rights reserved.`
    }

    return (
        <footer className={cn(styles.footer, 'bg-primary text-secondary h-14')}>
            <div> &copy;{getCopyRightText()}</div> 
        </footer>
    )
}
