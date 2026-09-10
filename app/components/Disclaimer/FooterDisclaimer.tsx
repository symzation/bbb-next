import { styles } from "@/utils/constants"
import { cn } from "@/utils"

type DisclaimerProps = {
  className?: string
  titleClassName?: string
  textClassName?: string
}

export default function Disclaimer({
  className,
  titleClassName,
  textClassName
}: DisclaimerProps) {
  return (
    <div className={cn("text-black text-sm", className)}>
      <h5 className={cn("text-black text-sm font-bold", titleClassName)}>Disclaimer:</h5>
      <p className={cn(styles.paragraph, textClassName)}>
        {`The reviews and perspectives shared on ${process.env.NEXT_PUBLIC_SITENAME} represent our own honest experiences and opinions. We remain fully independent and unbiased, with no external influence from brands or sponsors. Our commitment is to provide genuine insights that help our community make informed choices, free from any commercial pressure. We believe in transparency and integrity, ensuring that every review reflects our true thoughts and feelings about the products and experiences we encounter.`}
      </p>
    </div>
  )
}