import './Login.css'
import React, { useState } from 'react'
import { jwtDecode } from "jwt-decode";
import { CInputs } from '../../components/CInputs/CInputs'
import { login } from '../../Services/auth.services'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const [credentials, setCredentials] = useState(
    {
      email: "",
      password: ""
    }
  )
  const [valuesRequired, setValuesRequired] = useState(false)
  const [passwordIncorrect, setPasswordIncorrect] = useState(false)
  const navigate = useNavigate()
  const [credentialsIncorrect, setCredentialsIncorrect] = useState(false)

  const handleChange = (e) => {
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const loggin = async () => {
    if (!credentials.email || !credentials.password) {
      setValuesRequired(true)
      setPasswordIncorrect(false)
    } else if (credentials.password.length < 8 || credentials.password.length > 12) {
      setPasswordIncorrect(true)
      setValuesRequired(false)
    } else {
      setValuesRequired(false)
      setPasswordIncorrect(false)

      const response = await login(credentials)
      console.log(response)
      if (response.success) {
        const tokenDecoded = jwtDecode(response.token);
        const passport = {
          token: response.token,
          tokenData: tokenDecoded
        };
        localStorage.setItem("passport", JSON.stringify(passport))
        navigate('/home')
        setCredentialsIncorrect(false)
      } else {
        setCredentialsIncorrect(true)
      }
    }
  }

  return (
    <>
      <h1>Login</h1>
      <CInputs type='text' placeholder='Email' name='email' onChange={handleChange} />
      <CInputs type='password' placeholder='Password' name='password' onChange={handleChange} />
      <p className={valuesRequired ? '' : 'hidden-content'}>Email and password are required</p>
      <p className={passwordIncorrect ? '' : 'hidden-content'}>password incorrect</p>
      <p className={credentialsIncorrect ? '' : 'hidden-content'}>Email or pasword invalid</p>
      <CInputs type='button' value='login' name='login' onClick={loggin} />
    </>
  )
}

export default Login