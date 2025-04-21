//npm init / npm install express / npm install --save-dev nodemon
//package.json->scripts->"dev": "nodemon app.js" / npm run dev
const express = require('express')
const app = express()
const {getPokemon, getCapablePokemon} = require('./pokemon')
const { byPokemonCache, byAbilityCache } = require('./cacheDB.js')

const PORT = 3001

app.get('/cache', async function(req, res) {
    res.json({
        byPokemon: await byPokemonCache.select(),
        byAbility: await byAbilityCache.select()
        })
})

app.get('/pokemon/:name', async function (req, res) {
    const id = req.params.name
    const pokemon = await getPokemon(id)
    res.json(pokemon)
    console.log(pokemon)
})

app.get('/ability/:name', async function (req, res) {
    const ability = req.params.name
    const capablePokemons = await getCapablePokemon(ability)
    res.json(capablePokemons)
    console.log(capablePokemons)
})

app.listen(PORT, () => {console.log(`Servidor iniciado en el puerto ${PORT}`)})