import { FC } from "react"
import { styles } from "@/constants/constants"
import { cn } from "@/utils"
import Disclaimer from "@/components/Disclaimer/Disclaimer"

export default function Footer() {
	const getCopyRightText = () => {
		const currentYear = new Date().getFullYear()
		return `${currentYear} ${process.env.NEXT_PUBLIC_SITENAME}`
	}

	return (
		<footer 
			className={cn(
				styles.footer, 
				"flex flex-col justify-center items-start space-y-6 bg-primary text-secondary py-6 px-4 "
			)}
		>
			<div 
				className="flex flex-row justify-between items-start w-full text-third"
			>
				<div className="flex flex-col justify-center items-start">
					<div className="mb-0.5">{process.env.NEXT_PUBLIC_SITENAME}</div>
					<div className="mb-5">&copy;{getCopyRightText()}</div>
					<div>[SOCIAL LINKS GO HERE]</div>
				</div>
				<div>[LINKS GO HERE]</div>
			</div>	
			<div className="bg-fourth w-full h-[1px]" />
			<Disclaimer className="text-third" titleClassName="text-third text-xs" textClassName="text-xs" />
		</footer>
	)
}
