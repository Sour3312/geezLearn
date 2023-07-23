
import { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import { useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'
import { FaArrowRight } from 'react-icons/fa'
import PaymentBifurcation from './PaymentBifurcation'
import BottomErrorCard from '../../../Components/Common/BottomErrorCard'
import ApiList from '../../../Components/Api/ApiList'
import AxiosInterceptors from '../../../Components/Api/AxiosInterceptors'
import ApiHeader from '../../../Components/Api/ApiHeader'
import toast, { Toaster } from 'react-hot-toast';
import { RotatingLines } from "react-loader-spinner";



function TeacherPaymentRequest(props) {

    const navigate = useNavigate()
    const [isLoading, setisLoading] = useState(false);
    const [isSubmitLoading, setisSubmitLoading] = useState(false);
    const [erroState, seterroState] = useState(false);
    const [erroMessage, seterroMessage] = useState(null);
    const [teacherData, setteacherData] = useState(null);
    const { api_getTeacherEarning, api_requestMoney } = ApiList()

    let validationSchema = yup.object({
        amount: yup.string().required('Enter amount'),
        remarks: yup.string().required('Enter remarks'),
    })

    const initialValues = {
        amount: '',
        remarks: ''
    };

    const formik = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,
        onSubmit: (values) => {
            console.log('form values', values)
            postPaymentRequest(values)
        }
        , validationSchema
    })

    const handleOnChange = (event) => {
        let name = event.target.name
        let value = event.target.value
    };

    //4 by id FUNCTION TO FECTH DATA TO EDIT
    const fetchTeacherEarning = () => {
        setisLoading(true)

        AxiosInterceptors.post(api_getTeacherEarning, {}, ApiHeader())
            .then(function (response) {
                console.log('fetch view data response..', response?.data?.data)
                if (response?.data?.status) {
                    setteacherData(response?.data?.data)
                } else {
                    activateBottomErrorCard(true, 'Error occured in submitting deactivation application. Please try again later.')
                }
            })
            .catch(function (error) {
                activateBottomErrorCard(true, 'Error occured in submitting deactivation application. Please try again later.')
            }).finally(() => {
                setisLoading(false)
            })
    }

    //2 delete FUNCTION TO DELETE ITEM FROM LIST
    const postPaymentRequest = (values) => {
        setisSubmitLoading(true)

        let requestBody = {
            amount: values?.amount
        }

        AxiosInterceptors.post(api_requestMoney, requestBody, ApiHeader())
            .then(function (response) {
                console.log('payment request post response', response?.data?.data)
                if (response?.data?.status) {
                    toast.success('Payment requested successfully !')
                    fetchTeacherEarning()
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

    useEffect(() => {
        fetchTeacherEarning()
    }, [])


    // FUNCTION FOR CUSTOM ERROR MESSAGE CARD
    const activateBottomErrorCard = (state, msg) => {
        seterroMessage(msg)
        seterroState(state)
    }

    return (
        <>
            {erroState && <BottomErrorCard activateBottomErrorCard={activateBottomErrorCard} errorTitle={erroMessage} />}
            <Toaster />

            <div className="flex mb-10">
                <div className='flex-1'>
                    <div className='text-4xl font-semibold text-gray-700'>Payment Settlement</div>
                    <div className='text-gray-600 text-sm'>Bifurcation of payments and settlement.</div>
                </div>
                <div className='flex-1 flex justify-end'>

                </div>
            </div>

            <div className="block md:p-4 w-full md:py-6 rounded-lg mx-auto  bg-white px-4 sm:px-0">
                <form onChange={handleOnChange} onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-12">

                        <div className="form-group col-span-12 md:col-span-6 mb-6">
                            <div className='flex'>
                                <div>
                                    {
                                        isLoading ? <RotatingLines
                                            strokeColor="black"
                                            strokeWidth="5"
                                            animationDuration="0.75"
                                            width="25"
                                            visible={true}
                                        /> : <dl className=" space-y-1 px-2 py-4">
                                            <div className="flex items-center justify-between">
                                                <dt className="text-sm text-gray-800">Total Earnings </dt>
                                                <dd className="text-sm font-medium text-gray-900">₹ {teacherData?.totalEarning}</dd>
                                            </div>
                                            <div className="flex items-center justify-between pt-4">
                                                <dt className="flex items-center text-sm text-gray-800">
                                                    <span>Earning After Comission</span>
                                                </dt>
                                                <dd className="text-sm font-medium text-green-700">- ₹ {teacherData?.earningAfterCommission}</dd>
                                            </div>

                                            <div className="flex items-center justify-between pt-4">
                                                <dt className="flex items-center text-sm text-gray-800">
                                                    <span>Wthdraw</span>
                                                </dt>
                                                <dd className="text-sm font-medium text-green-700">- ₹ {teacherData?.withdraw}</dd>
                                            </div>

                                            <div className="flex items-center justify-between border-y border-dashed py-4 ">
                                                <dt className="text-base font-medium text-gray-900">Remaining Amount</dt>
                                                <dd className="text-3xl font-bold text-gray-900 ml-10">₹ {teacherData?.remaining}</dd>
                                            </div>
                                        </dl>
                                    }


                                </div>

                                <div className='flex-1 text-right'>
                                    <button onClick={() => navigate('/transaction-report')} type="submit" className="cypress_next1_button px-6 py-2.5 border border-black text-black font-medium text-xs leading-tight  rounded hover:text-white  hover:bg-black hover:shadow-lg focus:bg-black focus:shadow-lg focus:outline-none focus:ring-0 active:bg-black active:shadow-lg transition duration-150 ease-in-out">Transaction History <FaArrowRight className="inline" /></button>
                                </div>
                            </div>

                            <label class="block mb-2 text-md font-medium text-gray-400 dark:text-white mt-4" >Payment Bifurcation</label>
                            <div>
                                <div className='flex justify-start items-center'><div className='w-4 h-4 rounded-full bg-black inline-block mr-2'></div>Teacher</div>
                                <div className='flex justify-start items-center'><div className='w-4 h-4 rounded-full bg-indigo-500 inline-block mr-2'></div>Admin</div>
                            </div>
                            <div className="shadow w-full bg-grey-light mt-2 border">
                                <div className="text-xs leading-none py-1 text-center text-white bg-black font-semibold" style={{ width: `${teacherData?.adminCommission}` }}>{teacherData?.adminCommission}</div>
                            </div>

                            {/* SPACER */}
                            <div className='w-full border-t my-8'></div>

                            <div className=''>
                                <div className="form-group  mt-6">
                                    <label className="form-label inline-block mb-1 text-gray-500 text-sm font-semibold">Amount<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                    <input {...formik.getFieldProps('amount')} type="text" className={'block form-control px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-black  transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 mr-2'} placeholder='0'
                                    />
                                    <span className="text-red-600 absolute text-xs">{formik.touched.amount && formik.errors.amount ? formik.errors.amount : null}</span>
                                </div>
                                <div className='mt-4'>
                                    <label className="form-label inline-block mb-1 text-gray-500 text-sm font-semibold">Write Comment<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                    <textarea {...formik.getFieldProps('remarks')} class="h-40 resize form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-black  transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 "></textarea>
                                    <span className="text-red-600 absolute text-xs">{formik.touched.remarks && formik.errors.remarks ? formik.errors.remarks : null}</span>
                                </div>
                            </div>
                            <label class="block mb-2 text-xs font-medium text-gray-400 dark:text-white" >You will get the money once the admin approves the payment.</label>

                        </div>


                        <div className='col-span-12 mt-2'>
                            {isSubmitLoading ? <button type="submit" className="cypress_next1_button px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight  rounded  hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out flex justify-center items-center"><RotatingLines
                                strokeColor="white"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="25"
                                visible={true}
                            /></button> : <button type="submit" className="cypress_next1_button px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight  rounded  hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out">Request for Payment</button>}

                        </div>

                    </div>
                </form >

            </div >
        </>
    )
}

export default TeacherPaymentRequest