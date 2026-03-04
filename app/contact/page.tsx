import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Contact',
  description: `Get in touch with the team at ${process.env.NEXT_PUBLIC_SITENAME}. Whether you have questions, feedback, or need support, we're here to help.`,
}

export default function ContactPage() {
  return (
    <div className="flex flex-col">
      <h1>Contact</h1>
    </div>
  )
}  