import React from 'react'
import './CtitleForStats.css'

export const CTitleForStats = ({ title1, title2, title3, title4, title5 }) => {
    return (
        <>
            <div className='table-row'>
                <div className='table-row-content'>
                    <div className='row-text-long'>
                        <h4>
                            {title1}
                        </h4></div>
                    <div className='row-text'>
                        <h4>
                            {title2}
                        </h4></div>
                    <div className='row-text'>
                        <h4>
                            {title3}
                        </h4></div>
                    <div className='row-text'>
                        <h4>
                            {title4}
                        </h4></div>
                    <div className='row-text'>
                        <h4>
                            {title5}
                        </h4></div>
                </div>
                <div className='table-division'></div>
            </div>
        </>
    )
}
