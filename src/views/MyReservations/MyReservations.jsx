import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getFutureReservationsByUserId } from '../../Services/access.services'

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
      navigate('./login')
    }

  }, [])


  return (
    <>
      <div>
        {futureReservations.length > 0 && futureReservations.map((element) => {
          const entryDate = new Date(element.entry_date);
          const exitDate = new Date(element.exit_date);
          return <div key={element.id}>
            <div>{element.room.room}</div>
            <div>{element.state}</div>
            <div>Fecha de entrada: {entryDate.toLocaleDateString()}</div>
            <div>Hora de entrada: {entryDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
            <div>Fecha de salida: {exitDate.toLocaleDateString()}</div>
            <div>Hora de salida: {exitDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
          </div>
        })}
      </div>

    </>
  )
}
