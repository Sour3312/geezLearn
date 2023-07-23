import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner'
import ApiHeader from '../../../Components/Api/ApiHeader';
import AxiosInterceptors from '../../../Components/Api/AxiosInterceptors';
import ApiList from '../../../Components/Api/ApiList';
import { nullToNA } from '../../../Components/Common/PowerupFunctions';
import BottomErrorCard from '../../../Components/Common/BottomErrorCard';
import ListTable from '../../../Components/Common/ListTableCustom/ListTable';
import ShimmerTable from '../../../Components/Animations/ShimmerTable';
import pbook from './pbook.png'
import { RotatingLines } from "react-loader-spinner";


function TeacherCourseApproval() {
  const [readymadeListData, setreadymadeListData] = useState([]);
  const [readymadeListStatus, setreadymadeListStatus] = useState(true);
  const [isLoading, setisLoading] = useState(false);
  const [isLoadingCourseApproveReject, setisLoadingCourseApproveReject] = useState(false);
  const [erroState, seterroState] = useState(false);
  const [erroMessage, seterroMessage] = useState(null);
  const [currentId, setcurrentId] = useState(null);
  const [deleteStatus, setdeleteStatus] = useState(false);
  const [dataViewStatus, setdataViewStatus] = useState(false);
  const [dataToView, setdataToView] = useState();
  const { api_getAllPendingCourses, api_approveRejectPendingCourse } = ApiList()
  const navigate = useNavigate()


  const data = [
    { id: 1, name: 'mark', email: 'abc@gmail.com', mobile: '9123232323', amount: 500 },
    { id: 2, name: 'mark', email: 'abc@gmail.com', mobile: '9123232323', amount: 500 },
    { id: 3, name: 'mark', email: 'abc@gmail.com', mobile: '9123232323', amount: 500 },
    { id: 4, name: 'mark', email: 'abc@gmail.com', mobile: '9123232323', amount: 500 },
  ]

  const COLUMNS = [
    {
      Header: "Sl No.",
      Cell: ({ cell }) => (<span>{nullToNA(cell.row.index + 1)}</span>)
    },
    {
      Header: "Image",
      Cell: ({ cell }) => (<img className='w-20' src={cell.row.values?.fullPath || pbook} />)
    },
    {
      Header: "Course Name",
      accessor: "title",
    },
    {
      Header: "Description",
      accessor: "description",
    },
    {
      Header: "Instructor",
      accessor: "teacherName",
    },
    {
      Header: "Price",
      accessor: "price",
    },
    {
      Header: "Date",
      accessor: "created_at",
    },
    {
      Header: "Action",
      Cell: ({ cell }) => (
        <div className="flex">
          <button
            onClick={() => courseApproveReject(cell.row.original?.id, 1)}
            className={`px-3 py-1.5 border border-green-500 text-green-500 font-medium text-xs leading-tight uppercase rounded shadow-xl hover:bg-green-700 hover:text-white hover:shadow-lg  active:shadow-lg transition duration-150 ease-in-out cursor-pointer`}
          >
            Approve
          </button>
          <button
            onClick={() => courseApproveReject(cell.row.original?.id, 0)}
            className={`ml-4 px-3 py-1.5 border border-red-500 text-red-500 font-medium text-xs leading-tight uppercase rounded shadow-xl hover:bg-red-700 hover:text-white hover:shadow-lg  active:shadow-lg transition duration-150 ease-in-out cursor-pointer`}
          >
            Reject
          </button>
          <button
            onClick={() => {
              setcurrentId(cell.row.original?.id)
              reject()
            }}
            className={`ml-4 px-3 py-1.5 border border-indigo-500 text-indigo-500 font-medium text-xs leading-tight uppercase rounded shadow-xl hover:bg-indigo-700 hover:text-white hover:shadow-lg  active:shadow-lg transition duration-150 ease-in-out cursor-pointer`}
          >
            View
          </button>

        </div >
      ),
    },

  ];


  //2 FUNCTION TO APPROVE & REJECT
  const courseApproveReject = (id, status) => {
    setisLoadingCourseApproveReject(true)

    let requestBody = {
      id: id,
      status: status
    }

    AxiosInterceptors.post(api_approveRejectPendingCourse, requestBody, ApiHeader())
      .then(function (response) {
        console.log('delete response..', response?.data?.data)
        if (response?.data?.status) {
          fetchPendingCourses()
        } else {
          activateBottomErrorCard(true, response?.data?.message)
        }
      })
      .catch(function (error) {
        activateBottomErrorCard(true, 'Error occured in deletion.')
      }).finally(() => {
        setisLoadingCourseApproveReject(false)
      })
  }

  // FUNCTION TO FETCH LIST DATA
  const fetchPendingCourses = () => {
    console.log('pending course fetching....')
    setisLoading(true)
    AxiosInterceptors.post(api_getAllPendingCourses, {}, ApiHeader())
      .then(function (response) {
        console.log('student list...', response)
        if (response?.data?.status === true) {
          setreadymadeListData(response?.data?.data)
        } else {
          setreadymadeListData(null)
        }
      })
      .catch(function (error) {
        activateBottomErrorCard(true, 'Error occured while fetching data.')
      }).finally(() => {
        setisLoading(false)
      })
  }

  // FUNCTION TO FECTH DATA TO EDIT
  const fetchViewData = (passedId) => {
    setisLoading(true)
    let requestBody = {
      id: passedId
    }
    AxiosInterceptors.post(api_getClassFeeDefById, requestBody, ApiHeader())
      .then(function (response) {
        console.log('fetch view data response..', response?.data?.data)
        if (response?.data?.status) {
          setdataToView(response?.data?.data)
          setdataViewStatus(true)
        } else {
          activateBottomErrorCard(true, 'Error occured in submitting deactivation application. Please try again later.')
        }
        setisLoading(false)

      })
      .catch(function (error) {
        console.log('= view data error...', error)
        seterroState(true)
        setisLoading(false)
      })
  }

  useEffect(() => {
    fetchPendingCourses()
  }, [])

  // FUNCTION FOR CUSTOM ERROR MESSAGE CARD
  const activateBottomErrorCard = (state, msg) => {
    seterroMessage(msg)
    seterroState(state)
  }

  return (
    <>

      {erroState && <BottomErrorCard activateBottomErrorCard={activateBottomErrorCard} errorTitle={erroMessage} />}

      {
        dataViewStatus &&
        <div>Modal to view</div>
      }

      <div className="flex mb-10">
        <div className='flex-1'>
          <div className='text-4xl font-semibold text-gray-700'>Course Approval
            {isLoadingCourseApproveReject && <RotatingLines
              strokeColor="black"
              strokeWidth="5"
              animationDuration="0.75"
              width="25"
              visible={true}
            />}</div>
          <div className='text-gray-600 text-sm'>List of the student enrolled in programme</div>
        </div>
        <div className='flex-1 flex justify-end'>

        </div>
      </div>

      <div className='w-full'> {
        isLoading &&
        <ShimmerTable />
      }</div>

      {!isLoading && data?.length != 0 &&
        <ListTable filter={false} exportStatus={false} assessmentType={false} columns={COLUMNS} dataList={readymadeListData} />
      }
      {/* <ListTableConnect
        api={api_fetcClassFeeDefList} // sending api
        columns={COLUMNS} // sending column
        requestBody={{}} // sending body
      /> */}
      {
        readymadeListStatus && data?.length == 0 &&
        <div className="text-xl font-semibold text-red-400 text-center">Data Not Found</div>
      }
    </>
  )
}

export default TeacherCourseApproval