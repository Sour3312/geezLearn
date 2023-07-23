import { useState, useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import BottomErrorCard from '../../Components/Common/BottomErrorCard';
import AxiosInterceptors from '../../Components/Api/AxiosInterceptors';
import ApiHeader from '../../Components/Api/ApiHeader';
import ApiList from '../../Components/Api/ApiList';
import { BsCheckCircle } from 'react-icons/bs'

const products = [
    {
        id: 1,
        name: 'Nike Air Force 1 07 LV8',
        imageSrc:
            'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/54a510de-a406-41b2-8d62-7f8c587c9a7e/air-force-1-07-lv8-shoes-9KwrSk.png',
        href: '#',
        price: '₹61,999',
        color: 'Orange',
        imageAlt: 'Nike Air Force 1 07 LV8',
        quantity: 1,
    },
    {
        id: 2,
        name: 'Nike Run Division, Airmax Pro Ultra Mens Runnig Shoes',
        imageSrc:
            'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e48d6035-bd8a-4747-9fa1-04ea596bb074/blazer-low-77-se-shoes-0w2HHV.png',
        href: '#',
        price: '₹22,500',
        color: 'White',
        imageAlt: 'APPLE Airpods Pro with MagSafe Charging Case Bluetooth Headset',
        quantity: 1,
    },
]

export const ConfirmOrderPage = () => {
    const [isLoading, setisLoading] = useState(false);
    const [erroState, seterroState] = useState(false);
    const [erroMessage, seterroMessage] = useState(null);
    const [viewData, setviewData] = useState(null);

    // const { orderId } = useParams()
    const { api_orderDetails, api_verifyPaypalPaymentAndFetchData } = ApiList()
    const navigate = useNavigate()


    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    // these parameters are used for paypal payment
    const paymentId = searchParams.get('paymentId');
    // const token = searchParams.get('token');
    const payerId = searchParams.get('PayerID');

    //Order Id used for chapa payment
    const orderId = searchParams.get('orderId');

    console.log("searchParams", paymentId, payerId, payerId)


    //4 by id FUNCTION TO FECTH DATA TO EDIT
    const fetchOrderData = (passedId) => {

        if (paymentId && payerId) {
            setisLoading(true)
            let requestBodyPaypal = {
                paymentId: paymentId,
                payerId: payerId
            }
            AxiosInterceptors.post(api_verifyPaypalPaymentAndFetchData, requestBodyPaypal, ApiHeader())
                .then(function (response) {
                    console.log('fetch Paypal payment details..', response?.data?.data)
                    if (response?.data?.status) {
                        setviewData(response?.data?.data)
                    } else {
                        activateBottomErrorCard(true, 'Unable to verify paypal paymet')
                    }
                })
                .catch(function (error) {
                    activateBottomErrorCard(true, 'Error occured in submitting deactivation application. Please try again later.')
                }).finally(() => {
                    setisLoading(false)
                })
        }

        //Run this code if orderId - this will verify payment of chapa
        if (orderId) {
            setisLoading(true)
            let requestBody = {
                id: orderId
            }
            AxiosInterceptors.post(api_orderDetails, requestBody, ApiHeader())
                .then(function (response) {
                    console.log('fetch chapa order response..', response?.data?.data)
                    if (response?.data?.status) {
                        setviewData(response?.data?.data)
                    } else {
                        activateBottomErrorCard(true, 'Error occured in submitting deactivation application. Please try again later.')
                    }
                })
                .catch(function (error) {
                    activateBottomErrorCard(true, 'Error occured in submitting deactivation application. Please try again later.')
                }).finally(() => {
                    setisLoading(false)
                })
        }
    }


    useEffect(() => {
        fetchOrderData()
    }, [paymentId, payerId, payerId])

    // FUNCTION FOR CUSTOM ERROR MESSAGE CARD
    const activateBottomErrorCard = (state, msg) => {
        seterroMessage(msg)
        seterroState(state)
    }

    return (

        <>
            {erroState && <BottomErrorCard activateBottomErrorCard={activateBottomErrorCard} errorTitle={erroMessage} />}
            <div className="mx-auto my-4 max-w-6xl px-2 md:my-6 md:px-0">
                <h2 className="text-3xl font-bold mt-10"><BsCheckCircle className=" text-green-500 inline-flex justify-center items-center" /> Purchase confirm, order Id  : {orderId}</h2>
                <div className="mt-3 text-sm">
                    Your purchase has been confrimed, Below is the order details
                </div>
                <div className="mt-8 flex flex-col overflow-hidden rounded-lg border border-gray-300 md:flex-row">
                    <div className="w-full border-r border-gray-300 bg-gray-100 md:max-w-xs">
                        <div className="p-8">
                            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-1">
                                {[
                                    ['Order ID', orderId],
                                    ['Date', viewData?.data?.created_at],
                                    ['Total Amount', `₹ ${viewData?.data?.amount}`],
                                    ['Order Status', viewData?.status],
                                    ['First Name', viewData?.data?.first_name],
                                    ['Last Name', viewData?.data?.last_name],
                                    ['Email', viewData?.data?.email],
                                ].map(([key, value]) => (
                                    <div key={key} className="mb-4">
                                        <div className="text-sm font-semibold">{key}</div>
                                        <div className="text-sm font-medium text-gray-700">{value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="p-8">
                            <ul className="-my-7 divide-y divide-gray-200">
                                {products.map((product) => (
                                    <li
                                        key={product.id}
                                        className="flex flex-col justify-between space-x-5 py-7 md:flex-row"
                                    >
                                        <div className="flex flex-1 items-stretch">
                                            <div className="flex-shrink-0">
                                                <img
                                                    className="h-20 w-20 rounded-lg border border-gray-200 object-contain"
                                                    src={product.imageSrc}
                                                    alt={product.imageSrc}
                                                />
                                            </div>

                                            <div className="ml-5 flex flex-col justify-between">
                                                <div className="flex-1">
                                                    <p className="text-sm font-bold text-gray-900">{product.name}</p>
                                                    <p className="mt-1.5 text-sm font-medium text-gray-500">{product.color}</p>
                                                </div>

                                                <p className="mt-4 text-sm font-medium text-gray-500">x {product.quantity}</p>
                                            </div>
                                        </div>

                                        <div className="ml-auto flex flex-col items-end justify-between">
                                            <p className="text-right text-sm font-bold text-gray-900">{product.price}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <hr className="my-8 border-t border-t-gray-200" />
                            <div className="space-x-4">
                                <button
                                    type="button"
                                    className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                >
                                    View Order
                                </button>
                                <button
                                    onClick={() => navigate('/receipt')}
                                    type="button"
                                    className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                >
                                    View Invoice
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
