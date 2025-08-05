import { NextResponse } from 'next/server'
import { getDataList } from "@/lib/pokemon.js"

export async function GET() {
    try {
        const datalist = await getDataList()

        return new NextResponse(JSON.stringify(datalist), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
        })
    } catch (error) {
        return new NextResponse(
            JSON.stringify({ error: 'Error fetching datalist' }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            }
        )
    }
}