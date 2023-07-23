import React from 'react'
import MyLearnings from './MyLearnings'
import Slider from '../LandingPage/Slider'
import Speciality from '../LandingPage/Speciality'
import Categories from '../LandingPage/Categories'
import TrustBrands from '../LandingPage/TrustBrands'
import student from './assets/student.jpg'

function StudentDahboard() {
  console.log('insdie student dashboard...')
  return (
    <div className='mt-20'>
      {/* <div className='text-gray-700 font-bold text-3xl font-serif px-10'>We lcome To your dashboard, Mark</div> */}

      {/* <div className='w-full h-[400px] px-10 bg-white py-4 relative'>
        <img src={student} className='w-full h-full' alt="" />
        <div className='flex flex-col w-full h-full absolute top-0 left-0 justify-center px-20'>
          <div className='bg-gray-600 w-1/3 flex flex-col justify-center items-center p-4 shadow-xl border border-white'>
            <div className='text-white font-bold text-3xl font-serif '>Learn at your own pace.</div>
            <div className='text-gray-300'>Decide your speed and learn as per your requirements.</div>
          </div>
        </div>
      </div> */}

      <div className='bg-[#6980D3] px-2 md:px-20 h-44 relative flex items-center'>
        <div className='font-bold text-4xl font-serif text-white'>Welcome to your dashboard, Mark</div>
      </div>

      {/* SPACER */}
      <div className="w-full h-20"></div>
      <div className='px-2 md:px-20'>
        <MyLearnings location='dashboard' />
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
  )
}

export default StudentDahboard