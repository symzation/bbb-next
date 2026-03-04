import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Help',
  description: `Find answers to common questions and get support for using ${process.env.NEXT_PUBLIC_SITENAME}. Whether you need help with account management, content creation, or navigating our platform, we're here to assist you.`,
}

export default function HelpPage() {
  return (
    <div>
      <h1>Help Page</h1>
      <p>This is the help page.</p>
    </div>
  )
}