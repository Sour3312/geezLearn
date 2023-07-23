import React, { useEffect, useState } from 'react'
import { FiLogOut } from 'react-icons/fi';
import { BsCart3 } from 'react-icons/bs';
import { GoSearch } from 'react-icons/go';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import AuthIndex from '../Auth/AuthIndex';
import HeaderIcons from './HeaderIcons';
import { CgMenu } from 'react-icons/cg';
import logo from '../../Assets/logo/logo.png';
import MobileSideBar from '../Sidebar/MobileSideBar';


function HeaderIndex() {

    const navigate = useNavigate()

    const { isLogedIn, bearerHeader, userIs } = AuthIndex();

    const [opneMobileSideBar, setOpneMobileSideBar] = useState(false)

    const handeSideMenuIcon = () => {
        console.log("Side Icon Cliked in HeaderIndex")
        setOpneMobileSideBar(!opneMobileSideBar)
    }

    const close = () => {
        console.log("close called")
        setOpneMobileSideBar(false)
    }


    return (
        <>
            <div className='h-10 md:h-16 bg-white w-full shadow-md flow-root border-b select-none fixed z-40'>
                {/* <div onClick={handeSideMenuIcon} className='float-left ml-2 m-1 md:hidden block cursor-pointer'><CgMenu size={25} /></div>  This is for mobile */}
                <div className='flex float-left mt-1 md:mt-4 ml-4 cursor-pointer'>
                    <span className='flex'>
                        <img src={logo} alt="Logo" className='h-8 hidden md:block' />
                        <span onClick={() => navigate("/")} className='text-2xl font-semibold md:mx-3 ml-8 md:mt-0 mt-1'> Geez Learn </span>
                    </span>
                    <div className='mx-10 flex border border-gray-700 bg-gray-50 rounded-3xl px-2'>
                        <GoSearch size={20} className='mt-2 ml-2'/>
                        <input type="text" className='px-4 text-sm py-2 w-60 rounded-3xl bg-gray-50 outline-none placeholder:text-sm' placeholder='Search Courses' />

                    </div>
                </div>
                <div className='float-right mt-2'>
                    <div className='mr-3 md:mr-16 flex md:mt-2 mt-0.5'>
                        <div className='space-x-4 hidden md:block lg:block'>

                            {isLogedIn && userIs == 9 && <Link className="hover:text-blue-600" to="/dashboard">Dashboard</Link>}
                            {isLogedIn && userIs == 1 && <Link className="hover:text-blue-600" to="/StudentDahboard">Dashboard</Link>}

                            <Link className="hover:text-blue-600" to="/">Home</Link>
                            <Link className="hover:text-blue-600" to="/courses">Courses</Link>
                            <Link className="hover:text-blue-600" to="/contact">Contact</Link>
                            <Link className="hover:text-blue-600" to="/about">About</Link>
                            {/* <Link className="" to="/courses">Courses</Link> */}
                            {/* <Link className='border bg-blue-700 px-5 py-1.5 shadow-md rounded-md text-white' to="/courses">Courses</Link> */}
<BsCart3 />
                            {
                                isLogedIn ?
                                    <Link className='border bg-red-500 px-5 py-1.5 shadow-md rounded-md text-white' to="logout">Log Out</Link>
                                    :
                                    <>
                                    <Link className='border border-black hover:bg-gray-100 px-5 py-1.5  text-black' to="/login">Login</Link>
                                    <Link className='border border-black bg-black hover:bg-gray-800 px-3 py-1.5  text-white' to="/register">Sign Up</Link>
                                    </>
                            }

                        </div>
                        <div className='block md:hidden lg:hidden'>
                            <HeaderIcons />
                        </div>
                    </div>
                </div>
            </div>
            <div className='block md:hidden'>
                {/* {opneMobileSideBar && <MobileSideBar close={close} />} */}

                <MobileSideBar />

            </div>
        </>
    )
}

export default HeaderIndex