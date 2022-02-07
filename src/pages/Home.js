import React from 'react'
import UserTable from '../components/UserTable';


export default function Home(props) {
    
    return (
        <div className="page-container">
            <div className='navbar-container'>
                <div className="navbar-title" data-testid="navbar-title">Home</div>
            </div>
            <div className='content-container'>
                {/* Render All Users */}
                <UserTable />
            </div>
        </div>
    )
}
