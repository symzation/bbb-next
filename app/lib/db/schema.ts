import {
  boolean, int, timestamp, mysqlEnum, mysqlTable, primaryKey, 
  varchar, text, float, date, index, uniqueIndex
} from "drizzle-orm/mysql-core"
import type { AdapterAccountType } from "next-auth/adapters"

export const userRolesEnum = ["ADMIN", "AUTHOR", "AUTHOR_WAITING_APPROVAL", "USER"] as const
export const subTierEnum = ["FREE", "BASIC", "PREMIUM", "ELITE"] as const 

export const accounts = mysqlTable("account", 
  {
    userId: int("userId").notNull()
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
  (table) => [
    primaryKey({ name: 'provide_acct_id', columns: [table.provider, table.providerAccountId] })
  ]
)

export const addresses = mysqlTable("addresses", {
  id: int("id").primaryKey().autoincrement(),
  address: varchar("address", { length: 255 }).notNull(),
  address2: varchar("address2", { length: 255 }),
  city: varchar("city", { length: 100 }).notNull(),
  state: varchar("state", { length: 50 }),
  // Accommodates international zip codes
  postalCode: varchar("postalCode", { length: 20 }).notNull(), 
  /* countryId: int("countryId").notNull()
    .references(() => countries.id), */ // Foreign key reference to countries
  countryName: varchar("countryName", { length: 100 }).notNull(),
  countryCode: varchar("countryCode", { length: 10 }),
  phone: int("phone").notNull(),
  createdAt: timestamp("createdAt", { mode: "date", fsp: 3}).defaultNow()
    .notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date", fsp: 3}).defaultNow()
    .onUpdateNow().notNull(),
})

export const authenticators = mysqlTable("authenticator", 
  {
    credentialID: varchar("credentialID", { length: 255 }).notNull().unique(),
    userId: int("userId").notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    credentialPublicKey: varchar("credentialPublicKey", { length: 255 }).notNull(),
    counter: int("counter").notNull(),
    credentialDeviceType: varchar("credentialDeviceType", { length: 255 }).notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: varchar("transports", { length: 255 }),
  },
  (table) => [
    primaryKey({ name: 'cred_user_id', columns: [table.userId, table.credentialID] }),
  ]
)

// Need to add reviews relationships with authors
export const authors = mysqlTable("author", 
  {
    id: int("id").primaryKey().autoincrement(),
    userId: int("userId").notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    penName: varchar("penName", { length: 50 }).unique(),
    bio: text("bio"),
    whyReviewer: text("whyReviewer"),
    authorApproved: boolean("authorApproved").default(false),
    authorApprovedAt: timestamp("authorApprovedAt", { mode: "date", fsp: 3}),
    authorApprovedByUserId: int("authorApprovedById").notNull()
      .references(() => users.id, { onDelete: "cascade" }), 
    createdAt: timestamp("createdAt", { mode: "date", fsp: 3}).defaultNow()
      .notNull(),
    updatedAt: timestamp("updatedAt", { mode: "date", fsp: 3}).defaultNow()
      .onUpdateNow().notNull(),
  },
  (table) => [
    uniqueIndex("authors_penName_unique").on(table.penName),
  ]
)

export const awardsTypes = mysqlTable("awardType",{
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 100 }).unique(),
  image: varchar("image", { length: 255 }).notNull(),
  createdAt: timestamp("createdAt", { mode: "date", fsp: 3}).defaultNow()
    .notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date", fsp: 3}).defaultNow()
    .onUpdateNow().notNull(),
})

export const awards = mysqlTable("awards", 
  {
    userId: int("userId").notNull()
      .references(() => users.id, { onDelete: "cascade" }), // Foreign key to users
    awardTypeId: int("awardTypeId").notNull()
      .references(() => awardsTypes.id, { onDelete: "cascade" }), // Foreign key to awards
    dateReceived: date("dateReceived").notNull(),
  }, 
  (table) => [
    primaryKey({name: 'user_award_id', columns: [table.userId, table.awardTypeId] }),
  ]
)

export const products = mysqlTable("product", 
  {
    id: int("id").primaryKey().autoincrement(),
    productTypeId: int("productTypeId").notNull()
      .references(() => productTypes.id, { onDelete: "cascade" }),
    shopId: int("shopId").notNull()
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
  },
  (table) => [
    uniqueIndex("products_name_unique").on(table.name),
  ]
)

