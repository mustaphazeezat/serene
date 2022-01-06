import React, { useEffect, useState } from 'react'
import Input from '../forms/Input';
import InputCards from '../forms/InputCards'
import Time from '../forms/Time';
import Dates from '../forms/Date';
import { Timestamp } from 'firebase/firestore';
import { useReservation } from '../../context/ReservationContext';

const NewReservations = () => {
    const {createReservation,  getReservations} = useReservation()
    const [tables, setTables] = useState('');
    const [tableCount, setTableCount] = useState('');
    const [familyType, setFamilyType] = useState('');
    const [familyTime, setFamilyTime] = useState('');
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState()
    const [date, setDate] = useState(new Date())
    const [time, setTime] = useState('')
    const [error, setError] = useState('')
    const [reservationDetails, setreservationDetails] = useState({})
    const [allReservations, setAllReservations] = useState([])


    useEffect(() => {
        const getAllReservations = async () =>{
            try {
                const data = await getReservations()
                setAllReservations(data)
            } catch (error) {
                console.log(error)
            }

        }
        getAllReservations()
    }, [])

    const onChangeTable = (e) =>{
        setTables(e.target.value)
    }
    const onChangeTableCount = (e) =>{
        setTableCount(e.target.value)
    }
    const onChangeTime = (time) =>{
        setTime(time)
    }
    const onChangeDate = (date) =>{
        setDate(date)
    }
    const onChangeFamilyType = (e) =>{
        setFamilyType(e.target.value)
    }
    const onChangeFamilyTime = (e) =>{
        setFamilyTime(e.target.value)
    }
    const submitReservation = async(e) =>{
        const userTable = allReservations.find(el => el.email === email && el.date === date.toDateString() && el.time === time)
        const userFamily = allReservations.find(el => el.email === email && el.date === date.toDateString() && el.familyTime === familyTime)
        e.preventDefault()
        if (tables.length === 0) {
            setError('Let us know if you are coming with your family or not')
        }else if(tables === 'table' && time.length === 0){
            setError('Time cannot be empty')
        } else if(tables === 'family' && familyType.length === 0){
            setError('Please let us know the type of space you will like')
        }else if(tables === 'family' && familyTime.length === 0){
            setError('Select the time you will be coming in with your family')
        }else if(userTable){
            setError('You already made a reservation for this date and time.')
        }else if(userFamily){
            setError('You already made a reservation for this date and time.')
        }else{
            const details = { ...reservationDetails,
                name: name,
                email: email,
                phoneNumber: phoneNumber,
                date: date.toDateString(),
                time: time,
                table: tableCount,
                familyType: familyType,
                familyTime: familyTime,
                createdAt: Timestamp.now()
            }
            await createReservation(details)
        }
    }

    return (
        <section className='main-wrapper-y'>
            <div className='wrapper'>
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
                        />
                        <InputCards
                            type='radio'
                            value='family'
                            name='table'
                            label='family'
                            onChange={val=>onChangeTable(val)}
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
                                />
                                <InputCards
                                    type='radio'
                                    value={4}
                                    name='tableCount'
                                    label='table for 4'
                                    onChange={val=>onChangeTableCount(val)}
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
                                />
                                <InputCards
                                    type='radio'
                                    value='open'
                                    name='tableprivacy'
                                    label='open'
                                    onChange={val=>onChangeFamilyType(val)}
                                />
                            </div>
                            <p className='label'>Time</p>
                            <div className='width-1-2'> 
                                <InputCards
                                    type='radio'
                                    value='breakfast 8am-10:30pm'
                                    name='familytime'
                                    label='breakfast 8am-10:30pm'
                                    onChange={val=>onChangeFamilyTime(val)}
                                />
                                <InputCards
                                    type='radio'
                                    value='Lunch 1pm - 3:30pm'
                                    name='familytime'
                                    label='Lunch 1pm - 3:30pm'
                                    onChange={val=>onChangeFamilyTime(val)}
                                />
                                <InputCards
                                    type='radio'
                                    value='Dinner 7pm - 11pm'
                                    name='familytime'
                                    label='Dinner 7pm - 11pm'
                                    onChange={val=>onChangeFamilyTime(val)}
                                />
                            </div>
                        </div>: null
                    }
                    <div className='d-flx-alc-jc'>
                        <button type='submit' className='submit-btn'>
                            submit
                        </button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default NewReservations
