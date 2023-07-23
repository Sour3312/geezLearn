
import { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import { useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'
import { FaRegUserCircle } from 'react-icons/fa'
import avt from './avt.png'
import ApiList from '../../Components/Api/ApiList'
import { getLocalStorageItemJsonParsed, setLocalStorageItemStrigified } from '../../Components/Common/localstorage'
import { RotatingLines } from "react-loader-spinner";
import AxiosInterceptors from '../../Components/Api/AxiosInterceptors'
import ApiHeader from '../../Components/Api/ApiHeader'
import toast, { Toaster } from 'react-hot-toast';


function ProfilePicture(props) {

    const { id } = useParams()
    const navigate = useNavigate()
    const [isLoading, setisLoading] = useState(false);
    const [erroState, seterroState] = useState(false);
    const [erroMessage, seterroMessage] = useState(null);
    const [userImage, setuserImage] = useState(null);
    const [imageFile, setimageFile] = useState(null);
    const [imageUrl, setimageUrl] = useState();
    const { api_updateProfileImage, api_getProfileDetails } = ApiList()

    let validationSchema = yup.object({
        profilePic: yup.string().required('Select Profile Picture'),
    })

    const initialValues = {
        profilePic: '',
    };

    const formik = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,
        onSubmit: (values) => {
            console.log('form values', values)
            updateProfilePic()
        }
        , validationSchema
    })

    const handleOnChange = (e) => {
        let file = e.target.files[0]
        setuserImage(URL.createObjectURL(e.target.files[0]))
        setimageFile(file)
    };
    // FUNCTION TO POST OR EDIT DATA
    const updateProfilePic = (values) => {
        setisLoading(true)
        let formData = new FormData()
        formData.append('file', imageFile)

        console.log('before updating profile.....')
        AxiosInterceptors.post(api_updateProfileImage, formData, ApiHeader())
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

            })
    }

    // FUNCTION TO FECTH PROFILE DATA AGAIN TO EXTRACT IMAGE FILE AFTER UPDATION
    const fetchProfileBasicDetails = () => {
        AxiosInterceptors.post(api_getProfileDetails, {}, ApiHeader())
            .then(function (response) {
                console.log('fetch edit data response..', response?.data?.data)
                if (response?.data?.status) {
                    setLocalStorageItemStrigified('userImage', response?.data?.data?.fullImage)
                    setuserImage(response?.data?.data?.fullImage)
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


    useEffect(() => {
        let localUserImage = getLocalStorageItemJsonParsed('userImage')
        setuserImage(localUserImage)
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
            <div className="block md:p-4 w-full md:py-6 rounded-lg mx-auto  bg-white px-4 sm:px-0">
                <form onChange={handleOnChange} onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-12  sm:space-x-2">

                        <div className="form-group col-span-12 md:col-span-6 mb-6 md:px-4 ">
                            <div>
                                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Image Preview</label>
                                <label class="block mb-2 text-xs font-medium text-gray-400 dark:text-white" >Minimum 200x200 pixels, Maximum 6000x6000 pixels</label>
                                <div className='w-full h-40 border border-black flex justify-center items-center overflow-hidden'>
                                    <img src={userImage} alt="" />
                                </div>
                            </div>
                            <div>
                                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Profile Picture</label>
                                <div className='relative'>
                                    <input {...formik.getFieldProps('profilePic')} class="py-2 block w-full text-sm text-gray-900 border border-black cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" />
                                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
                                    <span className="text-red-600 absolute text-xs">{formik.touched.profilePic && formik.errors.profilePic ? formik.errors.profilePic : null}</span>
                                    <div for="file_input" className='absolute top-0 right-0  h-10 text-black px-5 py-2 font-bold border-l-2 cursor-pointer'>Upload Image</div>
                                </div>
                            </div>
                        </div>


                        <div className='col-span-12 mt-10'>
                            {isLoading ? <button className=" px-6 py-2.5 bg-[#6980D3] text-white font-medium text-xs leading-tight  rounded  hover:bg-[#536abd] hover:shadow-lg focus:bg-[#536abd] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#536abd] active:shadow-lg transition duration-150 ease-in-out flex justify-center items-center"> <RotatingLines
                                strokeColor="white"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="25"
                                visible={true}
                            /> </button> : <button type="submit" className=" px-6 py-2.5 bg-[#6980D3] text-white font-medium text-xs leading-tight  rounded  hover:bg-[#536abd] hover:shadow-lg focus:bg-[#536abd] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-black active:shadow-lg transition duration-150 ease-in-out">Update</button>}

                        </div>

                    </div>
                </form>

            </div>
        </>
    )
}

export default ProfilePicture