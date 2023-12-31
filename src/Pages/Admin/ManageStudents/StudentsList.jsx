import axios from 'axios';
import React, { useState } from 'react'
import { useQuery } from 'react-query';
import { format } from 'date-fns'
import { ThreeDots } from 'react-loader-spinner'
import { FcComboChart } from 'react-icons/fc';
import ApiList from '../../../Components/Api/ApiList';
import DataTable from '../../../Components/Common/DataTable/DataTable';
import ViewStudent from './ViewStudent';


function StudentsList(props) {

    const { api_getAllStudents, bearerHeader, baseUrl } = ApiList();

    const [showAddCenterPopup, setShowAddCenterPopup] = useState(false)
    const [openViewModal, setOpenViewModal] = useState(0)
    const [viewBtnId, setViewBtnId] = useState()
    const [openEditModal, setOpenEditModal] = useState(0)
    const [editBtnId, setEditBtnId] = useState()

    const addBtn = () => {
        console.log("Add button clicked")
        setShowAddCenterPopup(prev => prev + 1)
    }

    const handleView = (btnId) => {
        console.log("Button Id", btnId)
        setOpenViewModal(pre => pre + 1)
        setViewBtnId(btnId)
    }

    const handleEdit = (btnId) => {
        console.log("Button Id", btnId)
        setOpenEditModal(pre => pre + 1)
        setEditBtnId(btnId)
    }

    const COLUMNS = [

        {
            Header: '#',
            Cell: ({ row }) => (
                <div className='pr-2'>{row.index + 1}</div>
            )
        },
        {
            Header: 'Name',
            accessor: 'name',
        },
        {
            Header: 'Email',
            accessor: 'email'
        },
        {
            Header: 'Mobile',
            accessor: 'mobile',
        },
        {
            Header: 'Course Enrolled',
            accessor: 'final_price',
        },
        {
            Header: 'Status',
            accessor: 'is_suspended',
            Cell: ({ cell }) => (
                <div>
                    <div> {cell.row.values.is_suspended == 0 && <div className='bg-green-300 text-gray-500 rounded-full text-center py-0.5'>Active</div>} </div>
                    <div> {cell.row.values.is_suspended == 1 && <div className='bg-red-300 text-gray-500 rounded-full text-center py-0.5'>Banned</div>} </div>
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
                    <button onClick={() => handleEdit(cell.row.values.id)} className='bg-sky-200 px-3 py-1 mr-1 rounded-sm shadow-md hover:shadow-xl hover:bg-sky-600 hover:text-white text-black'>Edit </button>
                    <button onClick={() => handleView(cell.row.values.id)} className='bg-sky-200 px-3 py-1 ml-1 rounded-sm shadow-md hover:shadow-xl hover:bg-sky-600 hover:text-white text-black'>View </button>
                </div>
            )
        }
    ]

    const { isLoading, data, isError, error, refetch } = useQuery("api_getAllStudents", () => {
        return axios.post(api_getAllStudents, {}, bearerHeader);
    });


    console.log("List of Students", data)

    return (
        <>

            {viewBtnId ?
                <ViewStudent id={viewBtnId} goBack={()=>setViewBtnId()}/>
                :
                <div>
                    <div className='flow-root bg-white border-b-2 rounded-t-md md:px-5 p-2'>
                        <div className='float-left text-lg font-semibold flex'> <FcComboChart className='mt-1.5 mr-2' /> List of Students</div>
                        <button onClick={addBtn} className='float-right border bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded-sm'>Add New </button>
                    </div>
                    <div className='bg-white rounded-b-md py-2'>
                        {isLoading ? <div className='flex justify-center'>
                            <ThreeDots
                                height="80"
                                width="80"
                                radius="9"
                                color="#4fa94d"
                                ariaLabel="three-dots-loading"
                                wrapperStyle={{}}
                                wrapperClassName=""
                                visible={true}
                            />
                        </div> :
                            data?.data ?
                                data?.data?.data?.length ? <DataTable columns={COLUMNS} data={data?.data?.data} addBtn={addBtn} /> : <p className='text-center font-medium'>No Date Found</p>
                                : <p className='text-center text-red-500 font-medium'>Error : Something Went Wrong</p>
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default StudentsList

/*
Exported
App.js
*/