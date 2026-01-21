"use client"

import { useState, useMemo, useEffect } from "react"
import { styles } from "@/constants/constants"
import { cn } from "@/utils"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
} from "@/components/ui/pagination"
import { ProductTypeDataProps, UserDataProps } from "@/types/types"
import { getProductTypes } from "@/lib/db/actions/index"
import ProductTypesList from "@/components/Dashboard/ProductTypes/List"
import ProductTypesForm from "@/components/Dashboard/ProductTypes/Form"

const ITEMS_PER_PAGE = 10

export default function ProductTypesDashboard() {
  const [productTypes, setProductTypes] = useState<ProductTypeDataProps[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)

  // Default items per page
  const totalPages = Math.ceil(productTypes.length / ITEMS_PER_PAGE)

  useEffect(() => {
    const loadProductTypes = async () => {
      const data = await getProductTypes()
      console.log("Loaded Product Types:", data)
      setProductTypes(data as ProductTypeDataProps[])
    }
    loadProductTypes()
  }, [])

  // Calculate the product types for the current page
  const paginatedProductTypes = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return productTypes.slice(startIndex, endIndex);
  }, [currentPage, productTypes])

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  /* const currentProductTypes = useMemo(() => {
    const startIndex = (currentPage - 1) * productTypesPerPage;
    const endIndex = startIndex + productTypesPerPage;
    return productTypes.slice(startIndex, endIndex);
  }, [currentPage, productTypesPerPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleUsersPerPageChange = (value: string) => {
    setProductTypesPerPage(Number(value))
    setCurrentPage(1) // Reset to the first page when changing page size
  } */

  return (
    <div className={cn(styles.pageClass, 'my-0')}>
      <h3 className={cn(styles.sectionTitle)}>Product Types Dashboard</h3>
      <ProductTypesForm />
      <ProductTypesList productTypes={paginatedProductTypes} />
      {/* Pagination Controls */}
      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(currentPage - 1);
              }}
              aria-disabled={currentPage === 1}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : undefined}
            />
          </PaginationItem>
          
          {/* Dynamically render page links */}
          {Array.from({ length: totalPages }, (_, index) => (
            <PaginationItem key={index + 1}>
              <PaginationLink
                href="#"
                isActive={currentPage === index + 1}
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(index + 1);
                }}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(currentPage + 1);
              }}
              aria-disabled={currentPage === totalPages}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : undefined}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <div className="flex justify-end text-sm text-muted-foreground mt-2">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  )
}