import mysql from 'mysql2/promise'

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env

export async function DbConnect() {
    const dbSettings = {
        host: DB_HOST,
        port: Number(DB_PORT),
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME
    }

    const connection = await mysql.createConnection(dbSettings)
    return connection
}