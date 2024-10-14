import React from 'react'
import './CSelect.css'

export const CSelect = ({ name, className, onChange, category, options }) => {
    return (
        <>

            <select defaultValue="" name={name} className={className} onChange={onChange}>
                <option disabled hidden value="">{category}</option>
                {options.map((element) => {
                    return <option value={element.id} key={element.id}>{element.name}</option>
                })
                }
            </select>

        </>
    )
}
