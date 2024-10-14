import React, { useEffect, useState } from 'react'
import './Reservations.css'
import { getAllRooms } from '../../Services/room.services'
import { CSelect } from '../../components/CSelect/CSelect'
import { CInputs } from '../../components/CInputs/CInputs'

export const Reservations = () => {
  const passport = JSON.parse(localStorage.getItem("passport"))
  let token = null
  let userId = null
  if (passport) {
    token = passport.token
    userId = passport.tokenData.id
  }

  const [allRooms, setAllRooms] = useState([])
  const [roomId, setRoomId] = useState("")
  const [errorMessage, setErrorMessage] = useState(false)
  const [dateForReservation, setDateForReservation] = useState(
    {
      entry_date: "",
      exit_date: ""
    }
  )

  useEffect(() => {
    if (passport) {
      const bringElements = async () => {
        const brinAllRooms = await getAllRooms()
        console.log(brinAllRooms)
        if (brinAllRooms.success) {
          setAllRooms(brinAllRooms.data)
        }
      };
      bringElements()
    }

  }, [])

  const handleRoomId = (e) => {
    setRoomId(e.target.value)
  }

  const handleEvents = (e) => {
    setDateForReservation((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendBtn = async () => {
    if(!dateForReservation.entry_date || !dateForReservation.exit_date || !roomId) {
        setErrorMessage(true)
    } else {
      setErrorMessage(false)
    }
  }

  const today = new Date().toISOString().slice(0, 16);

  return (
    <>
      <CSelect name={'room_id'} category={'All Rooms'} options={allRooms} onChange={handleRoomId} />
      <CInputs type='datetime-local' name='entry_date' onChange={handleEvents} min={today}/>
      <CInputs type='datetime-local' name='exit_date' onChange={handleEvents} min={today}/>
      <p className={errorMessage ? "" : "hidden-content" }>All values are required</p>
      <CInputs type='button' name='save' value='Send' onClick={sendBtn}/>
    </>
  )
}
