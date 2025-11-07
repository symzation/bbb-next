import Link from "next/link"
import { styles } from "@/constants/constants"
import { cn } from "@/utils"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type RankingCardProps = {
  products: any[]
  cardTitle: string
  errorMsg: string 
  rankingCardClass?: string
}

export default function RankingsCard({
  products,
  cardTitle,
  errorMsg,
  rankingCardClass
}: RankingCardProps) {
  return (
    <div className="border border-primary w-full">
      <h3 className="bg-primary py-2 text-third text-center font-bold tracking-wide">{cardTitle}</h3>
      <Table>
        <TableHeader className="bg-third text-fifth">
          <TableRow>
            <TableHead className="text-center">Rank</TableHead>
            <TableHead className="w-min-32">Product</TableHead>
            <TableHead className="hidden md:table-cell">Company</TableHead>
            <TableHead className="text-center">Rating</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length > 0 ? (products.map((product: any, idx: number) => (
            <TableRow key={product.id} className="hover:bg-secondary/50">
              <TableCell className="font-medium text-center">{idx + 1}</TableCell>
              <TableCell className="w-min-32">{product.name}</TableCell>
              <TableCell className="hidden md:table-cell">{product.shopName}</TableCell>
              <TableCell className="text-center">{product.rating.toFixed(1)}</TableCell>
            </TableRow>
          ))) : (
            <TableRow>
              <TableCell colSpan={4} className="p-2 text-error font-bold text-center">{errorMsg}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}