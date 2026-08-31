import { Metadata } from "next"
import { styles } from "@/utils/constants"
import { cn } from "@/utils"
import RankingsList from "@/components/Rankings/RankingsList"

export const metadata: Metadata = {
  title: 'Rankings',
  description: `View the latest rankings and statistics on ${process.env.NEXT_PUBLIC_SITENAME}. Stay updated with the most popular content and user activities.`,
}

export default async function RankingsPage() {
  return (
    <div className={cn(styles.pageClass)}>
      <h1 className={styles.pageHeading}>Rankings</h1>
      <RankingsList />
    </div>
  )
}
