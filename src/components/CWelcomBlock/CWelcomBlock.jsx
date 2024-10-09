import React from 'react'
import './CWelcomBlock.css'
import { CBlockMain } from '../CBlockMain/CBlockMain'

export const CWelcomBlock = ({ name }) => {
    return (
        <>
            <CBlockMain content={
                <div className='block-welcome'>
                    <div className='block-welcome-text'>
                        <div id='welcome-title'>
                            <h2>{`Hello ${name}`}</h2>
                        </div>
                        <div id='welcome-parrafo'>
                            <p>It's good to see you again</p>
                        </div>
                    </div>
                    <div className='block-welcome-image'>
                        <img src="../images/profile.png" alt="" />
                    </div>
                </div>
            }
            />

        </>
    )
}
