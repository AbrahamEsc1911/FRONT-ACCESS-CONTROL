import React from 'react'
import { CNavigation } from '../../components/CNavigation/CNavigation'
import './NavBar.css'

export const NavBar = () => {
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
                <div ><CNavigation path='/' content={<img className='nav-icon-middle' src="../images/exit.svg" alt="home-icon-nav"/>} /></div>
                </div>
            </div>
        </>
    )
}
