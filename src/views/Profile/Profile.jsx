import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userProfile } from '../../Services/user.services'

export const Profile = () => {

  const passport = JSON.parse(localStorage.getItem('passport'))
  let token = null
  if (passport) {
    token = passport.token
  }

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
      <div>name: {userDataProfile.name}</div>
      <div>dni: {userDataProfile.dni}</div>
      <div>email: {userDataProfile.email}</div>
      <div>phone: {userDataProfile.phone}</div>
      <div>StartUp: {userDataProfile.StartUp}</div>
    </>
  )
}
