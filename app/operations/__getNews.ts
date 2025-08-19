import { createClient } from 'contentful'

export const getNews = async () => {
 const newsClient = createClient({
    space: String(process.env.CONTENTFUL_ID),
    accessToken: String(process.env.CONTENTFUL_TOKEN)
  })

  const entries:any = await newsClient.getEntries({ 
    content_type: "xsvGNews",
    order: ['fields.newsDate']
  })
 
  return entries
}