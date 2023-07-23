import React from 'react'
import MyLearnings from './MyLearnings'
import student from './assets/student.jpg'
import { Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import MyLearningCourses from './MyLearningCourses'
import Whishlist from './Whishlist'


function MyLearningsPage() {
    const navigate = useNavigate()
    const location = useLocation()
    console.log('location....', location.pathname)
    return (
        <div className='mt-20 '>
            <div className='bg-[#6980D3] px-2 md:px-60 h-44 relative flex items-center'>
                <div className='font-bold text-4xl font-serif text-white'>My Learnings</div>
                {/* SPACER */}

                {/* TABS */}
                <div className="mt-10 hidden w-full flex-col justify-between space-y-4 md:flex md:flex-row absolute bottom-0">
                    <div className="flex w-full items-end ">
                        <div onClick={() => navigate(`/my-learnings/mycourse`)} className={`cursor-pointer px-4 py-2 text-base font-semibold leading-normal text-white  hover:text-black ${location.pathname==='/my-learnings/mycourse' && ' border-b-4 border-b-white'}`}>Purchased Courses</div>
                        <div onClick={() => navigate(`/my-learnings/wishlist`)} className={`cursor-pointer px-4 py-2 text-base font-semibold leading-normal text-white  hover:text-black ${location.pathname==='/my-learnings/wishlist' && ' border-b-4 border-b-white'} `}>Wishlist</div>
                    </div>
                </div>
            </div>

            <div className='mt-10 md:px-60'>
                <Outlet />
            </div>

        </div>
    )
}

export default MyLearningsPage