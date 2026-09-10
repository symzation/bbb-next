import Link from 'next/link'

export default function LoginDisclaimer({
  actionLabel
}: { actionLabel: string }) {
  return (
    <div className="text-xs text-gray-500">
      {`By ${actionLabel}, you accept ${process.env.NEXT_PUBLIC_SITENAME}'s `} <Link href="#" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">Terms of Service</Link> and <Link href="#" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">Privacy Policy</Link>.
    </div>
  )
}