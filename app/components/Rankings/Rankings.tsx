import { headers } from "next/headers"
import { styles } from "@/constants/constants"
import { cn } from "@/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import RankingsCard from "@/components/Rankings/RankingsCard"
import { getProductRankings } from "@/actions/productDataActions"

/* export async function getRankings() {
  const headersList = await headers()
  const host = headersList.get('host')
  const protocol = headersList.get('x-forwarded-proto') === 'https' ? 'https' : 'http'
  const origin = `${protocol}://${host}`
  const res = await fetch(`${origin}/api/data/rankings`)
  return res.json() 
} */

export default async function Rankings() {
  const rankings = await getProductRankings()
  const rankingsData = rankings?.data
  const ObjectEntries = Object.entries(rankingsData ?? {})

  return (
    <div className={cn("mt-10 px-2 md:px-6")}> 
      <Tabs 
        defaultValue="Whiskey" 
        className="flex flex-col justify-center items-start space-y-2 md:space-y-0 md:space-x-2 w-full gap-0 md:gap-2"
      >
        <TabsList className=" w-full space-x-2 mb-2 flex-wrap h-auto justify-start items-center">
          {ObjectEntries.map(([key]) => (
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
          <TabsContent key={key} value={key} className="w-full px-0 md:px-3">
            <RankingsCard
              products={Array.isArray(value) ? value : []}
              cardTitle={`Top 10 ${key}`}
              errorMsg={`No ${key} available`}
              rankingCardClass={cn("my-2 md:my-0 w-full")}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}