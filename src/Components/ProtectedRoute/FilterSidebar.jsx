import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebarIndex from '../Sidebar/AdminSidebarIndex'

function FilterSidebar() {
    return (
        <>
            <div className='grid grid-cols-12 mt-14'>
                <div className='md:col-span-2 hidden md:block'>
                    <AdminSidebarIndex />
                </div>
                <div className='md:col-span-10 col-span-12 p-3'>
                    <Outlet />
                </div>

            </div>
        </>
    )
}

export default FilterSidebar

/*
Exported to - 
App.js
*/