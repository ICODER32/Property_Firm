import React from 'react'
import { Navbar } from '../components'
import AddProperty from './AddProperty'
import Properties from './Properties'
import Auth from '../utils/auth'

const Home = () => {
    const isAdmin = localStorage.getItem('is_admin') && Auth.loggedIn()
    console.log(Auth.loggedIn())
    console.log(isAdmin)
    return (
        <>
            <Navbar />
            {
                isAdmin ? (<AddProperty />) : (<Properties />)
            }
        </>
    )
}

export default Home