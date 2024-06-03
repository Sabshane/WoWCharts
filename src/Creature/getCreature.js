
export default async function getCreature(creatureID) {
    const baseUrl = process.env.REGION + ".api.blizzard.com"
    const url = `https://${baseUrl}/data/wow/creature/${creatureID}`
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
        return data
    } catch (error) {
        console.error('Fetch error:', error)
    }
}
