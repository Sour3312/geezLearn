import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { VscClose } from 'react-icons/vsc'
import { useNavigate } from 'react-router-dom'
import ApiList from '../../Components/Api/ApiList'
import { globalContextData } from '../../Components/Common/Context/GlobalContextFile'
// import StripeIndex from '../Payment/Stripe/StripeIndex'
// import { FaBVscCloseeer } from 'react-icons/fa';

function CartIndex() {
    const { api_stripePayment, api_RazorpayOrderIdGenerate, bearerHeader } = ApiList()
    const [localCart, setLocalCart] = useState()
    const [afterPaymentData, setAfterPaymentData] = useState()
    const [finalSum, setFinalSum] = useState(0)


    const navigate = useNavigate()

    // useContext Global data 
    const { updateCartCount, notify, cartCount, currency } = useContext(globalContextData)


    useEffect(() => {
        someOfCart()
        updateCartCount(localCart?.length)
        console.log("localCart.length", localCart?.length)
    }, [localCart])


    //this function used for get item from loacstorage and calculate it's price
    const someOfCart = () => {
        let value = localCart?.map(item => Number(item.price))
        console.log("===---", value)
        let sum = value?.reduce((sum, current) => sum + current, 0)
        setFinalSum(sum)
    }


    // This function used for generate razorpay orderid
    const generateOrderId = () => {
        const cart = JSON.parse(window.localStorage.getItem('cart'))
        const cartArr = cart?.map((item) => item.id)
        console.log("Clicke pay button", cartArr)

        // return

        axios.post(api_RazorpayOrderIdGenerate, { "courseId": cartArr }, bearerHeader)
            .then((res) => {
                console.log("Order Id generated", res)
                RazorpayPaymentScreen(res.data.data)
            })
            .catch((err) => {
                console.log("Exception while generating order id", err)
            })
    }

    async function RazorpayPaymentScreen(generatedData) {
        var options = {
            key: "rzp_test_3MPOKRI8WOd54p",
            amount: generatedData.amount,
            currency: "INR",
            // image: Logo || 0,
            name: "UD&HD",
            description: "This is used for Testing Purpose",
            order_id: generatedData.order_id,
            handler: async function (response) {
                // callApiLog(response)  // This function send the data to direct database => backend will verify the data
                console.log("All response", response)
                console.log("Payment ID", response.razorpay_payment_id);
                setAfterPaymentData({ status: true, message: 'Payment Success', data: response })
            },

            prefill: {
                name: "Dipu test",
                email: generatedData.email,
                contact: generatedData.mobile
            },
            "modal": {
                "ondismiss": function (response) {
                    console.log("Payment Cancel BY user", response);
                },
                "onfailed": function (response) {
                    console.log("Payment Failed Response modal", response);
                }
            },
            notes: {
                course: "test course",
                name: generatedData.name || 0,
                email: generatedData.email || 0,
                contact: generatedData.mobile || 0,
            },
            theme: {
                color: "#3399cc"
            }
        };
        var pay = new window.Razorpay(options);

        pay.on('payment.failed', function (response) {
            console.log("Failed Response", response)
            // callApiLogFailed(response)  // This functin called when payment got failed. and data log will saved in bacend => using api 2
            setAfterPaymentData({ status: false, message: 'Payment Failed', data: response })
        });

        pay.open();

    }

    console.log("afterPaymentData", afterPaymentData)



    //Cart
    useEffect(() => {
        setLocalCart(JSON.parse(localStorage.getItem('cart')));

    }, [])


    //This function called when remove button clicked and remove that item from localstorage
    const removeFromCart = (productId) => {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        const updatedCart = cartItems.filter((item) => item.id !== productId); // Remove item with ID of 1
        notify("Course removed from cart", "info") // Show toast when item removed
        localStorage.setItem('cart', JSON.stringify(updatedCart));

        setLocalCart(JSON.parse(localStorage.getItem('cart'))); //refetch item to cart

    }

    //Remove Space and add - this will use in URL
    const removeSpaceAddDash = (str) => {
        return str.replace(/\s+/g, '-').toLowerCase()
    }

    const handleOpenSingleCourse = (name, id) => {
        navigate(`/course-details/${removeSpaceAddDash(name)}/${window.btoa(id)}`)
    }

    return (
        <>


            <div className='bg-gray-100'>
                <div className='grid grid-cols-12 md:p-10 p-3 mt-10 md:space-x-4 md:mx-10'>
                    <div className='md:col-span-8 col-span-12'>
                        <div className='flex flex-col border border-gray-50 rounded-md shadow-lg md:p-5 md:mt-0 mt-5 bg-white'>
                            <p className='text-center text-xl font-semibold mb-5'>Course Cart Page</p>
                            {localCart?.length > 0 ?
                                <table className=''>
                                    <thead className="text-xs font-semibold uppercase text-gray-900 border-b">
                                        <tr>
                                            <th></th>
                                            <th className="p-2">
                                                <div className="font-semibold text-left">Product Name</div>
                                            </th>
                                            <th className="p-2">
                                                <div className="font-semibold text-center">Quantity</div>
                                            </th>
                                            <th className="p-2">
                                                <div className="font-semibold text-center">Total Fee</div>
                                            </th>
                                            <th className="p-2">
                                                <div className="font-semibold text-center">Action</div>
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="text-sm divide-y divide-gray-100">

                                        {localCart?.length > 0 &&
                                            localCart?.map((item) => (

                                                <tr>
                                                    <td>
                                                    </td>
                                                    <td className="p-2">
                                                        <div className="text-gray-800 flex">
                                                            <p><img onClick={() => handleOpenSingleCourse(item?.name, item?.id)} src={item?.img} alt="Course Image" className='md:w-10 w-20 h-10 cursor-pointer hover:shadow-blue-400 rounded-md shadow-md' /></p>
                                                            <p className='mx-3'>
                                                                <p onClick={() => handleOpenSingleCourse(item?.name, item?.id)} className='font-semibold cursor-pointer hover:text-blue-600'> {item?.name}</p>
                                                                <p className='text-xs text-gray-500'> Type : New</p>
                                                            </p>
                                                        </div>
                                                    </td>
                                                    <td className="p-2">
                                                        <div className="text-center">1</div>
                                                    </td>
                                                    <td className="p-2">
                                                        <div className="text-center font-medium text-gray-800">
                                                            ${item.price}
                                                        </div>
                                                    </td>
                                                    <td className="p-2">
                                                        <div onClick={() => removeFromCart(item?.id)} className="flex justify-center cursor-pointer">
                                                            < VscClose className='hover:bg-gray-300 hover:text-white rounded-sm' />
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                                :
                                <div className=''>

                                    <p className='my-5 border border-indigo-200 w-full text-center text-lg font-semibold'>Your Cart is Empty</p>

                                    <div className='flex justify-center'>
                                        <button onClick={() => navigate('/')} className='bg-indigo-700 hover:bg-indigo-600 text-white rounded shadow-md px-5 py-1'>Home</button>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>

                    {localCart?.length > 0 &&
                        <div className='md:col-span-4 col-span-12 my-3 md:my-0 rounded-lg'>
                            <div className='border border-gray-50 py-2 shadow-lg px-2 pl-8 bg-white'>
                                <div className='grid grid-cols-2'>
                                    <div className='col-span-1 space-y-1'>
                                        <p className='text-sm'>Subtotal</p>
                                        <p className='text-sm'>Discount</p>
                                        <p className=' text-base font-semibold'>Total Payable</p>
                                    </div>
                                    <div className='col-span-1 space-y-1'>
                                        <p className='text-sm'>{currency?.symbol} {finalSum}</p>
                                        <p className='text-sm'>{currency?.symbol} 0</p>
                                        <p className='text-base font-semibold w-fit'>{currency?.symbol} {finalSum}</p>
                                    </div>
                                </div>
                                <p className='border-b my-3'></p>

                                <div className=''>
                                    <div>
                                        {/* <p className='font-semibold text-gray-600'>Coupon Code</p> */}
                                        {/* <p className='text-xs text-gray-500'>Enter Code to get discount instantly</p> */}
                                        <p className='border-gray-300 my-2 mr-20'></p>
                                    </div>

                                    <div className='rounded-sm '>
                                        <input type="text" className='px-2 border-none outline-none placeholder:text-sm' placeholder='Coupon Code' />
                                        <button className='bg-gray-700 text-white px-3 py-1 m-1 rounded-sm text-sm'> Apply</button>
                                    </div>
                                </div>
                                <p className='border-b my-3'></p>
                                <div>
                                    <p className='pb-2 font-semibold text-base text-gray-600'>Payment Method</p>
                                    <div className='font-semibold px-5'>
                                        <p><input type="radio" checked name="paymentOption" id="" /> Razorpay</p>
                                        <p><input type="radio" disabled name="paymentOption" id="" /> Paypal</p>
                                        <p><input type="radio" disabled name="paymentOption" id="" /> Stripe</p>
                                    </div>
                                </div>
                                <p className='border-b my-4'></p>
                                <div>
                                    <button onClick={generateOrderId} className='bg-indigo-600 w-full rounded-sm text-white py-1'>Place Order</button>
                                </div>

                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default CartIndex