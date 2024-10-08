const URL = "http://localhost:3040/api/users"

export const userProfile = async (token) => {
    try {
        const response = await fetch(`${URL}`, {
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