import { styles } from "@/constants/constants"
import { cn } from "@/utils"
import { Button } from "@/components/ui/button"

type FormButtonLinkProps = {
  buttonClass?: string
  buttonSentence: string
  buttonSentenceClass?: string
  buttonText?: string
  buttonWrapperClass?: string
  buttonVariant?: "link" | "default" | "outline" | "ghost" | "destructive"
  onTransitionFunc: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void    
}

export default function FormButtonLink({
  buttonSentence,
  buttonSentenceClass,
  buttonClass,
  buttonText,
  buttonWrapperClass,
  onTransitionFunc,
  buttonVariant = 'link'
}: FormButtonLinkProps) {
  return (
    <div className={buttonWrapperClass}>
      <span className={buttonSentenceClass}>{buttonSentence}</span>
      <Button 
        variant={buttonVariant}
        className={cn("text-primary font-bold underline hover:no-underline underline-offset-2 hover:underline-offset-0 hover:cursor-pointer p-0 pl-1.5", buttonClass)} 
        onClick={onTransitionFunc}
      >
        {buttonText}
      </Button>
    </div>
  )
}