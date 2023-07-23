import React from 'react'
import Carousel from './Carousel'
import Categories from './Categories'
import Courses from './Courses'
import Footer from './Footer'
import Slider from './Slider'
import Speciality from './Speciality'
import TrustBrands from './TrustBrands'
import AuthIndex from '../../Components/Auth/AuthIndex'
import MyLearnings from '../Student/MyLearnings'

function MainLandingPageIndex(props) {
  return (
    <>
      <div className='mt-20'>
        <Slider />

        {/* SPACER */}
        <div className="w-full h-20"></div>
        <div className='px-2 md:px-20 bg-[#FAFCFF]'>
          <Courses setOpenLoginModal={props?.setOpenLoginModal} />
        </div>
        {/* SPACER */}
        <div className="w-full h-20"></div>
        <Speciality />

        {/* SPACER */}
        <div className="w-full h-20"></div>
        <div className='px-2 md:px-20'>
          <Categories />
        </div>

        {/* SPACER */}
        <div className="w-full h-20"></div>
        <TrustBrands />

        {/* SPACER */}
        <div className="w-full h-20"></div>
        {/* <Footer /> */}

      </div>

    </>
  )
}

export default MainLandingPageIndex