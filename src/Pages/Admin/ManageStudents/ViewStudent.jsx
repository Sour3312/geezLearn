import React, { useState } from 'react'
import { FcComboChart } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import placeholder from '../../../Assets/images/profile.jpg'


const ViewStudent = ({ id, goBack }) => {

    const [data, setData] = useState(
        [
            { id: 1, name: "TRN767676", type: "Test course 92", link: "01/03/2013", status: false },
            { id: 2, name: "TRN763434", type: "Test course XX2", link: "11/03/2013", status: true },
            { id: 3, name: "TRN456565", type: "Test course 322", link: "22/03/2013", status: true },
        ])

    const navigate = useNavigate()
    return (
        <>
            <div className='flow-root bg-white border-b-2 rounded-t-md md:px-5 p-2'>
                <div className='float-left text-lg font-semibold flex'> <FcComboChart className='mt-1.5 mr-2' /> View Students</div>
                <button onClick={() => goBack()} className='float-right border bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded-sm'>Back </button>
            </div>
            <div className='m-2 border border-gray-300 p-2 rounded-md'>
                <div className='grid grid-cols-12 space-x-5'>
                    <div className='col-span-2 flex justify-center border rounded'>
                        <img className='h-40' src={placeholder} alt="" srcset="" />
                    </div>
                    <div className='col-span-8'>
                        <div className=''>
                            <h2 className='text-2xl'>Dipu Kumar Singh</h2>
                            <p>testdipu@gmail.com</p>
                            <p>96857457XX</p>
                            <p>Join Date : 20/03/2023</p>
                            <p>Status : Active</p>
                            <p>No of Course Enrolled : 1x</p>
                        </div>
                    </div>
                    <div className='col-span-2'>
                        <button className='bg-indigo-600 text-white px-3 py-1 rounded'>Edit Profile</button>
                    </div>
                </div>
                <p className='border-b my-5'></p>


                {/* Enrolled Courses List */}
                <section className="container px-4 mx-auto py-4">
                    <div className="">
                        <h2 className="text-lg font-medium text-gray-800">Enrolled Courses</h2>
                        <p className="mt-1 text-sm text-gray-500 "> List of enrolled courses of this student. </p>
                    </div>
                    <div className="flex flex-col mt-6">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                <div className="overflow-hidden border border-gray-200  md:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200 ">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-800">Transaction No.</th>
                                                <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-800">Course Name</th>
                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-800">Status</th>
                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-800">Role</th>
                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-800">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200 ">
                                            {data?.map((item) => (
                                                <tr key={item.name}>
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
                                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Paid</span>
                                                            : <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Failed</span>
                                                        }
                                                    </td>
                                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{item.name}</td>
                                                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                                                        <button className='rounded border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white py-1 font-normal text-sm px-3'>View Course</button>
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

                {/* Enrolled Courses List */}
                <section className="container px-4 mx-auto py-4">
                    <div className="">
                        <h2 className="text-lg font-medium text-gray-800"> Payment History </h2>
                        <p className="mt-1 text-sm text-gray-500 "> List of payment history of this student. </p>
                    </div>
                    <div className="flex flex-col mt-6">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                <div className="overflow-hidden border border-gray-200  md:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200 ">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-800">Transaction No.</th>
                                                <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-800">Course Name</th>
                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-800">Status</th>
                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-800">Role</th>
                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-800">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200 ">
                                            {data?.map((item) => (
                                                <tr key={item.name}>
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
                                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Paid</span>
                                                            : <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Failed</span>
                                                        }
                                                    </td>
                                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{item.name}</td>
                                                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                                                        <button className='rounded border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white py-1 font-normal text-sm px-3'>Receipt</button>
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
        </>
    )
}

export default ViewStudent