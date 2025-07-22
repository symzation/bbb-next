import mysql from 'mysql2/promise'

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env

export async function DbConnect() {
    const dbSettings = {
        host: DB_HOST || 'localhost',
        port: Number(DB_PORT) || 3306,
        user: DB_USER || 'root',
        password: DB_PASSWORD || 'password',
        database: DB_NAME || '',
    }

    const connection = await mysql.createConnection(dbSettings)
    return connection
}