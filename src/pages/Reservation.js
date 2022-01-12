import React, { useEffect, useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { useParams } from 'react-router-dom'
import NewReservations from '../components/reservations/NewReservations'
import UpdateReservation from '../components/reservations/UpdateReservation'
import { useReservation } from '../context/ReservationContext'


const Reservation = () => {
    const {getReservations} = useReservation()
    const { id } = useParams()
    const [tabIndex, setTabIndex] = useState(0)
    const [allReservations, setAllReservations] = useState([])
    useEffect(() => {
        if (id === 'new-reservations') {
            setTabIndex(0)
        } else {
            setTabIndex(1)
        }
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
    
    return (
        <section className='main-wrapper-x main-wrapper-y'>
            <div className='tab-wrapper'>
                <h2 className='section-title'>Everything about reservation.</h2>
                <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
                    <TabList>
                        <Tab>New reservations</Tab>
                        <Tab>My reservations</Tab>
                    </TabList>
                    <TabPanel> <NewReservations allReservations={allReservations} /> </TabPanel>
                    <TabPanel> <UpdateReservation allReservations={allReservations} /> </TabPanel>
                </Tabs>
            </div>
        </section>
    )
}

export default Reservation
