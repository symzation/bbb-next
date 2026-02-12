'use client'

import { useParams } from "next/navigation"
import { styles } from "@/constants/constants"
import { cn } from "@/utils"
import { notFound } from 'next/navigation'
import CategoryView from "@/components/Reviews/CategoryView"
import ReviewView from "@/components/Reviews/ReviewView"



//import { BlogPostPageProps } from "@/types/types"
import BlogPost from "@/components/Blog/BlogPost"

export default function ReviewPost() {
  const params = useParams<{ slug?: string[] | string }>()
  console.log('Params: ', params)

  const slugParam = params?.slug
  const slugParts = Array.isArray(slugParam) ? slugParam : slugParam ? [slugParam] : []
  const category = slugParts[0]
  const slug = slugParts[1]

  const notFoundHandler = () => {
    notFound()
  }
  
  return (
    <div className="flex flex-col mt-10">
      <div className={cn(styles.pageClass, 'px-5 md:px-10')}>
        {/* <BlogPost params={params.slug} /> */}
        {category && !slug ? (
          <CategoryView category={category} />
        ) : category && slug ? (
          <ReviewView category={category} slug={slug} />
        ) : (
          notFoundHandler()
        )}
      </div>
    </div>
  )
}

