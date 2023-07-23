
import { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import { useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'
import ApiList from '../../Components/Api/ApiList'
import AxiosInterceptors from '../../Components/Api/AxiosInterceptors'
import ApiHeader from '../../Components/Api/ApiHeader'
import ShimmerTable from '../../Components/Animations/ShimmerTable'
import { RotatingLines } from "react-loader-spinner";
import BottomErrorCard from '../../Components/Common/BottomErrorCard'
import { setLocalStorageItemStrigified } from '../../Components/Common/localstorage'
import toast, { Toaster } from 'react-hot-toast';




function ProfileForm(props) {

    const { id } = useParams()
    const navigate = useNavigate()
    const [isLoading, setisLoading] = useState(false);
    const [isSubmitFormLoading, setisSubmitFormLoading] = useState(false);
    const [erroState, seterroState] = useState(false);
    const [erroMessage, seterroMessage] = useState(null);
    const { api_getProfileDetails, api_updateProfile } = ApiList()

    let validationSchema = yup.object({

        name: yup.string().required('Enter name'),
        phone: yup.string().required('Enter phone'),
        website: yup.string(),
        twitter: yup.string(),
        headline: yup.string(),
        facebook: yup.string(),
        biography: yup.string().required('Enter biography'),
        linkedIn: yup.string(),
        youtube: yup.string(),
    })

    const initialValues = {

        name: '',
        phone: '',
        website: '',
        twitter: '',
        headline: '',
        facebook: '',
        biography: '',
        linkedIn: '',
        youtube: '',
    };

    const formik = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,
        onSubmit: (values) => {
            console.log('form values', values)
            updateProfile(values)
        }
        , validationSchema
    })

    const handleOnChange = (event) => {
        let name = event.target.name
        let value = event.target.value
    };

    // FUNCTION TO POST OR EDIT DATA
    const updateProfile = (values) => {
        setisSubmitFormLoading(true)
        let requestBody = {
            name: values?.name,
            phone: values?.phone,
            website: values?.website,
            twitter: values?.twitter,
            headline: values?.headline,
            facebook: values?.facebook,
            biography: values?.biography,
            linkedin: values?.linkedIn,
            youtube: values?.youtube,
        }

        console.log('before updating profile.....', requestBody)

        AxiosInterceptors.post(api_updateProfile, requestBody, ApiHeader())
            .then(function (response) {
                console.log('view fee master..', response?.data?.data)
                if (response?.data?.status) {
                    toast.success('Profile updated successfully!')
                    fetchProfileBasicDetails()
                } else {
                    toast.error(response?.data?.message)
                    activateBottomErrorCard(true, response?.data?.message)
                }
            })
            .catch(function (error) {
                toast.error('Something went wrong')
                activateBottomErrorCard(true, 'Error occured in updating profile.')
            }).finally(() => {
                setisSubmitFormLoading(false)

            })
    }

    // FUNCTION TO FECTH DATA TO EDIT
    const fetchProfileBasicDetails = () => {
        setisLoading(true)
        AxiosInterceptors.post(api_getProfileDetails, {}, ApiHeader())
            .then(function (response) {
                console.log('fetch edit data response..', response?.data?.data)
                if (response?.data?.status) {
                    feedEditData(response?.data?.data)
                    setLocalStorageItemStrigified('userImage', response?.data?.data?.fullImage)
                } else {
                    activateBottomErrorCard(true, 'Error occured in fetching deatils.')
                }

            })
            .catch(function (error) {
                console.log('= edit data error...', error)
            }).finally(() => {
                setisLoading(false)

            })
    }

    // FUNCTION TO FEED EDIT DATA
    const feedEditData = (data) => {
        console.log('existing property details in prop address...', data)

        formik.setFieldValue('name', data?.name)
        formik.setFieldValue('phone', data?.phone)
        formik.setFieldValue('website', data?.website)
        formik.setFieldValue('twitter', data?.twitter)
        formik.setFieldValue('headline', data?.headline)
        formik.setFieldValue('facebook', data?.facebook)
        formik.setFieldValue('biography', data?.biography)
        formik.setFieldValue('linkedIn', data?.linkedin)
        formik.setFieldValue('youtube', data?.youtube)
    }

    // CALLING API TO FETCH DATA IN EDIT CASE
    useEffect(() => {
        // if (id !== undefined) {
        fetchProfileBasicDetails()
        // }
    }, [])


    // FUNCTION FOR CUSTOM ERROR MESSAGE CARD
    const activateBottomErrorCard = (state, msg) => {
        seterroMessage(msg)
        seterroState(state)
    }


    return (
        <>
            <Toaster />

            {erroState && <BottomErrorCard activateBottomErrorCard={activateBottomErrorCard} errorTitle={erroMessage} />}
            <div className="block md:p-4 w-full md:py-6  mx-auto  bg-white px-4 sm:px-0">
                {isLoading && <ShimmerTable />}
                {!isLoading && <form onChange={handleOnChange} onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-12  sm:space-x-2">

                        <div className="form-group col-span-12 md:col-span-6 mb-6 md:px-4">
                            <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Name<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                            <input {...formik.getFieldProps('name')} type="text" className={'form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-black  transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 '}
                            />
                            <span className="text-red-600 absolute text-xs">{formik.touched.name && formik.errors.name ? formik.errors.name : null}</span>
                        </div>
                        <div className="form-group col-span-12 md:col-span-6 mb-6 md:px-4">
                            <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Phone<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                            <input {...formik.getFieldProps('phone')} type="text" className={'form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-black  transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 '}
                            />
                            <span className="text-red-600 absolute text-xs">{formik.touched.phone && formik.errors.phone ? formik.errors.phone : null}</span>
                        </div>

                        <div className="form-group col-span-12 md:col-span-6 mb-6 md:px-4">
                            <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Website<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                            <input {...formik.getFieldProps('website')} type="text" className={'form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-black  transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 '}
                            />
                            <span className="text-red-600 absolute text-xs">{formik.touched.website && formik.errors.website ? formik.errors.website : null}</span>
                        </div>



                        <div className="form-group col-span-12 md:col-span-6 mb-6 md:px-4">
                            <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Twitter<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                            <input {...formik.getFieldProps('twitter')} type="text" className={'form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-black  transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 '}
                            />
                            <span className="text-red-600 absolute text-xs">{formik.touched.twitter && formik.errors.twitter ? formik.errors.twitter : null}</span>
                        </div>

                        <div className="form-group col-span-12 md:col-span-6 mb-6 md:px-4">
                            <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Headline<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                            <input {...formik.getFieldProps('headline')} type="text" className={'form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-black  transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 '}
                            />
                            <span className="text-red-600 absolute text-xs">{formik.touched.headline && formik.errors.headline ? formik.errors.headline : null}</span>
                        </div>

                        <div className="form-group col-span-12 md:col-span-6 mb-6 md:px-4">
                            <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Facebook<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                            <input {...formik.getFieldProps('facebook')} type="text" className={'form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-black  transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 '}
                            />
                            <span className="text-red-600 absolute text-xs">{formik.touched.facebook && formik.errors.facebook ? formik.errors.facebook : null}</span>
                        </div>

                        <div className="form-group col-span-6">
                            <div className='md:px-4'>
                                <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Biography<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                                <textarea {...formik.getFieldProps('biography')} class="h-40 resize form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-black  transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 "></textarea>
                                <span className="text-red-600 absolute text-xs">{formik.touched.biography && formik.errors.biography ? formik.errors.biography : null}</span>
                            </div>
                        </div>

                        <div className="form-group col-span-12 md:col-span-6 mb-6 md:px-4">
                            <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">LinkedIn<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                            <input {...formik.getFieldProps('linkedIn')} type="text" className={'form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-black  transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 '}
                            />
                            <span className="text-red-600 absolute text-xs">{formik.touched.linkedIn && formik.errors.linkedIn ? formik.errors.linkedIn : null}</span>
                        </div>

                        <div className="form-group col-span-12 md:col-span-6 mb-6 md:px-4">
                            <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Youtube<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                            <input {...formik.getFieldProps('youtube')} type="text" className={'form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-black  transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 '}
                            />
                            <span className="text-red-600 absolute text-xs">{formik.touched.youtube && formik.errors.youtube ? formik.errors.youtube : null}</span>
                        </div>


                        <div className='col-span-12 mt-10'>
                            {isSubmitFormLoading ? <button type="submit" className="rounded cypress_next1_button px-10 py-2.5 bg-[#6980D3] text-white font-medium text-xs leading-tight    hover:bg-[#6980D3] hover:shadow-lg focus:bg-[#536abd] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#536abd] active:shadow-lg transition duration-150 ease-in-out shadow-md flex justify-center items-center"><RotatingLines
                                strokeColor="white"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="25"
                                visible={true}
                            /></button> : <button type="submit" className="rounded cypress_next1_button px-10 py-2.5 bg-[#6980D3] text-white font-medium text-xs leading-tight    hover:bg-[#536abd] hover:shadow-lg focus:bg-[#536abd] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#536abd] active:shadow-lg transition duration-150 ease-in-out shadow-md">Save </button>
                            }

                        </div>

                    </div>
                </form>}

            </div>
        </>
    )
}

export default ProfileForm