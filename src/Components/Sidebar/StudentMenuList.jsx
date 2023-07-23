import React from 'react'
import { Link,NavLink } from 'react-router-dom'
import MenuLinks from '../../Assets/JSON/MenuLinks.json'
import { AiFillHome } from 'react-icons/ai'
import { GiTeacher } from 'react-icons/gi'

function StudentMenuList() {

    return (
        <>
            {/* {
                MenuLinks?.StudentMenu?.menuitem?.map((items, i) => (
                    <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
                        <AiFillHome className="inline" />
                        <span className="text-sm ml-4 text-gray-200 font-bold">{items.menuName}</span>
                    </div>
                    // <p className='hover:font-semibold my-2'>  <Link key={i} to={items.menuLink} >{items.menuName}</Link></p>
                ))
            } */}
            {
                MenuLinks?.StudentMenu?.menuitem?.map((items, i) => (
                    <NavLink to={items.menuLink} className={({ isActive }) => (isActive ? 'p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-blue-600 text-white' : 'p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer  hover:bg-blue-600 text-white')}  >
                        <GiTeacher className="inline" />
                        <span className="text-sm ml-4 text-gray-200 font-bold">{items.menuName}</span>
                    </NavLink>
                ))
            }
            <p className='border-b'></p>
        </>
    )
}

export default StudentMenuList

/*
Exported to -
1. AdminSidebarIndex.js
2. MobileSideBar
*/