
import { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import { useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'
import pi from './pi.png'
import AxiosInterceptors from '../../../Components/Api/AxiosInterceptors'
import ApiHeader from '../../../Components/Api/ApiHeader'
import ApiList from '../../../Components/Api/ApiList'
import { RotatingLines } from "react-loader-spinner";
import toast, { Toaster } from 'react-hot-toast';
import ShimmerTable from '../../../Components/Animations/ShimmerTable'


function CourseBasicDetailsForm(props) {

    const { id } = useParams()
    const navigate = useNavigate()
    const [isLoading, setisLoading] = useState(false)
    const [isSubmitLoading, setisSubmitLoading] = useState(false)
    const [categoryList, setcategoryList] = useState(null)
    const [courseImage, setcourseImage] = useState(null)
    const [courseImageUrl, setcourseImageUrl] = useState(null)
    const [coursePromo, setcoursePromo] = useState(false)
    const [coursePromoUrl, setcoursePromoUrl] = useState(false)
    const { api_addCourse, api_courseDetailsById, api_getAllCourseCategory } = ApiList()

    let validationSchema = yup.object({

        courseTitle: yup.string().required('Enter course title'),
        // courseSubTitle: yup.string().required('Enter course title'),
        courseDesc: yup.string().required('Enter course title'),
        language: yup.string().required('Enter course title'),
        // level: yup.string().required('Enter course title'),
        // category: yup.string().required('Enter course title'),
        // subCategory: yup.string().required('Enter course title'),
        // primaryTaught: yup.string().required('Enter course title'),
        courseImage: yup.string().required('Enter course title'),
        promoVideo: yup.string().required('Enter course title'),
        price: yup.string().required('Enter course title'),
    })

    const initialValues = {

        courseTitle: '',
        // courseSubTitle: '',
        courseDesc: '',
        language: '',
        // level: '',
        // category: '',
        // subCategory: '',
        // primaryTaught: '',
        courseImage: '',
        promoVideo: '',
        price: '',
    };

    const formik = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,
        onSubmit: (values) => {
            console.log('form values', values)
            postCourse(values)
        }
        , validationSchema
    })

    const handleOnChange = (event) => {
        let name = event.target.name
        let value = event.target.value
        if (name == 'courseImage') {
            let file = event.target.files[0]
            setcourseImageUrl(URL.createObjectURL(event.target.files[0]))
            setcourseImage(file)
        }
        if (name == 'promoVideo') {
            let file = event.target.files[0]
            setcoursePromoUrl(URL.createObjectURL(event.target.files[0]))
            setcoursePromo(file)
        }

    };



    // FUNCTION TO POST OR EDIT DATA
    const postCourse = (values) => {
        setisSubmitLoading(true)
        let url
        let requestBody
        let requestBodyBase = {

            title: values?.courseTitle,
            description: values?.courseDesc,
            // categories: values?.courseTitle,
            categories: [5, 6],
            price: values?.price,
            file: courseImage,

            // promoVideo: values?.courseTitle,
            // language: values?.language,
        }
        if (id !== undefined) {
            url = 'apiEdit'
            requestBody = requestBodyBase
            requestBody.id = id
        } else {
            url = api_addCourse
            requestBody = requestBodyBase
        }

        AxiosInterceptors.post(url, requestBody, ApiHeader())
            .then(function (response) {
                console.log('view fee master..', response?.data?.data)
                if (response?.data?.status) {
                    toast.success('Payment requested successfully !')
                } else {
                    toast.error(response?.data?.message)
                }
            })
            .catch(function (error) {
                toast.error('Something went wrong')
            }).finally(() => {
                setisSubmitLoading(false)
            })
    }

    // FUNCTION TO FECTH DATA TO EDIT
    const fetchCourseById = () => {
        setisLoading(true)
        let requestBody = {
            courseId: id
        }
        AxiosInterceptors.post(api_courseDetailsById, requestBody, ApiHeader())
            .then(function (response) {
                console.log('fetch edit data response..', response?.data?.data)
                if (response?.data?.status) {
                    feedEditData(response?.data?.data)
                } else {
                    toast.error(response?.data?.message)
                }
            })
            .catch(function (error) {
                console.log('= edit data error...', error)
                toast.error(response?.data?.message)
            }).finally(() => {
                setisLoading(false)
            })
    }

    // FUNCTION TO FEED EDIT DATA
    const feedEditData = (data) => {
        console.log('existing property details in prop address...', data)

        // formik.setFieldValue('courseTitle', data?.courseTitle)
        // formik.setFieldValue('courseSubTitle', data?.courseSubTitle)
        // formik.setFieldValue('courseDesc', data?.courseDesc)
        // formik.setFieldValue('language', data?.language)
        // formik.setFieldValue('level', data?.level)
        // formik.setFieldValue('category', data?.category)
        // formik.setFieldValue('subCategory', data?.subCategory)
        // formik.setFieldValue('primaryTaught', data?.primaryTaught)
        // formik.setFieldValue('courseImage', data?.courseImage)
        // formik.setFieldValue('promoVideo', data?.promoVideo)

        formik.setFieldValue('courseTitle', data?.title)
        formik.setFieldValue('courseDesc', data?.description)
        formik.setFieldValue('price', data?.price)
        formik.setFieldValue('file', data?.level)
        setcourseImageUrl(data?.fullPath)
        setcoursePromoUrl(data?.promo_video)
    }

    //3 Fetch list FUNCTION TO FETCH LIST DATA
    const fetchCourseCategoryList = () => {
        setisLoading(true)
        AxiosInterceptors.post(api_getAllCourseCategory, {})
            .then(function (response) {
                console.log('category list...', response)
                if (response?.data?.status === true) {
                    setcategoryList(response?.data?.data)
                }
            })
            .catch(function (error) {
                console.log('==2 error list...', error)
                // activateBottomErrorCard(true, 'Error occured while fetching data.')
            }).finally(() => {
                setisLoading(false)
            })
    }

    // CALLING API TO FETCH DATA IN EDIT CASE
    useEffect(() => {
        if (id !== undefined) {
            fetchCourseById()
        }
        fetchCourseCategoryList()
    }, [])



    return (
        <>
            <Toaster />
            {isLoading && <ShimmerTable />}
            {!isLoading && <div className="block md:p-4 w-full md:py-6 -lg mx-auto   px-4 sm:px-0">
                <form onChange={handleOnChange} onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-12  sm:space-x-2">

                        <div className="form-group col-span-12 md:col-span-10 mb-6 md:px-4">
                            <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Course Title<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                            <input {...formik.getFieldProps('courseTitle')} type="text" className={'form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border-[1px] border-solid border-black  transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300'}
                            />
                            <span className="text-red-600 absolute text-xs">{formik.touched.courseTitle && formik.errors.courseTitle ? formik.errors.courseTitle : null}</span>
                        </div>

                        {/* <div className="form-group col-span-12 md:col-span-10 mb-6 md:px-4">
                            <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Course subtitle<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                            <input {...formik.getFieldProps('courseSubTitle')} type="text" className={'form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border-[1px] border-solid border-black  transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300'}
                            />
                            <span className="text-red-600 absolute text-xs">{formik.touched.courseSubTitle && formik.errors.courseSubTitle ? formik.errors.courseSubTitle : null}</span>
                        </div> */}

                        <div className="form-group col-span-12 grid grid-cols-12">
                            <div className='col-span-12 md:col-span-10 mb-6 md:px-4'>
                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Course description<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                <textarea {...formik.getFieldProps('courseDesc')} className="h-40 resize form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border-[1px] border-solid border-black  transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300"></textarea>
                                <span className="text-red-600 absolute text-xs">{formik.touched.courseDesc && formik.errors.courseDesc ? formik.errors.courseDesc : null}</span>
                            </div>
                        </div>

                        <div className="form-group col-span-12 md:col-span-3 mb-6 md:px-4">
                            <label className={'form-label inline-block mb-1 text-gray-600 text-sm font-semibold'}>Language</label>
                            <select {...formik.getFieldProps('language')} className={'form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border-[1px] border-solid border-black  transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 cursor-pointer'}
                            >
                                <option value="1" >Option 1</option>
                                <option value="2" >Option 2</option>

                            </select>
                            <span className="text-red-600 absolute text-xs">{formik.touched.language && formik.errors.language ? formik.errors.language : null}</span>
                        </div>
                        {/* 
                        <div className="form-group col-span-12 md:col-span-3 mb-6 md:px-4">
                            <label className={'form-label inline-block mb-1 text-gray-600 text-sm font-semibold'}>Level</label>
                            <select name="zone" className={'form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border-[1px] border-solid border-black  transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 cursor-pointer'}
                            >
                                <option value="1" >Option 1</option>
                                <option value="2" >Option 2</option>

                            </select>
                        </div> */}

                        <div className="form-group col-span-12 md:col-span-3 mb-6 md:px-4">
                            <label className={'form-label inline-block mb-1 text-gray-600 text-sm font-semibold'}>Category</label>
                            <select name="zone" className={'form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border-[1px] border-solid border-black  transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 cursor-pointer'}
                            >
                                <option value="" >Select</option>
                                {
                                    Array.isArray(categoryList) && categoryList?.map((data, index) => (
                                        <option value={data?.id} >{data?.CategoryName}</option>
                                    ))
                                }

                            </select>
                        </div>

                        <div className="form-group col-span-12 md:col-span-3 mb-6 md:px-4">
                            <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Price<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                            <input {...formik.getFieldProps('price')} type="text" className={'form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border-[1px] border-solid border-black  transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300'}
                            />
                            <span className="text-red-600 absolute text-xs">{formik.touched.price && formik.errors.price ? formik.errors.price : null}</span>
                        </div>

                        <div className="col-span-12"></div>
                        {/* <div className="form-group col-span-12 md:col-span-3 mb-6 md:px-4">
                            <label className={'form-label inline-block mb-1 text-gray-600 text-sm font-semibold'}>Sub Category</label>
                            <select name="zone" className={'form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border-[1px] border-solid border-black  transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 cursor-pointer'}
                            >
                                <option value="1" >Option 1</option>
                                <option value="2" >Option 2</option>

                            </select>
                        </div>

                        <div className="form-group col-span-12 md:col-span-3 mb-6 md:px-4">
                            <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Primary Taught<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                            <input {...formik.getFieldProps('primaryTaught')} type="text" className={'form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border-[1px] border-solid border-black  transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300'}
                            />
                            <span className="text-red-600 absolute text-xs">{formik.touched.primaryTaught && formik.errors.primaryTaught ? formik.errors.primaryTaught : null}</span>
                        </div> */}

                        <div className="form-group col-span-12 md:col-span-12 mb-6 md:px-4 flex items-end space-x-10">
                            <div className='flex-initial'>
                                <div className='h-60 w-60 border border-black overflow-hidden'><img src={courseImageUrl || pi} alt="" /> </div>
                            </div>
                            <div className='flex-1 px-10'>  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Course Image</label>
                                <input {...formik.getFieldProps('courseImage')} className="block w-auto text-sm h-10 text-gray-900 border border-black cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" />
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
                                <span className="text-red-600 absolute text-xs">{formik.touched.courseImage && formik.errors.courseImage ? formik.errors.courseImage : null}</span></div>
                        </div>
                        <div className="form-group col-span-12 md:col-span-12 mb-6 md:px-4 flex items-end space-x-10">
                            <div className='flex-initial'>
                                <div className='h-60 w-60 border border-black overflow-hidden'><img src={coursePromoUrl || pi} alt="" /> </div>
                            </div>
                            <div className='flex-1 px-10'>  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Promotional Video</label>
                                <input {...formik.getFieldProps('promoVideo')} className="block w-auto text-sm h-10 text-gray-900 border border-black cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" />
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
                                <span className="text-red-600 absolute text-xs">{formik.touched.promoVideo && formik.errors.promoVideo ? formik.errors.promoVideo : null}</span></div>
                        </div>



                        <div className='col-span-12 mt-10'>
                            {isSubmitLoading ? <button type="submit" className="cypress_next1_button px-6 py-2.5 bg-black text-white font-medium text-xs leading-tight    hover:bg-black hover:shadow-lg focus:bg-black focus:shadow-lg focus:outline-none focus:ring-0 active:bg-black active:shadow-lg transition duration-150 ease-in-out"><RotatingLines
                                strokeColor="white"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="25"
                                visible={true}
                            /></button> : <button type="submit" className="px-6 py-2.5 bg-black text-white font-medium text-xs leading-tight    hover:bg-black hover:shadow-lg focus:bg-black focus:shadow-lg focus:outline-none focus:ring-0 active:bg-black active:shadow-lg transition duration-150 ease-in-out">Save</button>}

                        </div>

                    </div>
                </form>

            </div>}
        </>
    )
}

export default CourseBasicDetailsForm