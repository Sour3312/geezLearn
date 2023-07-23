
import { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'


function AddNewCourse(props) {

    const { id } = useParams()
    const navigate = useNavigate()
    const location = useLocation()

    console.log('location at new course add....', location.pathname)

    let validationSchema = yup.object({

        courseName: yup.string(),
        desc: yup.string(),
        regularPrice: yup.string(),
        descount: yup.string(),
        finalPrice: yup.string(),
        category: yup.string(),
        img: yup.string(),
    })

    const initialValues = {

        courseName: '',
        desc: '',
        regularPrice: '',
        descount: '',
        finalPrice: '',
        category: '',
        img: '',
    };

    const formik = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,
        onSubmit: (values) => {
            console.log('form values', values)
        }
        , validationSchema
    })

    const handleOnChange = (event) => {
        let name = event.target.name
        let value = event.target.value
    };


    return (
        <>
            <div className="flex mb-10">
                <div className='flex-1'>
                    <div className='text-4xl font-semibold text-gray-700'>Add Course</div>
                </div>
                <div className='flex-1 flex justify-end'>
                </div>
            </div>

            {/* TABS */}
            {/* TABS */}
            <div className="mt-10   justify-between space-y-4 md:flex md:flex-row  bottom-0">
                <div className="flex w-full items-end ">
                    <div onClick={() => navigate(`/add-course/basic-details/${id}`)} className={`cursor-pointer px-4 py-2 text-base font-semibold leading-normal text-gray-700  hover:text-indigo-600 ${location.pathname === '/add-course/basic-details' && ' border-b-4 border-b-black'}`}>Basic Details</div>
                    <div onClick={() => navigate(`/add-course/course-content/${id}`)} className={`cursor-pointer px-4 py-2 text-base font-semibold leading-normal text-gray-700  hover:text-indigo-600 ${location.pathname === '/add-course/course-content' && ' border-b-4 border-b-black'} `}>Course Content</div>
                </div>
            </div>

            <div className='mt-10'>
                <Outlet />
            </div>

            {/* <div className="block md:p-4 w-full md:py-6 rounded-lg mx-auto  shadow-xl bg-white px-4 sm:px-0 border">

                <form onChange={handleOnChange} onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-12  sm:space-x-2">
                        <div className="form-group col-span-12 md:col-span-6 mb-6 md:px-4">
                            <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Course Name<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                            <input {...formik.getFieldProps('courseName')} type="text" className={'form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md'}
                            />
                            <span className="text-red-600 absolute text-xs">{formik.touched.courseName && formik.errors.courseName ? formik.errors.courseName : null}</span>
                        </div>

                        <div className="form-group col-span-12 grid grid-cols-12">
                            <div className='col-span-12 md:col-span-6 mb-6 md:px-4'>
                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Description<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                <textarea {...formik.getFieldProps('desc')} class="h-40 resize form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"></textarea>
                                <span className="text-red-600 absolute text-xs">{formik.touched.desc && formik.errors.desc ? formik.errors.desc : null}</span>
                            </div>
                        </div>

                        <div className="form-group col-span-12 md:col-span-2 mb-6 md:px-4">
                            <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Regular Price<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                            <input {...formik.getFieldProps('regularPrice')} type="text" className={'form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md'}
                            />
                            <span className="text-red-600 absolute text-xs">{formik.touched.regularPrice && formik.errors.regularPrice ? formik.errors.regularPrice : null}</span>
                        </div>

                        <div className="form-group col-span-12 md:col-span-2 mb-6 md:px-4">
                            <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Discount<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                            <input {...formik.getFieldProps('descount')} type="text" className={'form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md'}
                            />
                            <span className="text-red-600 absolute text-xs">{formik.touched.descount && formik.errors.descount ? formik.errors.descount : null}</span>
                        </div>

                        <div className="form-group col-span-12 md:col-span-2 mb-6 md:px-4">
                            <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Final Price<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                            <input {...formik.getFieldProps('finalPrice')} type="text" className={'form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md'}
                            />
                            <span className="text-red-600 absolute text-xs">{formik.touched.finalPrice && formik.errors.finalPrice ? formik.errors.finalPrice : null}</span>
                        </div>

                        <div className="form-group col-span-12 md:col-span-2 mb-6 md:px-4">
                            <label className={'form-label inline-block mb-1 text-gray-600 text-sm font-semibold'}>Category</label>
                            <select name="zone" className={'form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md cursor-pointer'}
                            >
                                <option value="1" >Option 1</option>
                                <option value="2" >Option 2</option>

                            </select>
                        </div>

                        <div className="form-group col-span-12 md:col-span-2 mb-6 md:px-4">
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Image</label>
                            <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" />
                            <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
                            <span className="text-red-600 absolute text-xs">{formik.touched.img && formik.errors.img ? formik.errors.img : null}</span>
                        </div>


                        <div className='col-span-12 mt-10'>
                            <button type="submit" className="cypress_next1_button px-10 py-2.5 bg-black text-white font-medium text-xs leading-tight  rounded  hover:bg-black hover:shadow-lg focus:bg-black focus:shadow-lg focus:outline-none focus:ring-0 active:bg-black active:shadow-lg transition duration-150 ease-in-out">Save</button>
                        </div>

                    </div>
                </form>

            </div> */}
        </>
    )
}

export default AddNewCourse