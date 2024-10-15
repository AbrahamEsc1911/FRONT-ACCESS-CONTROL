import React, { useContext } from 'react'
import { CNavigation } from '../../components/CNavigation/CNavigation'
import './NavBar.css'
import { useNavigate } from 'react-router-dom'
import { NavBarContext } from '../../Context/NavBarContext/NavBarContext'

export const NavBar = () => {

    const {setNavBar, navBar} = useContext(NavBarContext)

    const navigate = useNavigate()

    const btnLogout = () => {
        localStorage.removeItem("passport");
        navigate('/login')
        setNavBar(false)

    }

    return (
        <>
            <div className='nav-main-content'>
                <div className='nav-logo'>
                    logo
                </div>
                <div className='nav-elements'>
                    <div ><CNavigation path='/' content={<img className='nav-icon-small' src="../images/home.svg" alt="home-icon-nav"/>} /></div>
                    <div ><CNavigation path='/reservations' content={<img className='nav-icon-small' src="../images/reservation.svg" alt="home-icon-nav"/>} /></div>
                    <div ><CNavigation path='/my-reservations' content={<img className='nav-icon-small' src="../images/historie.svg" alt="home-icon-nav"/>} /></div>
                </div>
                <div className='nav-exit'>
                <div onClick={btnLogout}><CNavigation path='/' content={<img className='nav-icon-middle' src="../images/exit.svg" alt="home-icon-nav"/>}/></div>
                </div>
            </div>
        </>
    )
}
