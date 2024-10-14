import React from 'react'

export const CInputs = ({type, className, value, name, placeholder, onChange, onClick, min, max}) => {
  return (
    <>
    <input type={type} className={className} value={value} name={name} placeholder={placeholder} onClick={onClick} onChange={onChange} min={min}/>
    </>
  )
}
