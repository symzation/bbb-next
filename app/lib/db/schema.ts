import {
  boolean, int, timestamp, mysqlEnum, mysqlTable, primaryKey, 
  varchar, text, float, date, index, uniqueIndex
} from "drizzle-orm/mysql-core"
import type { AdapterAccount } from "next-auth/adapters"

export const userRolesEnum = ["ADMIN", "AUTHOR", "AUTHOR_WAITING_APPROVAL", "USER"] as const
export const subTierEnum = ["FREE", "BASIC", "PREMIUM", "ELITE"] as const 

export const accounts = mysqlTable("account", 
  {
    userId: int("userId").notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: varchar("type", { length: 255 }).$type<AdapterAccount>().notNull(),
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
    primaryKey({ columns: [table.provider, table.providerAccountId] })
  ]
)

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
    primaryKey({ columns: [table.userId, table.credentialID] }),
  ]
)

// Need to add reviews relationships with authors
export const authors = mysqlTable("authors", {
  id: int("id").primaryKey().autoincrement(),
  userId: int("userId").notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  penName: varchar("penName", { length: 50 }).unique("authors_penName_unique"),
  bio: text("bio"),
  whyReviewer: text("whyReviewer"),
  authorApproved: boolean("authorApproved").default(false),
  authorApprovedAt: timestamp("authorApprovedAt", { mode: "date", fsp: 3}),
  authorApprovedByUserId: int("authorApprovedById")
    .references(() => users.id, { onDelete: "cascade" }), 
  createdAt: timestamp("createdAt", { mode: "date", fsp: 3}).defaultNow()
    .notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date", fsp: 3}).defaultNow()
    .onUpdateNow().notNull(),
})

export const awardTypes = mysqlTable("awardTypes",{
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 100 }).unique("awardType_name_unique"),
  image: varchar("image", { length: 255 }).notNull(),
  createdAt: timestamp("createdAt", { mode: "date", fsp: 3}).defaultNow()
    .notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date", fsp: 3}).defaultNow()
    .onUpdateNow().notNull(),
})

export const awards = mysqlTable("awards", {
    userId: int("userId").notNull()
      .references(() => users.id, { onDelete: "cascade" }), // Foreign key to users
    awardTypeId: int("awardTypeId").notNull()
      .references(() => awardTypes.id, { onDelete: "cascade" }), // Foreign key to awards
    dateReceived: date("dateReceived").notNull(),
  }, 
  (table) => [
    primaryKey({ columns: [table.userId, table.awardTypeId] }),
  ]
)

export const categories = mysqlTable("categories",{
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull().unique("categories_name_unique"),
  description: text("description"),
  tagline: text("tagline"),
  intro: text("intro"),
  isActive: boolean("isActive").notNull().default(true),
  createdAt: timestamp("createdAt", { mode: "date", fsp: 3}).defaultNow()
    .notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date", fsp: 3}).defaultNow()
    .onUpdateNow().notNull(),
})

export const categoryTypes = mysqlTable("categoryTypes",{
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull().unique("categoryTypes_name_unique"),
  categoryId: int("categoryId").notNull()
      .references(() => categories.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt", { mode: "date", fsp: 3}).defaultNow()
    .notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date", fsp: 3}).defaultNow()
    .onUpdateNow().notNull(),
})

export const reviews = mysqlTable("reviews", {
  id: int("id").primaryKey().autoincrement(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull()
    .unique("reviews_slug_unique"),
  authorId: int("authorId").notNull()
    .references(() => authors.id, { onDelete: "cascade" }),
  reviewTypeId: int("reviewTypeId").notNull()
    .references(() => reviewTypes.id, { onDelete: "cascade" }),
  // store rich text content as text
  categoryId: int("categoryId").notNull()
  .references(() => categories.id, { onDelete: "cascade" }),
  categoryTypesId: int("categoryTypesId").notNull()
    .references(() => categoryTypes.id, { onDelete: "cascade" }),
  content: text("content"),
  excerpt: text("excerpt"),

  // Whiskey Details Section
  distillery: varchar("distillery", { length: 200 }),
  location: varchar("location", { length: 255 }),
  age: varchar("age", { length: 100 }),
  blend: varchar("blend", { length: 255 }),
  mashBill: varchar("mashBill", { length: 255 }),
  finish: varchar("finish", { length: 255 }),
  finishingCasks: varchar("finishingCasks", { length: 255 }),
  batch: int("batch"),
  proof: int("proof"),
  limited: boolean("limited"),
  release: varchar("release", { length: 255 }),
  
  // Beer Details Section
  abv: int("abv"),
  ibu: int("ibu"),
  
  // Coffee Details Section
  roastLevel: varchar("roastLevel", { length: 100 }),
  aroma: varchar("aroma", { length: 100 }),
  tastingNotes: varchar("tastingNotes", { length: 255 }),

  /* processing: int("processingId").notNull()
    .references(() => processings.id, { onDelete: "cascade" }),
  beeanGrade: int("beeanGradeId").notNull()
    .references(() => beeanGrades.id, { onDelete: "cascade" }),
  originId: int("originId").notNull()
    .references(() => origins.id, { onDelete: "cascade" }),
  coffeeTypeId: int("coffeeTypeId").notNull()
    .references(() => coffeeTypes.id, { onDelete: "cascade" }), */
  
  
  price: int("price"),
  rating: float("rating").notNull().default(0.0),
  isDraft: boolean("isDraft").notNull().default(true),
  readyToPublish: boolean("readyToPublish").notNull().default(false),
  isPublished: boolean("isPublished").notNull().default(false),
  publishedAt: timestamp("publishedAt", { mode: "date", fsp: 3}),
  publishedByUserId: int("publishedByUserId")
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt", { mode: "date", fsp: 3}).defaultNow()
    .notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date", fsp: 3}).defaultNow()
    .onUpdateNow().notNull(),
})

export const reviewTypes = mysqlTable("reviewTypes", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull().unique("reviewTypes_name_unique"),
  isActive: boolean("isActive").notNull().default(true),
  createdAt: timestamp("createdAt", { mode: "date", fsp: 3}).defaultNow()
    .notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date", fsp: 3}).defaultNow()
    .onUpdateNow().notNull(),
})

export const sessions = mysqlTable("session", {
  sessionToken: varchar("sessionToken", { length: 255 }).primaryKey(),
  userId: int("userId").notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
})
 
export const users = mysqlTable("user", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }),
  username: varchar("username", { length: 60 }).unique("users_username_unique"),
  email: varchar("email", { length: 60 }).unique("users_email_unique"),
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
})

export const verificationTokens = mysqlTable("verificationToken", {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.identifier, table.token] }),
  ]
)
