import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Register } from '../Register/Register'
import Login from '../Login/Login'
import { Home } from '../Home/Home'

export const Body = () => {
  return (
    <>
    <Routes>
      <Route path='/*'/>
      <Route path='/' element={<Home />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/reservations'/>
      <Route path='/my-reservations'/>
      <Route path='/start'/>
      <Route path='/profile'/>
    </Routes>
    </>
  )
}
