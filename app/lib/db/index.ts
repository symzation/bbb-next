import { config } from "dotenv"
import { drizzle } from 'drizzle-orm/mysql2'
import mysql from 'mysql2/promise'
import * as schema from '@/lib/db/schema'

config({ path: ".env" })

const dbURL = process.env.DATABASE_URL as string

if (!dbURL) {
  throw new Error('DATABASE_URL is not set')
}

const poolConnection = mysql.createPool({
  uri: dbURL,
  connectionLimit: 10 
})

export const db = drizzle(poolConnection, { schema, mode: 'default' })


//const dbClose = db.$client.end() 
//export const dbClose = db.$client.end() 

//export { db }
