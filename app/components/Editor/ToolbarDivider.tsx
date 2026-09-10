import { cn } from "@/lib/utils"

export default function ToolbarDivider({
  dividerColor = "bg-black"
}: { dividerColor?: string }) {
  return (
    <div className={cn("mx-1 h-6 w-px", dividerColor)} />
  )
}