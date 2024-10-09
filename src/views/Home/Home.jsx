import React, { useEffect, useState } from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom'
import { userProfile } from '../../Services/user.services'

export const Home = () => {
    const passport = JSON.parse(localStorage.getItem("passport"))
    let token = null
    if(passport) {
        token = passport.token
    }
    const navigate = useNavigate()
    const [profile, setProfile] = useState(
        {
            name: "",
            StartUp: "",
            email: "",
            dni: "",
            phone: ""
        }
    )

    useEffect(() => {
      if(passport) {
        const homeData = async () => {
            const response = await userProfile(token)
            
            if(response.success) {
                setProfile(response.data)
            }
        };
        homeData();
      } else {
        navigate('./login')
      }
    }, [])
    

  return (
    <>

    <div>
        {`Hello ${profile.name}`}
    </div>

    </>
  )
}
