import './Login.css'
import React, { useContext, useState } from 'react'
import { jwtDecode } from "jwt-decode";
import { CInputs } from '../../components/CInputs/CInputs'
import { login } from '../../Services/auth.services'
import { useNavigate } from 'react-router-dom'
import { NavBarContext } from '../../Context/NavBarContext/NavBarContext';
import { CBlockMain } from '../../components/CBlockMain/CBlockMain';

const Login = () => {

  const {setNavBar, navBar} = useContext(NavBarContext)
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
        setNavBar(true)
        navigate('/')
        setCredentialsIncorrect(false)
      } else {
        setCredentialsIncorrect(true)
      }
    }
  }

  const goToRegister = () => {
    navigate('/register')
  }

  return (
    <>
      <div className="login-view-main">
        <div className="section-login-container">
          <CBlockMain
            content={
              <div className="login-container">
                <h2 className="text-no-margin">Login</h2>
                <div>
                  <CInputs
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    className="input-login"
                  />
                </div>
                <div>
                  <CInputs
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    className="input-login"
                  />
                </div>
                <p className={valuesRequired ? "" : "hidden-content"}>
                  Email and password are required.
                </p>
                <p className={passwordIncorrect ? "" : "hidden-content"}>
                  The password must be greater than 8 and less than 12
                  characters.
                </p>
                <p className={passwordIncorrect ? "" : "hidden-content"}>
                  Incorrect email or password.
                </p>
                <div>
                  <CInputs
                    type="button"
                    name="login"
                    value="Login"
                    onClick={loggin}
                    className="button-login"
                  />
                  <p className="text-no-margin">
                    Don't have an acoutn yet?{" "}
                    <span className="special-text" onClick={goToRegister}>
                      Sing up
                    </span>
                  </p>
                </div>
              </div>
            }
          />
        </div>
        <div className="section-login-image">
          <img src="./images/logonaves.svg" alt="login-main-image" id="banner-home-main" />
        </div>
      </div>
    </>
  )
}

export default Login