import React, { useEffect, useState } from 'react'
import ApiList from '../../../Components/Api/ApiList'
import axios from 'axios'
// import python from '../../Assets/images/python.png'
// import js from '../../Assets/images/js.png'

import imageNotFound from '../../../Assets/images/imgNotFound.jpeg'
import ListTable from '../../../Components/Common/ListTableCustom/ListTable'
import AxiosInterceptors from '../../../Components/Api/AxiosInterceptors'
import ApiHeader from '../../../Components/Api/ApiHeader'
import BottomErrorCard from '../../../Components/Common/BottomErrorCard'
import ShimmerTable from '../../../Components/Animations/ShimmerTable'

function OrderHistory() {
    const [tranDetails, setTranDetails] = useState()
    const [isLoading, setisLoading] = useState(false);
    const [dataList, setdataList] = useState(null);
    const [erroState, seterroState] = useState(false);
    const [erroMessage, seterroMessage] = useState(null);

    const orderHIstory = [
        { id: 1, courseName: 'Python Course', duration: '02:50 M', author: 'Avinash, The Codex', orderId: 'C-10101', purchaseDate: '20-12-2022', price: 4355, padiStatus: true },
        { id: 2, courseName: 'Javascript ES6', duration: '04:50 M', author: 'Henry, The Codex', orderId: 'C-10101', purchaseDate: '20-12-2022', price: 4355, padiStatus: true },
        { id: 3, courseName: 'Java Course', duration: '05:00 M', author: 'David, The Codex', orderId: 'C-10101', purchaseDate: '20-12-2022', price: 4355, padiStatus: true },
        { id: 4, courseName: 'React Course', duration: '01:35 M', author: 'Hello, The Codex', orderId: 'C-10101', purchaseDate: '20-12-2022', price: 4355, padiStatus: false },
    ]

    const { api_getStudentTransactions } = ApiList()


    const COLUMNS = [
        {
            Header: "Sl No.",
            Cell: ({ cell }) => (<span>{cell.row.index + 1}</span>)
        },
        {
            Header: "Course Name",
            accessor: "courseName",
        },
        {
            Header: "Order-Id",
            accessor: "transaction_no",
        },
        {
            Header: "Purchase-Date",
            accessor: "updated_at",
        },
        {
            Header: "Price",
            accessor: "amount",
        },
        {
            Header: "Status",
            accessor: "payment_status",
            Cell: ({ cell }) => (
                <span className={`font-semibold ${cell.row.values?.payment_status === 'success' ? 'text-green-400' : 'text-red-400'}`}>{cell.row.values?.payment_status}</span>
            ),
        },
        {
            Header: "Action",
            Cell: ({ cell }) => (
                <div className="flex">
                    <button

                        className={`ml-4 px-3 py-1.5  font-medium text-xs leading-tight uppercase rounded shadow-xl border border-black hover:bg-black hover:text-white hover:shadow-lg  active:shadow-lg transition duration-150 ease-in-out cursor-pointer`}
                    >
                        View Invoice
                    </button>
                </div>
            ),
        },

    ];


    //3 Fetch list FUNCTION TO FETCH LIST DATA
    const fetchOrderHistory = () => {
        setisLoading(true)
        AxiosInterceptors.post(api_getStudentTransactions, {}, ApiHeader())
            .then(function (response) {
                console.log('student order history list...', response)
                if (response?.data?.status === true) {
                    setdataList(response?.data?.data)
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

    useEffect(() => {
        fetchOrderHistory()
    }, [])


    // FUNCTION FOR CUSTOM ERROR MESSAGE CARD
    const activateBottomErrorCard = (state, msg) => {
        seterroMessage(msg)
        seterroState(state)
    }

    return (
        <>
            {erroState && <BottomErrorCard activateBottomErrorCard={activateBottomErrorCard} errorTitle={erroMessage} />}
            {/* component */}
            <div className='bg-[#6980D3] px-2 md:px-20 h-44 relative flex items-center'>
                <div className='font-bold text-4xl font-serif text-white'>Courses Order History</div>
            </div>
            <div className="md:px-20 bg-white py-8 px-6 sm:p-8 rounded-md w-full">

                <div className=" flex flex-col sm:flex-row items-center justify-between pb-4">
                    <div >
                        <h2 className="text-gray-600 text-lg font-bold">Courses Order History</h2>
                        <span className="text-sm font-custom-lora">All purchased course.</span>
                    </div>
                    <div className="flex items-center justify-between mt-4 sm:mt-0">
                    </div>
                </div>
                <div>
                    <div className="-mx-4 sm:-mx-8 px-1 sm:px-8 py-4 overflow-x-auto">
                        {isLoading && <ShimmerTable />}
                        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                            {!isLoading && dataList !== null &&
                                <ListTable filter={false} exportStatus={false} assessmentType={false} columns={COLUMNS} dataList={dataList} />
                            }
                            {
                                !isLoading && dataList === null &&
                                <div className="text-xl font-semibold text-red-400 text-center">Data Not Found</div>
                            }
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default OrderHistory