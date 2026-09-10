import { cn } from "@/utils"

type ToolbarButtonProps = {
  active?: boolean
  children: React.ReactNode
  disabled?: boolean
  onClick: () => void
  title?: string
}

export default function ToolbarButton({
  active = false,
  children,
  disabled = false,
  onClick,
  title,
}: ToolbarButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={cn(
        "inline-flex min-h-9 items-center justify-center rounded-md px-2 transition-colors hover:bg-black hover:text-white disabled:pointer-events-none disabled:opacity-40",
        active && "bg-black text-white"
      )}
    >
      {children}
    </button>
  )
}