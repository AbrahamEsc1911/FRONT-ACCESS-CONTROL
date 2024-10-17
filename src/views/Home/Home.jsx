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
import { CTitleForStats } from '../../components/CTitleForStats/CTitleForStats'
import { CBlockMain } from '../../components/CBlockMain/CBlockMain'
import { CTextForStats } from '../../components/CTextForStats/CTextForStats'
import { CSection60 } from '../../components/CSection60/CSection60'
import { CSection40 } from '../../components/CSection40/CSection40'
import { CImageBlock } from '../../components/CImageBlock/CImageBlock'

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
  const [popUp, setPopUp] = useState(false)
  const [roomsList, setRoomsList] = useState([])
  const [roomSelected, setRoomSelected] = useState('')
  const [valueRequiredForAccess, setValueRequiredForAccess] = useState(false)
  const [btnToAccess, setbtnToAccess] = useState(false)
  const [accessNotGranted, setAccessNotGranted] = useState(false)
  const [historiesUser, setHistoriesUser] = useState([])
  const [noHistories, setNoHistories] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (passport) {
      const homeData = async () => {
        const bringProfile = await userProfile(token)
        const bringUserState = await userCurrentState(token)
        const bringRoomsList = await getAllRooms()
        const bringHistories = await userAccessHistories(1, token)

        if (bringProfile.success) {
          setProfile(bringProfile.data)
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
      navigate('/start')
    }
  }, [])

  const btnReservations = () => {
    navigate('/reservations')
  }

  const btnEntryPopUp = async () => {
    if (btnToAccess) {
      const response = await exit(token)
      if (response.success) {
        setbtnToAccess(false)
      }
    } else {
      setPopUp(true)
      setIsModalOpen(true)
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
        setIsModalOpen(false)
      } else if (accessing.message === 'acccess not granted because the room is already full') {
        setAccessNotGranted(true)
      }
    }
  }

  const closePopUp = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <div className='body-home'>

        <CSection60 content={
          <div>
            <CWelcomBlock />
            <div className='block-home-btns'>
              <div id='btn-reservations'>
                <div id='btn-title' onClick={btnReservations}>
                  <h4>Reservations</h4>
                </div>
                <div id='btn-text'>
                  <p>make a new reservation</p>
                </div>
              </div>
              <div id={btnToAccess ? 'btn-exit' : 'btn-access'}>
                <div className='btn-access-title-text' onClick={btnEntryPopUp}>
                  <div>
                    <h4 id='btn-title'>{btnToAccess ? 'Exit' : 'Access'}</h4>
                  </div>
                  <div>
                    <p id='btn-text'>choose the room</p>
                  </div>
                </div>
                <div className='btn-access-icon'>
                </div>
              </div>
            </div>

            <div className='title-stats-panel'>
              <div className='title-pantel'>
                <h3>
                  Histories visits
                </h3>
              </div>
            </div>

            <CBlockMain content={
              <div className='stats-panel'>
                <CTitleForStats title1='PLACE' title2='ENTRY' title3='E. HOUR' title4='EXIT' title5='EX. HOUR' />
                {!noHistories && historiesUser?.length > 0 && (
                  historiesUser.map((records) => {
                    const entryDate = new Date(records.entry_date);
                    const exitDate = new Date(records.exit_date);
                    return (
                      <div key={records.id}>
                        <CTextForStats text1={records.room.room} text2={entryDate.toLocaleDateString()} text3={entryDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} text4={exitDate.toLocaleDateString()} text5={exitDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} />
                      </div>
                    );
                  })
                )}
              </div>
            } />
          </div>
        } />

        <CSection40 content={
          <div>
            <CVisitsView />
            <CImageBlock />
          </div>
        } />
      </div>

      {/* COMPONETIZAR ESTE MENU DESPLEGABLE */}
      <div>

        {isModalOpen && (
          <div className="modal-overlay">
            <CBlockMain content={
              <div>
                <div className="modal-content">
                  <button className="modal-close" onClick={closePopUp}>X</button>
                  <select name="Rooms" id="rooms" value={roomSelected} onChange={handledRoomSelected}>
                    <option value="">Rooms..</option>
                    {roomsList.map((room) => (
                      <option value={room.id} key={room.id}>{room.room}</option>
                    ))}
                  </select>
                  <p className={valueRequiredForAccess ? '' : 'hidden-content'}>Value required</p>
                  <p className={accessNotGranted ? '' : 'hidden-content'}>Access not granted because the room is already full</p>
                  <CInputs type='button' value='Entry' name='entry' onClick={entryRoom} />
                </div>
              </div>
            } />
          </div>
        )}

      </div>
    </>
  )
}
