const { supabase } = require('./conexion.js')
module.exports = {
    byPokemonCache: {
        async byName (pokemonName) {
            let { data: byPokemon, error } = await supabase
            .from('byPokemon')
            .select("*")
            .eq('pokemon_name', pokemonName)
            return {
                    data: byPokemon[0]?.data,
                    date: byPokemon[0]?.created_at
                }
        },
        async byId (pokemonId) {
            let { data: byPokemon } = await supabase
            .from('byPokemon')
            .select("*")
            .eq('pokemon_id', pokemonId)
            console.log(`ById: ${byPokemon[0]?.data}`)
            return {
                data: byPokemon[0]?.data,
                date: byPokemon[0]?.created_at
            }
        },
        async delete(pokeName) {               
            const { data, error } = await supabase
            .from('byPokemon')
            .delete()
            .eq('pokemon_name', pokeName)
        },
        async insert(id, name, response) {
            const { data, error } = await supabase
            .from('byPokemon')
            .insert([
            {
                pokemon_id: id,
                pokemon_name: name,
                data: response
            }
            ])
        },
        async select() {
            let { data: byPokemon, error } = await supabase
            .from('byPokemon')
            .select('pokemon_name,data')
            return byPokemon
        }
    },
    byAbilityCache: {
        async byName(abilityName) {     
            let { data: byAbility, error } = await supabase
            .from('byAbility')
            .select("*")
            .eq('ability_name', abilityName)
            return {
                data: byAbility[0]?.data,
                date: byAbility[0]?.created_at,
                ability: byAbility[0]?.ability_name
            }
        },
        async byId(abilityId) {     
            let { data: byAbility, error } = await supabase
            .from('byAbility')
            .select("*")
            .eq('ability_id', abilityId)
            return {
                data: byAbility[0]?.data,
                date: byAbility[0]?.created_at,
                ability: byAbility[0]?.ability_name
            }
        },
        async delete(abilityName) {               
            const { data, error } = await supabase
            .from('byAbility')
            .delete()
            .eq('ability_name', abilityName)
        },
        async insert(id, name, response) {
            const { data, error } = await supabase
            .from('byAbility')
            .insert([
            {
                ability_id: id,
                ability_name: name,
                data: response
            }
            ])
        },
        async select() {
            let { data: byAbility, error } = await supabase
            .from('byAbility')
            .select('ability_name,data')
            return byAbility
        }
    }
}