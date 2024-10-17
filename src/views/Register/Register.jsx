import { useNavigate } from 'react-router-dom'
import { CInputs } from '../../components/CInputs/CInputs'
import { register } from '../../Services/auth.services'
import './Register.css'

import React, { useState } from 'react'
import { CBlockMain } from '../../components/CBlockMain/CBlockMain'

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
    const [messageServer, setMessageServer] = useState(false)
    const [erroMessage, setErroMessage] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => {
        setCredentials((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const sendRegister = async () => {
        if (!credentials.email || !credentials.name || !credentials.StartUp || !credentials.dni || !credentials.phone || !credentials.password) {
            setAllAreRequired(true)
            setPasswordLong(false)
            setErroMessage(false)
        }
        else if (credentials.password.length < 8 || credentials.password.length > 12) {
            setPasswordLong(true)
            setAllAreRequired(false)
            setErroMessage(false)
        }
        else {
            setAllAreRequired(false);
            setPasswordLong(false);
            setErroMessage(false)

            const response = await register(credentials);

            if (response.success) {
                navigate("/login")
            } else {
                setMessageServer(true)
            }
        }
    }

    const goToLogin = () => {
        navigate('/login')
    }

    return (
        <>

            <div className="register-view-main">
        <div className="section-register-container">
          <CBlockMain
            content={
              <div className="register-container">
                <h2 className="text-no-margin">Sing Up</h2>
                <CInputs
                  type="text"
                  name="name"
                  placeholder="Name"
                  onChange={handleChange}
                  className="input-register"
                />
                <CInputs
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  className="input-register"
                />
                <CInputs
                  type="email"
                  name="StartUp"
                  placeholder="StartUp"
                  onChange={handleChange}
                  className="input-register"
                />
                <CInputs
                  type="text"
                  name="phone"
                  placeholder="phone"
                  onChange={handleChange}
                  className="input-register"
                />
                <CInputs
                  type="text"
                  name="dni"
                  placeholder="dni"
                  onChange={handleChange}
                  className="input-register"
                />
                <CInputs
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  className="input-register"
                />
                <p className={allAreRequired ? "" : "hident-content"}>
                  Email y contraseña son requeridos
                </p>
                <p className={passwordLong ? "" : "hident-content"}>
                  La contraseña debe ser entre 8 y 12 caracteres
                </p>
                <p className={messageServer ? "" : "hident-content"}>try with another email</p>
                <div>
                  <CInputs
                    type="button"
                    value="Sing Up"
                    onClick={sendRegister}
                    className="button-register"
                  />
                  <p className="text-no-margin">Already have an acount? <span className="special-text" onClick={goToLogin}>Login</span></p>
                </div>
              </div>
            }
          />
        </div>
        <div className="section-register-image">
          <img src="./images/logonaves.svg" alt="image-main-register" id="banner-home-main"/>
        </div>
      </div>
        </>
    )
}
