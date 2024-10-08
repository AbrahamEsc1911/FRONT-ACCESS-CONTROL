const URL = "http://localhost:3040/api/auth"

export const register = async (credentials) => {
    try {
        const response = await fetch(`${URL}/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })

        return await response.json()

    } catch (error) {
        console.error(`Error fetching data ${error}`)
    }
}

export const login = async (credentials) => {
    try {
        const response = await fetch(`${URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })

        return await response.json()

    } catch (error) {
        console.error(`Error fetching data ${error}`)
    }
}