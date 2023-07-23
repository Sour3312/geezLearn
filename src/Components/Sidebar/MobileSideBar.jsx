import React from 'react'
import AuthIndex from '../Auth/AuthIndex';
import AdminMenuList from './AdminMenuList'
import PublicMenuList from './PublicMenuList';
import StudentMenuList from './StudentMenuList';
import profileImage from '../../Assets/images/profile.jpg'
import { AiFillHome } from 'react-icons/ai'
import { BsFillBookmarksFill } from 'react-icons/bs'
import { BiLogOut } from 'react-icons/bi'


function MobileSideBar() {
    const { isLogedIn, bearerHeader, userIs } = AuthIndex();
    return (
        <>
            <button class="bg-hamburger w-[28px] h-[28px] bg-no-repeat bg-center m-[14px] ml-2 absolute -mt-1 top-0 peer text-4xl z-50" id="button_aside">≡</button>
            <aside class="fixed top-10 bg-[#F6F9FE] w-[233px] h-full -left-[233px] peer-focus:left-0 ease-out delay-150 duration-300" id="aside">
                <h1 class="text-[#6164E8] font-bold text-[13px] mt-8 text-center">

                    {!isLogedIn && "Welcome"}
                    {isLogedIn && userIs === 1 && "Student"}
                    {isLogedIn && userIs === 9 && "Admin"}

                </h1>
                <div className='text-left mx-8'>



                    {isLogedIn && userIs === 9 && <AdminMenuList />}
                    {isLogedIn && userIs === 1 && <StudentMenuList />}
                    <PublicMenuList />

                </div>
            </aside>
        </>
    )
}

export default MobileSideBar


/*

Exported to -
1. HeaderIndex.js
*/