import { useState, useMemo } from "react"
import { styles } from "@/utils/constants"
import { cn } from "@/utils"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import { MdEdit, MdDelete } from "react-icons/md"
import { ProductTypeDataProps } from "@/types/types"
//import { getProductTypes } from "@/lib/db/products"

type ProductTypesListProps = {
  productTypes: ProductTypeDataProps[]
}

export default function ProductTypesList({ 
  productTypes 
}: ProductTypesListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Actions</TableHead>
          <TableHead className="w-auto">Name</TableHead>
          <TableHead className="w-auto">Created By</TableHead>
          <TableHead>Created</TableHead>
          <TableHead>Updated</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
       {productTypes.map((pt) => {
          return (
            <TableRow key={pt.id}>
              <TableCell>
                <div className="flex flex-row justify-start items-center space-x-4">
                  <MdDelete className="text-warning cursor-pointer hover:scale-125 transition-transform w-5 h-5" />
                  <MdEdit className="text-blue-500 cursor-pointer hover:scale-125 transition-transform w-5 h-5" />
                </div>  
              </TableCell>
              <TableCell className="font-medium">{pt.name}</TableCell>
              <TableCell>{pt.createdAt.toLocaleString()}</TableCell>
              <TableCell>{pt.updatedAt.toLocaleString()}</TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}