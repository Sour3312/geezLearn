import React, { useContext, useState } from 'react'
import { useFormik, Formik, Form, ErrorMessage } from 'formik'
import * as yup from 'yup'
import { globalContextData } from '../../../Components/Common/Context/GlobalContextFile'
import ApiList from '../../../Components/Api/ApiList'
import axios from 'axios'
import { RotatingLines } from "react-loader-spinner";
import { allowCharacterNumberInput, allowCharacterNumberSpaceCommaInput, allowMailInput, allowNumberInput } from '../../../Components/Common/PowerupFunctions'
import AxiosInterceptors from '../../../Components/Api/AxiosInterceptors'


const SignUpComponent = (props) => {

    const { notify } = useContext(globalContextData)

    const { api_register, bearerHeader } = ApiList();
    const [isLoading, setisLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState()
    const [successMsg, setSuccessMsg] = useState()


    const registerSuccess = (data) => {
        console.log("===Data aftr success", data)
        setSuccessMsg("Register successfull, Please Login")
        props.setShowScreen("login");
    }


    const registrationDetails = (data) => {
        setErrorMessage()
        setSuccessMsg()
        setisLoading(true)
        console.log("--1--Registration Data", data)


        const requestBody = {
            name: data?.studentName,
            email: data?.email,
            password: data?.password,
            phone: toString(data?.phone),
            type: props?.showScreen === 'register-teacher' ? 2 : 1
        }

        console.log('before register...', requestBody)

        AxiosInterceptors.post(api_register, requestBody, bearerHeader)
            .then((res) => {
                console.log("--2-- After reg data", res)
                if (res?.data?.status === true) {
                    notify(res?.data?.message, "success")
                    registerSuccess(res?.data)
                    setisLoading(false)
                } else {
                    notify(res?.data?.message, "error")
                    setisLoading(false)
                    console.log("Error", res?.data?.message)
                    setErrorMessage("Please fill details carefully!")
                }
            })
            .catch((err) => {
                notify(err?.message, "error")
                console.log("Exception Error while registration", err)
                setisLoading(false)
                setErrorMessage("Something Went Wrong !")
            })
    }

    const validationSchema = yup.object({
        studentName: yup.string().required('Enter Your Name')
            .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed"),
        phone: yup.string().required('Enter mobile no.')
            .min(10, 'Please Enter 10 Digit !')
            .max(10, 'Please Enter 10 Digit !'),
        email: yup.string().email('Invalid email').required('This field is required !'),
        password: yup.string()
            .min(6, 'Minimum six character !')
            .max(50, 'Too Long!')
            .required('This field is required !')
            .matches(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/, 'Password Must Contains (Capital, Smail, Number, Special) eg - Abc123#.'),
    })

    const initialValues = {
        studentName: '',
        email: '',
        password: '',
        phone: '',
    }


    const formik = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,
        onSubmit: (values, resetForm) => {

            console.log("Value.....", values)
            registrationDetails(values)
        },
        validationSchema
    })




    const handleChange = (event) => {
        let name = event.target.name
        let value = event.target.value

        { name == 'studentName' && formik.setFieldValue("studentName", allowCharacterNumberSpaceCommaInput(value, formik.values.studentName, 100)) }
        { name == 'email' && formik.setFieldValue("email", allowMailInput(value, formik.values.email, 100)) }
        { name == 'phone' && formik.setFieldValue("phone", allowNumberInput(value, formik.values.phone, 10)) }
        // { name == 'password' && formik.setFieldValue("password", allowCharacterNumberSpaceCommaInput(value, formik.values.password, 100)) }
    };


    return (
        <>

            <div className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8 sm:py-16 lg:py-24">
                <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
                    <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
                        Sign Up
                    </h2>
                    <p className="mt-2 text-base text-gray-600">
                        Already have an account?{" "}
                        <span
                            onClick={() => props.setShowScreen("login")}
                            className="font-medium text-indigo-600 transition-all duration-200 hover:text-indigo-700 hover:underline focus:text-indigo-700"
                        >
                            Login Now
                        </span>
                    </p>

                    <form className='mt-8' onSubmit={formik.handleSubmit} onChange={handleChange}>
                        <div className="space-y-2">
                            <div className='relative'>
                                <label
                                    htmlFor=""
                                    className="text-base font-medium text-gray-900"
                                >
                                    Name
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        placeholder="Name"
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="text" {...formik.getFieldProps('studentName')} />
                                    <p className='absolute text-red-500 text-xs'>{formik.touched.studentName && formik.errors.studentName ? formik.errors.studentName : null}</p>
                                </div>
                            </div>
                            <div className='relative'>
                                <label
                                    htmlFor=""
                                    className="text-base font-medium text-gray-900"
                                >
                                    Phone
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        placeholder="Phone"
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="text" {...formik.getFieldProps('phone')} />
                                    <p className='absolute text-red-500 text-xs'>{formik.touched.phone && formik.errors.phone ? formik.errors.phone : null}</p>
                                </div>
                            </div>
                            <div className='relative'>
                                <label
                                    htmlFor=""
                                    className="text-base font-medium text-gray-900"
                                >
                                    Email Address
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
                                </div>
                                <div className="mt-2.5">
                                    <input
                                        placeholder="Password"
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="password" {...formik.getFieldProps('password')} />
                                    <p className='text-red-500 text-xs absolute'>{formik.touched.password && formik.errors.password ? formik.errors.password : null}</p>
                                </div>
                            </div>

                            <div className=''>

                                {isLoading ? <div className='flex justify-center'>
                                    <RotatingLines
                                        strokeColor="grey"
                                        strokeWidth="5"
                                        animationDuration="0.75"
                                        width="25"
                                        visible={true}
                                    />
                                </div> :
                                    <button type='submit' disabled={isLoading} className="mt-2 w-full inline-flex items-center justify-center rounded-md disabled:text-indigo-200 disabled:bg-indigo-300 bg-indigo-600 px-3.5 py-2.5 text-base font-semibold leading-7 text-white hover:bg-indigo-500">
                                        Register
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

export default SignUpComponent

/*
Exported to -
NewLoginComponent.js
*/