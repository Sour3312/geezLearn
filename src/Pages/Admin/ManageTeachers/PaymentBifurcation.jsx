import { useState } from 'react'
import { RotatingLines } from "react-loader-spinner";
import ApiList from '../../../Components/Api/ApiList';
import ApiHeader from '../../../Components/Api/ApiHeader';
import AxiosInterceptors from '../../../Components/Api/AxiosInterceptors';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik'
import * as yup from 'yup'
import { allowNumberInput } from '../../../Components/Common/PowerupFunctions';




function PaymentBifurcation(props) {
    const [percentage, setpercentage] = useState(0)
    const { api_postTeacherPercentage } = ApiList()
    const [isLoading, setisLoading] = useState(false)


    let validationSchema = yup.object({
        commission: yup.string().required('Enter bifurcation percentage'),
    })

    const initialValues = {
        commission: '',
    };

    const formik = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,
        onSubmit: (values) => {
            console.log('form values', values)
            postPaymentBifurcation(values)
        }
        , validationSchema
    })

    //2 delete FUNCTION TO DELETE ITEM FROM LIST
    const postPaymentBifurcation = (values) => {
        setisLoading(true)

        let requestBody = {
            teacherId: props?.currentId,
            commission: values?.commission
        }

        AxiosInterceptors.post(api_postTeacherPercentage, requestBody, ApiHeader())
            .then(function (response) {
                console.log('delete response..', response?.data?.data)
                if (response?.data?.status) {
                    toast.success('Bifurcation set successfully')
                } else {
                    toast.error(response?.data?.message)
                }
            })
            .catch(function (error) {
                toast.error(response?.data?.message)
            }).finally(() => {
                setisLoading(false)
            })
    }

    const handleOnChange = (event) => {

        let name = event.target.name
        let value = event.target.value

        { name == 'commission' && formik.setFieldValue("commission", allowNumberInput(value, formik.values.commission, 3)) }
        setpercentage(value)
    };

    return (
        <>
            <Toaster />
            <div className=''>
                <div className='flex-1'>
                    <div className='text-4xl font-semibold text-gray-700'>{props?.currentName}</div>
                    <div className='text-gray-600 text-sm'>Set payment percentage</div>
                </div>


                <form className='mt-10' onChange={handleOnChange} onSubmit={formik.handleSubmit}>
                    <div>
                        <div className='flex justify-start items-center'><div className='w-4 h-4 rounded-full bg-black inline-block mr-2'></div>Admin - <span className='font-semibold ml-4' >{100 - percentage}%</span> </div>
                        <div className='flex justify-start items-center'><div className='w-4 h-4 rounded-full bg-indigo-500 inline-block mr-2'></div>Teacher - <span className='font-semibold ml-4' >{percentage || 0}%</span></div>
                    </div>
                    <div className="shadow w-64 bg-grey-light mt-2 border bg-black relative">
                        <div className="text-xs leading-none py-1 text-center text-white bg-indigo-500 font-semibold h-8" style={{ width: `${percentage}%` }}></div>
                        <div className='text-white absolute left-0 top-0 w-full text-center'>{percentage || 0}% of Teacher</div>
                    </div>

                    <div className="form-group  mt-6">

                        <input {...formik.getFieldProps('commission')} type="text" className={'form-control inline px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-black  transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 mr-2'} placeholder='0'
                        />
                        <span className='inline font-semibold text-lg'>% of Teacher</span>
                        <span className="text-red-600 absolute text-xs">{formik.touched.commission && formik.errors.commission ? formik.errors.commission : null}</span>
                    </div>

                    <div className='col-span-12 mt-6'>
                        {isLoading ? <button className="px-12 py-2.5 bg-black text-white font-medium text-xs leading-tight  rounded  hover:bg-black hover:shadow-lg focus:bg-black focus:shadow-lg focus:outline-none focus:ring-0 active:bg-black active:shadow-lg transition duration-150 ease-in-out flex justify-center items-center "><RotatingLines
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="25"
                            visible={true}
                        /></button> : <button type="submit" className="px-12 py-2.5 bg-black text-white font-medium text-xs leading-tight  rounded  hover:bg-black hover:shadow-lg focus:bg-black focus:shadow-lg focus:outline-none focus:ring-0 active:bg-black active:shadow-lg transition duration-150 ease-in-out">Save</button>}

                    </div>
                </form>
            </div>
        </>
    )
}

export default PaymentBifurcation