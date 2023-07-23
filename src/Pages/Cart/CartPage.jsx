import { AiOutlineDelete } from 'react-icons/ai'
import { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BottomErrorCard from '../../Components/Common/BottomErrorCard';
import ApiHeader from '../../Components/Api/ApiHeader';
import AxiosInterceptors from '../../Components/Api/AxiosInterceptors';
import axios from 'axios';
import ApiList from '../../Components/Api/ApiList';
import ShimmerTable from '../../Components/Animations/ShimmerTable';
import { RotatingLines } from "react-loader-spinner";
import { CheckoutPage } from './CheckoutPage';
import cart from './cart.png'
import { setLocalStorageItemStrigified } from '../../Components/Common/localstorage';
import { globalContextData } from '../../Components/Common/Context/GlobalContextFile';

export function CartPage() {

    const [isLoading, setisLoading] = useState(false);
    const [isDeleteLoading, setisDeleteLoading] = useState(false);
    const [isLoadingChapa, setisLoadingChapa] = useState(false);
    const [cartSum, setcartSum] = useState(0);
    const [courseIdList, setcourseIdList] = useState([]);
    const [priceDiscount, setpriceDiscount] = useState(0);
    const [erroState, seterroState] = useState(false);
    const [dataList, setdataList] = useState(null);
    const [erroMessage, seterroMessage] = useState(null);
    const [currentLoadingIndex, setcurrentLoadingIndex] = useState(null);

    const navigate = useNavigate()
    const { api_cartList, api_cartDelete, api_chapaPay } = ApiList()
    const { setCartItemCount } = useContext(globalContextData)

    //2 DELETE FUNCTION TO DELETE ITEM FROM LIST
    const deleteCartItem = (passedCourseId) => {
        setisDeleteLoading(true)

        let requestBody = {
            courseId: passedCourseId
        }
        AxiosInterceptors.post(api_cartDelete, requestBody, ApiHeader())
            .then(function (response) {
                console.log('delete response..', response?.data?.data)
                if (response?.data?.status) {
                    fetchCartlist()
                }
            })
            .catch(function (error) {
                activateBottomErrorCard(true, 'Error occured in deletion.')
            }).finally(() => {
                setcurrentLoadingIndex(null)
                setisDeleteLoading(false)
            })
    }

    //3 FETCH CARTLIST  DATA
    const fetchCartlist = () => {
        setisLoading(true)
        AxiosInterceptors.post(api_cartList, {}, ApiHeader())
            .then(function (response) {
                console.log('cart list...', response)
                if (response?.data?.status === true) {
                    setdataList(response?.data?.data)
                    setLocalStorageItemStrigified('cartCount', response?.data?.data?.length)
                    setCartItemCount(response?.data?.data?.length)
                    getSumFromArray(response?.data?.data)
                } else {
                    setdataList(null)
                }
            })
            .catch(function (error) {
                console.log('==2 error list...', error)
                activateBottomErrorCard(true, 'Error occured while fetching data.')
            }).finally(() => {
                setisLoading(false)
            })
    }

    // FUNCTION TO HANDLE CHAPA PAYMENT
    const chapaPayment = async () => {
        setisLoadingChapa(true)
        let requestBody = {
            courseId: courseIdList
        }

        axios.post(api_chapaPay, requestBody, ApiHeader())
            .then((res) => {
                console.log("CHAPA Api respinse", res)
                if (res?.data?.data?.status == "success") {
                    console.log("success", res?.data?.data?.data?.checkout_url)
                    window.location.href = res?.data?.data?.data?.checkout_url
                }
            })
            .catch((err) => {
                console.log("Error while Chapa payment")
            }).finally(() => {
                setisLoadingChapa(false)
            })
    };

    useEffect(() => {
        fetchCartlist()
    }, [])

    // FUNCTION TO FIND SUM OF ITEMS PRICE
    const getSumFromArray = (data) => {
        const tempCourseId = data?.map((course, index) => {
            return course.id
        })
        setcourseIdList(tempCourseId)
        const sum = data.reduce((accumulator, currentValue) => {
            const price = currentValue.price;
            if (isNaN(price)) {
                return accumulator; // Skip NaN values
            }
            return accumulator + price;
        }, 0);

        setcartSum(sum)
    }

    // HANDLES CHECKOUT MODAL POPUP
    const checkoutPage = () => {
        checkoutDialog.showModal()
    }

    // FUNCTION FOR CUSTOM ERROR MESSAGE CARD
    const activateBottomErrorCard = (state, msg) => {
        seterroMessage(msg)
        seterroState(state)
    }




    return (

        <>
            <dialog id='checkoutDialog'>
                <div className='sticky top-0'>
                    <button onClick={() => checkoutDialog.close()} className='absolute top-2 right-3 text-xl p-2 w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 hover:text-red-500 font-semibold flex justify-center items-center'>x</button>
                    <div className='flex'>
                        <span className='text-lg font-bold text-black'>Checkout</span>
                    </div>
                </div>
                <CheckoutPage
                    courseIdList={courseIdList}
                    isLoadingChapa={isLoadingChapa}
                    chapaPayment={chapaPayment}
                    itemCount={dataList?.length}
                    cartSum={cartSum}
                    priceDiscount={priceDiscount} />

            </dialog>
            {erroState && <BottomErrorCard activateBottomErrorCard={activateBottomErrorCard} errorTitle={erroMessage} />}
            <div className="mx-auto max-w-7xl px-2 lg:px-0">
                <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Shopping Cart
                    </h1>
                    {isLoading && <div className='w-full'>
                        <ShimmerTable />
                    </div>
                    }
                    {!isLoading && !Array.isArray(dataList) &&
                        <div className='flex justify-center items-center flex-col bg-gray-100 p-10 mt-2'>
                            <div><img className='w-40' src={cart} alt="cart" /></div>
                            <h1 className='mt-4 font-semibold text-gray-700 text-lg'>Your cart is empty, Try adding courses.</h1>
                            <button
                                onClick={() => navigate('/courses')}
                                type="button"
                                className="mt-4 rounded-md bg-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Browse Courses
                            </button>
                        </div>
                    }
                    {!isLoading && <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                        <section aria-labelledby="cart-heading" className="rounded-lg bg-white lg:col-span-8">
                            <h2 id="cart-heading" className="sr-only">
                                Items in your shopping cart
                            </h2>
                            <ul role="list" className="divide-y divide-gray-200">
                                {dataList?.map((product, index) => (
                                    <div key={product.id} className="">
                                        <li className="flex py-6 sm:py-6 ">
                                            <div className="flex-shrink-0">
                                                <img
                                                    src={product.fullPath}
                                                    alt={product.name}
                                                    className="sm:h-38 sm:w-38 h-24 w-24 rounded-md object-contain object-center border px-2"
                                                />
                                            </div>

                                            <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                                                <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                                    <div>
                                                        <div className="flex justify-between">
                                                            <h3 className="text-sm">
                                                                <a href={product.href} className="font-semibold text-black">
                                                                    {product.title}
                                                                </a>
                                                            </h3>
                                                        </div>
                                                        <div className="mt-1 flex text-sm">
                                                            <p className="text-sm text-gray-500">{product.description}</p>
                                                            {product.size ? (
                                                                <p className="ml-4 border-l border-gray-200 pl-4 text-sm text-gray-500">
                                                                    {product.size}
                                                                </p>
                                                            ) : null}
                                                        </div>
                                                        <div className="mt-1 flex items-end">
                                                            <p className="text-lg font-medium text-gray-500">
                                                                Price :
                                                            </p>
                                                            <p className="text-lg font-semibold  text-gray-900">
                                                                &nbsp;&nbsp;{product.price}
                                                            </p>
                                                            &nbsp;&nbsp;
                                                            <p className="text-lg font-semibold text-green-500">{product.discount}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <div className="mb-2 flex">

                                            <div className="ml-6 flex text-sm">
                                                {(isDeleteLoading && index == currentLoadingIndex) ? <div className='flex items-center space-x-1 px-2 py-1 pl-0'><RotatingLines
                                                    strokeColor="red"
                                                    strokeWidth="5"
                                                    animationDuration="0.75"
                                                    width="25"
                                                    visible={true}
                                                /></div>
                                                    : <button onClick={() => {
                                                        setcurrentLoadingIndex(index)
                                                        deleteCartItem(product?.id)
                                                    }} type="button" className="flex items-center space-x-1 px-2 py-1 pl-0">
                                                        <AiOutlineDelete size={12} className="text-red-500" />
                                                        <span className="text-xs font-medium text-red-500">Remove</span>
                                                    </button>
                                                }

                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </ul>
                        </section>
                        {/* Order summary */}
                        {Array.isArray(dataList) && <section
                            aria-labelledby="summary-heading"
                            className="mt-16 rounded-md bg-white lg:col-span-4 lg:mt-0 lg:p-0"
                        >
                            <h2
                                id="summary-heading"
                                className=" border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-900 sm:p-4"
                            >
                                Price Details
                            </h2>
                            <div>
                                <dl className=" space-y-1 px-2 py-4">
                                    <div className="flex items-center justify-between">
                                        <dt className="text-sm text-gray-800">Price ({dataList?.length} item)</dt>
                                        <dd className="text-sm font-medium text-gray-900">₹ {cartSum}</dd>
                                    </div>
                                    <div className="flex items-center justify-between pt-4">
                                        <dt className="flex items-center text-sm text-gray-800">
                                            <span>Discount</span>
                                        </dt>
                                        <dd className="text-sm font-medium text-green-700">- ₹ {priceDiscount || 0}</dd>
                                    </div>

                                    <div className="flex items-center justify-between border-y border-dashed py-4 ">
                                        <dt className="text-base font-medium text-gray-900">Total Amount</dt>
                                        <dd className="text-lg font-bold text-gray-900">₹ {cartSum - priceDiscount}</dd>
                                    </div>
                                </dl>
                                {/* <div className="px-2 pb-4 font-medium text-green-700">
                                    <button
                                        onClick={() => navigate('/checkout')}
                                        type="button"
                                        className="w-full bg-indigo-500 px-3 py-2 text-md font-semibold text-white shadow-lg hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >Checkout</button>
                                </div> */}
                                <div className="px-2 pb-4 font-medium text-green-700">
                                    <button
                                        onClick={checkoutPage}
                                        type="button"
                                        className="w-full bg-indigo-500 px-3 py-2 text-md font-semibold text-white shadow-lg hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >Checkout</button>
                                </div>
                            </div>
                        </section>}
                    </form>
                    }
                </div>
            </div>
        </>
    )
}
