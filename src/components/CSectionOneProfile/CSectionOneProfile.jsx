import React from 'react'
import './CSectionOneProfile.css'

export const CSectionOneProfile = ({name, phone, email, StartUp, dni, onClick, value, buttonName, className}) => {
    return (
      <>
      
      <div className='section-two-profile'>
                  <div className='section-two-block'>
                      <div className='section-two-icon'>
                          <img src="../images/name.svg" alt="city-icon" className='section-two-icon-size' />
                      </div>
                      <div className='section-two-text'>
                          <p className='p-section-two'>{name}</p>
                      </div>
                  </div>
                  <div className='section-two-block'>
                      <div className='section-two-icon'>
                          <img src="../images/email.svg" alt="city-icon" className='section-two-icon-size' />
                      </div>
                      <div className='section-two-text'>
                          <p className='p-section-two'>{email}</p>
                      </div>
                  </div>
                  <div className='section-two-block'>
                      <div className='section-two-icon'>
                          <img src="../images/phone.svg" alt="city-icon" className='section-two-icon-size' />
                      </div>
                      <div className='section-two-text'>
                          <p className='p-section-two'>{phone}</p>
                      </div>
                  </div>
                  <div className='section-two-block'>
                      <div className='section-two-icon'>
                          <img src="../images/dni.svg" alt="city-icon" className='section-two-icon-size' />
                      </div>
                      <div className='section-two-text'>
                          <p className='p-section-two'>{dni}</p>
                      </div>
                  </div>
                  <div className='section-two-block'>
                      <div className='section-two-icon'>
                          <img src="../images/StartUp.svg" alt="city-icon" className='section-two-icon-size' />
                      </div>
                      <div className='section-two-text'>
                          <p className='p-section-two'>{StartUp}</p>
                      </div>
                  </div>
                  
              </div>
      </>
    )
  }
  