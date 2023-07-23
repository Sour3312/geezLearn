import { useState, useContext, useEffect } from 'react'
import { BiRupee } from 'react-icons/bi'
import { IoMdStar, IoMdStarHalf } from 'react-icons/io'
import { NavLink, useNavigate } from 'react-router-dom'
import { globalContextData } from '../../Components/Common/Context/GlobalContextFile'
import { RotatingLines } from "react-loader-spinner";
import BottomErrorCard from '../../Components/Common/BottomErrorCard'
import ApiList from '../../Components/Api/ApiList'
import AxiosInterceptors from '../../Components/Api/AxiosInterceptors'
import ApiHeader from '../../Components/Api/ApiHeader'
import { setLocalStorageItemStrigified } from '../../Components/Common/localstorage'
import AuthIndex from '../../Components/Auth/AuthIndex'
import pbook from './pbook.png'



function StickyPriceTag(props) {
    const [cart, setCart] = useState([]);
    const [isLoadingCartSave, setisLoadingCartSave] = useState(false);
    const [erroState, seterroState] = useState(false);
    const [erroMessage, seterroMessage] = useState(null);
    const { updateCartCount, notify, cartCount, currency, setCartItemCount } = useContext(globalContextData)
    const { isLogedIn } = AuthIndex()

    const navigate = useNavigate()


    const { api_addToCart } = ApiList()
    //5 post form
    const postCart = (data) => {
        console.log('posting cart...')
        // IF USER IS NOT LOGGED IN THE TELL TO LOGIN
        if (!isLogedIn) {
            setLocalStorageItemStrigified('courseDetails', { courseId: props?.courseId, type: 'postCart' })
            props?.setOpenLoginModal(prev => prev + 1)
            return
        }

        setisLoadingCartSave(true)

        let requestBody = {
            courseId: props?.courseId,
        }

        console.log('before saving cart id...', requestBody)
        AxiosInterceptors.post(api_addToCart, requestBody, ApiHeader())
            .then((response) => {
                console.log("--2-- After Login data", response)
                if (response?.data?.status) {
                    console.log('success')
                    setLocalStorageItemStrigified('cartCount', response?.data?.data?.length)
                    setCartItemCount(response?.data?.data?.length)
                    navigate(`/cart`)
                } else {
                    // IN CASE OF ALREADY ADDED TO CART NAVIGATE TO CART PAGE
                    if (response?.data?.message == 'This course already added to your Cart') {
                        navigate(`/cart`)
                    }
                    activateBottomErrorCard(true, 'Error occured in submitting deactivation application. Please try again later.')
                }
            })
            .catch((err) => {
                activateBottomErrorCard(true, 'Error occured in submitting deactivation application. Please try again later.')
            }).finally(() => {
                console.log('after hit at finally')
                setisLoadingCartSave(false)
            })
    }

    // FUNCTION FOR CUSTOM ERROR MESSAGE CARD
    const activateBottomErrorCard = (state, msg) => {
        seterroMessage(msg)
        seterroState(state)
    }


    // Get Item from localhost and set data to setCart if cart has already value otherwise old data will be removed
    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart'));
        if (savedCart) {
            setCart(savedCart);
        }
    }, []);


    const handleAddToCart = () => {
        console.log("Add to cart button clicked in single course", props?.priceCard)
    }

    return (
        <>
            {erroState && <BottomErrorCard activateBottomErrorCard={activateBottomErrorCard} errorTitle={erroMessage} />}

            {props?.stickyShow == false && <div className='h-auto w-full bg-white shadow-xl border mt-14 hidden sm:block pb-6' style={{ 'zIndex': 500 }}>
                <div className=' flex justify-center items-center'><img className='h-48' src={props?.courseData?.fullPath || pbook} alt="" /></div>
                <div className='font-bold text-3xl mt-3 px-4'><span><span className='inline text-xl' >{currency?.symbol} </span>{props?.price}</span></div>


                <p className='text-xs text-gray-700 mt-2 px-8'> 30-Day Money-Back Guarantee</p>
                <div className='font-bold text-lg mt-3 px-8 font-custom-montserrat'>This course includes:</div>
                <div className='flex items-center px-8 text-sm'><IoMdStar className='inline' /><span className='ml-3'>{props?.priceCard?.vidRating}</span></div>
                <div className='flex items-center px-8 text-sm'><IoMdStar className='inline' /><span className='ml-3'>{props?.priceCard?.vidArticle}</span></div>
                <div className='flex items-center px-8 text-sm'><IoMdStar className='inline' /><span className='ml-3'>{props?.priceCard?.vidDownloads}</span></div>
                <div className='flex items-center px-8 text-sm'><IoMdStar className='inline' /><span className='ml-3'>{props?.priceCard?.vidLimit}</span></div>
                <div className='flex items-center px-8 text-sm'><IoMdStar className='inline' /><span className='ml-3'>{props?.priceCard?.vidAccess}</span></div>
                <div className='flex items-center px-8 text-sm'><IoMdStar className='inline' /><span className='ml-3'>{props?.priceCard?.vidCertificate}</span></div>

                <div className='w-full px-8 mt-10'>
                    <hr className='h-1' />
                </div>

                <div className="w-full grid grid-cols-12 mt-4 px-8">
                    <div className='col-span-12 w-full'>
                        {isLoadingCartSave ? <button
                            className="flex border border-indigo-500 text-indigo-500 py-3 px-6 focus:outline-none hover:bg-indigo-600 hover:text-white rounded font-semibold shadow-lg w-full justify-center items-center"
                        >
                            <RotatingLines
                                strokeColor="black"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="25"
                                visible={true}
                            /></button> :
                            <>
                                {props?.courseData?.isCart &&
                                    <button onClick={(e) => { navigate('/cart') }} className='border-2 border-pink-400 py-2 text-center w-full text-sm text-pink-600 font-semibold hover:bg-pink-400 hover:text-white'>View Cart</button>}
                                {!props?.courseData?.isCart &&
                                    <button type='button' onClick={postCart} className="flex border border-indigo-500 text-indigo-500 py-3 px-6 focus:outline-none hover:bg-indigo-600 hover:text-white rounded font-semibold shadow-lg w-full justify-center items-center">Buy Now</button>}
                            </>
                        }
                    </div>
                </div>
            </div>}

            {/* STICKY CARD */}
            {props?.stickyShow == true && <div className='h-auto w-[344px] bg-white shadow-xl border mt-14 hidden sm:block fixed top-5 pb-6'>
                <div className=' flex justify-center items-center'><img className='h-48' src={props?.courseData?.fullPath || pbook} alt="" /></div>
                <div className='font-bold text-3xl mt-3 px-4'><span><BiRupee className='inline' />{props?.price}</span></div>

                {/* BUTTONS */}

                <p className='text-xs text-gray-700 mt-2 px-8 font-custom-lora'> 30-Day Money-Back Guarantee</p>
                <div className='font-bold text-lg mt-3 px-8 font-custom-montserrat'>This course includes:</div>
                <div className='flex items-center px-8 text-sm'><IoMdStar className='inline' /><span className='ml-3'>{props?.priceCard?.vidRating}</span></div>
                <div className='flex items-center px-8 text-sm'><IoMdStar className='inline' /><span className='ml-3'>{props?.priceCard?.vidArticle}</span></div>
                <div className='flex items-center px-8 text-sm'><IoMdStar className='inline' /><span className='ml-3'>{props?.priceCard?.vidDownloads}</span></div>
                <div className='flex items-center px-8 text-sm'><IoMdStar className='inline' /><span className='ml-3'>{props?.priceCard?.vidLimit}</span></div>
                <div className='flex items-center px-8 text-sm'><IoMdStar className='inline' /><span className='ml-3'>{props?.priceCard?.vidAccess}</span></div>
                <div className='flex items-center px-8 text-sm'><IoMdStar className='inline' /><span className='ml-3'>{props?.priceCard?.vidCertificate}</span></div>

                <div className='w-full px-8 mt-10'>
                    <hr className='h-1' />
                </div>

                <div className="w-full grid grid-cols-12 mt-4 px-8">
                    <div className='col-span-12 w-full'>
                        {isLoadingCartSave ? <button
                            className="flex border border-indigo-500 text-indigo-500 py-3 px-6 focus:outline-none hover:bg-indigo-600 hover:text-white rounded font-semibold shadow-lg w-full justify-center items-center"
                        >
                            <RotatingLines
                                strokeColor="black"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="25"
                                visible={true}
                            /></button> :
                            <>
                                {props?.courseData?.isCart &&
                                    <button onClick={(e) => { navigate('/cart') }} className='border-2 border-pink-400 py-2 text-center w-full text-sm text-pink-600 font-semibold hover:bg-pink-400 hover:text-white'>View Cart</button>}
                                {!props?.courseData?.isCart &&
                                    <button type='button' onClick={postCart} className="flex border border-indigo-500 text-indigo-500 py-3 px-6 focus:outline-none hover:bg-indigo-600 hover:text-white rounded font-semibold shadow-lg w-full justify-center items-center">Buy Now</button>}
                            </>
                        }
                    </div>
                </div>
            </div>}
        </>
    )
}

export default StickyPriceTag

/*
Exported to -
CouresHeader.js
*/