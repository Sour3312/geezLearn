import React from 'react'
import { GrPlayFill } from 'react-icons/gr'
import { IoMdStar, IoMdStarHalf } from 'react-icons/io'
import { BiRupee } from 'react-icons/bi'
import { AiOutlineHeart } from 'react-icons/ai'
import { ImList2 } from 'react-icons/im'
import { FiGrid } from 'react-icons/fi'
import { AiOutlineDoubleRight } from 'react-icons/ai'
import { NavLink, useNavigate } from 'react-router-dom'
import medal from './assets/medal.png'
import pbook from './pbook.png'
import { AiOutlineDelete } from 'react-icons/ai'
import { RotatingLines } from "react-loader-spinner";




function LearningCard(props) {
    const navigate = useNavigate()
    return (
        <>
            {/* IF TYPE IS MY LEARNING */}
            {props?.type === 'learning-course-card' && <div className='md:px-4 col-span-4 relative'>
                <div className="border grid grid-cols-12 relative" onClick={() => navigate(`/play/course-content/${props?.learningData?.courseId}`)}>
                    <div className='col-span-4 overflow-hidden h-40 relative'>
                        <img
                            src={props?.learningData?.courseImageFullPath || pbook}
                            alt="Laptop"
                            className="h-[200px] w-full object-cover"
                        />
                        <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center curs.or-pointer'>
                            <div className='bg-white w-12 h-12 rounded-full flex justify-center items-center '>
                                <GrPlayFill className="inline text-xl" />
                            </div>
                        </div>
                    </div>
                    <div className="p-4 col-span-8">
                        <div className="items-center text-sm font-semibold text-gray-700"> {props?.learningData?.teacherName}</div>
                        <div className="items-center text-md font-bold mt-2 mb-4"> {props?.learningData?.title}</div>
                        <div className="items-center text-xs font-bold text-gray-600">
                            Lecture <span className='text-gray-800 text-normal'>2m left</span>
                        </div>

                    </div>
                    <div className=' w-full h-full absolute top-0 left-0 hover:bg-indigo-500 cursor-pointer opacity-40'></div>


                </div>
            </div>}

            {/* IF TYPE IS COURSE */}
            {props?.type === 'my-course-card' && <div className='md:px-4 col-span-3 bg-white shadow-md mx-2 my-2'>
                <div className='overflow-hidden h-40 relative bg-white'>
                    <img
                        src={props?.learningData?.courseImageFullPath || pbook}
                        alt="Laptop"
                        className="h-[200px] w-full object-cover"
                    />
                    <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center cursor-pointer'>
                        <div className='bg-white w-12 h-12 rounded-full flex justify-center items-center '>
                            <GrPlayFill className="inline text-xl" />
                        </div>
                    </div>
                    <div className=' w-full h-full absolute top-0 left-0 hover:bg-indigo-500 cursor-pointer opacity-40'></div>

                </div>
                <div className="p-4 col-span-8">
                    <div className="items-center text-md font-bold mt-2 mb-4"> {props?.learningData?.title}</div>
                    <div className="items-center text-xs font-bold text-gray-600"><span className='text-gray-800 text-normal'>{props?.learningData?.instructor}</span>
                    </div>
                </div>
            </div>}

            {/* IF TYPE IS PROUDCT FOR WISHLIST */}
            {props?.type === 'product-course-card' && <div className='md:px-4 col-span-3'>
                <div className="col-span-10 md:col-span-2 mt-8 md:mt-0 px-4 md:px-0 sm:mb-4">
                    <div class="w-full rounded overflow-hidden shadow-lg pb-4 md:pb-2">
                        <div className='cursor-pointer' onClick={() => navigate(`/course-details/${window.btoa(props?.cardData?.id)}`)}>
                            <img className="w-full h-40" src={props?.cardData?.fullPath || "https://img.freepik.com/free-vector/images-concept-illustration_114360-218.jpg"} alt="Sunset in the mountains" />
                            <div class="px-6 md:px-1 md:pl-2 py-4">
                                <div className="font-bold text-md mb-2">{props?.cardData?.title || "No Title Found"}</div>
                                <p class="text-gray-700 text-xs font-custom-lora">
                                    {props?.cardData?.teacherName || "No Author Found"}
                                </p>
                                <div class="text-gray-700 text-xs flex items-center">
                                    <span className='font-bold text-lg text-amber-600'>{props?.cardData?.rating || 0}</span>
                                    <IoMdStar className='text-amber-600 text-xl inline' />
                                    <IoMdStarHalf className='text-amber-600 text-xl inline' />
                                    <span>({props?.cardData?.rating})</span>
                                </div>
                                <div className='font-bold flex'>
                                    <div className='flex-1'><BiRupee className='inline' />{props?.cardData?.price}</div>
                                    <div className='flex-1 flex justify-end pr-2'>
                                        {(props?.isLoadingDelete && props?.index == props?.currentLoadingIndex) ? <div className='w-12 h-12 rounded-full flex justify-center items-center border border-black cursor-pointer hover:bg-black hover:text-white'><RotatingLines
                                            strokeColor="red"
                                            strokeWidth="5"
                                            animationDuration="0.75"
                                            width="25"
                                            visible={true}
                                        /></div> :
                                            <div onClick={(e) => {
                                                e.stopPropagation();
                                                props?.setcurrentLoadingIndex(props?.index)
                                                props?.deleteWishlist(props?.cardData?.id)
                                            }} className='w-12 h-12 rounded-full flex justify-center items-center border border-black cursor-pointer hover:bg-black hover:text-white'>
                                                <AiOutlineDelete size={12} className="text-red-500" />
                                            </div>
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='mx-2'>
                            <button className='bg-indigo-500 text-white py-1 text-center w-full text-sm'>
                                Buy
                            </button>
                        </div>
                    </div>
                </div>
            </div>}

            {/* CERTIFICATION CARD */}
            {props?.type === 'certification-card' && <div className='md:px-4 col-span-12 sm:col-span-6 md:col-span-4 relative '>
                <div className="border grid grid-cols-12 relative shadow-xl" onClick={() => navigate(`/certification/${props?.data?.certificate_no}`)}>
                    <div className='col-span-4 overflow-hidden h-40 relative flex justify-center items-center'>
                        <img
                            src={medal}
                            alt="Laptop"
                            className="w-full object-cover"
                        />
                    </div>
                    <div className="p-4 col-span-8 flex justify-center items-center flex-col">
                        <div className="items-center text-sm font-semibold text-gray-700"> {props?.data?.courseName}</div>
                        <div className="items-center text-md font-bold mt-2 mb-4"> {props?.data?.courseName}</div>
                        <div className="items-center text-xs font-bold text-gray-600">
                            Complete - <span className='text-gray-800 text-normal'>{props?.data?.completePercentage}%</span>
                        </div>

                    </div>
                    <div className=' w-full h-full absolute top-0 left-0 hover:bg-indigo-500 cursor-pointer opacity-40'></div>


                </div>
            </div>}
        </>
    )
}

export default LearningCard