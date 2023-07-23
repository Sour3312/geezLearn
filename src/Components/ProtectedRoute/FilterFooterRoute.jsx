import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Header/Footer'
import HeaderIndex from '../Header/HeaderIndex'

function FilterFooterRoute() {
    return (
        <>
            <Outlet />
            <Footer />
        </>
    )
}

export default FilterFooterRoute