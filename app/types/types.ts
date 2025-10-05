

/* export type HeroImageProps = {
  caption: string
  id: number
  imageUrl: string
  imageAlt: string
  newsSlug?: string
}

export type TurnstileStatusProp = "success" | "error" | "expired" | "required"

// Contact Form Values
export type ContactFormValues = {
  name: string
  email: string
  subject: string
  message: string
}

// Apply Form Values
export type ApplyFormSubmitValues = {
  firstName: string
  lastName: string
  email: string
  applyForCategory: 'competitive' | 'creator' | 'management' | undefined
  gamerTag: string
  discordTag: string
  twitter: string
  instagram: string
  tiktok: string
  youtube: string
  otherSocials: string
  competitiveTeamJoining: 'apex' | 'call-of-duty' | 'counter-strike' | 'marvel-rivals' | 
  'rainbow-six-siege' | 'rocket-league' | 'overwatch' | 'warzone' | 'none'
  competitiveExperience: 'lessYear' | 'oneToThree' | 'threePlus' | 'none'
  streamPlatform: 'ki' | 'tw' | 'yt' | 'none' 
  streamChannelHandle: string
  streamChannelStatus: 'affiliate' | 'partner' | 'none'
  interestInJoining: string
}

export type BlogPostProps = {
  fields: {
    newsAuthor: string
    newsContent: string
    newsDate: string | undefined
    newsImage: {
      fields: {
        file: {
          details: any
          url: string
        },
        title: string
      }
    },
    newsSlug: string
    newsTags: string[]
    newsSummary: string
    newsTitle: string
    publish: boolean
  }
  metadata: {
    tags: []
  }
  sys: {
    id: number
    locale: string
    contentType: {
      sys: {
        id: string
        linkType: string
        type: string
      }
    }
  }
}

export type BlogDataProps = { 
  total: number,
  items: BlogPostProps[] 
}

export type BlogPostPageProps = {
  params: {
    slug: string
  }
}
 */