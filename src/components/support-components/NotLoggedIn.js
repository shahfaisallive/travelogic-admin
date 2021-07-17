import React from 'react';
import { Link } from 'react-router-dom'

const NotLoggedIn = () => {
    return (
        <div className='container text-center row justify-content-center'>
            <h3 className='display-4 pt-5 '>It seems like you are not logged in</h3>
            <h5 className='mt-3'>Please login to access this page</h5>
            <div className='w-100  d-flex justify-content-center'>
                <Link to='/login'>
                    <button className='btn btn-secondary mt-5'>Login to Admin Panel</button>
                </Link>
            </div>
        </div>
    )
}

export default NotLoggedIn
