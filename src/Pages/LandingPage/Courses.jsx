import { useEffect, useState } from 'react'
import { IoMdStar, IoMdStarHalf } from 'react-icons/io'
import { BiRupee } from 'react-icons/bi'
import { AiOutlineHeart } from 'react-icons/ai'
import { BsCheckLg } from 'react-icons/bs'
import pc from './pc.jfif'
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom'
import { ImList2 } from 'react-icons/im'
import { FiGrid } from 'react-icons/fi'
import { AiOutlineDoubleRight } from 'react-icons/ai'
import ApiList from '../../Components/Api/ApiList'
import { useContext } from 'react'
import { globalContextData } from '../../Components/Common/Context/GlobalContextFile'
import ApiHeader from '../../Components/Api/ApiHeader'
import pbook from './pbook.png'
import ShimmerCard from '../../Components/Animations/ShimmerCard'
import ShimmerCardGrid from '../../Components/Animations/ShimmerCardGrid'
import BottomErrorCard from '../../Components/Common/BottomErrorCard'
import AxiosInterceptors from '../../Components/Api/AxiosInterceptors'
import { BiError } from 'react-icons/bi'
import { RotatingLines } from "react-loader-spinner";
import AuthIndex from '../../Components/Auth/AuthIndex'
import { setLocalStorageItemStrigified } from '../../Components/Common/localstorage'
import ShimmerSingleCard from '../../Components/Animations/ShimmerSingleCard'
import oxford from './oxford.jpg'
import unv1 from './unv1.jpg'
import { BsPlayCircle } from 'react-icons/bs'
import { BsCartPlusFill } from 'react-icons/bs'



