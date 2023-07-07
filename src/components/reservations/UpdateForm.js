import React, { useEffect, useState } from 'react'
import Input from '../forms/Input';
import InputCards from '../forms/InputCards'
import Time from '../forms/Time';
import Dates from '../forms/Date';
import { Timestamp } from 'firebase/firestore';
import { useReservation } from '../../context/ReservationContext';


const UpdateForm = ({reservation, allReservations}) => {
    const {updateReservation} = useReservation()
    const [tables, setTables] = useState('');
    const [tableCount, setTableCount] = useState(0);
    const [familyType, setFamilyType] = useState('');
    const [familyTime, setFamilyTime] = useState('');
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    
    useEffect(() => {
        setName(reservation.name)
        setEmail(reservation.email)
        setPhoneNumber(reservation.phoneNumber)
        setTime(reservation.time)
        setDate(new Date(reservation.date))
        setTableCount(reservation.table)
        setFamilyType(reservation.familyType)
        setFamilyTime(reservation.familyTime)
        if (reservation.table !== 0) {
            setTables('table')
            
        }else if(reservation.familyType.length !== 0){
                setTables('family')
        }
    
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const onChangeTable = (e) =>{
        setTables(e.target.value)
        
    }
    const onChangeTableCount = (e) =>{
        setTableCount(e.target.value)
        setFamilyTime('')
        setFamilyType('')
    }
    const onChangeTime = (time) =>{
        setTime(time)
    }
    const onChangeDate = (date) =>{
        setDate(date)
    }
    const onChangeFamilyType = (e) =>{
        setFamilyType(e.target.value)
        setTableCount(0)
    }
    const onChangeFamilyTime = (e) =>{
        setFamilyTime(e.target.value)
        setTableCount(0)
    }
    const submitReservation = async(e) =>{
        const userTable = allReservations.find(el => el.email === email && el.date === date.toDateString() && el.time === time)
        const userFamily = allReservations.find(el => el.email === email && el.date === date.toDateString() && el.familyTime === familyTime)
        e.preventDefault()
        if(userTable){
            setError('You already made a reservation for this date and time.')
        }else if(userFamily){
            setError('You already made a reservation for this date and time.')
        }else{
            const details = {
                name: name,
                email: email,
                phoneNumber: phoneNumber,
                date: date,
                time: time,
                table: parseInt(tableCount),
                familyType: familyType,
                familyTime: familyTime,
                updatedAt: Timestamp.now()
            }
            setError('')
            setLoading(true)
            await updateReservation(details, reservation.id)
            setLoading(false)
            setSuccess(true)
        }
    }
    return (
        <div className='form-wrapper update-wrapper'>
        {
            !success?<>
                <h3>Update reservation</h3>
                <form className='reserv-form' onSubmit={submitReservation}>
                        
                        {
                            error.length > 0?<p className='error'>{error}</p>:null
                        }
                        <div className='width-1-2'>
                            <Input
                                type='text'
                                value={name}
                                label='Name'
                                onChange={val=>setName(val)}
                                placeholder='Name'
                            />
                            <Input
                                type='email'
                                value={email}
                                label='Email'
                                onChange={val=>setEmail(val)}
                                placeholder='Email'
                            />
                        </div>
                        <div className='width-1-2'>
                            <Input
                                type='text'
                                value={phoneNumber}
                                label='Phone number'
                                onChange={val=>setPhoneNumber(val)}
                                placeholder='0x043434242'
                            />
                            <Dates 
                                onChange={onChangeDate}
                                value={date}
                            />
                        </div>
                        <p className='label'>How large</p>
                        <div className='width-1-2'>
                            <InputCards
                                type='radio'
                                value='table'
                                name='table'
                                label='table'
                                onChange={val=>onChangeTable(val)}
                                checked={tables === 'table' ? true : false }
                            />
                            <InputCards
                                type='radio'
                                value='family'
                                name='table'
                                label='family'
                                onChange={val=>onChangeTable(val)}
                                checked={tables === 'family'? true : false }
                            />
                        </div>
                        {
                            tables === 'table'?
                            <div>
                                <p className='label'>Table</p>
                                <div className='width-1-2'> 
                                    <InputCards
                                        type='radio'
                                        value={2}
                                        name='tableCount'
                                        label='table for 2'
                                        onChange={val=>onChangeTableCount(val)}
                                        checked={tableCount === 2 ? true : false }
                                    />
                                    <InputCards
                                        type='radio'
                                        value={4}
                                        name='tableCount'
                                        label='table for 4'
                                        onChange={val=>onChangeTableCount(val)}
                                        checked={tableCount === 4 ? true : false }
                                    />
                                </div>
                                <Time
                                onChange={onChangeTime}
                                value={time}
                                />
                            </div>
                            : tables === 'family'?
                            <div>
                                <p className='label'>How do you want your space</p>
                                <div className='width-1-2'> 
                                    <InputCards
                                        type='radio'
                                        value='private'
                                        name='tableprivacy'
                                        label='private'
                                        onChange={val=>onChangeFamilyType(val)}
                                        checked={familyType === 'private' ? true : false }
                                    />
                                    <InputCards
                                        type='radio'
                                        value='open'
                                        name='tableprivacy'
                                        label='open'
                                        onChange={val=>onChangeFamilyType(val)}
                                        checked={familyType === 'open' ? true : false }
                                    />
                                </div>
                                <p className='label'>Time</p>
                                <div className='width-1-2'> 
                                    <InputCards
                                        type='radio'
                                        value='breakfast 8am - 10:30pm'
                                        name='familytime'
                                        label='breakfast 8am-10:30pm'
                                        onChange={val=>onChangeFamilyTime(val)}
                                        checked={familyTime === 'breakfast 8am - 10:30pm' ? true : false }
                                    />
                                    <InputCards
                                        type='radio'
                                        value='Lunch 1pm - 3:30pm'
                                        name='familytime'
                                        label='Lunch 1pm - 3:30pm'
                                        onChange={val=>onChangeFamilyTime(val)}
                                        checked={familyTime === 'Lunch 1pm - 3:30pm' ? true : false }
                                    />
                                    <InputCards
                                        type='radio'
                                        value='Dinner 7pm - 11pm'
                                        name='familytime'
                                        label='Dinner 7pm - 11pm'
                                        onChange={val=>onChangeFamilyTime(val)}
                                        checked={familyTime === 'Dinner 7pm - 11pm' ? true : false }
                                    />
                                </div>
                            </div>: null
                        }
                        <div className='d-flx-alc-jc'>
                            <button type='submit' className='submit-btn'>
                                {loading? 'Updating...': 'Update reservation'}
                            </button>
                        </div>
                </form>
            </>
                :
            <div className='success-msg'>
                <h3>Heey</h3>
                <p>You have successfully updated your Reservation at Serene to <span>{date.toDateString()} 
                </span> at <span> {time.length !== 0? time : familyTime }</span>.</p>
            </div>

        }
            
        </div>
    )
}

export default UpdateForm
