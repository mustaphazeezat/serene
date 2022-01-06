import React from 'react'

const InputCards = ({value, name, type, label, check, ...props}) => {
    return (
        <div className='checkbox-card'>
            <label>
                <input 
                    type={type} 
                    value={value}
                    check={check}
                    name={name}
                    onChange={e => e.target.value}
                    {...props}
                />
              <span className='label'>{label}</span>
            </label>
        </div>
    )
}

export default InputCards
