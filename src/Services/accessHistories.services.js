const URL = "http://localhost:3040/api/access_histories"

export const userMonthAccesses = async (token) => {
    try {
        const response = await fetch(`${URL}/month`, {
            method: 'GET',
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })

        return await response.json()
        
    } catch (error) {
        console.error(`Error fetching data ${error}`)
    }
}