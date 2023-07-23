
import { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import { useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'
import { RotatingLines } from "react-loader-spinner";



function UpdateGatewayInfoModal(props) {

    const { id } = useParams()
    const navigate = useNavigate()
    const [isLoading, setisLoading] = useState(false)

    let validationSchema = yup.object({

        apiKey: yup.string().required('Enter api key'),
        secKey: yup.string().required('Enter secret key'),
    })

    const initialValues = {

        apiKey: '',
        secKey: '',
    };

    const formik = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,
        onSubmit: (values) => {
            console.log('form values', values)
            props?.updateGateway(values)
        }
        , validationSchema
    })

    const handleOnChange = (event) => {
        let name = event.target.name
        let value = event.target.value
    };

    const feedEditData = (data) => {
        console.log('existing property details in prop address...', data)

        formik.setFieldValue('apiKey', props?.currentApikey)
        formik.setFieldValue('secKey', props?.currentSecretKey)
    }

    useEffect(() => {
        feedEditData()
    }, [props?.currentApikey, props?.currentSecretKey])





    return (
        <>
            <div className="block md:p-4 w-full md:py-6 rounded-lg mx-auto   bg-white px-4 sm:px-0">
                <form onChange={handleOnChange} onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-12  sm:space-x-2">

                        <div className="form-group col-span-12 md:col-span-12 px-2">
                            <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">API Key<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                            <input {...formik.getFieldProps('apiKey')} type="text" className={'form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md'}
                            />
                            <span className="text-red-600 absolute text-xs">{formik.touched.apiKey && formik.errors.apiKey ? formik.errors.apiKey : null}</span>
                        </div>

                        <div className="form-group col-span-12 md:col-span-12 mt-4">
                            <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Secret Key<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                            <input {...formik.getFieldProps('secKey')} type="text" className={'form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md'}
                            />
                            <span className="text-red-600 absolute text-xs">{formik.touched.secKey && formik.errors.secKey ? formik.errors.secKey : null}</span>
                        </div>


                        <div className=' col-span-12 mt-10'>
                            {props?.isLoadingUpdate ? <button className="px-12 py-2.5 bg-black text-white font-medium text-xs leading-tight  rounded  hover:bg-black hover:shadow-lg focus:bg-black focus:shadow-lg focus:outline-none focus:ring-0 active:bg-black active:shadow-lg transition duration-150 ease-in-out flex justify-center items-center "><RotatingLines
                                strokeColor="white"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="25"
                                visible={true}
                            /></button> : <button type="submit" className="cypress_next1_button px-6 py-2.5 bg-black text-white font-medium text-xs leading-tight  rounded  hover:bg-black hover:shadow-lg focus:bg-black focus:shadow-lg focus:outline-none focus:ring-0 active:bg-black active:shadow-lg transition duration-150 ease-in-out hover:opacity-70 ">Update</button>}

                        </div>

                    </div>
                </form>

            </div>
        </>
    )
}

export default UpdateGatewayInfoModal