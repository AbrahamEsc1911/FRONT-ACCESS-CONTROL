import React from 'react'
import { useNavigate } from 'react-router-dom'

export const CNavigation = ({path, content, className}) => {

    const navigate = useNavigate()
  return (
    <>
    <div className={className} onClick={() => navigate(path)}>{content}</div>
    </>
  )
}
