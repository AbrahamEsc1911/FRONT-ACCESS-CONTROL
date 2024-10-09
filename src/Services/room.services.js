const URL = 'http://localhost:3040/api/rooms'

export const getAllRooms = async () => {
    try {
        const response = await fetch(`${URL}`, {
            method: 'GET',
            headers: {
                "Content-type": "application/json"
            }
        })

        return await response.json()

    } catch (error) {
        console.error(`Error fetching data ${error}`)
    }
}