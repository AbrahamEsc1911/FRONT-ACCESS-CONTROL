import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Register } from '../Register/Register'
import Login from '../Login/Login'
import { Home } from '../Home/Home'
import { Reservations } from '../Reservations/Reservations'
import { MyReservations } from '../MyReservations/MyReservations'
import { Profile } from '../Profile/Profile'
import { Start } from '../Start/Start'
import { NotFound } from '../NotFound/NotFound'

export const Body = () => {
  return (
    <>
    <Routes>
      <Route path='/*' element={<NotFound />}/>
      <Route path='/' element={<Home />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/reservations' element={<Reservations />}/>
      <Route path='/my-reservations' element={<MyReservations />} />
      <Route path='/start' element={<Start />}/>
      <Route path='/profile' element={<Profile />} />
    </Routes>
    </>
  )
}
