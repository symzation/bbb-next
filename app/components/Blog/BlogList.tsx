//import { FC, useEffect, useState } from 'react'
import Link from "next/link"
import { styles } from "@/constants/constants"
import { cn } from "@/utils/index"
import { BlogPostProps } from "@/types/types"
import { FaUserCircle } from "react-icons/fa"

async function getBlogPosts() {
  const res = await fetch(`http://localhost:3000/api/blogList`)
  if (!res.ok) {
    throw new Error("Failed to fetch blog posts")
  }
  return res.json() || []
}

type BlogLatestProps = {
  count: number
}

export default async function BlogLatest({
  count
}: BlogLatestProps) {
  const blogPostCount = count
  const blogEntries = await getBlogPosts()

  const getPostDateFormatted = (date: string, locale: string) => {
    return new Date(date).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getblogLatestList = () => {
    if (blogEntries && blogEntries?.total) {
      const blogItems = blogEntries.items.slice(0, blogPostCount)

      return blogItems.map((blogPost: BlogPostProps, idx: number) => {
        const blogPostId = blogPost?.sys?.id
        const blogFields = blogPost.fields
        const blogDate = blogFields?.newsDate ?? ''
        const locale = blogPost?.sys?.locale ?? 'en-US'
        const blogPostImage = blogFields?.newsImage
        const blogPostUrl = `/reviews/${blogFields.newsSlug}`

        return (
          <div key={blogPostId} className={cn(styles.blogGridItem)}>
            {blogPostImage && (
              <Link href={blogPostUrl}>
                <img 
                  src={`https:${blogPostImage.fields.file.url}`} 
                  alt={blogPostImage.fields.title} 
                  className={cn('aspect-video object-cover w-full block rounded-lg rounded-b-none')}
                />
              </Link>
            )}
            <div className={cn("w-full px-4 pb-5 border-b border-b-primary grow")}>
              <h3 className="text-primary text-2xl font-bold uppercase pt-5 pb-0.5">
                <Link 
                  href={blogPostUrl}
                  className={cn(styles.linkClass, 'hover:text-xsvg-primary no-underline')}
                >
                  {blogFields?.newsTitle}
                </Link>
              </h3>   
              <h5 className='text-base text-primary pb-5 pl-0.5 flex items-center'>
                <FaUserCircle className='w-5 h-5 mr-2 relative inline-block' /> 
                <span>{blogFields?.newsAuthor ?? 'Ronald J. Black'}</span>
              </h5>
              <p 
                className={cn(
                  styles.paragraph, 
                  'text-primary h-auto mr-1.5 mb-5 inline after:content-["..."]'
                )}
              >
                {blogFields?.newsSummary}
              </p>
              <div className={cn('h-10 max-h-10 py-2')}>
                {getPostDateFormatted(blogDate, locale)}
              </div>
            </div>
            <div className={cn("h-10 max-h-10 px-2 py-2 text-center")}>
              {getPostDateFormatted(blogDate, locale)}
            </div>
          </div>
        )
      })
    } else {
      return (
        <div className="text-error font-bold m-0 text-center list-none">
          There are currently no blog post at this time.
        </div>
      )
    }
  }

  return (
    <div className={cn(styles.pageClass, 'px-10')}>
      <div className={cn(styles.blogGrid, '')}>
        {getblogLatestList()}
      </div>
    </div>
  )
}