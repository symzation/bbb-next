import 'dotenv/config'
import { defineConfig } from 'prisma/config'

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: process.env.DATABASE_URL!,
    shadowDatabaseUrl: process.env.SHADOW_DATABASE_URL!

  },
  experimental: {
    externalTables: true, // This might be needed for external tables in conjunction
  },
  enums: {
    external: ["Role", "Subscription"],
  },
})