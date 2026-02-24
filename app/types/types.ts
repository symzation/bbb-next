import { ENUM_CHECK_STATE, ENUM_ROLE, ENUM_SUBSCRIPTION } from '@/types/enums'

export type AccountDataProps = {
  userId: number
  type: string
  provider: string
  providerAccountId: string
  refresh_token: string
  access_token: string
  expires_at: number
  token_type: string
  scope: string
  id_token: string
  session_state: string
}

export type AddressDataProps = {
  id: number
  address: string
  address2: string
  city: string
  state: string
  // Accommodates international zip codes
  postalCode: string 
  countryId: number // Foreign key reference to countries
  phone: number
  createdAt: Date
  updatedAt: Date
}

export type AuthContextProps = {
  user?: {
    id?: number | null
    name?: string | null
    username?: string | null
    email?: string | null
    image?: string | null
    bio?: string | null
    role?: string | null
    provider?: string | null
  }
  expires?: string
  status?: "authenticated" | "loading" | "unauthenticated"
  isAuthenticated?: boolean
} | null

export type AuthorDataType = {
  id?: number
  userId?: number
  penName?: string
  bio?: string
  whyReviewer?: string
  awards?: Award[]   
  authorApproved?: boolean
  authorApprovedAt?: Date
  approvedById?: number
  createdAt?: Date
  updatedAt?: Date
} & Record<string, any>

export type Award = {
  id: number
  title: string
  createdAt?: Date
  updatedAt?: Date
}

export type ProductDataProps = {
  id: number
  productTypeId: number
  shopId: number
  name: string
  description: string
  image: string
  productUrl: string
  rating: number
  createdAt: Date
  updatedAt: Date
}

export type ProductTypeDataProps = {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date
}

export type ReviewDataProps = {
  userId: number
} & Record<string, any>

export type SessionDataProps = {
  sessionToken: string
  userId: number
  expires: Date
} & Record<string, any>

// Extend the User type to include 'username'
export type SessionUser = {
  id?: string
  name?: string
  email?: string
  image?: string
  username?: string
}

export type ShopTypesDataProps = {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date
}

export type ShopDataProps = {
  id: number
  name: string | null
  shopTypeId: number
  //addressId?: number
  description: string | null
  website: string | null
  rating: number
  createdAt: Date
  updatedAt: Date
}

export type UserDataProps = {
  id?: number
  name?: string
  email: string
  username?: string
  emailVerified?: Date
  image?: string
  password?: string
  ageConsent?: boolean
  role?: ENUM_ROLE
  provider?: string 
  suspended?: boolean
  suspendedAt?: Date
  lastLogin?: Date
  subscription?: ENUM_SUBSCRIPTION 
  createdAt?: Date
  updatedAt?: Date
}


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