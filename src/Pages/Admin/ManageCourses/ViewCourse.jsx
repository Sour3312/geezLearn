import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FcComboChart } from 'react-icons/fc';

function ViewCourse() {
    const navigate = useNavigate()
    const [inputs, setInputs] = useState({});
    const [data, setData] = useState(
        [
            { id: 1, name: "This is Lesson 1", type: "Video", status:true, link: "http://localhost:3333/CourseList/view/1" },
            { id: 2, name: "This is Lesson 2", type: "Video", status:false, link: "http://localhost:3333/CourseList/view/2" },
            { id: 3, name: "This is Lesson 3", type: "PDF", status:true, link: "http://localhost:3333/CourseList/view/3" },
        ])

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleForm = (e) => {
        e.preventDefault()
        setData({ inputs })
        console.log("Form", inputs)
    }

    return (
        <>
            <div className='flow-root bg-white border-b-2 rounded-t-md md:px-5 p-2'>
                <div className='float-left text-lg font-semibold flex'> <FcComboChart className='mt-1.5 mr-2' />View Course</div>
                <button onClick={() => navigate(-1)} className='float-right border bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded-sm'>Back </button>
            </div>
            <div className='m-2 border border-gray-300 p-2 rounded-md'>
                <div className='grid grid-cols-12 space-x-5'>
                    <div className='col-span-4 border rounded'>
                        <img src="https://img.freepik.com/free-photo/learning-education-ideas-insight-intelligence-study-concept_53876-120116.jpg" alt="" srcset="" />
                    </div>
                    <div className='col-span-8'>
                        <div>
                            <h2 className='text-2xl'>This is Course Title</h2>
                            <p>Course Sub Title</p>
                            <p>Course Full Description</p>
                            <p>Fee</p>
                            <p>Discount</p>
                            <p>Final Price</p>
                            <p>Status : Active</p>
                        </div>
                    </div>
                </div>
                <p className='border-b my-5'></p>
                <div>
                    <div className=' rounded-t-md text-gray-700 text-lg'>
                        <p className='text-center text-xl font-semibold mb-3'>Manage Lessons</p>
                    </div>
                    <form onSubmit={handleForm}>
                        <div className='flex justify-center space-x-4 py-2 bg-gray-100 border border-indigo-300 mb-5'>
                            <div>
                                <p className='text-xs my-1'>Lesson Name</p>
                                <input name="name" onChange={handleChange} type="text" className='border border-gray-400 rounded h-8' />
                            </div>
                            <div>
                                <p className='text-xs my-1'>Lesson Type</p>
                                <input name="type" onChange={handleChange} type="text" className='border border-gray-400 rounded h-8' />
                            </div>
                            <div>
                                <p className='text-xs my-1'>Link</p>
                                <input name="link" onChange={handleChange} type="text" className='border border-gray-400 rounded h-8' />
                            </div>
                            <div>
                                <button type='submit' className='border px-2 py-0.5 mt-6 bg-indigo-500 rounded text-white'>Add Lesson</button>
                            </div>
                        </div>
                    </form>


                    <section className="container px-4 mx-auto py-4">
                        <div class="flex items-center justify-between">
                            <div>
                                <h2 class="text-lg font-medium text-gray-800">Lessons of course - XXX</h2>
                                <p class="mt-1 text-sm text-gray-500">List of lessons associated with course xxxx</p>
                            </div>
                            <div>
                                <button class="rounded-md bg-indigo-600 px-3.5 py-1.5 text-sm font-semibold leading-7 text-white hover:bg-indigo-500">Add New Lesson</button>
                            </div>
                        </div>


                        <div className="flex flex-col mt-6">
                            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                    <div className="overflow-hidden border border-gray-200  md:rounded-lg">
                                        <table className="min-w-full divide-y divide-gray-200 ">
                                            <thead className="bg-gray-100">
                                                <tr>
                                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-800">#</th>
                                                    <th scope="col" className="px-8 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-800">Lesson Name</th>
                                                    <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-800">Type</th>
                                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-800">Status</th>
                                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-800">Link</th>
                                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-800">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200 ">
                                                {data?.map((item, index) => (
                                                    <tr key={item.name}>
                                                        <td className="px-4 py-4 whitespace-nowrap">
                                                            <div className="text-sm text-gray-900 ">{index + 1}</div>
                                                        </td>
                                                        <td className="py-4 px-4 whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <div className="ml-4">
                                                                    <div className="text-sm font-medium text-gray-900 ">
                                                                        {item.name}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-12 py-4 whitespace-nowrap">
                                                            <div className="text-sm text-gray-900 ">{item.type}</div>
                                                        </td>
                                                        <td className="px-4 py-4 whitespace-nowrap">
                                                            {item.status ?
                                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
                                                                : <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Deactive</span>
                                                            }
                                                        </td>
                                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{item.link}</td>
                                                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                                                            <button className='rounded border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white py-1 font-normal text-sm px-3'>Edit</button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>


                </div>
            </div>
        </>
    )
}

export default ViewCourse