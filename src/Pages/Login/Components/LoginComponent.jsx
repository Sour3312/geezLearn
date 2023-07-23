import React, { useContext, useState } from 'react'
import { useFormik, Formik, Form, ErrorMessage } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import ApiList from '../../../Components/Api/ApiList'
import { getLocalStorageItemJsonParsed, removeLocalstorageItem, setLocalStorageItem, setLocalStorageItemStrigified } from '../../../Components/Common/localstorage'
import { useNavigate } from 'react-router-dom'
import { globalContextData } from '../../../Components/Common/Context/GlobalContextFile'
import { RotatingLines } from "react-loader-spinner";
import AxiosInterceptors from '../../../Components/Api/AxiosInterceptors'
import ApiHeader from '../../../Components/Api/ApiHeader'




const LoginComponent = (props) => {
    const [errorMessage, setErrorMessage] = useState(false)
    const [loginLoader, setLoginLoader] = useState(false)
    const [extraActionLoading, setextraActionLoading] = useState(false)
    const [currentUserType, setcurrentUserType] = useState(null)
    const { notify, userData, setuserData } = useContext(globalContextData)

    const { api_login, api_addWishList, api_addToCart } = ApiList();
    const navigate = useNavigate()


    //Formik Start

    const validationSchema = yup.object({
        email: yup.string().required('Enter email.'),
        password: yup.string().required('Enter password'),
    })

    const initialValues = {
        email: '',
        password: '',
    }


    const formik = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,
        onSubmit: (values, resetForm) => {

            console.log("Value.....", values)
            finalSubmitData(values)
        },
        validationSchema
    })

    const handleChange = (event) => {
        setErrorMessage()

        let name = event.target.name
        let value = event.target.value

        // { name === 'propertyType' && ((value == '1') ? setpropertyTypeStatusToggle(true) : setpropertyTypeStatusToggle(false)) }
        // { name == 'mobileNo' && formik.setFieldValue("mobileNo", allowNumberInput(value, formik.values.mobileNo, 10)) }
    };

    //End Formik

    const finalSubmitData = (data) => {
        setErrorMessage()
        setLoginLoader(true)
        let requestBody = {
            email: data?.email,
            password: data?.password
        }

        console.log('before login...', requestBody)
        AxiosInterceptors.post(api_login, requestBody)
            .then((res) => {
                console.log("--2-- After Login data", res?.data?.data)
                if (res.data.status === true) {
                    // SETTING TOKEN AND USER DATA TO LOCALSTORAGE
                    setLocalStorageItem("token", res?.data?.data?.token)
                    setLocalStorageItemStrigified("UserType", res?.data?.data?.UserType)
                    setLocalStorageItemStrigified("LoginStatus", true)
                    setLocalStorageItemStrigified("userImage", res?.data?.data?.userImg)

                    setLocalStorageItemStrigified("userData", { userName: res?.data?.data?.userName, userImage: res?.data?.data?.userImg, userEmail: res?.data?.data?.userEmail })
                    // SETTING USER DATA TO GLOBAL VARIABLE
                    setuserData({ userName: res?.data?.data?.userName, userImage: res?.data?.data?.userImg, userEmail: res?.data?.data?.userEmail })
                    checkLoginType(res?.data?.data?.UserType)
                    props.closeModal()
                } else {
                    setErrorMessage("Invalid Login Credentials!")
                }
            })
            .catch((err) => {
                setErrorMessage("Something Went Wrong !")
            }).finally(() => {
                setLoginLoader(false)
            })

    }

    const checkLoginType = (ut) => {
        let courseDetails = getLocalStorageItemJsonParsed('courseDetails')
        console.log('couse details after login....', courseDetails)
        console.log('pass usertype', ut)
        if (courseDetails === null) {
            console.log('inside null')

            directNavigate(ut)
            return
        } else {
            console.log('inside cart/wishilist')
            if (courseDetails?.type === 'postCart') {
                postCart(courseDetails?.courseId)
            }
            if (courseDetails?.type === 'postWishList') {
                postWishlist(courseDetails?.courseId)
            }
        }
    }

    const directNavigate = (ut) => {
        console.log('  insdie direact nav ', ut)
        if (ut == 1) navigate("/StudentDahboard")
        if (ut == 2) navigate("/dashboard")
        if (ut == 9) navigate("/dashboard")
    }

    //Add to whish list
    const postWishlist = (courseId) => {
        setextraActionLoading(true)
        loadingDialog.showModal()
        // setisWishlistLoading(true)
        // AxiosInterceptors.post(api_showActiveCourseList, {}, bearerHeader)
        AxiosInterceptors.post(api_addWishList, { courseId: courseId }, ApiHeader())
            .then((res) => {
                console.log('course status...', res?.data?.data)
                // if (res.data.status) {
                if (res?.data?.status === true) {
                    console.log("wishlist added", res)
                    navigate('/my-learnings/wishlist')
                } else {
                    // activateBottomErrorCard(true, 'Error occured in deletion.')
                    navigate('/my-learnings/wishlist')
                }

            })
            .catch((err) => {
                // activateBottomErrorCard(true, 'Error occured in deletion.')
            }).finally(() => {
                removeLocalstorageItem('courseDetails')
                setextraActionLoading(false)

            })
    }

    //5 post form
    const postCart = (courseId) => {
        setextraActionLoading(true)
        loadingDialog.showModal()

        // setisCartlistLoading(true)
        let requestBody = {
            courseId: courseId
        }

        console.log('before saving cart id...', requestBody)
        AxiosInterceptors.post(api_addToCart, requestBody, ApiHeader())
            .then((response) => {
                console.log("--2-- After Login data", response)
                if (response?.data?.status) {
                    navigate('/cart')

                } else {
                    navigate('/cart')
                    // activateBottomErrorCard(true, 'Error occured in submitting deactivation application. Please try again later.')
                }
            })
            .catch((err) => {
                // activateBottomErrorCard(true, 'Error occured in submitting deactivation application. Please try again later.')
            }).finally(() => {
                console.log('after hit at finally')
                removeLocalstorageItem('courseDetails')
                setextraActionLoading(false)

            })
    }

    return (
        <>

            <dialog id='loadingDialog'>
                <div className='w-40 h-40' >
                    <RotatingLines
                        strokeColor="black"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="25"
                        visible={true}
                    />
                </div>
            </dialog>

            <div className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8 sm:py-16 lg:py-24">
                <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
                    <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
                        Sign In
                    </h2>
                    <p className="mt-2 text-base text-gray-600">
                        Don&apos;t have an account?{" "}
                        <span
                            onClick={() => props.setShowScreen("register-student")}
                            className="font-medium text-indigo-600 transition-all duration-200 hover:text-indigo-700 hover:underline focus:text-indigo-700 cursor-pointer"
                        >
                            Create a free account
                        </span>
                    </p>

                    <form className='mt-8' onSubmit={formik.handleSubmit} onChange={handleChange}>
                        <div className="space-y-6">
                            <div className='relative'>
                                <label
                                    htmlFor=""
                                    className="text-base font-medium text-gray-900"
                                >
                                    Email address{" "}
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        placeholder="Email"
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="email" {...formik.getFieldProps('email')} />
                                    <p className='absolute text-red-500 text-xs'>{formik.touched.email && formik.errors.email ? formik.errors.email : null}</p>
                                </div>
                            </div>

                            <div className='relative'>
                                <div className="flex items-center justify-between">
                                    <label
                                        htmlFor=""
                                        className="text-base font-medium text-gray-900"
                                    >
                                        Password{" "}
                                    </label>

                                    <span
                                        onClick={() => props.setShowScreen("forgot")}
                                        className="text-sm font-medium text-indigo-600 hover:underline hover:text-indigo-700 focus:text-indigo-700 cursor-pointer"
                                    >
                                        Forgot password?{" "}
                                    </span>
                                </div>
                                <div className="mt-2.5">
                                    <input
                                        placeholder="Password"
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="password" {...formik.getFieldProps('password')} />
                                    <p className='absolute text-red-500 text-xs'>{formik.touched.password && formik.errors.password ? formik.errors.password : null}</p>
                                </div>
                            </div>
                            <div className='flex justify-center'>
                                {errorMessage && <p className='text-red-600 font-semibold absolute'>{errorMessage}</p>}
                            </div>
                            <div>

                                {loginLoader ? <div className='flex justify-center'>
                                    <RotatingLines
                                        strokeColor="grey"
                                        strokeWidth="5"
                                        animationDuration="0.75"
                                        width="25"
                                        visible={true}
                                    />
                                </div> :
                                    <button type='submit' className="w-full inline-flex items-center justify-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-base font-semibold leading-7 text-white hover:bg-indigo-500">

                                        Login
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-4 h-4 ml-2"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                                            />
                                        </svg>
                                    </button>}
                            </div>
                        </div>
                    </form>

                    {/* <div className="mt-3 space-y-3">
                        <button
                            onClick={() => notify("Currently Disabled!", "info")}
                            type="button"
                            className="relative inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-gray-700 transition-all duration-200 bg-white border border-gray-500 rounded-md hover:bg-gray-100 focus:bg-gray-100 hover:text-black focus:text-black focus:outline-none"
                        >
                            <div className="absolute inset-y-0 left-0 p-4">
                                <svg
                                    className="w-6 h-6 text-rose-500"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                                </svg>
                            </div>
                            Sign in with Google
                        </button>

                        <button
                            onClick={() => notify("Currently Disabled!", "info")}
                            type="button"
                            className="relative inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-gray-700 transition-all duration-200 bg-white border border-gray-500 rounded-md hover:bg-gray-100 focus:bg-gray-100 hover:text-black focus:text-black focus:outline-none"
                        >
                            <div className="absolute inset-y-0 left-0 p-4">
                                <svg
                                    className="w-6 h-6 text-[#2563EB]"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
                                </svg>
                            </div>
                            Sign in with Facebook
                        </button>
                    </div> */}
                </div>
            </div>

        </>
    )
}

export default LoginComponent

/*
Exported to -
NewLoginComponent.js
*/