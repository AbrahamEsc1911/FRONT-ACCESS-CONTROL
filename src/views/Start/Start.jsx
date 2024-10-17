import React, { useEffect } from 'react'
import './Start.css'
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
    <>
      <div className="home-view-main">
        <div className="section-home-image">
          <img src="./images/logonaves.svg" alt="home-social-network-image" id="banner-home-main"/>
        </div>
        <div className="section-home-container">
          <div className="text-home-container">
            <h1>Access control</h1>
          </div>
          <div className="button-home-container">
            <CInputs type="button" value="Sing Up" onClick={btnRegister} className='register-button'/>
            <CInputs type="button" value="Login" onClick={btnLogin} className='login-button'/>
          </div>
        </div>
      </div>

    </>
  )
}
