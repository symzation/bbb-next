import { defineConfig, type Config } from 'drizzle-kit'

export default defineConfig({
  schema: './app/lib/db/schema.ts',
  out: './drizzle/migrations',
  dialect: 'mysql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  migrations: {
    prefix: "timestamp",
    table: "__table-migrations__",
  },
  breakpoints: true,
  strict: true,
  verbose: true,
}) satisfies Config