import { userMonthAccesses } from '../../Services/accessHistories.services'
import { CBlockMain } from '../CBlockMain/CBlockMain'
import './CVisitsView.css'

import React, { useEffect, useState } from 'react'

export const CVisitsView = () => {
  const passport = JSON.parse(localStorage.getItem('passport'))
  let token = null
  if(passport) {
    token = passport.token
  }

  const [numVisits, setnumVisits] = useState("")
  const [visits, setVisits] = useState("visits this month.")

  useEffect(() => {
    if(passport) {
      const bringUserHistories = async () => {
        const userVisits = await userMonthAccesses(token)
        if(userVisits.success) {
          setnumVisits(userVisits.data.length)
        } else {
          setnumVisits(0)
        }
      };

      bringUserHistories()
    }

  
  }, [])
  

  return (
    <>
    <CBlockMain content={
        <div className='visit-count-body'>
        <div className='visit-num'>
          <h1>{numVisits}</h1>
        </div>
        <div className='visit-text'>
          <p>{visits}</p>
        </div>
      </div>
    } />
    
    </>
  )
}
