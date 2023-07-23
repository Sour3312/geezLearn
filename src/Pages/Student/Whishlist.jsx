import { useState, useEffect } from 'react'
import LearningCard from './LearningCard'
import ApiList from '../../Components/Api/ApiList';
import BottomErrorCard from '../../Components/Common/BottomErrorCard';
import AxiosInterceptors from '../../Components/Api/AxiosInterceptors';
import ApiHeader from '../../Components/Api/ApiHeader';
import ShimmerCardGrid from '../../Components/Animations/ShimmerCardGrid';
import wishlist from './wishlist.png'
import { useNavigate } from 'react-router-dom';

function Whishlist() {
    const [isLoading, setisLoading] = useState(false)
    const [isLoadingDelete, setisLoadingDelete] = useState(false)
    const [erroState, seterroState] = useState(false);
    const [erroMessage, seterroMessage] = useState(null);
    const [dataList, setdataList] = useState(null);
    const navigate = useNavigate()
    const [currentLoadingIndex, setcurrentLoadingIndex] = useState(null);

    const { api_getWishlist, api_deleteWishlist } = ApiList()




    //Get wishlist
    const getWishlist = (type = null) => {
        console.log('inside post wish list...')
        if (type === null) {
            setisLoading(true)
        } else {
            setisLoadingDelete(true)
        }
        // AxiosInterceptors.post(api_showActiveCourseList, {}, bearerHeader)
        AxiosInterceptors.post(api_getWishlist, {}, ApiHeader())
            .then((res) => {
                console.log('course status...', res?.data?.data)
                // if (res.data.status) {
                if (res?.data?.status === true) {
                    setdataList(res?.data?.data)
                } else {
                    setdataList(null)
                }
            })
            .catch((err) => {
                activateBottomErrorCard(true, 'Error occured in deletion.')
            }).finally(() => {
                if (type === null) {
                    setisLoading(false)
                } else {
                    setisLoadingDelete(false)
                }
            })
    }

    const deleteWishlist = (courseId) => {
        console.log('inside post wish list...')
        setisLoadingDelete(true)
        // AxiosInterceptors.post(api_showActiveCourseList, {}, bearerHeader)
        AxiosInterceptors.post(api_deleteWishlist, { courseId: courseId }, ApiHeader())
            .then((res) => {
                console.log('course deleted...', res?.data?.data)
                // if (res.data.status) {
                if (res?.data?.status === true) {
                    console.log("wishlist deleted", res)
                    getWishlist('delete')
                }
            })
            .catch((err) => {
                activateBottomErrorCard(true, 'Error occured in deletion.')

            }).finally(() => {
                setcurrentLoadingIndex(null)
                setisLoadingDelete(false)
            })
    }

    useEffect(() => {
        getWishlist()
    }, [])


    // DUMMY DATA ARRAY TO SHOW COURESES
    const courses = [
        { id: 1, courseName: 'python', title: "Learn Python: The Complete Python Programming Course", author: 'Avinash Jain, The Codex', ratings: 450, price: 4254 },
        { id: 2, courseName: 'python', title: "Learn Python: The Complete Python Programming Course", author: 'Avinash Jain, The Codex', ratings: 450, price: 4254 },
        { id: 3, courseName: 'python', title: "Learn Python: The Complete Python Programming Course", author: 'Avinash Jain, The Codex', ratings: 450, price: 4254 },
    ]

    // FUNCTION FOR CUSTOM ERROR MESSAGE CARD
    const activateBottomErrorCard = (state, msg) => {
        seterroMessage(msg)
        seterroState(state)
    }

    return (

        <>
            {erroState && <BottomErrorCard activateBottomErrorCard={activateBottomErrorCard} errorTitle={erroMessage} />}
            {isLoading && <ShimmerCardGrid />}

            {!isLoading && !Array.isArray(dataList) &&
                <div className='flex justify-center items-center flex-col bg-gray-100 p-10 mt-2'>
                    <div><img className='w-40' src={wishlist} alt="cart" /></div>
                    <h1 className='mt-4 font-semibold text-gray-700 text-lg'>Your wishlis is empty, Try adding courses.</h1>
                    <button
                        onClick={() => navigate('/courses')}
                        type="button"
                        className="mt-4 rounded-md bg-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Browse Courses
                    </button>
                </div>
            }

            <div className='grid grid-cols-12 '>
                {!isLoading && Array.isArray(dataList) && dataList?.map((data, index) => (
                    <LearningCard isLoadingDelete={isLoadingDelete} index={index} setcurrentLoadingIndex={setcurrentLoadingIndex} currentLoadingIndex={currentLoadingIndex} deleteWishlist={deleteWishlist} type='product-course-card' cardData={data} />
                ))}
            </div></>

    )
}

export default Whishlist