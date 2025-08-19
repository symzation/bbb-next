// import the Request and Response classes

import { NextResponse, NextRequest } from 'next/server'
import { contentfulClient } from '@/lib/contentfulClient';

export async function GET() {
  try {
    const entries:any = await contentfulClient.getEntries({ 
      content_type: process.env.CONTENTFUL_BLOG_TYPE || '',
      order: ['fields.newsDate']
    })

    return NextResponse.json(entries)
  } catch (error) {
    console.error('Error fetching Contentful entries:', error)
    return NextResponse.json({})
  }
}