export const productTypes = mysqlTable("productType",{
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).unique(),
  //description: text("description"),
  createdAt: timestamp("createdAt", { mode: "date", fsp: 3}).defaultNow()
    .notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date", fsp: 3}).defaultNow()
    .onUpdateNow().notNull(),
})

export const reviews = mysqlTable("review", 
  {
    id: int("id").primaryKey().autoincrement(),
    title: varchar("title", { length: 200 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    // store rich text content as text
    content: text("content"),
    userId: int("userId").notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    productId: int("productId").notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    shopId: int("shopId").notNull()
      .references(() => shops.id, { onDelete: "cascade" }),
    createdAt: timestamp("createdAt", { mode: "date", fsp: 3}).defaultNow()
      .notNull(),
    updatedAt: timestamp("updatedAt", { mode: "date", fsp: 3}).defaultNow()
      .onUpdateNow().notNull(),
  },
  (table) => [
    index("reviews_title_idx").on(table.title),
    uniqueIndex("reviews_slug_unique").on(table.slug),
  ]
)

export const sessions = mysqlTable("session", {
  sessionToken: varchar("sessionToken", { length: 255 }).primaryKey(),
  userId: int("userId").notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
})
 
export const shopTypes = mysqlTable("shopType", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).unique(),
  createdAt: timestamp("createdAt", { mode: "date", fsp: 3}).defaultNow()
    .notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date", fsp: 3}).defaultNow()
    .onUpdateNow().notNull(),
})

export const shops = mysqlTable("shop", 
  {
    id: int("id").primaryKey().autoincrement(),
    name: varchar("name", { length: 255 }).unique(),
    shopTypeId: int("shopTypeId").notNull()
      .references(() => shopTypes.id, { onDelete: "cascade" }),
    addressId: int("addressId").notNull()
      .references(() => addresses.id, { onDelete: "cascade" }),
    description:text("description"),
    website: varchar("website", { length: 255 }),
    rating: float("rating").notNull().default(0.0),
    createdAt: timestamp("createdAt", { mode: "date", fsp: 3}).defaultNow()
      .notNull(),
    updatedAt: timestamp("updatedAt", { mode: "date", fsp: 3}).defaultNow()
      .onUpdateNow().notNull(),
  },
  (table) => [
    uniqueIndex("shops_name_unique").on(table.name),
  ]
)

export const shopsToAddresses = mysqlTable("shops_to_addresses", 
  {
    shopId: int("shopId").notNull()
      .references(() => shops.id, { onDelete: "cascade" }),// Foreign key to users
    addressesId: int("addressesId").notNull()
      .references(() => addresses.id, { onDelete: "cascade" }), // Foreign key to awards
  }, 
  (table) => [
    primaryKey({ name: 'shop_address_id', columns: [table.shopId, table.addressesId] }),
  ]
)

export const shopsToUsers = mysqlTable("shops_to_users", 
  {
    shopId: int("shopId").notNull()
      .references(() => shops.id, { onDelete: "cascade" }),// Foreign key to shops
    userId: int("userId").notNull()
      .references(() => users.id, { onDelete: "cascade" }), // Foreign key to users
  }, 
  (table) => [
    primaryKey({ name: 'shop_user_id', columns: [table.shopId, table.userId] }),
  ]
)

export const users = mysqlTable("user", 
  {
    id: int("id").primaryKey().autoincrement(),
    name: varchar("name", { length: 255 }),
    username: varchar("username", { length: 50 }).notNull().unique(),
    email: varchar("email", { length: 60 }).unique(),
    emailVerified: timestamp("emailVerified", { mode: "date", fsp: 3 }),
    image: varchar("image", { length: 255 }),
    password: varchar("password", { length: 100 }),
    //dob: timestamp("dob", { mode: "date", fsp: 3 }),
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
  },
  (table) => [
    uniqueIndex("users_username_unique").on(table.username),
    uniqueIndex("users_email_unique").on(table.email),
  ]
)

export const verificationTokens = mysqlTable("verificationToken", {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (table) => [
    primaryKey({ name: 'ident_token_id', columns: [table.identifier, table.token] }),
  ]
)
