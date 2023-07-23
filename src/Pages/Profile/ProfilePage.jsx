import React from 'react'
import { Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import ProfileForm from './ProfileForm'
import ProfilePicture from './ProfilePicture'


function ProfilePage() {
    const navigate = useNavigate()
    const location = useLocation()
    console.log('location....', location.pathname)
    return (
        <div className='mt-20 '>
            <div className='bg-[#6980D3] px-2 md:px-60 h-44 relative flex items-center'>
                <div className='font-bold text-4xl font-serif text-white'>Profile</div>
                {/* SPACER */}

                {/* TABS */}
                <div className="mt-10 hidden w-full flex-col justify-between space-y-4 md:flex md:flex-row absolute bottom-0">
                    <div className="flex w-full items-end ">
                        <div onClick={() => navigate(`/profile/basic-details`)} className={`cursor-pointer px-4 py-2 text-base font-semibold leading-normal text-white  hover:text-black ${location.pathname === '/profile/basic-details' && ' border-b-4 border-b-white'}`}>Basic Details</div>
                        <div onClick={() => navigate(`/profile/picture`)} className={`cursor-pointer px-4 py-2 text-base font-semibold leading-normal text-white  hover:text-black ${location.pathname === '/profile/picture' && ' border-b-4 border-b-white'} `}>Profile Picture</div>
                    </div>
                </div>
            </div>

            <div className='mt-10 md:px-60'>
                <Outlet />
                {/* <ProfileForm /> */}
                {/* <ProfilePicture /> */}
            </div>

        </div>
    )
}

export default ProfilePage