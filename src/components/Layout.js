import React from 'react'
import Footer from './Footer'
import Header from './Header'

export const Layout = ({children}) => {
    return (
        <React.Fragment>
            <Header/>
            {children}
            <Footer/>
        </React.Fragment>
    )
}
