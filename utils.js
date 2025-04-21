module.exports = {
    async get(url) {
        const rawResponse = await fetch(url)
        return rawResponse.json()
    }
}