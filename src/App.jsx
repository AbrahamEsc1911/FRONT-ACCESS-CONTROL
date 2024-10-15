import { useContext } from 'react'
import './App.css'
import { Body } from './views/Body/Body'
import { NavBar } from './views/NavBar/NavBar'
import { NavBarContext } from './Context/NavBarContext/NavBarContext'

function App() {

  const { navBar, setNavBar } = useContext(NavBarContext)
  const passport = JSON.parse(localStorage.getItem('passport'))
  let token = null
  if (passport) {
    token = passport.token
    setNavBar(true)
  }



  return (
    <>
      <div>
        {navBar && (
          <div className="layout">
            <div className="navbar">
              <NavBar />
            </div>
            <div className="content">
              <Body />
            </div>
          </div>
        )
        }
      </div>
      <div>
        {!navBar && (
          <div className="content-container-full-width">
            <Body />
          </div>
        )}
      </div>

    </>
  )
}

export default App
