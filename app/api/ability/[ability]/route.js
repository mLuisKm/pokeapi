import { NextResponse } from 'next/server'
import { getCapablePokemon } from "@/lib/pokemon.js"

export async function GET(request, { params }) {
    const paramsProps = await params
    const { ability } = paramsProps
    try {
        const capablePokemons = await getCapablePokemon(ability)
        return new NextResponse(JSON.stringify(capablePokemons), {
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
            JSON.stringify({ error: 'Error fetching pokemons that can perform the ability' }),
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