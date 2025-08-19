import { BlogPostPageProps, BlogPostProps } from "@/types/types"
import ExploreMoreLink from "@/components/ExploreMoreLink/ExploreMoreLink"
import parse from "html-react-parser"

async function getBlogPost(slug: string) {
  const res = await fetch(`http://localhost:3000/api/blogPost?slug=${slug}`)
  if (!res.ok) {
    throw new Error('Failed to fetch blog posts')
  }
  return res.json() || []
}

export default async function BlogPost({ 
  params 
}: BlogPostPageProps) {
  const { slug } = await params
  const blogPostData = await getBlogPost(slug)
  const postData: BlogPostProps = blogPostData?.items?.[0] ?? {}

  const getPostDateFormatted = (date: string, locale: string) => {
    return new Date(date).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getPostHTML = () => {
    const newsFields = postData?.fields
    const newsDate = newsFields?.newsDate ?? ''
    const locale = postData?.sys?.locale ?? 'en-US'
    const newsPostImage = newsFields?.newsImage ?? undefined

    return (
      <div>
        <ExploreMoreLink 
          arrowDirection='left'
          className="text-xsvg-third hover:text-third/75" 
          linkText="Back To Reviews" 
          linkUrl="/reviews" 
        />
        <div>
          <h1 className="text-xsvg-primary text-4xl font-bold uppercase pt-5 pb-2">
            {newsFields?.newsTitle}
          </h1>
          <div className="mb-6 ml-1">
            {getPostDateFormatted(newsDate, locale)}
          </div>
        </div>
        <img 
          src={`https:${newsPostImage?.fields.file.url}`} 
          alt={newsPostImage?.fields.title ?? ''} 
          className="aspect-video object-cover w-full h-auto md:max-h-[600px] mt-5 mb-10 block rounded-lg"
        />
        <div className="text-xsvg-secondary text-lg font-bold my-5 hidden">
          {newsFields?.newsAuthor && `Written By: ${newsFields?.newsAuthor}`} 
        </div>
        <div className="mx-2 md:mx-5">
          {newsFields?.newsContent && parse(newsFields?.newsContent)}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      {postData && getPostHTML()}
    </div>
  )
}
