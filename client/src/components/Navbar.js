import React from 'react'
import { Link } from 'react-router-dom'
import Auth from '../utils/auth'

const Navbar = () => {
    const loggedin = Auth.loggedIn()
    const userId = localStorage.getItem('user_id')
    const isAdmin = localStorage.getItem('is_admin')

    return (
        <nav>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/rooms'>Bookings</Link></li>
                {loggedin ? (
                    <>
                        <li><Link to='/globe'>See Locations</Link></li>
                        <li><Link onClick={() => Auth.logout()}>Logout</Link></li>
                    </>
                ) : (<>
                    <li><Link to='/login'>Login</Link></li>
                    <li><Link to='/globe'>See Locations</Link></li>
                    <li><Link to='/signup'>Signup</Link></li>
                </>
                )}
                {
                    (userId && isAdmin) && (<>
                        <li><Link to='/properties'>Your Properties</Link></li>

                    </>)
                }
            </ul>
        </nav>
    )
}

export default Navbar