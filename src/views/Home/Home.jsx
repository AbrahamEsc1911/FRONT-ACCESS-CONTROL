import React, { useEffect, useState } from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom'
import { userAccessHistories, userCurrentState, userProfile } from '../../Services/user.services'
import { userMonthAccesses } from '../../Services/accessHistories.services'
import { CInputs } from '../../components/CInputs/CInputs'
import { getAllRooms } from '../../Services/room.services'
import { access, exit } from '../../Services/access.services'
import { CVisitsView } from '../../components/CVisitsView/CVisitsView'
import { CWelcomBlock } from '../../components/CWelcomBlock/CWelcomBlock'

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
  const [btnToAccess, setbtnToAccess] = useState(false)
  const [accessNotGranted, setAccessNotGranted] = useState(false)
  const [historiesUser, setHistoriesUser] = useState([])
  const [noHistories, setNoHistories] = useState(false)

  useEffect(() => {
    if (passport) {
      const homeData = async () => {
        const bringProfile = await userProfile(token)
        const bringUserHistoriesMonth = await userMonthAccesses(token)
        const bringUserState = await userCurrentState(token)
        const bringRoomsList = await getAllRooms()
        const bringHistories = await userAccessHistories(1, token)

        if (bringProfile.success) {
          setProfile(bringProfile.data)
        }

        if (bringUserHistoriesMonth.success) {
          setnumVisits(bringUserHistoriesMonth.data.length)
        } else {
          setnumVisits(0)
        }

        if (bringRoomsList.success) {
          setRoomsList(bringRoomsList.data)
        }

        if (bringUserState.success) {
          setbtnToAccess(true)
        }

        if (bringHistories.success) {
          setHistoriesUser(bringHistories.data)
        } else {
          setNoHistories(true)
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

  const btnEntryPopUp = async () => {
    if (btnToAccess) {
      const response = await exit(token)
      if (response.success) {
        setbtnToAccess(false)
      }
    } else {
      setPopUp(true)
    }
  }

  const handledRoomSelected = (e) => {
    setRoomSelected(e.target.value)
  }

  const entryRoom = async () => {
    if (roomSelected.length === 0) {
      setValueRequiredForAccess(true)
    } else {
      setValueRequiredForAccess(false)
      const accessing = await access(roomSelected, token)
      if (accessing.success) {
        setbtnToAccess(true)
      } else if (accessing.message === 'acccess not granted because the room is already full') {
        setAccessNotGranted(true)
      }
    }
  }

  console.log(historiesUser)

  return (
    <>
      <div className='body-home'>
        <div className="section-60">
        <CWelcomBlock name={profile.name} />

        </div>
        <div className="section-40">

          <CVisitsView numVisits={numVisits} visits={visits} />
        </div>
      </div>


      <CInputs type='button' value='Reservations' name='reservations' onClick={btnReservations} />
      <CInputs type='button' value={btnToAccess ? 'Exit' : 'Access'} name={btnToAccess ? 'Exit' : 'Access'} onClick={btnEntryPopUp} />
      {/* COMPONETIZAR ESTE MENU DESPLEGABLE */}
      <div>
        <select name="Rooms" id="rooms" value={roomSelected} onChange={handledRoomSelected}>
          <option value="">Rooms..</option>
          {roomsList.map((room) => {
            return <option value={room.id} key={room.id} >{room.room}</option>
          })}
        </select>
        <p className={valueRequiredForAccess ? '' : 'hidden-content'}>Value required</p>
        <p className={accessNotGranted ? '' : 'hidden-content'}>acccess not granted because the room is already full</p>
        <CInputs type='button' value='Entry' name='entry' onClick={entryRoom} />
      </div>

      <div>
        {!noHistories && historiesUser?.length > 0 && (
          historiesUser.map((records) => {
            return (
              <div key={records.id}>
                <div>
                  {records.room.room}
                </div>
                <div>
                  {records.entry_date}
                </div>
                <div>
                  {records.exit_date}
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  )
}
