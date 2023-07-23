import { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { BsListTask } from 'react-icons/bs'
import { useNavigate, useParams } from 'react-router-dom'
import AxiosInterceptors from '../../Components/Api/AxiosInterceptors'
import ApiHeader from '../../Components/Api/ApiHeader'
import ApiList from '../../Components/Api/ApiList'
import BottomErrorCard from '../../Components/Common/BottomErrorCard'


function CourseForm(props) {
    const [erroState, seterroState] = useState(false);
    const [erroMessage, seterroMessage] = useState(null);
    const [isLoading, setisLoading] = useState(false);
    const { id } = useParams()
    const { api_getClassFeeDefById, api_editClassFeeDef, api_postClassFeeDef, api_fetchClassList } = ApiList()
    const navigate = useNavigate()

    let validationSchema = yup.object({
        course_name: yup.string(),
        Description: yup.string(),
        Regular_price: yup.string(),
        Discount: yup.string(),
        Category: yup.string(),
        Image: yup.string(),
    })

    const initialValues = {

        course_name: '',
        Description: '',
        Regular_price: '',
        Discount: '',
        Category: '',
        Image: '',
    };

    const formik = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,
        onSubmit: (values) => {
            console.log('form values', values)
        }
        , validationSchema
    })

    // FUNCTION TO SAVE MASTER DATA
    const saveMasterForm = (values) => {
        setisLoading(true)
        let url
        let requestBody
        let requestBodyBase = {
            classId: values?.classId,
            janFee: values?.janFee,
            febFee: values?.febFee,

        }
        if (id !== undefined) {
            url = api_editClassFeeDef
            requestBody = requestBodyBase
            requestBody.id = id
        } else {
            url = api_postClassFeeDef
            requestBody = requestBodyBase
        }

        console.log('before submit definition', requestBody)
        AxiosInterceptors.post(url, requestBody, ApiHeader())
            .then(function (response) {
                console.log('view fee master..', response?.data?.data)
                if (response?.data?.status) {
                    navigate('/feedefinition-master')
                } else {
                    activateBottomErrorCard(true, 'Error occured in submitting form.')
                }
                setisLoading(false)
            })
            .catch(function (error) {
                console.log('==2 error list...', error)
                activateBottomErrorCard(true, 'Error occured in submitting form.')

                setisLoading(false)
            })
    }

    // FUNCTION TO FECTH DATA TO EDIT
    const fetchEditData = () => {
        setisLoading(true)
        let requestBody = {
            id: id
        }
        AxiosInterceptors.post(api_getClassFeeDefById, requestBody, ApiHeader())
            .then(function (response) {
                console.log('fetch edit data response..', response?.data?.data)
                if (response?.data?.status) {
                    feedEditData(response?.data?.data)
                } else {
                    activateBottomErrorCard(true, 'Error occured in submitting deactivation application. Please try again later.')
                }
                setisLoading(false)

            })
            .catch(function (error) {
                console.log('= edit data error...', error)
                seterroState(true)
                setisLoading(false)
            })
    }

    // FUNCTION TO FEED EDIT DATA
    const feedEditData = (data) => {
        console.log('existing property details in prop address...', data)
        formik.setFieldValue('classId', data?.class_id)
        formik.setFieldValue('janFee', data?.feb_fee)
        formik.setFieldValue('decBusFee', data?.dec_bus_fee)
    }

    const handleOnChange = (event) => {
        let name = event.target.name
        let value = event.target.value
    };

    // FUNCTION FOR CUSTOM ERROR MESSAGE CARD
    const activateBottomErrorCard = (state, msg) => {
        seterroMessage(msg)
        seterroState(state)
    }

    useEffect(() => {
        if (id !== undefined) {
            // fetchEditData()
        }
    }, [])



    return (
        <>
         {erroState && <BottomErrorCard activateBottomErrorCard={activateBottomErrorCard} errorTitle={erroMessage} />}
            <div className='text-3xl font-bold text-gray-900 md:text-2xl md:leading-10'><BsListTask className="inline mr-4" />Add Courses</div>
            <div className="block md:p-4 w-full md:py-6 rounded-lg mx-auto  shadow-xl bg-white px-4 sm:px-0 border-t mt-5">
                <form onChange={handleOnChange} onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-12  sm:space-x-2">

                        <div className="form-group col-span-12 md:col-span-2 mb-6 md:px-4">
                            <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">course_name<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                            <input {...formik.getFieldProps('course_name')} type="text" className={'form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md'}
                            />
                            <span className="text-red-600 absolute text-xs">{formik.touched.course_name && formik.errors.course_name ? formik.errors.course_name : null}</span>
                        </div>

                        <div className="form-group col-span-12 grid grid-cols-12">
                            <div className='col-span-12 md:col-span-6 mb-6 md:px-4'>
                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Description<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                <textarea {...formik.getFieldProps('Description')} class="h-40 resize form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"></textarea>
                                <span className="text-red-600 absolute text-xs">{formik.touched.Description && formik.errors.Description ? formik.errors.Description : null}</span>
                            </div>
                        </div>

                        <div className="form-group col-span-12 md:col-span-2 mb-6 md:px-4">
                            <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Regular_price<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                            <input {...formik.getFieldProps('Regular_price')} type="text" className={'form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md'}
                            />
                            <span className="text-red-600 absolute text-xs">{formik.touched.Regular_price && formik.errors.Regular_price ? formik.errors.Regular_price : null}</span>
                        </div>

                        <div className="form-group col-span-12 md:col-span-2 mb-6 md:px-4">
                            <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Discount<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                            <input {...formik.getFieldProps('Discount')} type="text" className={'form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md'}
                            />
                            <span className="text-red-600 absolute text-xs">{formik.touched.Discount && formik.errors.Discount ? formik.errors.Discount : null}</span>
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
                            <span className="text-red-600 absolute text-xs">{formik.touched.Image && formik.errors.Image ? formik.errors.Image : null}</span>
                        </div>


                        <div className=' text-right col-span-12 mt-10'>
                            <button type="submit" className="cypress_next1_button px-8 py-2.5 bg-gray-800 text-white font-medium text-xs leading-tight  rounded  hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out">Save</button>
                        </div>

                    </div>
                </form>

            </div>
        </>
    )
}

export default CourseForm