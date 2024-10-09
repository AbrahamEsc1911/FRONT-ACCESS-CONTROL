const URL = 'http://localhost:3040/api/access/'

export const Access = async (roomId, token) => {
    try {
        const response = await fetch(`${URL}/${roomId}`, {
            method: 'POST',
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