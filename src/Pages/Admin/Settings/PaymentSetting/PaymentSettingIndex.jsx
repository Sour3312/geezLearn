import React from 'react'
import { useState } from 'react'

const PaymentSettingIndex = () => {
    const [activeTab, setActiveTab] = useState(1)

    return (
        <>
            <div className='grid grid-cols-12'>
                <div className="my-8 col-span-2 border-r-2">
                    <ul
                        role="tablist"
                        className="hidden mx-auto border-l flex-col gap-y-3 overflow-x-auto text-sm sm:flex"
                    >
                        <li className={`border-l-2 ${activeTab == 1 ? 'border-indigo-500 text-indigo-500' : 'border-white'} `}>
                            <button
                                onClick={() => setActiveTab(1)}
                                role="tab"
                                className="py-2.5 px-4 rounded-lg duration-150 hover:text-indigo-500 hover:bg-gray-50 active:bg-gray-100 font-medium"
                            >
                                Razorpay
                            </button>
                        </li>
                        <li className={`border-l-2 ${activeTab == 2 ? 'border-indigo-500 text-indigo-500' : 'border-white'} `}>
                            <button
                                onClick={() => setActiveTab(2)}
                                role="tab"
                                className="py-2.5 px-4 rounded-lg duration-150 hover:text-indigo-500 hover:bg-gray-50 active:bg-gray-100 font-medium"
                            >
                                Stripe
                            </button>
                        </li>
                        <li className={`border-l-2 ${activeTab == 3 ? 'border-indigo-500 text-indigo-500' : 'border-white'} `}>
                            <button
                                onClick={() => setActiveTab(3)}
                                role="tab"
                                className="py-2.5 px-4 rounded-lg duration-150 hover:text-indigo-500 hover:bg-gray-50 active:bg-gray-100 font-medium"
                            >
                                Paypal
                            </button>
                        </li>

                    </ul>
                </div>
                <div className='col-span-10 mx-8 my-3'>
                    {activeTab == 1 && "Razorpay"}
                    {activeTab == 2 && "Stripe"}
                    {activeTab == 3 && "Paypal"}

                </div>
            </div>

        </>
    )
}

export default PaymentSettingIndex

/*
Exported to
SettingIndex.js
*/