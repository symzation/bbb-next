import { FC } from 'react'
import { styles } from "@/constants/constants"
import { cn } from "@/utils/index"
import Link from 'next/link'
import { FaLongArrowAltRight,  FaLongArrowAltLeft} from "react-icons/fa"

type ExploreMoreLinkProps = {
  arrowDirection?: 'left' | 'right'
  linkText: string
  linkUrl: string
  className?: string
  target?: string
  rel?: string
}

const ExploreMoreLink: FC<ExploreMoreLinkProps> = ({ 
  arrowDirection, 
  linkText, 
  linkUrl, 
  className,
  target,
  rel
}) => {
  return (
    <>
      <Link href={linkUrl} className={cn(styles.linkClass, className)} target={target} rel={rel}>
        {arrowDirection === 'left' && (<FaLongArrowAltLeft className="inline-block mr-1" />)}
        <span>{linkText}</span>
        {arrowDirection === 'right' && (<FaLongArrowAltRight className="inline-block mr-1" />)}
      </Link>
    </>
  )
}

export default ExploreMoreLink