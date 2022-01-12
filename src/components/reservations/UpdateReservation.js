import React, { useState } from 'react'
import { useReservation } from '../../context/ReservationContext'
import Input from '../forms/Input'
import ReservationCard from './ReservationCard'

const UpdateReservation = () => {
    const {getMyReservations,deleteReservation} = useReservation()
    const [email, setEmail] = useState('')
    const [myReservations, setmyReservations] = useState([])
    const [loading, setloading] = useState(false)
    const [error, setError] = useState('')
    const day =  new Date().getDate()
    const month =  new Date().getMonth()
    const year =  new Date().getFullYear()
    let today = new Date(year,month,day).toDateString()

    const handleMyReservations = async(e)=>{
        e.preventDefault()
        try {
            setError('')
            setloading(true)
            const data = await getMyReservations(email)
            if (data.length === 0) {
                setError('You did not book any reservations with this email.')
                setloading(false)
                console.log('i run 1')
            } else {
                setmyReservations(data) 
                setloading(false)
            }
            
        } catch (error) {
            console.log(error)
            setError(error)
            setloading(false)
        }
        
    }
    const handleDelete = async(id) =>{
        const filtered = myReservations.filter(item => item.id !== id)
        setmyReservations(filtered)
        await deleteReservation(id)
    }
    

    return (
        <section className='main-wrapper-y main-wrapper-x'>
            <div className='wrapper'>
                <form className='reserv-form alt' onSubmit={handleMyReservations}>
                    {
                        error.length > 0 ? <p className='error'>{error}</p>:null
                    }
                    <Input
                    type='email'
                    value={email}
                    label='E-mail'
                    onChange={val=>setEmail(val)}
                    placeholder='Enter the email you used for reservation'
                    />
                    <div className='d-flx-alc-jfe'><button className='submit-btn' type='submit'>{loading? 'getting reservations...' : 'get reservations'} </button></div>
                </form>
                {
                    !loading && myReservations.length > 0 ?<>
                        <div className='reservation-by-date'>
                            <h3>Today</h3>
                            {  <ul className='reservation-list'>
                            {
                                myReservations.filter(item => new Date(item.date).toDateString() === today).map(item => <li key={item.id}><ReservationCard reservation={item} handleDelete={()=>handleDelete(item.id)}/>
                                </li>)
                            }
                                </ul> 
                            }
                        </div>
                        <div className='reservation-by-date'>
                            <h3>Upcoming</h3>
                            {  <ul className='reservation-list'>
                            {
                                myReservations.filter(item => new Date(item.date).getTime() > new Date().getTime()).map(item => <li key={item.id}><ReservationCard reservation={item} handleDelete={()=>handleDelete(item.id)} />
                                </li>)
                            }
                                </ul> 
                            }
                        </div>
                        <div className='reservation-by-date'>
                            <h3>Past</h3>
                            {  <ul className='reservation-list'>
                            {
                                myReservations.filter(item => new Date(item.date).getTime() < new Date().getTime()).map(item => <li key={item.id}><ReservationCard reservation={item} handleDelete={()=>handleDelete(item.id)} />
                                </li>)
                            }
                                </ul> 
                            }
                        </div>
                    </> : !loading && myReservations.length === 0 ? null : <div>loading...</div>
                    

                }
            </div>
        </section>
    )
}

export default UpdateReservation
