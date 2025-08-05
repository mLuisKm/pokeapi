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
            JSON.stringify({ message: 'Oops! That doesn’t look like a valid pokemon name or ID.' }),
            {
                status: 404,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            }
        )
    }
}