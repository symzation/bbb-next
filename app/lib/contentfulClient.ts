import { createClient } from 'contentful'

const { CONTENTFUL_ID, CONTENTFUL_TOKEN } = process.env

export const contentfulClient = createClient({
  space: String(CONTENTFUL_ID),
  accessToken: String(CONTENTFUL_TOKEN)
})
