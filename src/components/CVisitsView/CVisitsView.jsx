import './CVisitsView.css'

import React from 'react'

export const CVisitsView = ({numVisits, visits}) => {
  return (
    <>
    <div className='visit-count-body'>
        <div className='visit-num'>
          <h1>{numVisits}</h1>
        </div>
        <div className='visit-text'>
          <p>{visits}</p>
        </div>
      </div>
    </>
  )
}
