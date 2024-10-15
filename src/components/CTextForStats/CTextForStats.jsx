import React from 'react'
import './CTextForStats.css'

export const CTextForStats = ({text1, text2, text3, text4, text5}) => {
    return (
        <>
            <div className='table-row'>
                <div className='table-row-content'>
                    <div className='row-text-small-long'>
                        {text1}
                    </div>
                    <div className='row-text-small'>
                        {text2}
                    </div>
                    <div className='row-text-small'>
                        {text3}
                    </div>
                    <div className='row-text-small'>
                        {text4}
                    </div>
                    <div className='row-text-small'>
                        {text5}
                    </div>
                </div>
                <div className='table-division'></div>
            </div>
        </>
    )
}
