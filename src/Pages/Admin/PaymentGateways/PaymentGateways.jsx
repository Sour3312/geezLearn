
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { ThreeDots } from 'react-loader-spinner'
import { FaHashtag } from 'react-icons/fa';
import ApiList from '../../../Components/Api/ApiList';
import DataTable from '../../../Components/Common/DataTable/DataTable';
import { useNavigate } from 'react-router-dom';
import ListTable from '../../../Components/Common/ListTableCustom/ListTable';
import ShimmerTable from '../../../Components/Animations/ShimmerTable';
import BottomErrorCard from '../../../Components/Common/BottomErrorCard';
import { AiOutlineArrowDown } from 'react-icons/ai'
import UpdateGatewayInfoModal from './UpdateGatewayInfoModal';
import toast, { Toaster } from 'react-hot-toast';
import AxiosInterceptors from '../../../Components/Api/AxiosInterceptors';
import ApiHeader from '../../../Components/Api/ApiHeader';



function PaymentGateways(props) {
    const { api_getAllPaymentGateways, api_udpatePaymentGateways } = ApiList();
    const [isLoading, setisLoading] = useState(false);
    const [isLoadingUpdate, setisLoadingUpdate] = useState(false);
    const [erroState, seterroState] = useState(false);
    const [erroMessage, seterroMessage] = useState(null);
    const [currentApikey, setcurrentApikey] = useState(null);
    const [currentSecretKey, setcurrentSecretKey] = useState(null);
    const [currentId, setcurrentId] = useState(null);
    const [openEditModal, setOpenEditModal] = useState(0)
    const [editBtnId, setEditBtnId] = useState()
    const [deleteBtnID, setDeleteBtnID] = useState()
    const [openDeleteModal, setOpenDeleteModal] = useState(0)
    const [courseListData, setcourseListData] = useState([])



    const navigate = useNavigate()

    const handleView = (btnId) => {
        console.log("Button Id", btnId)
        navigate(`/CourseList/view/${btnId}`)
    }



    const handleDelete = (id) => {
        console.log("Delete called", id)
        setDeleteBtnID(id)
        setOpenDeleteModal(prev => prev + 1)
    }

    const COLUMNS = [

        {
            Header: '#',
            Cell: ({ row }) => (
                <div className='pr-2'>{row.index + 1}</div>
            )
        },

        {
            Header: 'Gateway',
            accessor: 'gateway_full_name'
        },
        {
            Header: 'API Key',
            accessor: 'api_key',
            Cell: ({ cell }) => (
                <div>
                    <div className=''>{cell.row.values.api_key}</div>
                </div>
            )
        },
        {
            Header: 'Secret',
            accessor: 'api_secret',
            Cell: ({ cell }) => (
                <div>
                    <div className=''> {cell.row.values.api_secret} </div>
                </div>
            )
        },


        {
            Header: 'Status',
            accessor: 'is_enabled',
            Cell: ({ cell }) => (
                <div>
                    <div> {cell.row.values.is_enabled === 1 && <div className=' text-green-400 rounded-full text-center py-0.5 font-semibold'>Active</div>} </div>
                    <div> {cell.row.values.is_enabled === 0 && <div className=' text-red-400 rounded-full text-center py-0.5 font-semibold'>Banned</div>} </div>
                </div>
            )
        },
        {
            Header: 'Action',
            accessor: 'id',
            Cell: ({ cell }) => (
                <div className='flex'>
                    <button onClick={() => {
                        setcurrentApikey(cell.row.values?.api_key)
                        setcurrentSecretKey(cell.row.values?.api_secret)
                        setcurrentId(cell.row.values?.id)
                        paymentGatewayModal.showModal()
                    }} className='bg-white border border-black px-3 py-1 mr-1 rounded-sm shadow-md hover:shadow-xl hover:bg-black hover:text-white text-black'>Edit </button>
                </div>
            )
        }
    ]

    const fetchPgList = () => {
        setisLoading(true)
        AxiosInterceptors.post(api_getAllPaymentGateways, {}, ApiHeader())
            .then((res) => {
                console.log('coure  list....', res?.data)
                if (res.data.status) {
                    setcourseListData(res?.data?.data)
                    console.log("response of  list")
                    setisLoading(false)
                } else {
                    console.log("failed to fetch  list", res)
                    setisLoading(false)
                }
            })
            .catch((err) => {
                console.log("Exception while getting  data", err)
                setisLoading(false)
            })
    }

    /// FUNCTION TO POST OR EDIT DATA
    const updateGateway = (values) => {
        setisLoadingUpdate(true)
        let requestBody = {
            pgId: currentId,
            apiKey: values?.apiKey,
            secKey: values?.secKey,
            status: 1
        }


        AxiosInterceptors.post(api_udpatePaymentGateways, requestBody, ApiHeader())
            .then(function (response) {
                console.log('view fee master..', response?.data?.data)
                if (response?.data?.status) {
                    toast.success('Gateway info updated successfully !')
                    paymentGatewayModal.close()
                    fetchPgList()
                } else {
                    toast.error(response?.data?.message)
                }
            })
            .catch(function (error) {
                toast.error('Something went wrong.')
            }).finally(() => {
                setcurrentApikey(null)
                setcurrentSecretKey(null)
                setcurrentId(null)
                setisLoadingUpdate(false)
            })
    }



    useEffect(() => {
        fetchPgList()
    }, [])


    const addBtn = () => {
        navigate('/add-course/basic-details')
    }

    // FUNCTION FOR CUSTOM ERROR MESSAGE CARD
    const activateBottomErrorCard = (state, msg) => {
        seterroMessage(msg)
        seterroState(state)
    }

    return (
        <>
            {erroState && <BottomErrorCard activateBottomErrorCard={activateBottomErrorCard} errorTitle={erroMessage} />}
            <Toaster />

            <div>
                <div className=' flow-root bg-white border-b-2 rounded-t-md md:px-5 p-2'>
                    <div className='float-left text-lg font-semibold flex'> <FaHashtag className='mt-1.5 mr-2' /> Payment Gateways</div>
                </div>

                <dialog className='relative h-4/5 w-1/2 rounded-lg' id="paymentGatewayModal">
                    <div className='sticky top-0'>
                        <button onClick={() => paymentGatewayModal.close()} className='absolute top-2 right-3 text-xl p-2 w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 hover:text-red-500 font-semibold flex justify-center items-center'>x</button>
                        <div className='flex'>
                            <div className='font-serif font-lg font-semibold'>Payment Gateway Update</div>
                        </div>
                    </div>
                    <div className='mt-10'></div>
                    <div className='w-ful  mb-6'>
                        <UpdateGatewayInfoModal
                            currentApikey={currentApikey}
                            currentSecretKey={currentSecretKey}
                            isLoadingUpdate={isLoadingUpdate}
                            updateGateway={updateGateway}
                        />
                    </div>
                </dialog>

                <div className='w-full'> {
                    isLoading &&
                    <ShimmerTable />
                }</div>
                <div className='bg-white rounded-b-md py-2'>
                    {!isLoading && courseListData?.length != 0 &&
                        <ListTable filter={false} exportStatus={false} assessmentType={false} columns={COLUMNS} dataList={courseListData} />
                    }
                </div>
            </div>

        </>
    )
}

export default PaymentGateways

/*
Exported
App.js
*/