function Courses(props) {
    //STATE TO TOGGLE LIST AND GRID VIEW
    const [layoutViewType, setlayoutViewType] = useState('grid')
    const [courseList, setCourseList] = useState([])
    const [filteredCourseList, setfilteredCourseList] = useState([])
    const [category, setCategory] = useState()
    const [isLoading, setisLoading] = useState(false)
    const [isWishlistLoading, setisWishlistLoading] = useState(false)
    const [isCartlistLoading, setisCartlistLoading] = useState(false)
    const [isSingleCardLoading, setisSingleCardLoading] = useState(false)
    const [erroState, seterroState] = useState(false);
    const [courseFetchError, setcourseFetchError] = useState(false);
    const [erroMessage, seterroMessage] = useState(null);
    const [currentLoadingIndex, setcurrentLoadingIndex] = useState(null);

    const location = useLocation()
    const navigate = useNavigate()
    const { isLogedIn } = AuthIndex()
    const { api_addToCart, api_showActiveCourseList, bearerHeader, api_getAllCourse, api_getAllCourseCategory, api_addWishList, api_cartList, api_getWishlist } = ApiList()
    const { updateCartCount, notify, cartCount, setCartItemCount } = useContext(globalContextData)
    const { filterBy } = useParams()

    // CATEGORY LIST
    const getAllCategoriesList = () => {
        AxiosInterceptors.post(api_getAllCourseCategory, {}, ApiHeader())
            .then((res) => {
                console.log("fetching category list ", res)
                if (res?.data?.status === true) {
                    setCategory(res?.data?.data)
                } else {
                    console.log("error while fetching category list", res)
                    notify("Failed to load Data", "error")
                }
            })
            .catch((err) => {
                console.log("exception fetching category list", err)
                notify("Failed to load Data", "error")
            })
    }

    // COURSE LIST
    const getAllCourseList = (type = null) => {
        if (type === null) {
            setisLoading(true)
        } else {
            setisSingleCardLoading(true)
        }
        setcourseFetchError(false)
        AxiosInterceptors.post(api_getAllCourse, {}, ApiHeader())
            .then((res) => {
                console.log('course status...', res?.data?.data)
                if (res?.data?.status === true) {
                    setCourseList(res?.data?.data)
                    setfilteredCourseList(res?.data?.data)
                    if (filterBy !== undefined) {
                        filterCourse(filterBy)
                    }
                } else {
                    console.log("error while fetching curse list", res)
                }
            })
            .catch((err) => {
                setcourseFetchError(true)
            }).finally(() => {
                if (type === null) {
                    setisLoading(false)
                } else {
                    setisSingleCardLoading(false)
                }
                setcurrentLoadingIndex(null)
            })
    }

    // POST WISHLIST
    const postWishlist = (courseId) => {
        // IF USER IS NOT LOGGED IN THE TELL TO LOGIN
        if (!isLogedIn) {
            setLocalStorageItemStrigified('courseDetails', { courseId: courseId, type: 'postWishList' })
            props?.setOpenLoginModal(prev => prev + 1)
            return
        }

        setisWishlistLoading(true)
        AxiosInterceptors.post(api_addWishList, { courseId: courseId }, ApiHeader())
            .then((res) => {
                console.log('course status...', res?.data?.data)
                if (res?.data?.status === true) {
                    console.log("wishlist added", res)
                    getAllCourseList('single-card')
                } else {
                    activateBottomErrorCard(true, 'Error occured in deletion.')
                }
            })
            .catch((err) => {
                activateBottomErrorCard(true, 'Error occured in deletion.')
            }).finally(() => {
                setisWishlistLoading(false)
            })
    }

    // POST CART
    const postCart = (courseId) => {
        // IF USER IS NOT LOGGED IN THE TELL TO LOGIN
        if (!isLogedIn) {
            setLocalStorageItemStrigified('courseDetails', { courseId: courseId, type: 'postCart' })
            props?.setOpenLoginModal(prev => prev + 1)
            return
        }
        setisCartlistLoading(true)
        let requestBody = {
            courseId: courseId
        }

        console.log('before saving cart id...', requestBody)
        AxiosInterceptors.post(api_addToCart, requestBody, ApiHeader())
            .then((response) => {
                console.log("--2-- After Login data", response)
                if (response?.data?.status) {
                    getAllCourseList('single-card')
                    console.log('success')
                } else {
                    activateBottomErrorCard(true, 'Error occured in submitting deactivation application. Please try again later.')
                }
            })
            .catch((err) => {
                activateBottomErrorCard(true, 'Error occured in submitting deactivation application. Please try again later.')
            }).finally(() => {
                console.log('after hit at finally')
                setisCartlistLoading(false)
            })
    }




    useEffect(() => {
        getAllCourseList()
        getAllCategoriesList()
    }, [])

    // FUNCTION TO CHANGE LAYOUT VIEW IN LIST OR GRID
    const toggleLayoutView = (type) => {
        setlayoutViewType(type)
    }

    // FUNCTION TO FILTER COURSE WITH CATEGORY
    const filterCourse = (categoryId) => {
        console.log('parse filter by....', categoryId)
        if (categoryId == '') {
            setfilteredCourseList(courseList)
            return
        }
        const filteredData = courseList.filter(item => item.categories.some(category => category.category_id == categoryId));
        setfilteredCourseList(filteredData)
    }

    // FUNCTION TO SEARCH COURSES
    const searchCourse = (searchText) => {
        if (searchText == '') {
            setfilteredCourseList(courseList)
            return
        }
        const filteredData = courseList.filter(item =>
            item?.title.toLowerCase().includes(searchText.toLowerCase())
        );
        setfilteredCourseList(filteredData)
    }


    // REMOVE SPACE WITH -
    const removeSpaceAddDash = (str) => {
        return str.replace(/\s+/g, '-').toLowerCase()
    }

    // FUNCTION FOR CUSTOM ERROR MESSAGE CARD
    const activateBottomErrorCard = (state, msg) => {
        seterroMessage(msg)
        seterroState(state)
    }

    return (
        <>
            {erroState && <BottomErrorCard activateBottomErrorCard={activateBottomErrorCard} errorTitle={erroMessage} />}
            <div className='text-2xl md:text-4xl font-bold text-center pt-10'>A broad selection of courses.</div>
            <div className='text-sm text-gray-600 text-center font-custom-lora'>Choose from 213,000 online video courses with new additions published every month</div>



            {/* SPACER */}
            <div className="w-full h-5 "></div>
            <div className="w-4/5 grid grid-cols-12 md:space-x-5 mx-auto">

                {/* SEARCH CATEGORY */}


                <div className='w-full col-span-12'> {
                    isLoading &&
                    <ShimmerCardGrid />
                }</div>

                {courseFetchError && <div className='col-span-12 px-4 w-full text-2xl font-bold text-center text-red-600 mt-4'>
                    <span className='px-10 py-4 bg-white shadow-xl inline-flex justify-center items-center'><BiError className="text-red-400 mr-4 text-3xl" /> Problem in fetching course list.</span>
                </div>}

                {!isLoading && !courseFetchError && <>
                    <div className="col-span-12 grid grid-cols-12 ">
                        <div className="col-span-12 md:col-span-3  px-4">
                            <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Search Courses</label>
                            <input onChange={(e) => searchCourse(e.target.value)} className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                placeholder="Search" type="text" /> </div>
                        <div className="col-span-10 md:col-span-2 px-4 mt-2 md:mt-0">
                            <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Categories</label>
                            <select onChange={(e) => filterCourse(e.target.value)} className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md cursor-pointer">
                                <option value="">Select</option>
                                <option value="">All</option>
                                {category?.map((data) => (
                                    <option value={data?.id}>{data?.CategoryName}</option>
                                ))}

                            </select>
                        </div>
                        {/* <div className="col-span-6 text-right hidden sm:block">
                        <ImList2 onClick={() => toggleLayoutView('list')} className='inline cursor-pointer hover:scale-110 mr-3 font-bold' /> <FiGrid onClick={() => toggleLayoutView('grid')} className='inline cursor-pointer hover:scale-110 font-bold' />
                    </div> */}
                    </div>
                    <div className="col-span-12 md:mb-2 md:mt-2 hidden sm:block">
                        <hr />
                    </div>

                    {/* GRID VIEW LAYOUT */}
                    {layoutViewType == 'grid' &&
                        filteredCourseList?.map((course, index) => (

                            (isSingleCardLoading && index == currentLoadingIndex) ? <ShimmerSingleCard /> : <div onClick={(e) => {
                                navigate(`/course-details/${removeSpaceAddDash(course?.title)}/${window.btoa(course?.id)}`)
                            }} className="col-span-12 md:col-span-4 mt-8 md:mt-0 px-4 md:px-2 sm:mb-4 cursor-pointer">
                                <div class="w-full rounded-md overflow-hidden shadow-lg pb-4 md:pb-4 relative bg-white">
                                    <div>
                                        {/* <img className="w-full h-40 rounded-b-lg" src={course?.fullPath || pbook} alt="Sunset in the mountains" /> */}
                                        <img className="w-full h-40 rounded-b-lg" src={unv1} alt="Sunset in the mountains" />
                                        {/* <img className="w-full h-40 rounded-b-lg" src={oxford} alt="Sunset in the mountains" /> */}
                                        <div class="px-8 md:px-1 md:pl-2 py-4  relative -top-10 ">
                                            <div className='bg-white rounded-t-lg pt-4 px-4'>
                                                <div className="font-bold text-md mb-2">{course?.title || "No Title Found"}</div>
                                                <p class="text-gray-700 text-xs font-custom-lora">
                                                    {course?.teacherName || "No Author Found"}
                                                </p>
                                                <div class="text-gray-700 text-xs flex items-center">
                                                    <span className='font-bold text-lg text-amber-600'>{course?.rating || 0}</span>
                                                    <IoMdStar className='text-amber-600 text-xl inline' />
                                                    <IoMdStarHalf className='text-amber-600 text-xl inline' />
                                                    <span>({course?.rating})</span>
                                                </div>
                                                <div className='font-bold flex'>
                                                    <div className='flex-1'><BiRupee className='inline' />{course?.price}</div>
                                                    <div className='flex-1 flex justify-end pr-2'>
                                                        {course?.isPurchased && <div className='flex justify-center items-center text-green-400'>Purchased</div>}

                                                        {/* {!course?.isPurchased && <>{
                                                            course?.isWishlist ?
                                                                <div className='w-12 h-12 rounded-full flex justify-center items-center bg-pink-500'>
                                                                    <BsCheckLg className="inline text-2xl font-semibold text-white" />
                                                                </div> :
                                                                (isWishlistLoading && index == currentLoadingIndex) ? <div className='w-12 h-12 rounded-full  border border-black cursor-pointer hover:bg-black hover:text-white flex justify-center items-center'><RotatingLines
                                                                    strokeColor="red"
                                                                    strokeWidth="5"
                                                                    animationDuration="0.75"
                                                                    width="25"
                                                                    visible={true}
                                                                /></div>
                                                                    : <div onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        setcurrentLoadingIndex(index)
                                                                        postWishlist(course?.id)
                                                                    }} className='w-12 h-12 rounded-full flex justify-center items-center border border-black cursor-pointer hover:bg-black hover:text-white'>
                                                                        <AiOutlineHeart className="inline text-2xl font-semibold " />
                                                                    </div>
                                                        }</>
                                                        } */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* ADD TO CART OR WATCH COURSE */}
                                    <div className='mx-2 -mt-10'>
                                        {course?.isPurchased && <button onClick={(e) => {
                                            e.stopPropagation()
                                            navigate('/cart')
                                        }} className='h-10 rounded-md border-2 border-indigo-600 py-1 text-center w-full text-sm text-indigo-600 font-semibold hover:bg-indigo-600 hover:text-white mb-2 mt-1 flex justify-center items-center'>
                                            <BsPlayCircle className="inline text-lg mr-2" /> Watch Course
                                        </button>}
                                        {!course?.isPurchased &&
                                            <div className='flex space-x-4 justify-center items-center'>
                                                {course?.isCart ?

                                                    <button onClick={(e) => {
                                                        e.stopPropagation()
                                                        navigate('/cart')
                                                    }} className='h-10 rounded-md border-2 border-pink-400 py-1 text-center w-full text-sm text-pink-600 font-semibold hover:bg-pink-400 hover:text-white'>
                                                        View Cart
                                                    </button> :

                                                    (isCartlistLoading && index == currentLoadingIndex) ? <div className='bg-indigo-500 text-white py-1 text-center w-full text-sm flex justify-center items-center'><RotatingLines
                                                        strokeColor="white"
                                                        strokeWidth="5"
                                                        animationDuration="0.75"
                                                        width="25"
                                                        visible={true}
                                                    /></div>
                                                        : <button onClick={(e) => {
                                                            e.stopPropagation();
                                                            setcurrentLoadingIndex(index)
                                                            postCart(course?.id)
                                                        }} className='flex justify-center items-center rounded-md h-10 bg-indigo-500 text-white py-1 text-center w-full text-sm'>
                                                            <BsCartPlusFill className="inline mr-2 text-white" /> Add to Cart
                                                        </button>}
                                                {!course?.isPurchased && <>{
                                                    course?.isWishlist ?
                                                        <div className='w-12 h-12 rounded-full flex justify-center items-center bg-pink-500'>
                                                            <BsCheckLg className="inline text-2xl font-semibold text-white" />
                                                        </div> :
                                                        (isWishlistLoading && index == currentLoadingIndex) ? <div className='w-12 h-12 rounded-full  border border-black cursor-pointer hover:bg-black hover:text-white flex justify-center items-center'><RotatingLines
                                                            strokeColor="red"
                                                            strokeWidth="5"
                                                            animationDuration="0.75"
                                                            width="25"
                                                            visible={true}
                                                        /></div>
                                                            : <div onClick={(e) => {
                                                                e.stopPropagation();
                                                                setcurrentLoadingIndex(index)
                                                                postWishlist(course?.id)
                                                            }} className='p-2 rounded-full flex justify-center items-center border border-black cursor-pointer hover:bg-black hover:text-white'>
                                                                <AiOutlineHeart className="inline text-xl font-semibold " />
                                                            </div>
                                                }</>
                                                }
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>

                        ))
                    }

                    <div className="col-span-10 mt-4 px-2 sm:px-0">

                        {/* IF WE ARE IN ALL COURSES PAGE THEN THIS CODE WILL VIEW MORE COURSES */}
                        {location.pathname == '/courses' &&
                            <span className="hover:bg-gray-200 cursor-pointer rounded-sm py-1 px-2">View More
                            </span>
                        }

                        {/* IF WE ARE IN MAIN LANDING PAGE THEN THIS CODE WILL NAVIGATE TO ALL COURSES */}
                        {location.pathname != '/courses' && <NavLink to="/courses">
                            <span className="hover:bg-gray-200 cursor-pointer rounded-sm py-1 px-2">View All <AiOutlineDoubleRight className='inline' />
                            </span>
                        </NavLink>}
                    </div>
                </>}


                {/* LIST VIEW LAYOUT */}
                {/* {!isLoading && layoutViewType == 'list' &&
                    courses?.map((course, index) => (

                        <div className="col-span-10 md:col-span-5 mt-8 md:mt-0 px-4 md:px-0">
                            <NavLink to={`/course-details/${course?.courseName}/${window.btoa(course?.id)}`}>
                                <div class="grid grid-cols-12 w-full rounded overflow-hidden pb-4 md:pb-2">
                                    <div className="col-span-4"><img class="w-full h-full" src={course?.imgUrl} alt="Sunset in the mountains" /></div>
                                    <div class="col-span-8 md:pl-4 py-4">
                                        <div class="font-bold text-md mb-2">{course?.courseName}</div>
                                        <p class="text-gray-700 text-xs font-custom-lora">
                                            {course?.authorName}
                                        </p>
                                        <div class="text-gray-700 text-xs flex items-center">
                                            <span className='font-bold text-lg text-amber-600'>4.3</span>
                                            <IoMdStar className='text-amber-600 text-xl inline' />
                                            <IoMdStarHalf className='text-amber-600 text-xl inline' />
                                            <span>({course?.ratings})</span>
                                        </div>
                                        <div className='font-bold'><span><BiRupee className='inline' />{course?.final_price}</span></div>
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                    ))
                } */}


            </div>


        </>
    )
}



export default Courses

/*
Exported to -
App.js
*/