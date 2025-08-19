import { styles } from "@/constants/constants"
import { cn } from "@/utils"

type RankingCardProps = {
  products: any[]
  cardTitle: string
  errorMsg: string 
}

export default function RankingsCard({
  products,
  cardTitle,
  errorMsg
}: RankingCardProps) {
  return (
    <div className="border border-primary  w-full md:w-2/4">
      <h3 className="bg-primary py-2 text-sixth text-center">{cardTitle}</h3>
      <ul>
        {products.length > 0 ? 
          (products.map((product: any, index: number) => (
            <li key={product.id} className="p-2">
              {index + 1}. {product.name}
            </li>
          ))) : (
            <li className="p-2 text-error font-bold">{errorMsg}</li>
          ) 
        }
      </ul>
    </div>
  )
}