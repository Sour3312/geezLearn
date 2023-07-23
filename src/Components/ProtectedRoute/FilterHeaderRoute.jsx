import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Header/Footer'
// import HeaderIndex from '../Header/HeaderIndex'
import HeaderIndex2 from '../Header/HeaderIndex2'

function FilterHeaderRoute() {
  return (
    <>
      <div className='' style={{zIndex:-1}}>
        <HeaderIndex2 />
        <div className='mt-10 md:mt-14'>
          <Outlet />
        </div>
      </div>
      {/* <Footer /> */}
    </>
  )
}

export default FilterHeaderRoute