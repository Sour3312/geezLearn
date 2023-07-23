import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'
import { BsFillPlayFill } from 'react-icons/bs'
import { FiPlus } from 'react-icons/fi'
import { MdModeEditOutline, MdDelete } from 'react-icons/md'
import { RotatingLines } from "react-loader-spinner";


function CourseContentFormCard(props) {
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
            <div className='w-full bg-white grid grid-cols-12 px-2'>

                {/* LEFT MARGIN SPACER HIDDEN IN SMALL */}
                <div className="col-span-2 hidden sm:block"></div>

                <div className="col-span-12 px-4 py-2">
                    <h1 className='text-2xl font-bold text-gray-800 font-custom-montserrat'>Course Content</h1>

                    <div className="grid grid-cols-12 mt-2">
                        <div className="col-span-6 text-sm text-gray-700">15 sections • 146 lectures • 14h 42m total length</div>
                        <div className="col-span-6 text-right text-sm text-indigo-500 font-semibold">Expand all sections</div>
                    </div>

                    <div className='border mt-2'>
                        {props?.contents?.map((data, index) => (
                            <>
                                <div className='border-b cursor-pointer bg-gray-50' onClick={() => toggleHeight(index)}>
                                    <div className="grid grid-cols-12 p-4">
                                        <div className="col-span-6 text-md font-bold text-gray-700 flex items-center">
                                            <BiChevronDown className="text-2xl" style={{ 'display': 'inline' }} id={`closeArrow${index}`} />
                                            <BiChevronUp className="text-2xl" style={{ 'display': 'none' }} id={`openArrow${index}`} />
                                            {data?.lectureTitle}
                                            <div className='ml-4 space-x-2'>
                                                <MdModeEditOutline className="inline text-md" />
                                                {props?.isLoadingLectureDelete && props?.currentLectureId === data?.lectureId ? <RotatingLines
                                                    strokeColor="black"
                                                    strokeWidth="5"
                                                    animationDuration="0.75"
                                                    width="25"
                                                    visible={true}
                                                /> : <MdDelete className="inline text-md" onClick={(e) => {
                                                    e.stopPropagation()
                                                    props?.setcurrentLectureId(data?.lectureId)
                                                    props?.deleteLecture(data?.lectureId)
                                                }} />}
                                            </div>
                                        </div>
                                        <div className="col-span-6 text-right text-sm text-gray-500 font-semibold">{data?.contentTime}</div>
                                    </div>
                                </div>

                                <div className=" grid-cols-12 p-4 transition-all" style={{ 'display': 'none' }} id={`content${index}`}>
                                    {Array.isArray(data?.contentList) && data?.contentList?.map((content) => (
                                        <>
                                            <div className="col-span-6 text-sm ml-2"><NavLink to="/"><div className=' h-3 w-3 rounded-full inline-flex justify-center items-center bg-black mr-4'><BsFillPlayFill className='inline text-xs text-white' /></div>
                                                {content?.contentHeading}
                                                <span className='ml-4 space-x-2'>
                                                    <MdModeEditOutline className="inline text-md" />
                                                    {props?.isLoadingLessonAdd && props?.currentLectureId === data?.lectureId ? <MdDelete onClick={(e) => {
                                                        e.stopPropagation()
                                                        props?.setcurrentLectureId(data?.lectureId)
                                                        props?.postLesson(data?.lectureId)
                                                    }} className="inline text-md" /> : <RotatingLines
                                                        strokeColor="black"
                                                        strokeWidth="5"
                                                        animationDuration="0.75"
                                                        width="25"
                                                        visible={true}
                                                    />}
                                                </span>
                                            </NavLink></div>
                                            <div className="col-span-6 text-right text-sm text-gray-700">{content?.contentDuration}</div>

                                            {/* SPACER */}
                                            <div className='col-span-12 h-4'></div>



                                        </>

                                    ))}

                                    <div className='col-span-12 grid grid-cols-12 w-full'>
                                        <div className="form-group col-span-3 mb-6 md:px-6">
                                            <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Lesson Name<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                            <input value={props?.currentLessonName} onChange={(e) => props?.setcurrentLessonName(e.target.value)} type="text" className={'form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border-[1px] border-solid border-black  transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300'}
                                            />

                                        </div>
                                        <div className="form-group col-span-3 mb-6 md:px-6">
                                            <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">content<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                            <input value={props?.currentLessonContent} onChange={(e) => props?.setcurrentLessonContent(e.target.value)} type="text" className={'form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border-[1px] border-solid border-black  transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300'}
                                            />

                                        </div>
                                        <div className="form-group col-span-3 mb-6 md:px-6">
                                            <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Duration<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                            <input value={props?.currentLessonDuration} onChange={(e) => props?.setcurrentLessonDuration(e.target.value)} type="text" className={'form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border-[1px] border-solid border-black  transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300'}
                                            />

                                        </div>
                                        <div className="col-span-3">
                                            <label className="form-label block mb-1 text-gray-600 text-sm font-semibold">&nbsp;</label>

                                            {props?.isLoadingLessonAdd && props?.currentLectureId === data?.lectureId ? <button
                                                type="button"
                                                className="px-6 py-1.5 text-md font-semibold bg-black text-white shadow-sm hover:shadow-lg"
                                            ><RotatingLines
                                                    strokeColor="white"
                                                    strokeWidth="5"
                                                    animationDuration="0.75"
                                                    width="25"
                                                    visible={true}
                                                /> </button> : <button onClick={(e) => {
                                                    e.stopPropagation()
                                                    props?.setcurrentLectureId(data?.lectureId)
                                                    props?.postLesson(data?.lectureId)
                                                }}
                                                    type="button block"
                                                    className="px-6 py-1.5 text-md font-semibold bg-black text-white shadow-sm hover:shadow-lg"
                                                >
                                                Save</button>}
                                        </div>
                                    </div>

                                    <div className='px-6 col-span-12'>
                                        <button
                                            type="button"
                                            className="px-3 py-1 text-md font-semibold text-black shadow-sm hover:bg-black hover:text-white border-2 border-black"
                                        >
                                            <FiPlus className="inline text-lg" /> Add Content
                                        </button>
                                    </div>

                                </div>

                            </>
                        ))}
                    </div>

                </div>
            </div>
        </>
    )
}

export default CourseContentFormCard
/*
Exported to -
CourseContent.js
*/