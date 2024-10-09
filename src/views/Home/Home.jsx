import React, { useEffect, useState } from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom'
import { userProfile } from '../../Services/user.services'
import { userMonthAccesses } from '../../Services/accessHistories.services'
import { CInputs } from '../../components/CInputs/CInputs'
import { getAllRooms } from '../../Services/room.services'

export const Home = () => {
  const passport = JSON.parse(localStorage.getItem("passport"))
  let token = null
  if (passport) {
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
  const [visits, setVisits] = useState("visits this month.")
  const [numVisits, setnumVisits] = useState("")
  const [popUp, setPopUp] = useState(false)
  const [roomsList, setRoomsList] = useState([])
  const [roomSelected, setRoomSelected] = useState('')
  const [valueRequiredForAccess, setValueRequiredForAccess] = useState(false)

  useEffect(() => {
    if (passport) {
      const homeData = async () => {
        const bringProfile = await userProfile(token)
        const brinUserHistoriesMonth = await userMonthAccesses(token)
        if (bringProfile.success) {
          setProfile(bringProfile.data)
        }

        if (brinUserHistoriesMonth.success) {
          setnumVisits(brinUserHistoriesMonth.data.length)
        } else {
          setnumVisits(0)
        }
        const bringRoomsList = await getAllRooms()
        if (bringRoomsList.success) {
          setRoomsList(bringRoomsList.data)
        }
      };
      homeData();
    } else {
      navigate('./login')
    }
  }, [])

  const btnReservations = () => {
    navigate('./reservations')
  }

  const btnEntryPopUp = () => {
    setPopUp(true)
  }

  const handledRoomSelected = (e) => {
    setRoomSelected(e.target.value)
    console.log(roomSelected)
  }

  const entryRoom = () => {
    if (roomSelected.length === 0) {
      setValueRequiredForAccess(true)
    } else {
      setValueRequiredForAccess(false)
    }
  }


  return (
    <>

      <div>
        {`Hello ${profile.name}`}
      </div>

      <div>
        {`${numVisits} ${visits}`}
      </div>

      <CInputs type='button' value='Reservations' name='reservations' onClick={btnReservations} />
      <CInputs type='button' value='access' name='access' onClick={btnEntryPopUp} />

      <div>
        <select name="Rooms" id="rooms" value={roomSelected} onChange={handledRoomSelected}>
          <option value="">Rooms..</option>
          {roomsList.map((room) => {
            return <option value={room.id} key={room.id} >{room.room}</option>
          })}
        </select>
        <p className={valueRequiredForAccess ? '' : 'hidden-content'}>Value required</p>
        <CInputs type='button' value='Entry' name='entry' onClick={entryRoom} />
      </div>

    </>
  )
}
