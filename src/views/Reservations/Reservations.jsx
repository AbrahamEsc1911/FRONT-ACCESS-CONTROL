import React, { useEffect, useState } from 'react'
import { getAllRooms } from '../../Services/room.services'
import { CSelect } from '../../components/CSelect/CSelect'

export const Reservations = () => {
  const passport = JSON.parse(localStorage.getItem("passport"))
  let token = null
  let userId = null
  if (passport) {
    token = passport.token
    userId= passport.tokenData.id
  }

  const [allRooms, setAllRooms] = useState([])
  const [roomId, setRoomId] = useState("")
  const [dateForReservation, setDateForReservation] = useState(
    {
      entry_date: "",
      exit_date: ""
    }
  )

  useEffect(() => {
    if(passport) {
      const bringElements = async () => {
        const brinAllRooms = getAllRooms()
        if(brinAllRooms.success) {
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
    setDateForReservation({
        ...newAppointment,
        [e.target.name]: e.target.value,
    });
};

  return (
    <>
    <CSelect name={'room_id'} category={'All Rooms'} options={allRooms} onChange={handleRoomId}/>


    </>
  )
}
