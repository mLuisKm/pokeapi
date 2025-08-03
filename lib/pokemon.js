import { get } from '../utils/utils.js';
import { byPokemonCache, byAbilityCache } from '../utils/cacheDB.js';

const methods = {
    evolves(evolution, pokemonChain) {
        if(Object.keys(evolution).length === 0) {
            return pokemonChain
        }
        if(evolution[0] == null) {
            pokemonChain.push({name: evolution.species.name, is_baby: evolution.is_baby})
            return methods.evolves(evolution.evolves_to, pokemonChain);
        } else {
            for (let i=0; i<evolution.length; i++) {
                pokemonChain.push({name: evolution[i].species.name, is_baby: evolution[i].is_baby})
            }
            return methods.evolves(evolution[0].evolves_to, pokemonChain);
        }
    },
    basics(pokemon) {
        return {name: pokemon.name, id: pokemon.id, height: pokemon.height, weight: pokemon.weight,
        sprites: {front: pokemon.sprites.front_default, back: pokemon.sprites.back_default}}
    },
    abilities(pokemon) {
        let pokemonAbilities = []
        for (let i=0; i<pokemon.abilities.length; i++) {
            pokemonAbilities.push({name: pokemon.abilities[i].ability.name,
            hidden: pokemon.abilities[i].is_hidden})
        }
        return pokemonAbilities
    },
    async serializeAbilities (pokeAbility) {
        const capablePokemons = await get(`https://pokeapi.co/api/v2/ability/${pokeAbility}`)
        let capable = []
        for (let i = 0; i<capablePokemons.pokemon.length; i++) {
            capable.push({name: capablePokemons.pokemon[i].pokemon.name, hidden: capablePokemons.pokemon[i].is_hidden})
        }
        return [capablePokemons.id,capablePokemons.name,capable]
    },
    async serializePokemon(pokeName) {
        const pokeResponse = await get(`https://pokeapi.co/api/v2/pokemon/${pokeName}/`)
        const speciesResponse = await get(pokeResponse.species.url)
        const evolutionResponse = await get(speciesResponse.evolution_chain.url)
        let pokemonChain = []
        let pokemon = {}
        pokemon = {basics: methods.basics(pokeResponse), abilities: methods.abilities(pokeResponse), 
            evolves: methods.evolves(evolutionResponse.chain, pokemonChain)}
        return [pokeResponse.id, pokeResponse.name, pokemon]
    },
    async cacheFill(id, name, response, cache) {
        const namedResponse = {};
        namedResponse[name] = response;
        cache(id, name, response)
        return namedResponse;
    },
    async webRequestPokemon(pokeIdentity) {
        try {
            const [id, name, response] = await methods.serializePokemon(pokeIdentity)
            await methods.cacheFill(id, name, response, byPokemonCache.insert);
            return response;
        } catch (error) {
            return {message: `Oops! That doesn’t look like a valid pokemon name or ID.`, description: error}
        }       
    },
    async webRequestCapable(pokeAbility) {
        try {
            const [id, name, response] = await methods.serializeAbilities(pokeAbility)
            await methods.cacheFill(id,name,response,byAbilityCache.insert);
            return {name, id, response}
        } catch (error) {
            return {message: `Oops! That doesn’t look like a valid ability name or ID.`, description: error}
        }
    }
}

export async function getPokemon(pokeIdentity) {
    const cacheData = (isNaN(parseInt(pokeIdentity)) ? await byPokemonCache.byName(pokeIdentity) : await byPokemonCache.byId(pokeIdentity))
    if (cacheData.data) {
        const supaDate = new Date(cacheData.date)
        const jsDate = new Date()
        const timeDiference = 5*60*1000
        if (jsDate-supaDate < timeDiference) {
            return cacheData.data;
        } else {
            byPokemonCache.delete(cacheData.data.basics.name)
            return methods.webRequestPokemon(pokeIdentity);
        }
    }
    return methods.webRequestPokemon(pokeIdentity);
}

export async function getCapablePokemon(pokeAbility) {
    const cacheData = (isNaN(parseInt(pokeAbility)) ? await byAbilityCache.byName(pokeAbility) : await byAbilityCache.byId(pokeAbility))
    if (cacheData.data) {
        const supaDate = new Date(cacheData.date)
        const jsDate = new Date()
        const timeDiference = 5*60*60*1000
        if (jsDate-supaDate < timeDiference) {
            return {name: cacheData.ability, response: cacheData.data};
        } else {
            byAbilityCache.delete(cacheData.ability)
            return methods.webRequestCapable(pokeAbility);
        }
    }
    return methods.webRequestCapable(pokeAbility)
}