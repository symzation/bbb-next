import { headers } from "next/headers"
import { styles } from "@/utils/constants"
import { cn } from "@/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import RankingsCard from "@/components/Rankings/RankingsCard"
import { getProductRankings } from "@/lib/db/actions/index"

export default async function Rankings() {
  const rankingsData = await getProductRankings()
  const objEntries = Object.entries(rankingsData ?? {})
  console.log("objEntries:", objEntries)
  console.log("rankingsData: ", rankingsData)
  const tabToShow = objEntries[0][0]
  
  return (
    <div className={cn("mt-10 px-2.5 md:px-8")}> 
      <h1 className={styles.headingTitle}>Rankings</h1>
      <p className={styles.paragraph}>
        This page showcases the highest-ranking beverages and food bites across Bourbon, Whiskey, Coffee, Wine, Beer, Tequila, Rum, and curated food pairings—bringing together the very best that Bourbon, Brew & Bites has to offer. Each ranking reflects countless tastings, comparisons, and thoughtful discussions, highlighting standout selections that consistently deliver on quality, character, and overall experience. Whether you’re searching for a top-shelf pour, a bold roast, or the perfect bite to complement your drink, this page serves as a trusted starting point.
      </p>
      <p className={styles.paragraph}>
        The rankings presented here are based entirely on the collective opinions of the Bourbon, Brew & Bites reviewers and committee. Every featured item has been evaluated through a balanced lens that considers flavor, aroma, craftsmanship, value, and enjoyability. While personal taste will always play a role, these rankings aim to represent a well-rounded consensus shaped by experience, passion, and a shared appreciation for exceptional beverages and food.
      </p>
      <p className={cn(styles.paragraph, "mb-10")}>
        Ultimately, this page is designed to inform, inspire, and spark conversation. The lists are not declarations of universal truth, but reflections of what stood out most to our team at the time of review. As palates evolve and new offerings emerge, rankings may shift—ensuring that Bourbon, Brew & Bites remains a living, breathing celebration of discovery, craftsmanship, and the joy of sharing great drinks and bites.
      </p>
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
    </div>
  )
}