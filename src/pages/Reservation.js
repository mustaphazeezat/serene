import React, { useEffect, useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { useParams } from 'react-router-dom'
import NewReservations from '../components/reservations/NewReservations'
import UpdateReservation from '../components/reservations/UpdateReservation'


const Reservation = () => {
    const { id } = useParams()
    const [tabIndex, setTabIndex] = useState(0)
    useEffect(() => {
        if (id === 'new-reservations') {
            setTabIndex(0)
        } else {
            setTabIndex(1)
        }
    }, [])
    return (
        <section className='main-wrapper-x main-wrapper-y'>
            <div className='tab-wrapper'>
                <h2>Everything about reservation.</h2>
                <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
                    <TabList>
                        <Tab>New reservations</Tab>
                        <Tab>My reservations</Tab>
                    </TabList>
                    <TabPanel> <NewReservations/> </TabPanel>
                    <TabPanel> <UpdateReservation/> </TabPanel>
                </Tabs>
            </div>
        </section>
    )
}

export default Reservation
