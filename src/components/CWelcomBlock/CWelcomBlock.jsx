import React, { useEffect, useState } from 'react'
import './CWelcomBlock.css'
import { CBlockMain } from '../CBlockMain/CBlockMain'
import { userProfile } from '../../Services/user.services'

export const CWelcomBlock = () => {

    const passport = JSON.parse(localStorage.getItem("passport"))
    let token = null
    if (passport) {
        token = passport.token
    }
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
        const bringData = async () => {
            const user = await userProfile(token)
            if(user.success) {
                setProfile(user.data)
            }
        };
        bringData()
      }
    }, [])
    

    return (
        <>
            <CBlockMain content={
                <div className='block-welcome'>
                    <div className='block-welcome-text'>
                        <div id='welcome-title'>
                            <h2>{`Hello ${profile.name}`}</h2>
                        </div>
                        <div id='welcome-parrafo'>
                            <p>It's good to see you again</p>
                        </div>
                    </div>
                    <div className='block-welcome-image'>
                        <img src="../images/profile.png" alt="" />
                    </div>
                </div>
            }
            />

        </>
    )
}
