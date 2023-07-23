import React, { useContext } from 'react'
import { useFormik, Formik, Form, ErrorMessage } from 'formik'
import * as yup from 'yup'
import { globalContextData } from '../../../Components/Common/Context/GlobalContextFile'

const ResetPasswordComponent = (props) => {
    const { notify } = useContext(globalContextData)

    const validationSchema = yup.object({
        email: yup.string().required('Require'),
    })

    const initialValues = {
        email: '',
    }


    const formik = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,
        onSubmit: (values, resetForm) => {
            console.log("Value.....", values)
            // finalSubmitData(values)
            notify("Feature not available yet!", "warn")
        },
        validationSchema
    })




    const handleChange = (event) => {
        let name = event.target.name
        let value = event.target.value

        // { name === 'propertyType' && ((value == '1') ? setpropertyTypeStatusToggle(true) : setpropertyTypeStatusToggle(false)) }
        // { name == 'mobileNo' && formik.setFieldValue("mobileNo", allowNumberInput(value, formik.values.mobileNo, 10)) }
    };


    return (
        <>

            <div className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8 sm:py-16 lg:py-24">
                <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
                    <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
                        Password Recover
                    </h2>
                    <p className="mt-2 text-base text-gray-600">
                        Don&apos;t have an account?{" "}
                        <span
                            onClick={() => props.setShowScreen("register")}
                            className="font-medium text-indigo-600 transition-all duration-200 hover:text-indigo-700 hover:underline focus:text-indigo-700 cursor-pointer"
                        >
                            Create a free account
                        </span>
                    </p>
                    <p className="mt-2 text-base text-gray-600">
                        Already have an account?{" "}
                        <span
                            onClick={() => props.setShowScreen("login")}
                            className="font-medium text-indigo-600 transition-all duration-200 hover:text-indigo-700 hover:underline focus:text-indigo-700 cursor-pointer "
                        >
                            Login
                        </span>
                    </p>

                    <form className='mt-8' onSubmit={formik.handleSubmit} onChange={handleChange}>
                        <div className="space-y-5">
                            <div>
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
                                    <p className='text-red-500 text-xs'>{formik.touched.email && formik.errors.email ? formik.errors.email : null}</p>
                                </div>
                            </div>


                            <div>
                                <button type='submit' className="w-full inline-flex items-center justify-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-base font-semibold leading-7 text-white hover:bg-indigo-500">

                                    Reset Password
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
                                </button>
                            </div>
                        </div>
                    </form>


                </div>
            </div>
        </>
    )
}

export default ResetPasswordComponent

/*
Exported to -
NewLoginComponent.js
*/