import React, { useEffect, useState } from 'react'
import './MyReservations.css'
import { useNavigate } from 'react-router-dom'
import { getFutureReservationsByUserId } from '../../Services/access.services'
import { CBlockMain } from '../../components/CBlockMain/CBlockMain'
import { CTitleForStats } from '../../components/CTitleForStats/CTitleForStats'
import { CTextForStats } from '../../components/CTextForStats/CTextForStats'
import { CSection75 } from '../../components/CSection75/CSection75'
import { CSection25 } from '../../components/CSection25/CSection25'
import { CVisitsView } from '../../components/CVisitsView/CVisitsView'
import { CImageBlock } from '../../components/CImageBlock/CImageBlock'

export const MyReservations = () => {

  const passport = JSON.parse(localStorage.getItem("passport"))
  let token = null
  if (passport) {
    token = passport.token
  }

  const navigate = useNavigate()
  const [futureReservations, setFutureReservations] = useState([])
  const [serverMessage, setserverMessage] = useState("")
  const [showServerMessage, setshowServerMessage] = useState(false)

  useEffect(() => {
    if (passport) {
      const bringUserData = async () => {
        const bringReservations = await getFutureReservationsByUserId(token)
        console.log(bringReservations)
        if (bringReservations.success) {
          setFutureReservations(bringReservations.data)
          setshowServerMessage(false)
        } else {
          setserverMessage(bringReservations.message)
          setshowServerMessage(true)
        }
      };
      bringUserData()

    } else {
      navigate('/start')
    }

  }, [])


  return (
    <>
      <div className='body-myReservation'>
        <CSection75 content={
          <div>
            <CBlockMain content={
              <div className='stats-panel'>
                <CTitleForStats title1='PLACE' title2='STATE' title3='ENTRY' title4='EXIT' title5='E. HOUR' />
                {futureReservations.length > 0 && futureReservations.map((element) => {
                  const entryDate = new Date(element.entry_date);
                  const exitDate = new Date(element.exit_date);
                  return <div key={element.id}>
                    <CTextForStats text1={element.room.room} text2={element.state} text3={entryDate.toLocaleDateString()} text4={exitDate.toLocaleDateString()} text5={entryDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} />
                    {/* <div>{element.room.room}</div>
            <div>{element.state}</div>
            <div>Fecha de entrada: {entryDate.toLocaleDateString()}</div>
            <div>Hora de entrada: {entryDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
            <div>Fecha de salida: {exitDate.toLocaleDateString()}</div>
            <div>Hora de salida: {exitDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
            <div className={showServerMessage ? '' : 'hidden-content'}>{serverMessage}</div> */}
                  </div>
                })}
              </div>
            } />
          </div>
        } />
        <CSection25 content={
          <div>
            <CVisitsView />
            <CImageBlock />
          </div>
        } />
      </div>
    </>
  )
}
