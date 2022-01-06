import React from 'react'

const Input = ({type, label, onChange, value, className, ...props}) => {
    return (
        <label className='input-wrapper'>
            <span className='label'>{label}</span>
            <input {...props} type={type} onChange={e => onChange(e.target.value)} value={value} required />
        </label>
    )
}

export default Input
