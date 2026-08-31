import { config } from "dotenv"
import { defineConfig, type Config } from 'drizzle-kit'

config({ path: ".env" })

const dbURL = process.env.DATABASE_URL as string

if (!dbURL) {
  throw new Error('DATABASE_URL is not set')
}

export default defineConfig({
  schema: './app/lib/db/schema.ts',
  out: './drizzle/migrations',
  dialect: 'mysql',
  dbCredentials: {
    url: dbURL,
  },
  migrations: {
    table: "__table-migrations__",
  },
  breakpoints: true,
  strict: true,
  verbose: true,
}) satisfies Config