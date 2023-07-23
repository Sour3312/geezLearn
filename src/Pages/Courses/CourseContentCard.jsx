import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'
import { BsFillPlayFill } from 'react-icons/bs'

function CourseContentCard(props) {
    let contentDisplay = false
    const toggleHeight = (id) => {
        if (contentDisplay) {
            document.getElementById(`content${id}`).style.display = 'none'
            document.getElementById(`closeArrow${id}`).style.display = 'inline'
            document.getElementById(`openArrow${id}`).style.display = 'none'
            contentDisplay = false
        } else {
            document.getElementById(`content${id}`).style.display = 'grid'
            document.getElementById(`closeArrow${id}`).style.display = 'none'
            document.getElementById(`openArrow${id}`).style.display = 'inline'
            contentDisplay = true

        }
    }
    return (
        <>
            <div className='w-full bg-white grid grid-cols-12 px-2 sm:px-10 py-2 sm:py-10'>

                {/* LEFT MARGIN SPACER HIDDEN IN SMALL */}
                <div className="col-span-2 hidden sm:block"></div>

                <div className="col-span-12 sm:col-span-6 px-4 py-2">
                    <h1 className='text-2xl font-bold text-gray-800 font-custom-montserrat'>Course Content</h1>

                    <div className="grid grid-cols-12 mt-2">
                        <div className="col-span-6 text-sm text-gray-700">15 sections • 146 lectures • 14h 42m total length</div>
                        <div className="col-span-6 text-right text-sm text-indigo-500 font-semibold">Expand all sections</div>
                    </div>

                    <div className='border mt-2'>
                        {props?.CourseContent?.map((data, index) => (
                            <>
                                <div className='border-b cursor-pointer bg-gray-50' onClick={() => toggleHeight(index)}>
                                    <div className="grid grid-cols-12 p-4">
                                        <div className="col-span-6 text-md font-bold text-gray-700 flex items-center">
                                            <BiChevronDown className="text-2xl" style={{ 'display': 'inline' }} id={`closeArrow${index}`} />
                                            <BiChevronUp className="text-2xl" style={{ 'display': 'none' }} id={`openArrow${index}`} />
                                            {data?.lectureName}</div>
                                        <div className="col-span-6 text-right text-sm text-gray-500 font-semibold">{data?.contentTime}</div>
                                    </div>
                                </div>

                                <div className=" grid-cols-12 p-4 transition-all" style={{ 'display': 'none' }} id={`content${index}`}>
                                    {data?.lessons?.map((content) => (
                                        <>
                                            <div className="col-span-6 text-sm ml-2"><NavLink to="/"><div className=' h-3 w-3 rounded-full inline-flex justify-center items-center bg-black mr-4'><BsFillPlayFill className='inline text-xs text-white' /></div>{content?.lessonName}</NavLink></div>
                                            <div className="col-span-6 text-right text-sm text-gray-700">{content?.duration}</div>

                                            {/* SPACER */}
                                            <div className='col-span-12 h-4'></div>
                                        </>
                                    ))}

                                </div>
                            </>
                        ))}
                    </div>

                </div>
            </div>
        </>
    )
}

export default CourseContentCard
/*
Exported to -
CourseContent.js
*/