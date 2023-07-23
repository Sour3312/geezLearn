import React, { useEffect, useState } from 'react'
import { FiLogOut } from 'react-icons/fi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { GoSearch } from 'react-icons/go';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import AuthIndex from '../Auth/AuthIndex';
import HeaderIcons from './HeaderIcons';
import { CgMenu } from 'react-icons/cg';
import logo from '../../Assets/logo/logo.png';
import MobileSideBar from '../Sidebar/MobileSideBar';
import MobileSideBar2 from '../Sidebar/MobileSideBar2';
import { GrCart } from 'react-icons/gr';

import { globalContextData } from '../Common/Context/GlobalContextFile';
import { useContext } from 'react';
import LoginModal from '../../Pages/Login/LoginModal';
import StudentSidebar from '../Sidebar/StudentSidebar';
import { RiLogoutCircleLine } from 'react-icons/ri'
import { FiAlertCircle } from 'react-icons/fi'
import { getLocalStorageItemJsonParsed } from '../Common/localstorage';


function HeaderIndex() {
    const [openLoginModal, setOpenLoginModal] = useState(0)
    const [openPage, setOpenPage] = useState()
    const [opneMobileSideBar, setOpneMobileSideBar] = useState(false)

    const { cartItemCount, setCartItemCount, userData, setuserData } = useContext(globalContextData)
    const { isLogedIn, bearerHeader, userIs } = AuthIndex();
    const navigate = useNavigate()

    useEffect(() => {
        let findCartItemCount = cartItemCount === null ? getLocalStorageItemJsonParsed('cartCount') : cartItemCount
        let localStorageUserData = userData === null ? getLocalStorageItemJsonParsed('userData') : userData
        setCartItemCount(findCartItemCount)
        setuserData(localStorageUserData)
    }, [])

    const handeSideMenuIcon = () => {
        console.log("Side Icon Cliked in HeaderIndex")
        setOpneMobileSideBar(!opneMobileSideBar)
    }

    const close = () => {
        console.log("close called")
        setOpneMobileSideBar(false)
    }

    const handleLoginModal = (page) => {
        setOpenLoginModal(prev => prev + 1)
        setOpenPage(page)
    }

    const logOutUser = () => {
        navigate('/logout')
    }

    return (
        <>
            <dialog id='logoutModal' className='bg-transparent'>
                <div style={{ 'zIndex': 9999999 }} class="relative bg-white rounded-lg shadow-xl border-2 border-gray-50">
                    <button onClick={() => logoutModal.close()} type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center darks:hover:bg-gray-800 darks:hover:text-white" >
                        <svg class="w-5 h-5" fill="currentColor" ><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </button>
                    <div class="p-6 text-center">
                        <div className='w-full flex h-10'> <span className='mx-auto'><FiAlertCircle size={30} /></span></div>
                        <h3 class="mb-5 text-lg font-normal text-gray-500 darks:text-gray-400">Are you sure you want to logout ?</h3>
                        <button type="button" className="cypress_button_logout text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 darks:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2" onClick={logOutUser}>
                            Yes, I'm sure
                        </button>

                    </div>
                </div>
            </dialog>

            <LoginModal openLoginModal={openLoginModal} openPage={openPage} />
            <div className="fixed top-0 flex bg-white z-50 py-2 items-center px-2 md:px-10 w-full shadow-lg">

                <div className='flex-initial md:hidden'>
                    <MobileSideBar2 />
                </div>

                <div className="flex-initial hidden md:flex">
                    <div className="flex-initial"><img src={logo} alt="Logo" className='h-8' /></div>
                    <div className="flex-initial"><span onClick={() => navigate("/")} className='text-xl hidden md:block font-semibold md:mx-3 ml-8'> Geez Learn </span></div>
                </div>
                <div className="flex-initial flex border border-gray-700  rounded-3xl px-2 h-8 md:h-10 w-1/2 md:w-auto ml-10">
                    <div className='flex-initial'><GoSearch size={20} className='mt-2' /></div>
                    <div className="flex-1"> <input type="text" className='px-4 bg-transparent text-sm py-2 rounded-3xl outline-none placeholder:text-sm' placeholder='Search Courses' /></div>
                </div>
                <div className='flex-1 hidden md:block'>
                    <div className='flex float-right'>
                        <div className='space-x-10 flex'>



                          
                                <Link className="hover:text-blue-600" to="/">Home</Link>
                                {userIs === 2 && <Link className="hover:text-blue-600" to="/profile/basic-details">Profile</Link>}
                                {isLogedIn && (userIs == 9 || userIs ==2) && <Link className="hover:text-blue-600" to="/dashboard">Dashboard</Link>}
                                {isLogedIn && userIs == 1 && <Link className="hover:text-blue-600" to="/StudentDahboard">Dashboard</Link>}
                                {userIs !== 2 && userIs !== 9 && <Link className="hover:text-blue-600" to="/courses">Courses</Link>}
                                <Link className="hover:text-blue-600" to="/contact">Contact</Link>
                                <Link className="hover:text-blue-600" to="/about">About</Link>
                                <div className="hover:text-blue-600 cursor-pointer" onClick={() => handleLoginModal("register-teacher")}>Teach on Udemy</div>
                                <Link className="hover:text-blue-600" to="/help">Help</Link>

                                <div onClick={() => navigate('/cart')} className='cursor-pointer'>
                                    <span className='bg-purple-500 text-white text-base rounded-full px-2 absolute ml-3 -mt-2'>{cartItemCount || 0}</span>
                                    <GrCart size={25} />
                                </div>
                            
                            {
                                isLogedIn && userIs !== 1 && <div className='bg-white  rounded-md text-red-500' onClick={() => logoutModal.showModal()} ><RiLogoutCircleLine className="inline text-xl hover:text-red-600 cursor-pointer" /></div>
                            }
                            {/* {
                                isLogedIn ?
                                    <Link className='border bg-red-500 px-5 py-1.5 shadow-md rounded-md text-white' to="logout">Log Out</Link>
                                    :
                                    <>
                                        <p onClick={() => handleLoginModal("login")} className='border cursor-pointer border-black hover:bg-gray-100 px-5 py-1.5  text-black' to="/login">Login</p>
                                        <p onClick={() => handleLoginModal("register-student")} className='border cursor-pointer border-black bg-black hover:bg-gray-800 px-3 py-1.5  text-white' to="/login">Sign Up</p>
                                    </>
                            } */}
                            {
                                !isLogedIn &&

                                <>
                                    <p onClick={() => handleLoginModal("login")} className='border cursor-pointer border-black hover:bg-gray-100 px-5 py-1.5  text-black' to="/login">Login</p>
                                    <p onClick={() => handleLoginModal("register-student")} className='border cursor-pointer border-black bg-black hover:bg-gray-800 px-3 py-1.5  text-white' to="/login">Sign Up</p>
                                </>
                            }
                            {
                                isLogedIn && userIs === 1 && <StudentSidebar />
                            }

                        </div>

                    </div>

                </div>
                <div className='flex-1 md:hidden'>
                    <HeaderIcons />
                </div>
            </div>
        </>
    )
}

export default HeaderIndex