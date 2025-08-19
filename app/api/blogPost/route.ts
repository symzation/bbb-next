// import the Request and Response classes

import { NextResponse, NextRequest } from 'next/server'
import { contentfulClient } from '@/lib/contentfulClient';

export async function GET(request: NextRequest) {
  try {
    const slug = request.nextUrl.searchParams.get('slug')

    const entries:any = await contentfulClient.getEntries({ 
      content_type: process.env.CONTENTFUL_BLOG_TYPE,
      limit: 1,
      "fields.newsSlug": slug,
    })

    return NextResponse.json(entries)
  } catch (error) {
    console.error('Error fetching Contentful entries:', error)
    return NextResponse.json({})
  }
}