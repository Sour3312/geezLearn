
import { useState } from 'react'
import { useFormik } from 'formik'
import { useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'
import toast, { Toaster } from 'react-hot-toast';
import ApiList from '../../../Components/Api/ApiList';
import AxiosInterceptors from '../../../Components/Api/AxiosInterceptors';
import ApiHeader from '../../../Components/Api/ApiHeader';
import { allowNumberCharacterInput } from '../../../Components/Common/PowerupFunctions';


function PaymentApprovalForm(props) {

    const navigate = useNavigate()
    const [isLoading, setisLoading] = useState(false)
    const { api_PaymentApproval } = ApiList()

    let validationSchema = yup.object({

        paymentMode: yup.string().required('Select payment mode'),
        remarks: yup.string().required('Enter remarks'),
    })

    const initialValues = {
        paymentMode: '',
        remarks: '',
    };

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: (values) => {
            console.log('form values', values)
            postPaymentApproval(values)
        }
        , validationSchema
    })

    const handleOnChange = (event) => {
        let name = event.target.name
        let value = event.target.value

        { name == 'remarks' && formik.setFieldValue("remarks", allowNumberCharacterInput(value, formik.values.remarks, 100)) }

    };

    // FUNCTION TO POST OR EDIT DATA
    const postPaymentApproval = (values) => {
        setisLoading(true)
        let requestBody = {
            requestId: props?.currentId,
            status: 1,
            remark: values?.remarks,
            paymentThrough: values?.paymentMode,
        }

        console.log('before post payment approval....', requestBody)

        AxiosInterceptors.post(api_PaymentApproval, requestBody, ApiHeader())
            .then(function (response) {
                console.log('view fee master..', response?.data?.data)
                if (response?.data?.status) {
                    toast.success('Payment Approved Successfully !')
                } else {
                    toast.error(response?.data?.message)
                }
            })
            .catch(function (error) {
                console.log('==2 error list...', error)
                toast.error('Something went wrong !')
            }).finally(() => {
                setisLoading(false)
            })
    }

    return (
        <>
            <Toaster />
            <div className="block md:p-4 w-full md:py-6 rounded-lg mx-auto  bg-white px-4 sm:px-0">
                <form onChange={handleOnChange} onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-12">

                        <div className="form-group col-span-12 md:col-span-6 mb-6 md:px-4">
                            <label className={'form-label inline-block mb-1 text-gray-600 text-sm font-semibold'}>Payment Mode</label>
                            <select name="zone" className={'form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md cursor-pointer'}
                            >
                                <option value="" >Select</option>
                                <option value="UPI" >UPI</option>
                                <option value="CASH" >Option 2</option>

                            </select>
                        </div>

                        <div className="form-group col-span-12 grid grid-cols-12">
                            <div className='col-span-12 md:col-span-6 mb-6 md:px-4'>
                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Remarks<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                <textarea {...formik.getFieldProps('remarks')} class="h-40 resize form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"></textarea>
                                <span className="text-red-600 absolute text-xs">{formik.touched.remarks && formik.errors.remarks ? formik.errors.remarks : null}</span>
                            </div>
                        </div>


                        <div className='col-span-12 mt-10 px-4'>
                            {isLoading ? <button className="cypress_next1_button px-6 py-2.5 bg-black text-white font-medium text-xs leading-tight  rounded  hover:bg-black hover:shadow-lg focus:bg-black focus:shadow-lg focus:outline-none focus:ring-0 active:bg-black active:shadow-lg transition duration-150 ease-in-out flex justify-center items-center"><RotatingLines
                                strokeColor="white"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="25"
                                visible={true}
                            /></button> : <button type="submit" className="cypress_next1_button px-6 py-2.5 bg-black text-white font-medium text-xs leading-tight  rounded  hover:bg-black hover:shadow-lg focus:bg-black focus:shadow-lg focus:outline-none focus:ring-0 active:bg-black active:shadow-lg transition duration-150 ease-in-out">Approve</button>}

                        </div>

                    </div>
                </form>

            </div>
        </>
    )
}

export default PaymentApprovalForm