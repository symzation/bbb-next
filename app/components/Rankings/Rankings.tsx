import { headers } from 'next/headers'
import { styles } from "@/constants/constants"
import { cn } from "@/utils"
import RankingsCard from "@/components/Rankings/RankingsCard"

async function getBourbons(origin: string) {
  const res = await fetch(`${origin}/api/data/products`)
  if (!res.ok) {
    throw new Error('Failed to fetch bourbons')
  }
  return res.json() || []
}

async function getCafes(origin: string) {
  const res = await fetch(`${origin}/api/data/products`)
  if (!res.ok) {
    throw new Error('Failed to fetch cafes')
  }
  return res.json() || []
}


async function getBreweries(origin: string) {
  const res = await fetch(`${origin}/api/data/products`)
  if (!res.ok) {
    throw new Error('Failed to fetch cafes')
  }
  return res.json() || []
}


async function getBites(origin: string) {
  const res = await fetch(`${origin}/api/data/products`)
  if (!res.ok) {
    throw new Error('Failed to fetch cafes')
  }
  return res.json() || []
}

type RankingProps = {
}

export default async function Rankings({
}: RankingProps) {
  const headersList = await headers()
  const host = headersList.get('host')
  const protocol = headersList.get('x-forwarded-proto') === 'https' ? 'https' : 'http'
  const origin = `${protocol}://${host}`

  const bourbons = await getBourbons(origin)
  const cafes = await getCafes(origin)
  const breweries = await getBreweries(origin)
  const bites = await getBites(origin)

  return (
    <>
      <div className={styles.rankingsWrapper}>
        <RankingsCard 
          products={bourbons?.data ?? []} 
          cardTitle="Top 5 Bourbons" 
          errorMsg="No bourbons available" 
        />
        <RankingsCard 
          products={cafes?.data ?? []} 
          cardTitle="Top 5 Cafe" 
          errorMsg="No cafes available" 
        />
      </div>
      <div className={styles.rankingsWrapper}>
        <RankingsCard 
          products={breweries?.data ?? []} 
          cardTitle="Top 5 Breweries" 
          errorMsg="No breweries available" 
        />
        <RankingsCard 
          products={bites?.data ?? []} 
          cardTitle="Top 5 Bites" 
          errorMsg="No bites available" 
        />
      </div>
    </>
  )
}