import { Timestamp } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useReservation } from '../context/ReservationContext'
import Dates from './forms/Date'
import Input from './forms/Input'
import Time from './forms/Time'

const Form = () => {
    const {createReservation, getReservations} = useReservation()
    const [email, setEmail] = useState('')
    const [date, setDate] = useState(new Date())
    const [time, setTime] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(true)
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
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onChangeDate = (date) =>{
        setDate(date)
    }
    const onChangeTime = (time) =>{
        setTime(time)
    }
    const makeReservation = async(e) =>{
        e.preventDefault()
        const userinfo = allReservations.find(el => el.email === email && el.date === date.toDateString() && el.time === time)
        if (time.length <= 0) {
            setError('Time cannot be empty')
        }else if(userinfo){
            setError('You already made a reservation for this date and time.')
        } else if(time.length !== 0){
            setError('')
            setLoading(true)
            const details = {
                email: email,
                date: date.toDateString(),
                time: time,
                table: 0,
                family: false,
                privateFamily: false,
                createdAt: Timestamp.now()
            }
            await createReservation(details)
            setSuccess(true)
            setLoading(false)
        }
            
    }

    return (
        <section className='main-wrapper-x main-wrapper-y'>
            <div className='form-wrapper'>
                {
                    !success ? <React.Fragment>
                    <h2>Reserve a space</h2>
                {
                    error.length > 0 ? <p className='error'>{error}</p>: null
                }
                <form className='reserve-form' onSubmit={makeReservation}>
                    <div className='width-1-2'>
                        <Dates 
                            onChange={onChangeDate}
                            value={date}
                        />
                        <Time
                            onChange={onChangeTime}
                            value={time}
                        />
                    </div>
                    <Input
                        type="email" 
                        label="email" 
                        value={email}
                        onChange={val=>setEmail(val)}
                     />
                    <div className='d-flx-alc-jfe'>
                        <button className='submit-btn' type='submit'>
                            {loading? 'making reservation...' : 'reserve a space'}
                        </button>
                    </div>
                </form>
                <p className='information'>To make specific reservations, click <Link to='/reservations/new-reservations'>Here</Link></p>
                    </React.Fragment>:
                <div className='success-msg'>
                    <h3>Heey</h3>
                    <p>You have successfully booked a place at Serene on <span>{date.toDateString()} </span> for <span> {time}</span>.</p>
                    <p>Make changes to your reservations <Link to='/reservations/update-reservations'>here</Link> </p>
                </div>
                }
            </div>
        </section>
    )
}

export default Form
