import React, { useContext, useEffect, useState } from 'react'
import './Profile.css'
import { useNavigate } from 'react-router-dom'
import { userProfile } from '../../Services/user.services'
import { NavBarContext } from '../../Context/NavBarContext/NavBarContext'
import { CWelcomBlock } from '../../components/CWelcomBlock/CWelcomBlock'
import { CSectionOneProfile } from '../../components/CSectionOneProfile/CSectionOneProfile'
import { CBlockMain } from '../../components/CBlockMain/CBlockMain'

export const Profile = () => {

  const passport = JSON.parse(localStorage.getItem('passport'))
  let token = null
  if (passport) {
    token = passport.token
  }

  const { navBar, setNavBar } = useContext(NavBarContext)
  const navigate = useNavigate()
  const [userDataProfile, setUserDataProfile] = useState({
    name: "",
    email: "",
    phone: "",
    dni: "",
    StartUp: ""
  })

  useEffect(() => {
    if (passport) {
      const bringUserData = async () => {
        const bringUserProfile = await userProfile(token)
        setNavBar(true)
        if (bringUserProfile.success) {
          setUserDataProfile(bringUserProfile.data)
        } else {
          localStorage.removeItem("passport");
          navigate('/login')
        }
      };

      bringUserData()

    } else {
      navigate('/login')
    }
  }, [])

  return (
    <>
      <div className='body-profile'>
        <CWelcomBlock />
        <CBlockMain content={
          <div>
            <CSectionOneProfile name={userDataProfile.name} email={userDataProfile.email} phone={userDataProfile.phone} dni={userDataProfile.dni} StartUp={userDataProfile.StartUp} value={'edit'}/>
          </div>
        } />
      </div>

    </>
  )
}
