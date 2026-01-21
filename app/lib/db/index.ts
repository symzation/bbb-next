import { drizzle } from 'drizzle-orm/mysql2'
import mysql from 'mysql2/promise'
import * as schema from '@/lib/db/schema'

/* const dbURL = process.env.DATABASE_URL as string

if (!dbURL) {
  throw new Error('DATABASE_URL is not set')
} */

const poolConnection = mysql.createPool({
  uri: process.env.DATABASE_URL as string,
  connectionLimit: 10 
})

// Declare a global variable to store the database instance in development
// This prevents creating a new connection on every hot reload
declare global {
  // eslint-disable-next-line no-var
  var globalDb: any
}

let db: ReturnType<typeof drizzle<typeof schema>>
const connection = drizzle({ client: poolConnection as any, schema, mode: 'default' })

if (process.env.NODE_ENV === "production") {
  db = connection
} else {
  if (!globalThis.globalDb) {
    globalThis.globalDb = connection
  }
  db = globalThis.globalDb
}

//const dbClose = db.$client.end() 
//export const dbClose = db.$client.end() 

export { db }
