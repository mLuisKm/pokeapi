import { supabase } from './conexion.js'

export const byPokemonCache = {
    async byName(pokemonName) {
        const { data: byPokemon, error } = await supabase
            .from('byPokemon')
            .select('*')
            .eq('pokemon_name', pokemonName)
        if (error) throw error
        return {
            data: byPokemon[0]?.data,
            date: byPokemon[0]?.created_at
        }
    },

    async byId(pokemonId) {
        const { data: byPokemon, error } = await supabase
            .from('byPokemon')
            .select('*')
            .eq('pokemon_id', pokemonId)
        if (error) throw error

        return {
            data: byPokemon[0]?.data,
            date: byPokemon[0]?.created_at
        }
    },

    async delete(pokeName) {
        const { error } = await supabase
            .from('byPokemon')
            .delete()
            .eq('pokemon_name', pokeName)
        if (error) throw error
    },

    async insert(id, name, response) {
        const { error } = await supabase
            .from('byPokemon')
            .insert([
            {
                pokemon_id: id,
                pokemon_name: name,
                data: response
            }
            ])
        if (error) throw error
    },

    async select() {
        const { data: byPokemon, error } = await supabase
            .from('byPokemon')
            .select('pokemon_name,data')
        if (error) throw error
        return byPokemon
    }
}

export const byAbilityCache = {
    async byName(abilityName) {
        const { data: byAbility, error } = await supabase
            .from('byAbility')
            .select('*')
            .eq('ability_name', abilityName)
        if (error) throw error
        return {
            data: byAbility[0]?.data,
            date: byAbility[0]?.created_at,
            ability: byAbility[0]?.ability_name
        }
    },

    async byId(abilityId) {
        const { data: byAbility, error } = await supabase
            .from('byAbility')
            .select('*')
            .eq('ability_id', abilityId)
        if (error) throw error
        return {
            data: byAbility[0]?.data,
            date: byAbility[0]?.created_at,
            ability: byAbility[0]?.ability_name
        }
    },

    async delete(abilityName) {
        const { error } = await supabase
            .from('byAbility')
            .delete()
            .eq('ability_name', abilityName)
        if (error) throw error
    },

    async insert(id, name, response) {
        const { error } = await supabase
            .from('byAbility')
            .insert([
            {
                ability_id: id,
                ability_name: name,
                data: response
            }
            ])
        if (error) throw error
    },

    async select() {
        const { data: byAbility, error } = await supabase
            .from('byAbility')
            .select('ability_name,data')
        if (error) throw error
        return byAbility
    }
}
