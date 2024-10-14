import React, { useEffect } from 'react'
import { CInputs } from '../../components/CInputs/CInputs'
import { useNavigate } from 'react-router-dom'

export const Start = () => {

  const passport = JSON.parse(localStorage.getItem('passport'))

  const navigate = useNavigate()

  useEffect(() => {
    if(passport) {
      navigate('/')
    }
  }, [])
  
  const btnRegister = () => {
    navigate('/register')
  }

  const btnLogin = () => {
    navigate('/login')
  }

  return (
    <div>
      
      Access Control app for the Naves

      <div>
      <CInputs type='button' name='Register' value='Register' onClick={btnRegister} />
      </div>
      <div>
      <CInputs type='button' name='Login' value='Login' onClick={btnLogin} />
      </div>

    </div>
  )
}
