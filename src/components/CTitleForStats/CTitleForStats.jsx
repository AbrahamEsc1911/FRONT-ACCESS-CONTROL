import React from 'react'
import './CtitleForStats.css'

export const CTitleForStats = ({title1, title2, title3, title4, title5}) => {
  return (
    <>
    <div className='table-row'>
            <div className='table-row-content'>
              <div className='row-text'>{title1}</div>
              <div className='row-text'>{title2}</div>
              <div className='row-text'>{title3}</div>
              <div className='row-text'>{title4}</div>
              <div className='row-text'>{title5}</div>
            </div>
            <div className='table-division'></div>
          </div>
    </>
  )
}
