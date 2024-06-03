
export default async function searchCreature(searchTerm) {
    const baseUrl = process.env.REGION + ".api.blizzard.com"
    const url = `https://${baseUrl}/data/wow/search/creature?&name.en_US${searchTerm}`
    const headers = {
        "Battlenet-Namespace": "static-eu",
        "Authorization": `Bearer ${process.env.BLIZZARD_API_TOKEN}`,
        "locale": "en_US"
    };

    try {
        const response = await fetch(url, { headers })
    
        if (!response.ok) {
            throw new Error(`Error fetching creature: ${response.statusText}`)
        }

        const data = await response.json()
        console.log(data)

        return data
    } catch (error) {
        console.error('Fetch error:', error)
    }
}
