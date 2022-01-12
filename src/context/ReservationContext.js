
import React, { createContext, useContext } from 'react'
import { getDocs, collect, setDoc, doc, collection, addDoc, query, where, orderBy, updateDoc, deleteDoc} from "firebase/firestore";
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
    async function getMyReservations(email) {
        const q = query(reservationCollectionRef, orderBy("createdAt", "desc"), where("email", "==", email));
        const data = await getDocs(q)
        return data.docs.map((doc) => ({...doc.data(), id: doc.id}))
    }
    function UpdateReservation(reservation, id) {
        const upreservationCollectionRef = doc(db, "reservations", id );
        return updateDoc(upreservationCollectionRef, reservation)
    }
    function deleteReservation(id) {
        const delreservationCollectionRef = doc(db, "reservations", id );
        return deleteDoc(delreservationCollectionRef)
    }

const value ={
    createReservation,
    getReservations,
    getMyReservations,
    UpdateReservation,
    deleteReservation
}
    return (
        <ReservationContext.Provider value={value}>
            {children}
        </ReservationContext.Provider>
    )
}
