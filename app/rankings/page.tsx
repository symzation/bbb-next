import { Metadata } from "next"
import Rankings from "@/components/Rankings/Rankings"

export const metadata: Metadata = {
  title: 'Rankings',
  description: `View the latest rankings and statistics on ${process.env.NEXT_PUBLIC_SITENAME}. Stay updated with the most popular content and user activities.`,
}

export default async function RankingsPage() {
  return (
    <div className="flex flex-col">
      <Rankings />
    </div>
  )
}
