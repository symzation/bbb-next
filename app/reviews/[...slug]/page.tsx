'use client'

import { Metadata } from "next"
import { useParams } from "next/navigation"
import { styles } from "@/utils/constants"
import { cn } from "@/utils"
import { notFound } from 'next/navigation'
import CategoryView from "@/components/Reviews/CategoryView"
import ReviewView from "@/components/Reviews/ReviewView"

//import { BlogPostPageProps } from "@/types/types"
import BlogPost from "@/components/Blog/BlogPost"

/* const metadata: Metadata = {
  title: 'Reviews - ${process.env.NEXT_PUBLIC_SITENAME}`,
  description: `Read the latest reviews on fine spirits, craft beers, wines, coffees, and great food at ${process.env.NEXT_PUBLIC_SITENAME}. Discover honest opinions and immersive storytelling from our community of reviewers.`,
} */

/* export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.ogImage],
    },
  };
} */

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

