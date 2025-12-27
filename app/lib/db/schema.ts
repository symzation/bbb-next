import {
  boolean, int, timestamp, mysqlEnum, mysqlTable, primaryKey, 
  varchar, text, float, date
} from "drizzle-orm/mysql-core"
import type { AdapterAccountType } from "next-auth/adapters"
import { nanoid } from 'nanoid'

export const userRolesEnum = ["ADMIN", "AUTHOR", "AUTHOR_WAITING_APPROVAL", "USER"] as const
export const subTierEnum = ["FREE", "BASIC", "PREMIUM", "ELITE"] as const 

function generateUUID() {
  const len = Number(process.env.NANOLENGTH)
  return nanoid(len).replace('-','')
}

export const accounts = mysqlTable("account", 
  {
    userId: varchar("userId", { length: 255 }).notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: varchar("type", { length: 255 }).$type<AdapterAccountType>().notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: varchar("refresh_token", { length: 255 }),
    access_token: varchar("access_token", { length: 255 }),
    expires_at: int("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: varchar("id_token", { length: 2048 }),
    session_state: varchar("session_state", { length: 255 }),
  },
  (accounts) => [
    primaryKey({ columns: [accounts.provider, accounts.providerAccountId] })
  ]
)

export const addresses = mysqlTable("addresses", {
  id: varchar("id", { length: 100 }).primaryKey()
    .$defaultFn(() => generateUUID()),
  address: varchar("address", { length: 255 }).notNull(),
  address2: varchar("address2", { length: 255 }),
  city: varchar("city", { length: 100 }).notNull(),
  state: varchar("state", { length: 50 }),
  // Accommodates international zip codes
  postalCode: varchar("postal_code", { length: 20 }).notNull(), 
  countryId: varchar("country_id", { length: 255 }).notNull()
    .references(() => countries.id), // Foreign key reference to countries
  phone: int("phone").notNull(),
  createdAt: timestamp("createdAt", { mode: "date", fsp: 3}).defaultNow()
    .notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date", fsp: 3}).defaultNow()
    .onUpdateNow().notNull(),
})

export const authenticators = mysqlTable("authenticator", 
  {
    credentialID: varchar("credentialID", { length: 255 }).notNull().unique(),
    userId: varchar("userId", { length: 255 }).notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    credentialPublicKey: varchar("credentialPublicKey", { length: 255 }).notNull(),
    counter: int("counter").notNull(),
    credentialDeviceType: varchar("credentialDeviceType", { length: 255 }).notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: varchar("transports", { length: 255 }),
  },
  (authenticator) => [
    primaryKey({ columns: [authenticator.userId, authenticator.credentialID] }),
  ]
)

// Need to add reviews relationships with authors
export const authors = mysqlTable("authors", {
  id: varchar("id", { length: 100 }).primaryKey()
    .$defaultFn(() => generateUUID()),
  userId: varchar("userId", { length: 255 }).notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  penName: varchar("penName", { length: 50 }).unique(),
  bio: text("bio"),
  whyReviewer: text("whyReviewer"),
  authorApproved: boolean("authorApproved").default(false),
  authorApprovedAt: timestamp("authorApprovedAt", { mode: "date", fsp: 3}),
  authorApprovedByUserId: varchar("authorApprovedById", { length: 255 })
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt", { mode: "date", fsp: 3}).defaultNow()
    .notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date", fsp: 3}).defaultNow()
    .onUpdateNow().notNull(),
})

export const awards = mysqlTable("awards", {
  id: varchar("id", { length: 100 }).primaryKey()
    .$defaultFn(() => generateUUID()),
  title: varchar("title", { length: 255 }).unique(),
  image: varchar("image", { length: 255 }),
  createdAt: timestamp("createdAt", { mode: "date", fsp: 3}).defaultNow()
    .notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date", fsp: 3}).defaultNow()
    .onUpdateNow().notNull(),
})

export const countries = mysqlTable("countries", {
  id: varchar("id", { length: 100 }).primaryKey()
    .$defaultFn(() => generateUUID()),
  isoCode: varchar("iso_code", { length: 2 }).notNull().unique(),
  name: varchar("name", { length: 100 }).notNull(),
})

export const products = mysqlTable("products", {
  id: varchar("id", { length: 100 }).primaryKey()
    .$defaultFn(() => generateUUID()),
  productTypeId: varchar("productTypeId", { length: 255 }).notNull()
    .references(() => productTypes.id, { onDelete: "cascade" }),
  shopId: varchar("shopsId", { length: 255 }).notNull()
    .references(() => shops.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).unique(),
  description: text("description"),
  image: varchar("image", { length: 255 }),
  productUrl: varchar("productUrl", { length: 255 }),
  rating: float("rating").default(0.0),
  createdAt: timestamp("createdAt", { mode: "date", fsp: 3}).defaultNow()
    .notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date", fsp: 3}).defaultNow()
    .onUpdateNow().notNull(),
})

export const productTypes = mysqlTable("productTypes",{
  id: varchar("id", { length: 100 }).primaryKey()
    .$defaultFn(() => generateUUID()),
  name: varchar("name", { length: 255 }).unique(),
  createdAt: timestamp("createdAt", { mode: "date", fsp: 3}).defaultNow()
    .notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date", fsp: 3}).defaultNow()
    .onUpdateNow().notNull(),
})

export const sessions = mysqlTable("session", {
  sessionToken: varchar('sessionToken', { length: 255 }).primaryKey(),
  userId: varchar("userId", { length: 255 }).notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
})
 
export const shopTypes = mysqlTable("shopTypes", {
  id: varchar("id", { length: 100 }).primaryKey()
    .$defaultFn(() => generateUUID()),
  name: varchar("name", { length: 255 }).unique(),
  createdAt: timestamp("createdAt", { mode: "date", fsp: 3}).defaultNow()
    .notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date", fsp: 3}).defaultNow()
    .onUpdateNow().notNull(),
})

export const shops = mysqlTable("shops", {
  id: varchar("id", { length: 100 }).primaryKey()
    .$defaultFn(() => generateUUID()),
  name: varchar("name", { length: 255 }).unique(),
  productTypeId: varchar("productTypeId", { length: 255 }).notNull()
    .references(() => productTypes.id, { onDelete: "cascade" }),
  shopTypeId: varchar("shop_type_id", { length: 255 }).notNull()
    .references(() => shopTypes.id, { onDelete: "cascade" }),
  addressId: varchar("address_id", { length: 255 }).notNull()
    .references(() => addresses.id, { onDelete: "cascade" }),
  description:text("description"),
  website: varchar("website", { length: 255 }),
  rating: float("rating").notNull().default(0.0),
  createdAt: timestamp("createdAt", { mode: "date", fsp: 3}).defaultNow()
    .notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date", fsp: 3}).defaultNow()
    .onUpdateNow().notNull(),
})

export const shopsToAddresses = mysqlTable("shops_to_addresses", 
  {
    shopsId: varchar("shopsId", { length: 255 }).notNull()
      .references(() => shops.id, { onDelete: "cascade" }),// Foreign key to users
    addressesId: varchar("addresses_id", { length: 255 }).notNull()
      .references(() => addresses.id, { onDelete: "cascade" }), // Foreign key to awards
  }, 
  (addresses_to_shops) => [
    primaryKey({ columns: [addresses_to_shops.shopsId, addresses_to_shops.addressesId] }),
  ]
)

export const users = mysqlTable("user", {
  id: varchar("id", { length: 100 }).primaryKey()
    .$defaultFn(() => generateUUID()),
  name: varchar("name", { length: 255 }),
  username: varchar("username", { length: 50 }),
  email: varchar("email", { length: 60 }).unique(),
  emailVerified: timestamp("emailVerified", { mode: "date", fsp: 3 }),
  image: varchar("image", { length: 255 }),
  password: varchar("password", { length: 100 }),
  ageConsent: boolean("age_consent").notNull().default(false),
  role: mysqlEnum('role', userRolesEnum).notNull().default("USER"),
  suspended: boolean("suspended").notNull().default(false),
  suspendedAt: timestamp("suspended_at", { mode: "date", fsp: 3}),
  lastLogin: timestamp("last_login", { mode: "date", fsp: 3 }),
  subscription: mysqlEnum('subscription', subTierEnum).notNull().default("FREE"),
  createdAt: timestamp("createdAt", { mode: "date", fsp: 3}).defaultNow()
    .notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date", fsp: 3}).defaultNow()
    .onUpdateNow().notNull(),
})

export const usersToAwards = mysqlTable("users_to_awards", 
  {
    userId: varchar("userId", { length: 255 }).notNull()
      .references(() => users.id, { onDelete: "cascade" }), // Foreign key to users
    awardId: varchar("award_id", { length: 255 }).notNull()
      .references(() => awards.id, { onDelete: "cascade" }), // Foreign key to awards
    dateReceived: date("date_received").notNull(),
  }, 
  (users_to_awards) => [
    primaryKey({ columns: [users_to_awards.userId, users_to_awards.awardId] }),
  ]
)

export const verificationTokens = mysqlTable("verificationToken", {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationTokens) => [
    primaryKey({ columns: [verificationTokens.identifier, verificationTokens.token] }),
  ]
)
/* Review {
  id        Int       @id @default(autoincrement())
  title     String
  content   String?
  userId    Int
  productId Int
  shopId    Int
  createdAt DateTime  @default(now())
  updatedAt DateTime? @updatedAt
  product   Product   @relation(fields: [productId], references: [id], onDelete: Cascade)
  shop      Shop      @relation(fields: [shopId], references: [id], onDelete: Cascade)
  user      User      @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId, productId, shopId, title, createdAt])
  @@index([productId], map: "Review_productId_fkey")
  @@index([shopId], map: "Review_shopId_fkey")
}
*/
