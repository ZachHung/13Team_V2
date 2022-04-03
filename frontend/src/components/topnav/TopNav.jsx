import React from 'react'
import './topnav.scss'


const TopNav = () => {
    const openSidebar = () => {
        document.body.classList.add('sidebar-open')
    }

    return (
        <div className='topnav'>
            <div className='topnav__search'>
                <input type="text" placeholder='Search here...'/>
                <i className='bx bx-search'></i>
            </div>
            
            <div className="sidebar-toggle" onClick={openSidebar}>
                <i className='bx bx-menu-alt-right'></i>
            </div>
        </div>
    )
}

export default TopNav
