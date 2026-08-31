import { cn } from "@/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import RankingsCard from "@/components/Rankings/RankingsCard"
import { getProductRankings } from "@/lib/db/actions/index"

type RankingsTabListProps = {
  tabToShow: string
  objEntries: [string, any][]
  rankingsData: Record<string, any>
}
export default async function RankiingsTabList() {
  const rankingsData = await getProductRankings()
  const objEntries = Object.entries(rankingsData ?? {})
  console.log("objEntries:", objEntries)
  console.log("rankingsData: ", rankingsData)
  const tabToShow = objEntries[0][0]

  return (
    <Tabs 
      defaultValue={tabToShow}
      className="flex flex-col justify-center items-center   space-y-2 md:space-y-0 md:space-x-2 w-full gap-0 md:gap-2"
    >
      <TabsList className="w-full mb-2 p-0 flex-wrap h-auto justify-start items-center space-x-2">
        {objEntries.map(([key]) => (
          <TabsTrigger 
            key={key}
            value={key} 
            className="flex text-center cursor-pointer bg-primary text-third hover:bg-secondary hover:text-third data-[state=active]:bg-fifth data-[state=active]:text-white px-3 py-1.5 mr-2 mb-2 rounded-md text-sm font-semibold"
          >
            {key}
          </TabsTrigger>
        ))}
      </TabsList>
      {Object.entries(rankingsData ?? {}).map(([key, value]) => (
        <TabsContent key={key} value={key} className="w-full pr-1.5">
          <RankingsCard
            products={Array.isArray(value) ? value : []}
            cardTitle={`Top 10 ${key}`}
            errorMsg={`No ${key} available`}
            rankingCardClass={cn("my-2 md:my-0 w-full")}
          />
        </TabsContent>
      ))}
    </Tabs>
  )
}
