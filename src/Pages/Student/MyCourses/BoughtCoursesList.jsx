import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProgressBar from '../../../Components/Common/ProgressBar'
import ApiList from '../../../Components/Api/ApiList'
import axios from 'axios'
import imageNotFound from '../../../Assets/images/imgNotFound.jpeg'

const BoughtCoursesList = () => {
    const fakeData = [
        { "id": 1, name: "This is First", "percentage": 40, imgUrl: "https://img.freepik.com/free-vector/laptop-with-program-code-isometric-icon-software-development-programming-applications-dark-neon_39422-971.jpg" },
        { "id": 2, name: "This is Secound", "percentage": 20, imgUrl: "https://img.freepik.com/free-vector/laptop-with-program-code-isometric-icon-software-development-programming-applications-dark-neon_39422-971.jpg" }
        , { "id": 3, name: "This is Secound", "percentage": 30, imgUrl: "https://img.freepik.com/free-vector/laptop-with-program-code-isometric-icon-software-development-programming-applications-dark-neon_39422-971.jpg" }
    ]

    const [enrolledCourses, setEnrolledCourses] = useState()


    const navigate = useNavigate()
    const { api_purchasedCourses, bearerHeader } = ApiList();

    useEffect(() => {
        getPurchaseCourses()
    }, [])


    const getPurchaseCourses = () => {
        axios.post(api_purchasedCourses, {}, bearerHeader)
            .then((res) => {
                if (res.data.status) {
                    setEnrolledCourses(res.data.data)
                    console.log("List of purchages courses", res)
                } else {
                    console.log("error while getting course history", res)
                }
            })
            .catch((err) => {
                console.log("EXception while getting course history", err)
            })
    }

    return (
        <>
            <div> Your Purchased Courses </div>

            <div className='grid col-span-1 md:grid-cols-12 xl:md:grid-cols-12 md:space-x-5'>

                {enrolledCourses ?
                    enrolledCourses?.map((item, i) => (
                        <div className='col-span-1 md:col-span-3 xl:col-span-3 my-5'>
                            <div key={i} className='border border-gray-300 rounded-md bg-gray-100'>
                                <img className='h-[10rem] w-[20rem]' src={item?.image_full_path || imageNotFound} alt={item?.course_name} srcset="" />
                                <p className='m-2 text-2xl font-semibold'>{item?.course_name || "Name not Available"}</p>

                                <ProgressBar percentage={item.percentage} />
                                <div className='m-3'>
                                    <button onClick={() => navigate('/play')} className='bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded w-full'>Start</button>
                                </div>
                            </div>
                        </div>
                    ))
                    :
                    "Did not purchage any course"
                }
            </div>
        </>
    )
}

export default BoughtCoursesList
