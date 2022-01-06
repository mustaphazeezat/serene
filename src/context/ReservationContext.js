
import React, { createContext, useContext } from 'react'
import { getDocs, collect, setDoc, doc, collection, addDoc, query, where, orderBy} from "firebase/firestore";
import { db } from '../firebase'

const ReservationContext = createContext()

export function useReservation(){
    return useContext(ReservationContext)
}

export const ReservationProvider = ({children}) => {
    const reservationCollectionRef = collection(db, 'reservations')

    function createReservation(reservation) {
        return addDoc(reservationCollectionRef, reservation)
    }
    async function getReservations() {
        const q = query(reservationCollectionRef, orderBy("createdAt", "desc"));
        const data = await getDocs(q)
        return data.docs.map((doc) => ({...doc.data(), id: doc.id}))
    }

const value ={
    createReservation,
    getReservations
}
    return (
        <ReservationContext.Provider value={value}>
            {children}
        </ReservationContext.Provider>
    )
}
