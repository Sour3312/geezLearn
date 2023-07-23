import { BiCheck } from 'react-icons/bi'
import { IoMdStar, IoMdStarHalf } from 'react-icons/io'
import { BiRupee } from 'react-icons/bi'
import pc from './pc.jfif'
import { NavLink } from 'react-router-dom'
import CourseContentCard from './CourseContentCard'


function CourseContent(props) {

    // DUMMY DATA ARRAY TO SHOW COURESE
    const courses = [
        { id: 1, courseName: 'python', title: "Learn Python: The Complete Python.", author: 'Avinash Jain, The Codex', ratings: 450, price: 4254 },
        { id: 2, courseName: 'python', title: "Learn Python: The Complete Python.", author: 'Avinash Jain, The Codex', ratings: 450, price: 4254 },
        { id: 3, courseName: 'python', title: "Learn Python: The Complete Python.", author: 'Avinash Jain, The Codex', ratings: 450, price: 4254 },
        { id: 4, courseName: 'python', title: "Learn Python: The Complete Python.", author: 'Avinash Jain, The Codex', ratings: 450, price: 4254 },
        { id: 5, courseName: 'python', title: "Learn Python: The Complete Python.", author: 'Avinash Jain, The Codex', ratings: 450, price: 4254 },
        { id: 6, courseName: 'python', title: "Learn Python: The Complete Python.", author: 'Avinash Jain, The Codex', ratings: 450, price: 4254 },


    ]

    return (
        <>
            {/* <div className='w-full bg-white grid grid-cols-12 px-2 sm:px-10 py-2 sm:py-10'>

                <div className="col-span-2 hidden sm:block"></div>

                <div className="col-span-12 sm:col-span-6 border px-4 py-2">
                    <h1 className='text-2xl font-bold text-gray-800 font-custom-montserrat'>What you'll learn</h1>
                    <div className="grid grid-cols-12 mt-2">
                        {props?.courseDetails?.contentBrief?.map((data) => (
                            <div className="col-span-12 sm:col-span-6 text-sm mt-2 flex">
                                <div className='flex-initial'><BiCheck className="inline text-2xl" /></div>
                                <div className='flex-initial ml-2 text-gray-700'>{data}</div>
                            </div>
                        ))
                        }

                    </div>
                </div>
            </div> */}

            {/* COURSE CONTENT  */}
            <CourseContentCard CourseContent={props?.courseData?.courseContents} contents={props?.courseDetails?.contents}/>


            {/* DESCRIPTION */}
            <div className='w-full grid grid-cols-12 px-2 sm:px-10 py-2 sm:py-10'>

                {/* LEFT MARGIN SPACER HIDDEN IN SMALL */}
                <div className="col-span-2 hidden sm:block"></div>

                <div className="col-span-12 sm:col-span-6 px-4 py-2">
                    <h1 className='text-2xl font-bold text-gray-800 font-custom-montserrat'>Description</h1>
                    <h1 className='text-sm font-bold text-gray-800 mt-2'>{props?.courseDetails?.description?.descriptionTitle}</h1>

                    <p className='text-sm text-gray-700 mt-4'>{props?.courseDetails?.description?.descriptionText}</p>
                    <div className='text-sm text-indigo-600 mt-4'>Show More</div>

                </div>
            </div>

            {/* INSTRUCTOR */}
            <div className='w-full bg-white grid grid-cols-12 px-2 sm:px-10 py-2 sm:py-10'>

                {/* LEFT MARGIN SPACER HIDDEN IN SMALL */}
                <div className="col-span-2 hidden sm:block"></div>

                <div className="col-span-12 sm:col-span-6 px-4 py-2">
                    <h1 className='text-2xl font-bold text-gray-800 font-custom-montserrat'>Instructors</h1>
                    <h1 className='text-xl font-bold text-indigo-600 mt-4'><NavLink to='/'><span className='border-b-2 border-b-indigo-600'>{props?.courseDetails?.instructor?.iName}</span></NavLink></h1>
                    <h1 className='text-sm font-semibold  mt-2 text-gray-700 font-custom-lora'>{props?.courseDetails?.instructor?.iDesignation}</h1>

                    <div className="flex mt-4">
                        <div className='flex-initial'><img className='rounded-full w-28' src="https://img-c.udemycdn.com/user/200_H/10260436_946b_6.jpg" alt="" /></div>
                        <div className='flex-initial ml-2'>

                            <div className='flex items-center text-gray-700'><IoMdStar className='inline' /><span className='ml-3'>{props?.courseDetails?.instructor?.iRating} Instructor Rating</span></div>
                            <div className='flex items-center text-gray-700'><IoMdStar className='inline' /><span className='ml-3'>{props?.courseDetails?.instructor?.iReviews} Reviews</span></div>
                            <div className='flex items-center text-gray-700'><IoMdStar className='inline' /><span className='ml-3'>{props?.courseDetails?.instructor?.iStudents} Students</span></div>
                            <div className='flex items-center text-gray-700'><IoMdStar className='inline' /><span className='ml-3'>{props?.courseDetails?.instructor?.iCourses} Courses</span></div>
                        </div>
                    </div>

                    <p className='text-sm text-gray-700 mt-4'>{props?.courseDetails?.instructor?.iDescription}</p>
                    <div className='text-sm text-indigo-600 mt-4'>Show More</div>


                </div>
            </div>

            {/* RATINGS */}
            <div className='w-full bg-white grid grid-cols-12 px-2 sm:px-10 py-2 sm:py-10'>

                {/* LEFT MARGIN SPACER HIDDEN IN SMALL */}
                <div className="col-span-2 hidden sm:block"></div>

                <div className="col-span-12 sm:col-span-6 px-4 py-2">
                    <h1 className='text-2xl font-bold text-gray-800 flex items-center font-custom-montserrat'><IoMdStar className='inline mr-3 text-amber-600' />{props?.courseDetails?.commentContent?.cRating} course rating
                        4K ratings</h1>

                    <div className="grid grid-cols-12 mt-4">

                        {props?.courseDetails?.commentContent?.cRatings?.map((data) => (
                            <div className='col-span-12 sm:col-span-6 mb-6'>
                                <div className="flex">
                                    <div className='flex-initial'><div className='w-10 h-10 bg-black text-white font-bold rounded-full flex justify-center items-center'>SS</div></div>
                                    <div className='flex-initial ml-4'>
                                        <div className='font-bold'>{data?.name}</div>
                                        <div className='text-sm font-bold text-gray-600'><IoMdStar className='inline text-amber-600' /><span className='ml-3'>{data?.createdAt}</span></div>
                                    </div>
                                </div>
                                <div className='mt-3 font-custom-lora'>{data?.comment}</div>
                            </div>
                        ))}


                        {/* SPACER */}
                        <div className="col-span-12"></div>

                        <div className='col-span-12 sm:col-span-6 w-full md:pr-5 mt-10'>
                            <button class="flex text-black border border-black py-2 px-6 focus:outline-none hover:bg-black hover:text-white  font-semibold shadow-lg justify-center items-center text-sm">Show all reviews</button>
                        </div>

                    </div>
                </div>


            </div>

            {/* MORE COURSES */}
            <div className='w-full bg-white grid grid-cols-12 px-2 sm:px-10 py-2 sm:py-10'>

                {/* LEFT MARGIN SPACER HIDDEN IN SMALL */}
                <div className="col-span-2 hidden sm:block"></div>

                <div className="col-span-12 sm:col-span-6 px-4 py-2 grid grid-cols-12 space-x-3">
                    <div className="col-span-12 px-4 mb-4"> <h1 className='text-2xl font-bold text-gray-800 flex items-center font-custom-montserrat'>More Courses by <span className='text-indigo-600 ml-1 inline'> {props?.courseDetails?.instructor?.iName}</span></h1></div>
                    {
                        props?.courseDetails?.moreCourses?.map((course, index) => (

                            <div className="col-span-12 sm:col-span-4 mt-8 md:mt-0 sm:px-0 sm:mb-4">
                                <NavLink to={`/course-details/${course?.courseName}/${window.btoa(course?.id)}`}>
                                    <div class="w-full rounded overflow-hidden shadow-lg pb-4 md:pb-2">
                                        <img class="w-full" src={pc} alt="Sunset in the mountains" />
                                        <div class="px-6 md:px-1 md:pl-2 py-4">
                                            <div class="font-bold text-md mb-2">{course?.title}</div>
                                            <p class="text-gray-700 text-xs font-custom-lora">
                                                {course?.author}
                                            </p>
                                            <div class="text-gray-700 text-xs flex items-center">
                                                <span className='font-bold text-lg text-amber-600'>4.3</span>
                                                <IoMdStar className='text-amber-600 text-xl inline' />
                                                <IoMdStarHalf className='text-amber-600 text-xl inline' />
                                                <span>({course?.ratings})</span>
                                            </div>
                                            <div className='font-bold'><span><BiRupee className='inline' />{course?.price}</span></div>
                                        </div>
                                    </div>
                                </NavLink>
                            </div>

                        ))

                    }
                </div>
            </div>


        </>
    )
}

export default CourseContent
/*
Exported to -
CourseDetailsIndex.js
*/