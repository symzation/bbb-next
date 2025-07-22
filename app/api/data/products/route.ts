import { NextResponse, NextRequest } from 'next/server'
import { DbConnect } from '@/lib/db'

export async function GET(request: NextRequest) {
    try {
        const connection = await DbConnect()
        const query = 'SELECT * FROM Products'
        const [results] = await connection.execute(query)
        connection.end()
        return NextResponse.json({data: results})
    } catch (err) {
        const response = {error: (err as Error).message, data: []}
        return NextResponse.json(response)
    }
}