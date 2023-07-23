import React from 'react'
import MenuLinks from '../../Assets/JSON/MenuLinks.json'
import { Link,NavLink } from 'react-router-dom'
import { GiTeacher } from 'react-icons/gi'


function TeacherMenuList() {

    return (
        <>
            {
                MenuLinks?.TeacherMenu?.menuitem?.map((items, i) => (
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

export default TeacherMenuList

/*
Exported to -
1. AdminSidebarIndex.js
2. MobileSideBar
*/