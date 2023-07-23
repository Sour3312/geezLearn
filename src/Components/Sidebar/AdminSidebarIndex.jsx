import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import ApiList from '../Api/ApiList'
import profileImage from '../../Assets/images/profile.jpg'
// import MenuList from './AdminMenuList';
import AuthIndex from '../Auth/AuthIndex';
import AdminMenuList from './AdminMenuList';
import { AiFillHome } from 'react-icons/ai'
import { GiTeacher } from 'react-icons/gi'
import { AiOutlineDashboard } from 'react-icons/ai'
import { GiOpenBook } from 'react-icons/gi'
import { FaUserGraduate } from 'react-icons/fa'
import { BiLogOut } from 'react-icons/bi'
import { MdPaid } from 'react-icons/md'


function AdminSidebarIndex() {

    const { userType } = ApiList();

    const { userIs } = AuthIndex();

    return (
        <>

            <div className='w-full h-screen pt-3'>

                <div className="sidebar fixed top-14 bottom-0 lg:left-0 p-2 w-[220px] overflow-y-auto text-center bg-gray-800">
                    <div className='flex justify-center'>
                        <div className='bg-white rounded-full h-20 w-20 overflow-hidden flex justify-center items-center border-2 '>
                            <img src={profileImage} alt="Profile" />
                        </div>
                    </div>
                    <div>
                        <p className='font-semibold text-white'>
                            {userIs === 2 && 'Teacher'}
                            {userIs === 9 && 'Admin'}
                        </p>
                        <span className='text-white font-custom-lora'>Henry Steven</span>
                    </div>

                    {/* <div className="nav">
                        <NavLink
                            to="dashboard"
                            className={({ isActive }) => (isActive ? 'active' : 'inactive')}
                        >
                            Users
                        </NavLink>
                        <NavLink
                            to="CourseList"
                            className={({ isActive }) => (isActive ? 'active' : 'inactive')}
                        >
                            Posts
                        </NavLink>
                    </div> */}

                    {/* DIVIDER LINE */}
                    <div className="nav my-4 bg-gray-600 h-[1px]" />
                    {userIs == 9 &&   // This is For Admin
                        <>


                            <NavLink exact to="/dashboard" className={({ isActive }) => (isActive ? 'p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-blue-600 text-white' : 'p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer  hover:bg-blue-600 text-white')}  >
                                {/* <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer active:text-red-500 active:bg-red-500 hover:bg-blue-600 text-white"> */}
                                <AiOutlineDashboard className="inline" />
                                <span className="text-sm ml-4 text-gray-200 font-bold">Dashboard</span>
                                {/* </div> */}
                            </NavLink>

                            <NavLink to="/CourseList" className={({ isActive }) => (isActive ? 'p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-blue-600 text-white' : 'p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer  hover:bg-blue-600 text-white')}  >
                                <GiOpenBook className="inline" />
                                <span className="text-sm ml-4 text-gray-200 font-bold">Course List</span>
                            </NavLink>
                            <NavLink to="/CourseCategory" className={({ isActive }) => (isActive ? 'p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-blue-600 text-white' : 'p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer  hover:bg-blue-600 text-white')}  >
                                <GiOpenBook className="inline" />
                                <span className="text-sm ml-4 text-gray-200 font-bold">Course Category</span>
                            </NavLink>

                            <NavLink to="/StudentsList" className={({ isActive }) => (isActive ? 'p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-blue-600 text-white' : 'p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer  hover:bg-blue-600 text-white')}  >
                                <FaUserGraduate className="inline" />
                                <span className="text-sm ml-4 text-gray-200 font-bold">Students</span>
                            </NavLink>

                            <NavLink to="/TeachersList" className={({ isActive }) => (isActive ? 'p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-blue-600 text-white' : 'p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer  hover:bg-blue-600 text-white')}  >
                                <GiTeacher className="inline" />
                                <span className="text-sm ml-4 text-gray-200 font-bold">Teachers</span>
                            </NavLink>

                            {/* <NavLink to="/teacher-register-request" className={({ isActive }) => (isActive ? 'p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-blue-600 text-white' : 'p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer  hover:bg-blue-600 text-white')}  >
                                <GiTeacher className="inline" />
                                <span className="text-sm ml-4 text-gray-200 font-bold">Teachers Register</span>
                            </NavLink> */}

                            <NavLink to="/teacher-payment-approval" className={({ isActive }) => (isActive ? 'p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-blue-600 text-white' : 'p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer  hover:bg-blue-600 text-white')}  >
                                <GiTeacher className="inline" />
                                <span className="text-sm ml-4 text-gray-200 font-bold">Payment Approval</span>
                            </NavLink>

                            <NavLink to="/course-approval" className={({ isActive }) => (isActive ? 'p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-blue-600 text-white' : 'p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer  hover:bg-blue-600 text-white')}  >
                                <GiTeacher className="inline" />
                                <span className="text-sm ml-4 text-gray-200 font-bold">Course Approval</span>
                            </NavLink>

                            <NavLink to="/transaction-report" className={({ isActive }) => (isActive ? 'p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-blue-600 text-white' : 'p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer  hover:bg-blue-600 text-white')}  >
                                <GiTeacher className="inline" />
                                <span className="text-sm ml-4 text-gray-200 font-bold">Transaction Report</span>
                            </NavLink>

                            <NavLink to="/contact-list" className={({ isActive }) => (isActive ? 'p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-blue-600 text-white' : 'p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer  hover:bg-blue-600 text-white')}  >
                                <GiTeacher className="inline" />
                                <span className="text-sm ml-4 text-gray-200 font-bold">Contact List</span>
                            </NavLink>
                            {/* <NavLink to="/Transactions" className={({ isActive }) => (isActive ? 'p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-blue-600 text-white' : 'p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer  hover:bg-blue-600 text-white')}  >
                                <GiTeacher className="inline" />
                                <span className="text-sm ml-4 text-gray-200 font-bold">Transactions</span>
                            </NavLink>
                            <NavLink to="/Settings" className={({ isActive }) => (isActive ? 'p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-blue-600 text-white' : 'p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer  hover:bg-blue-600 text-white')}  >
                                <GiTeacher className="inline" />
                                <span className="text-sm ml-4 text-gray-200 font-bold">Settings</span>
                            </NavLink>
                            <NavLink to="/Report" className={({ isActive }) => (isActive ? 'p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-blue-600 text-white' : 'p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer  hover:bg-blue-600 text-white')}  >
                                <GiTeacher className="inline" />
                                <span className="text-sm ml-4 text-gray-200 font-bold">Reports</span>
                            </NavLink> */}

                        </>

                    }


                    {userIs == 2 &&   // This is For Teacher
                        <>


                            <NavLink exact to="/dashboard" className={({ isActive }) => (isActive ? 'p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-blue-600 text-white' : 'p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer  hover:bg-blue-600 text-white')}  >
                                {/* <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer active:text-red-500 active:bg-red-500 hover:bg-blue-600 text-white"> */}
                                <AiOutlineDashboard className="inline" />
                                <span className="text-sm ml-4 text-gray-200 font-bold">Dashboard</span>
                                {/* </div> */}
                            </NavLink>

                            <NavLink to="/CourseList" className={({ isActive }) => (isActive ? 'p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-blue-600 text-white' : 'p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer  hover:bg-blue-600 text-white')}  >
                                <GiOpenBook className="inline" />
                                <span className="text-sm ml-4 text-gray-200 font-bold">Course List</span>
                            </NavLink>
                            {/* <NavLink to="/CourseCategory" className={({ isActive }) => (isActive ? 'p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-blue-600 text-white' : 'p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer  hover:bg-blue-600 text-white')}  >
                                <GiOpenBook className="inline" />
                                <span className="text-sm ml-4 text-gray-200 font-bold">Course Category</span>
                            </NavLink> */}

                            <NavLink to="/StudentsList" className={({ isActive }) => (isActive ? 'p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-blue-600 text-white' : 'p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer  hover:bg-blue-600 text-white')}  >
                                <FaUserGraduate className="inline" />
                                <span className="text-sm ml-4 text-gray-200 font-bold">Students</span>
                            </NavLink>

                            <NavLink to="/payment-request" className={({ isActive }) => (isActive ? 'p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-blue-600 text-white' : 'p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer  hover:bg-blue-600 text-white')}  >
                                <GiTeacher className="inline" />
                                <span className="text-sm ml-4 text-gray-200 font-bold">Payments</span>
                            </NavLink>


                            <NavLink to="/transaction-report" className={({ isActive }) => (isActive ? 'p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-blue-600 text-white' : 'p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer  hover:bg-blue-600 text-white')}  >
                                <GiTeacher className="inline" />
                                <span className="text-sm ml-4 text-gray-200 font-bold">Transaction Report</span>
                            </NavLink>


                            <NavLink to="/profile/basic-details" className={({ isActive }) => (isActive ? 'p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-blue-600 text-white' : 'p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer  hover:bg-blue-600 text-white')}  >
                                <GiTeacher className="inline" />
                                <span className="text-sm ml-4 text-gray-200 font-bold">Profile</span>
                            </NavLink>

                            <NavLink to="/change-password-teacher" className={({ isActive }) => (isActive ? 'p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-blue-600 text-white' : 'p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer  hover:bg-blue-600 text-white')}  >
                                <GiTeacher className="inline" />
                                <span className="text-sm ml-4 text-gray-200 font-bold">Change Password</span>
                            </NavLink>


                            {/* <NavLink to="/Transactions" className={({ isActive }) => (isActive ? 'p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-blue-600 text-white' : 'p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer  hover:bg-blue-600 text-white')}  >
                                <GiTeacher className="inline" />
                                <span className="text-sm ml-4 text-gray-200 font-bold">Transactions</span>
                            </NavLink>
                            <NavLink to="/Settings" className={({ isActive }) => (isActive ? 'p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-blue-600 text-white' : 'p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer  hover:bg-blue-600 text-white')}  >
                                <GiTeacher className="inline" />
                                <span className="text-sm ml-4 text-gray-200 font-bold">Settings</span>
                            </NavLink>
                            <NavLink to="/Report" className={({ isActive }) => (isActive ? 'p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-blue-600 text-white' : 'p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer  hover:bg-blue-600 text-white')}  >
                                <GiTeacher className="inline" />
                                <span className="text-sm ml-4 text-gray-200 font-bold">Reports</span>
                            </NavLink> */}

                        </>

                    }
                    {/* {userIs == 1 &&  
                        <>
                            <NavLink to="/StudentDahboard" className={({ isActive }) => (isActive ? 'p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-blue-600 text-white' : 'p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer  hover:bg-blue-600 text-white')}  >
                                <AiOutlineDashboard className="inline" />
                                <span className="text-sm ml-4 text-gray-200 font-bold">Dashboard</span>
                            </NavLink>

                            <NavLink to="/my-courses" className={({ isActive }) => (isActive ? 'p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-blue-600 text-white' : 'p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer  hover:bg-blue-600 text-white')}  >
                                <GiOpenBook className="inline" />
                                <span className="text-sm ml-4 text-gray-200 font-bold">My Course</span>
                            </NavLink>
                            <NavLink to="/order-history" className={({ isActive }) => (isActive ? 'p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-blue-600 text-white' : 'p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer  hover:bg-blue-600 text-white')}  >
                                <MdPaid className="inline" />
                                <span className="text-sm ml-4 text-gray-200 font-bold">Order History</span>
                            </NavLink>
                            <NavLink to="/certificates" className={({ isActive }) => (isActive ? 'p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-blue-600 text-white' : 'p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer  hover:bg-blue-600 text-white')}  >
                                <FaUserGraduate className="inline" />
                                <span className="text-sm ml-4 text-gray-200 font-bold">Certificates</span>
                            </NavLink>

                        </>

                    } */}
                    <Link to="/logout">
                        <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
                            <BiLogOut className="inline" />
                            <span className="text-sm ml-4 text-gray-200 font-bold">Logout</span>
                        </div>
                    </Link>
                </div>
            </div >

            {/* <div className='w-full h-screen bg-white shadow-xl pt-3'>

                <div className='flex justify-center'>
                    <img src={profileImage} alt="Profile" className='w-1/3 rounded-t-full' />
                </div>

                <div className='text-center'>
                    <p>Welcome </p><p className='font-semibold'>{userType || "Guest"}</p>
                    <p className='border-b mx-5'></p>
                </div>
                <p className='py-5'></p>
                <div className='text-left mx-8'>
                    <AdminMenuList />
                </div>

            </div> */}

        </>
    )
}

export default AdminSidebarIndex

/*
Exported to - 
App.js
*/