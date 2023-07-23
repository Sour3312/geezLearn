import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { RotatingLines } from "react-loader-spinner";
import ApiList from '../../Components/Api/ApiList';
import toast, { Toaster } from 'react-hot-toast';
import AxiosInterceptors from '../../Components/Api/AxiosInterceptors';
import ApiHeader from '../../Components/Api/ApiHeader';
import BottomErrorCard from '../../Components/Common/BottomErrorCard';
import { allowNumberCharacterInput } from '../../Components/Common/PowerupFunctions';
import { useNavigate } from 'react-router-dom/dist';



function ChangePasswordCard() {

    const [isLoading, setisLoading] = useState(false)
    const [erroState, seterroState] = useState(false);
    const [erroMessage, seterroMessage] = useState(null);
    const { api_changePassword } = ApiList()
    const navigate = useNavigate()

    let validationSchema = yup.object({
        oldPassword: yup.string().required('Enter old password'),
        newPassword: yup.string().required('Enter new password'),
        confirmPassword: yup.string().required('Enter mew password again'),
    })

    const initialValues = {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    };

    const formik = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,
        onSubmit: (values) => {
            console.log('form values', values)
            postChangePassword(values)
        }
        , validationSchema
    })

    //2 delete FUNCTION TO DELETE ITEM FROM LIST
    const postChangePassword = (values) => {
        setisLoading(true)

        let requestBody = {
            oldPassword: values?.oldPassword,
            newPassword: values?.newPassword
        }

        AxiosInterceptors.post(api_changePassword, requestBody, ApiHeader())
            .then(function (response) {
                console.log('delete response..', response?.data?.data)
                if (response?.data?.status) {
                    toast.success('Password Changed Successfully !')
                } else {
                    activateBottomErrorCard(true, response?.data?.message)
                    toast.error(response?.data?.message)
                }
            })
            .catch(function (error) {
                activateBottomErrorCard(true, 'Error occured password change')
                toast.error(response?.data?.message)
            }).finally(() => {
                setisLoading(false)
            })
    }

    const handleOnChange = (event) => {

        let name = event.target.name
        let value = event.target.value

        { name == 'oldPassword' && formik.setFieldValue("oldPassword", allowNumberCharacterInput(value, formik.values.oldPassword, 100)) }
        { name == 'newPassword' && formik.setFieldValue("newPassword", allowNumberCharacterInput(value, formik.values.newPassword, 100)) }
        { name == 'confirmPassword' && formik.setFieldValue("confirmPassword", allowNumberCharacterInput(value, formik.values.confirmPassword, 100)) }
    };


    // FUNCTION FOR CUSTOM ERROR MESSAGE CARD
    const activateBottomErrorCard = (state, msg) => {
        seterroMessage(msg)
        seterroState(state)
    }


    return (
        <>
            <Toaster />
            {erroState && <BottomErrorCard activateBottomErrorCard={activateBottomErrorCard} errorTitle={erroMessage} />}
            <div className="max-w-lg mx-auto my-20 bg-white p-8  rounded-xl shadow shadow-slate-300">
                <h1 className="text-4xl font-medium text-center">Change password</h1>
                <p className="text-slate-500 text-center mt-4">Change your password from here.</p>
                <form className="my-10" onChange={handleOnChange} onSubmit={formik.handleSubmit}>
                    <div className="flex flex-col space-y-5">
                        <div className='form-group'>
                            <label htmlFor="email">
                                <p className="font-medium text-slate-700 pb-2">Old Password</p>
                                <input {...formik.getFieldProps('oldPassword')} type="text" className="block w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter old password" />
                                <span className="text-red-600 absolute text-xs">{formik.touched.oldPassword && formik.errors.oldPassword ? formik.errors.oldPassword : null}</span>
                            </label>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="email">
                                <p className="font-medium text-slate-700 pb-2">New Password</p>
                                <input {...formik.getFieldProps('newPassword')} type="text" className="block w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter new password" />
                                <span className="text-red-600 absolute text-xs">{formik.touched.newPassword && formik.errors.newPassword ? formik.errors.newPassword : null}</span>
                            </label>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="email">
                                <p className="font-medium text-slate-700 pb-2">Confirm New Password</p>
                                <input {...formik.getFieldProps('confirmPassword')} type="text" className="block w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter new password again" />
                                <span className="text-red-600 absolute text-xs">{formik.touched.confirmPassword && formik.errors.confirmPassword ? formik.errors.confirmPassword : null}</span>
                            </label>
                        </div>


                        {isLoading ? <button type="submit" className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"><RotatingLines
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="25"
                            visible={true}
                        /></button> : <button type="submit" className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                            </svg>
                            <span>Change password</span>
                        </button>}

                    </div>
                </form>
            </div>
        </>

    )
}

export default ChangePasswordCard