"use client"

import { useState } from "react"
import { styles } from "@/utils/constants"
import { cn } from "@/utils"
//import RankingsTabList from "@/components/Rankings/RankingsTabList"
import Link from "next/link"

export default function Rankings() {
  /**
   * TODOS:
   * - Get years from review table that has rankings.
   * - Implement the getYearRankings function to fetch and display rankings for the selected year.
   */

  const rankingYearsArr = [2022, 2023, 2024, 2025, 2026] 
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear())
  const [rankingYears, setRankingYears] = useState<number[]>(rankingYearsArr)

  const yearLinks = cn(styles.linkClass, "text-blue-500 no-underline first:before:content-[''] before:pr-2 before:content-['|']")
  
  const getYearRankings = async (year: number) => {
    console.log("Fetching rankings for year:", year)
  }

  return (
    <div className="flex flex-col md:flex-row justify-start items-start gap-4 mb-6">
      <div className="md:w-1/3">
        <p className={cn(styles.paragraph, "pt-0 text-sm")}>
          Our annual rankings, where each year, our reviewers compare bourbons, coffees, and beers that impressed us most. These rankings aren<span>&apos;</span>t written in stone (because taste buds have opinions too); they<span>&apos;</span>re a snapshot of what stood out to us that year. With new releases, hidden gems, and new batches of old favorites always entering the mix, the rankings can and probably will change. So explore the list and maybe discover your next favorite along the way.
        </p>
        <div className="flex justify-start items-start gap-2 mt-4 -ml-1.5 text-sm">
          {rankingYears.map((year) => (
            <Link 
              key={year}
              href="#"
              className={yearLinks}
              onClick={() => setSelectedYear(year)}
            >
              {year}
            </Link>
          ))}
        </div>
      </div>
      <div className="md:w-2/3">
        <div className="hand-drawn-ellipse text-primary font-bold ml-2.5 mb-4">
          {selectedYear}
        </div>
        <p>Ranking Lists are updated annually, so check back each year for the latest rankings and new additions to the list.</p>
        {/* <RankingsTabList /> */}
      </div>
    </div>
  )
}