/* import 'dotenv/config'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import { PrismaClient } from '../../prisma/generated/prisma/client' // Adjust path if needed

const adapter = new PrismaMariaDb({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  //port: parseInt(process.env.DB_PORT!),
  database: process.env.DB_NAME,
  connectionLimit: 5,
  connectTimeout:60,
  socketTimeout: 3
})

const prisma = new PrismaClient({ adapter })

export { prisma } */


import { PrismaClient } from '../../prisma/generated/prisma/client'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
/* import type { 
  Account, DefaultSession, Profile, Session, User 
} from "@auth/core/types" */

const adapter = new PrismaMariaDb({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  //port: parseInt(process.env.DB_PORT!),
  database: process.env.DB_NAME,
  connectionLimit: 5,
  connectTimeout:60,
  socketTimeout: 3
})

const prisma = new PrismaClient({ adapter })

export { prisma, }


    