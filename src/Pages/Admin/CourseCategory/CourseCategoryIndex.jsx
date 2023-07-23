import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ThreeDots } from 'react-loader-spinner'
import { FaHashtag } from 'react-icons/fa';
import ApiList from '../../../Components/Api/ApiList';
import DataTable from '../../../Components/Common/DataTable/DataTable';
import { useNavigate } from 'react-router-dom';
import AddCategoryModal from './AddCategoryModal';
import EditCategoryModal from './EditCategoryModal';
import ListTable from '../../../Components/Common/ListTableCustom/ListTable';
import ShimmerTable from '../../../Components/Animations/ShimmerTable';
import BottomErrorCard from '../../../Components/Common/BottomErrorCard';
import ApiHeader from '../../../Components/Api/ApiHeader';
import AxiosInterceptors from '../../../Components/Api/AxiosInterceptors';


function CourseCategoryIndex(props) {
    const [courseCategoryList, setcourseCategoryList] = useState([])
    const [isLoading, setisLoading] = useState(false);
    const [isLoadingAddUpdateCategory, setisLoadingAddUpdateCategory] = useState(false);
    const [erroState, seterroState] = useState(false);
    const [erroMessage, seterroMessage] = useState(null);
    const { api_getAllCourseCategory, bearerHeader, api_getCategoryById, api_addCategory, api_updateCategory, api_deleteCategory } = ApiList();
    const [openAddModal, setOpenAddModal] = useState(0)
    const [currentEditId, setcurrentEditId] = useState(null)
    const [openEditModal, setOpenEditModal] = useState(0)
    const [editBtnId, setEditBtnId] = useState()
    const [categoryNameInput, setCategoryNameInput] = useState()


    const navigate = useNavigate()



    const COLUMNS = [

        {
            Header: '#',
            Cell: ({ row }) => (
                <div className='pr-2'>{row.index + 1}</div>
            )
        },

        {
            Header: 'Category Name',
            accessor: 'CategoryName'
        },


        {
            Header: 'Action',
            accessor: 'id',
            Cell: ({ cell }) => (
                <div className='flex'>
                    <button onClick={() => handleEdit(cell.row.values.id, cell.row.values.CategoryName)} className='bg-white border border-black px-3 py-1 mr-1 rounded-sm shadow-md hover:shadow-xl hover:bg-black hover:text-white text-black'>Edit </button>
                    <button onClick={() => handleDelete(cell.row.values.id)} className='border border-red-600 text-red-600 px-3 py-1 ml-1 rounded-sm shadow-md hover:shadow-xl hover:bg-red-600 hover:text-white'>Delete </button>
                </div>
            )
        }
    ]




    //2 delete FUNCTION TO DELETE ITEM FROM LIST
    const deleteCategory = (deleteId) => {

        let requestBody = {
            id: deleteId
        }

        AxiosInterceptors.post(api_deleteCategory, requestBody, ApiHeader())
            .then(function (response) {
                console.log('delete response..', response?.data?.data)
                if (response?.data?.status) {
                    fetchCategoryList()
                } else {
                    activateBottomErrorCard(true, response?.data?.message)
                }
            })
            .catch(function (error) {
                activateBottomErrorCard(true, 'Error occured in deletion.')
            }).finally(() => {
            })
    }


    //3 Fetch list FUNCTION TO FETCH LIST DATA
    const fetchCategoryList = () => {
        setisLoading(true)
        axios.post(api_getAllCourseCategory, {}, bearerHeader)
            .then((res) => {
                console.log('coure category list....', res?.data)
                if (res.data.status) {
                    setcourseCategoryList(res?.data?.data)
                    console.log("response of category list")
                    setisLoading(false)
                } else {
                    console.log("failed to fetch category list", res)
                    setisLoading(false)
                }
            })
            .catch((err) => {
                console.log("Exception while getting category data", err)
                setisLoading(false)
            })
    }
    //4 by id FUNCTION TO FECTH DATA TO EDIT
    const fetchCategoryById = (passedId) => {
        setisLoading(true)
        let requestBody = {
            id: passedId
        }
        AxiosInterceptors.post(api_getCategoryById, requestBody, ApiHeader())
            .then(function (response) {
                console.log('fetch view data response..', response?.data?.data)
                if (response?.data?.status) {
                    setdataToView(response?.data?.data)
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

    //5 post form
    const postCategory = () => {
        setisLoadingAddUpdateCategory(true)
        let requestBody = {
            name: categoryNameInput
        }
        let url

        if (currentEditId === null) {
            url = api_addCategory
        } else {
            url = api_updateCategory
            requestBody = {
                id: currentEditId,
                category: categoryNameInput
            }
        }


        console.log('before login...', requestBody)
        AxiosInterceptors.post(url, requestBody, ApiHeader())
            .then((response) => {
                console.log("--2-- After Login data", response)
                if (response?.data?.status) {
                    fetchCategoryList()
                } else {
                    activateBottomErrorCard(true, response?.data?.message)
                }
            })
            .catch((err) => {
                activateBottomErrorCard(true, 'Error occured while adding category')
            }).finally(() => {
                setcurrentEditId(null)
                setOpenAddModal(0)
                setCategoryNameInput('')
                setisLoadingAddUpdateCategory(false)
            })

    }

    useEffect(() => {
        fetchCategoryList()
    }, [])


    const addBtn = () => {
        setOpenAddModal(prev => prev + 1)
    }

    const handleDelete = (deleteId) => {
        deleteCategory(deleteId)
        // console.log("Button Id", btnId)
        // navigate(`/CourseList/view/${btnId}`)
    }

    const handleEdit = (id, categoryName) => {
        setcurrentEditId(id)
        setCategoryNameInput(categoryName)
        setOpenAddModal(pre => pre + 1)
    }
    // FUNCTION FOR CUSTOM ERROR MESSAGE CARD
    const activateBottomErrorCard = (state, msg) => {
        seterroMessage(msg)
        seterroState(state)
    }

    return (
        <>
            {erroState && <BottomErrorCard activateBottomErrorCard={activateBottomErrorCard} errorTitle={erroMessage} />}
            <EditCategoryModal openEditModal={openEditModal} refetchList={() => setRefetchData(prev => prev + 1)} editBtnId={editBtnId} />
            <AddCategoryModal isLoadingAddUpdateCategory={isLoadingAddUpdateCategory} postCategory={postCategory} categoryNameInput={categoryNameInput} setCategoryNameInput={setCategoryNameInput} openAddModal={openAddModal} refetchList={() => setRefetchData(prev => prev + 1)} />
            <div>
                <div className='flow-root bg-white border-b-2 rounded-t-md md:px-5 p-2'>
                    <div className='float-left text-lg font-semibold flex'> <FaHashtag className='mt-1.5 mr-2' /> List of Course Category</div>

                    <button
                        onClick={addBtn}
                        type="button"
                        className="float-right rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                        Add New
                    </button>
                </div>
                <div className='w-full'> {
                    isLoading &&
                    <ShimmerTable />
                }</div>

                <div className='bg-white rounded-b-md py-2'>
                    {!isLoading && courseCategoryList?.length != 0 &&
                        <ListTable filter={false} exportStatus={false} assessmentType={false} columns={COLUMNS} dataList={courseCategoryList} />
                    }
                </div>
            </div>

        </>
    )
}

export default CourseCategoryIndex

/*
Exported
App.js
*/