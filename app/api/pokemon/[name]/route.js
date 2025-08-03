import { NextResponse } from 'next/server'
import { getPokemon } from "@/lib/pokemon.js"

export async function GET(request, { params }) {
    const paramsProps = await params
    const { name } = paramsProps
    try {
        const pokemon = await getPokemon(name)

        return new NextResponse(JSON.stringify(pokemon), {
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
            JSON.stringify({ error: 'Error fetching pokemon' }),
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