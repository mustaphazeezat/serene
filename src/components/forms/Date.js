import React from 'react'
import DatePicker from 'react-date-picker';
import 'react-calendar/dist/Calendar.css';


const Dates = ({value, onChange}) => {
    
    return (
        <div className='picker-wraper'>
            <p>date</p>
            <DatePicker
            onChange={onChange}
            value={value}
            minDate={new Date()}
            className={'date-wrapper'}
        />
        </div>
       
    )
}

export default Dates
