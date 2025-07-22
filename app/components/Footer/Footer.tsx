import { FC } from "react"
import { styles } from "@/constants/constants"
import { cn } from "@/utils"

const Footer: FC = () => {
    const getCopyRightText = () => {
        const currentYear = new Date().getFullYear()
        return `${currentYear} ${process.env.SITENAME}, LLC`
    }

    return (
        <div className={cn(styles.footer, 'bg-primary text-secondary h-14')}>
            <div> &copy;{getCopyRightText()}</div> 
        </div>
    )
}

export default Footer 