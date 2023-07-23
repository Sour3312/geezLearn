import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { ThreeDots } from 'react-loader-spinner'
import { FaHashtag } from 'react-icons/fa';
import ApiList from '../../../Components/Api/ApiList';
import DataTable from '../../../Components/Common/DataTable/DataTable';
import { useNavigate } from 'react-router-dom';
import DeleteConfirmModal from './DeleteConfirmModal';
import ListTable from '../../../Components/Common/ListTableCustom/ListTable';
import ShimmerTable from '../../../Components/Animations/ShimmerTable';
import BottomErrorCard from '../../../Components/Common/BottomErrorCard';
import { AiOutlineArrowDown } from 'react-icons/ai'


function CourseList(props) {
    const { api_getAllCourse, bearerHeader, baseUrl } = ApiList();
    const [isLoading, setisLoading] = useState(false);
    const [erroState, seterroState] = useState(false);
    const [erroMessage, seterroMessage] = useState(null);
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
            Header: 'Course Name',
            accessor: 'title'
        },
        {
            Header: 'Price',
            accessor: 'price',
            Cell: ({ cell }) => (
                <div>
                    <div className=''>₹{cell.row.values.price}</div>
                </div>
            )
        },
        {
            Header: 'Teacher',
            accessor: 'teacherName',
            Cell: ({ cell }) => (
                <div>
                    <div className=''> {cell.row.values.teacherName} </div>
                </div>
            )
        },
        {
            Header: 'final_price',
            accessor: 'final_price',
            Cell: ({ cell }) => (
                <div>
                    <div className=''>₹{cell.row.values.price}</div>
                </div>
            )
        },
        {
            Header: 'Category',
            accessor: 'category_name',
            Cell: ({ cell }) => (
                <div>
                    <div className=''>{cell.row.original.categories?.map((category, index) => {
                        return `${category?.name} , `
                    })}</div>
                </div>
            )
        },
        {
            Header: 'Status',
            accessor: 'status',
            Cell: ({ cell }) => (
                <div>
                    <div> {cell.row.values.status == 1 && <div className=' text-green-400 rounded-full text-center py-0.5 font-semibold'>Active</div>} </div>
                    <div> {cell.row.values.status == 0 && <div className=' text-red-400 rounded-full text-center py-0.5 font-semibold'>Banned</div>} </div>
                    {/* <button onClick={() => props.fun(cell.row.values.status)} className='bg-sky-200 px-3 py-1 ml-1 rounded-sm shadow-md hover:shadow-xl hover:bg-sky-600 hover:text-white text-black'>View </button> */}
                </div>
            )
        },
        {
            Header: 'Created at',
            accessor: 'created_at',
            Cell: ({ value }) => { return format(new Date(value), 'dd/MM/yyyy') }

        },
        {
            Header: 'Action',
            accessor: 'id',
            Cell: ({ cell }) => (
                <div className='flex'>
                    <button onClick={() => {
                        navigate(`/add-course/basic-details/${cell.row.values.id}`)
                    }} className='bg-white border border-black px-3 py-1 mr-1 rounded-sm shadow-md hover:shadow-xl hover:bg-black hover:text-white text-black'>Edit </button>
                    <button onClick={() => handleDelete(cell.row.values.id)} className='border border-red-600 text-red-600 px-3 py-1 ml-1 rounded-sm shadow-md hover:shadow-xl hover:bg-red-600 hover:text-white'>Delete </button>
                    <button onClick={() => handleView(cell.row.values.id)} className='bg-sky-200 px-3 py-1 ml-1 rounded-sm shadow-md hover:shadow-xl hover:bg-sky-600 hover:text-white text-black'>View </button>
                </div>
            )
        }
    ]

    const fetchMasterList = () => {
        setisLoading(true)
        axios.post(api_getAllCourse, {}, bearerHeader)
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

    //2 delete FUNCTION TO DELETE ITEM FROM LIST
    const deleteItem = (deleteId) => {
        setisLoading(true)

        let requestBody = {
            id: deleteId
        }

        AxiosInterceptors.post('', requestBody, ApiHeader())
            .then(function (response) {
                console.log('delete response..', response?.data?.data)
                if (response?.data?.status) {
                    fetchMasterList()
                } else {
                    activateBottomErrorCard(true, 'Error occured in deletion.')
                }
            })
            .catch(function (error) {
                activateBottomErrorCard(true, 'Error occured in deletion.')
            }).finally(() => {
                setisLoading(false)
            })
    }

    useEffect(() => {
        fetchMasterList()
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
            <DeleteConfirmModal deleteBtnID={deleteBtnID} refetch={fetchMasterList} openDeleteModal={openDeleteModal} />
            <div>
                <div className=' flow-root bg-white border-b-2 rounded-t-md md:px-5 p-2'>
                    <div className='float-left text-lg font-semibold flex'> <FaHashtag className='mt-1.5 mr-2' /> List of Courses</div>
                    <button onClick={addBtn} className='group float-right border bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded-sm'>Add New <span><AiOutlineArrowDown className="group-hover:-rotate-90  duration-300 inline" /></span> </button>
                </div>
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

export default CourseList

/*
Exported
App.js
*/