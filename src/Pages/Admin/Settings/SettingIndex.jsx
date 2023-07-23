import React from 'react'
import { FcMoneyTransfer } from 'react-icons/fc';
import { RiGlobalLine } from 'react-icons/ri';
import { MdPassword } from 'react-icons/md';
import { useState } from 'react';
import ApplicatinSetting from './ApplicatinSetting';
import PasswordSetting from './PasswordSetting';
import PaymentSettingIndex from './PaymentSetting/PaymentSettingIndex';
import { FcComboChart } from 'react-icons/fc';

const SettingIndex = () => {
    const [activeTab, setActiveTab] = useState(1)

    const handlePaymentTab = () => {
        setActiveTab(1)
        console.log("handlePaymentTab")
    }
    const handleApplicationTab = () => {
        console.log("handleApplicationTab")
        setActiveTab(2)
    }
    const handlePasswordTab = () => {
        console.log("handlePasswordTab")
        setActiveTab(3)
    }

    return (
        <>
            <div className='flow-root bg-white border-b-2 rounded-t-md md:px-5 p-2'>
                <div className='float-left text-lg font-semibold flex'> <FcComboChart className='mt-1.5 mr-2' /> Reports</div>
                {/* <button onClick={() => goBack()} className='float-right border bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded-sm'>Back </button> */}
            </div>
            <div className="block mt-3 p-4 md:py-6 shadow-lg bg-white border border-gray-200 rounded-md mx-auto">
                <div className="">
                    <ul role="tablist" className="mx-auto border-b flex items-center gap-x-6 overflow-x-auto text-sm" >
                        <li className={`py-2 border-b-2 ${activeTab == 1 ? 'border-indigo-500 text-indigo-500' : 'border-white text-gray-500'} `}>
                            <button
                                onClick={handlePaymentTab}
                                role="tab"
                                className="flex items-center gap-x-2 py-2 px-2 rounded-lg duration-150 hover:text-indigo-500 hover:bg-gray-50 active:bg-gray-100 font-medium"
                            >
                                <FcMoneyTransfer />
                                Payment
                            </button>
                        </li>
                        <li className={`py-2 border-b-2 ${activeTab == 2 ? 'border-indigo-500 text-indigo-500' : 'border-white text-gray-500'} `}>
                            <button
                                onClick={handleApplicationTab}
                                role="tab"
                                className="flex items-center gap-x-2 py-2 px-2 rounded-lg duration-150 hover:text-indigo-500 hover:bg-gray-50 active:bg-gray-100 font-medium "
                            >

                                <RiGlobalLine />
                                Application
                            </button>
                        </li>
                        <li className={`py-2 border-b-2 ${activeTab == 3 ? 'border-indigo-500 text-indigo-500' : 'border-white text-gray-500'} `}>
                            <button
                                onClick={handlePasswordTab}
                                role="tab"
                                className="flex items-center gap-x-2 py-2 px-2 rounded-lg duration-150 hover:text-indigo-500 hover:bg-gray-50 active:bg-gray-100 font-medium "
                            >
                                <MdPassword />
                                Password
                            </button>
                        </li>

                    </ul>

                    {/* Main Content */}

                    <div>
                        {activeTab == 1 && <PaymentSettingIndex />}
                        {activeTab == 2 && <ApplicatinSetting />}
                        {activeTab == 3 && <PasswordSetting />}
                    </div>
                </div>
            </div>
        </>
    )
}

export default SettingIndex