import { CInputs } from '../../components/CInputs/CInputs'
import './Register.css'

import React, { useState } from 'react'

export const Register = () => {

    const [credentials, setCredentials] = useState(
        {
            name: "",
            StartUp: "",
            dni: "",
            phone: "",
            email: "",
            password: ""
        }
    )

    const [passwordLong, setPasswordLong] = useState(false)
    const [allAreRequired, setAllAreRequired] = useState(false)

    const handleChange = (e) => {
        setCredentials((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const sendRegister = () => {
        if (!credentials.email || !credentials.name || !credentials.StartUp || !credentials.dni || !credentials.phone || !credentials.password) {
            setAllAreRequired(true)
            setPasswordLong(false)
        }
        else if (credentials.password.length < 8 || credentials.password.length > 12) {
            setPasswordLong(true)
            setAllAreRequired(false)
        }
        else {
            setAllAreRequired(false);
            setPasswordLong(false);
            console.log('credenciales eviadas')
        }

    }

    return (
        <>
            <h1>Register</h1>
            <CInputs type='text' placeholder='Name*' name='name' onChange={handleChange} />
            <CInputs type='text' placeholder='StartUp*' name='StartUp' onChange={handleChange} />
            <CInputs type='text' placeholder='DNI*' name='dni' onChange={handleChange} />
            <CInputs type='number' placeholder='phone*' name='phone' onChange={handleChange} />
            <CInputs type='email' placeholder='Email*' name='email' onChange={handleChange} />
            <CInputs type='password' placeholder='Password' name='password' onChange={handleChange} />
            <p className={passwordLong ? "" : 'hident-content'}>password most be between 8 and 12 characters</p>
            <p className={allAreRequired ? "" : 'hident-content'}>all fields are required</p>
            <CInputs type='button' value='send' name='name' onClick={sendRegister} />
        </>
    )
}
