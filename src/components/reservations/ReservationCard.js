import React, { useState } from 'react'
import Icon from '../Icon'
import Modals from '../Modals';
import UpdateForm from './UpdateForm';

const ReservationCard = ({reservation, handleDelete}) => {
    const [isOpen, setIsOpen] = useState(false);
    
    function openModal() {
        setIsOpen(true);
      }

    return (
        <div className='reservation-card'>
            {
                reservation.name?.length > 0? <h3 className=''> <span>Name</span>: {reservation.name}</h3>:null
            }
            {
                reservation.phoneNumber?.length > 0? <p> <span>Phone number</span>: {reservation.phoneNumber}</p>:null
            }
           <p><span>date</span>: {new Date(reservation.date).toDateString()}</p>
           {reservation.table === 0 && reservation.familyType.length === 0? <p><span>Time</span>: {reservation.time}</p>: null}
           
           {
                reservation.familyType.length !== 0 ? <>
                <p><span>Time</span>:  {reservation.familyTime}</p>
                <p><span>Reservation type</span>: {reservation.familyType}</p>
                </> : reservation.table !== 0 && reservation.familyType.length === 0? <>
                    <p> <span>time</span>: {reservation.time}</p>
                    <p><span>table</span>:  {reservation.table}</p>
                </>: null
                
           }
           <div className='action-wrapper'>
               <button className='edit-btn' onClick={openModal}><Icon svg='edit' /></button>
               <button className='delete-btn' onClick={handleDelete}><Icon svg='delete' /></button>
               <Modals
                   isOpen={isOpen}
                   setIsOpen={setIsOpen}
               >
                   <UpdateForm reservation={reservation} isOpen={isOpen} />
               </Modals>
           </div>
        </div>
    )
}

export default ReservationCard
