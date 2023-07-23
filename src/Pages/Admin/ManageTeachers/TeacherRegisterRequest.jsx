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


function TeacherRegisterRequest() {
  const [readymadeListData, setreadymadeListData] = useState([]);
  const [readymadeListStatus, setreadymadeListStatus] = useState(true);
  const [isLoading, setisLoading] = useState(false);
  const [erroState, seterroState] = useState(false);
  const [erroMessage, seterroMessage] = useState(null);
  const [currentId, setcurrentId] = useState(null);
  const [deleteStatus, setdeleteStatus] = useState(false);
  const [dataViewStatus, setdataViewStatus] = useState(false);
  const [dataToView, setdataToView] = useState();
  const { api_fetcClassFeeDefList, api_deleteClassFeeDefById, api_getClassFeeDefById, api_getAllTeachers } = ApiList()
  const navigate = useNavigate()


  const data = [
    { id: 1, name: 'mark', email: 'abc@gmail.com', mobile: '9123232323' },
    { id: 2, name: 'mark', email: 'abc@gmail.com', mobile: '9123232323' },
    { id: 3, name: 'mark', email: 'abc@gmail.com', mobile: '9123232323' },
    { id: 4, name: 'mark', email: 'abc@gmail.com', mobile: '9123232323' },
  ]

  const COLUMNS = [
    {
      Header: "Sl No.",
      Cell: ({ cell }) => (<span>{nullToNA(cell.row.index + 1)}</span>)
    },
    {
      Header: "Teacher Name",
      accessor: "name",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Mobile",
      accessor: "phone",
    },
    {
      Header: "Action",
      Cell: ({ cell }) => (
        <div className="flex">
          <button
            onClick={() => navigate(`/feedefinition-master-form/${cell.row.original?.id}`)}
            className={`px-3 py-1.5 border border-green-500 text-green-500 font-medium text-xs leading-tight uppercase rounded shadow-xl hover:bg-green-700 hover:text-white hover:shadow-lg  active:shadow-lg transition duration-150 ease-in-out cursor-pointer`}
          >
            Approve
          </button>
          <button
            onClick={() => {
              setcurrentId(cell.row.original?.id)
              deleteItem()
            }}
            className={`ml-4 px-3 py-1.5 border border-red-500 text-red-500 font-medium text-xs leading-tight uppercase rounded shadow-xl hover:bg-red-700 hover:text-white hover:shadow-lg  active:shadow-lg transition duration-150 ease-in-out cursor-pointer`}
          >
            Reject
          </button>
          <button
            onClick={() => {
              setcurrentId(cell.row.original?.id)
              deleteItem()
            }}
            className={`ml-4 px-3 py-1.5 border border-indigo-500 text-indigo-500 font-medium text-xs leading-tight uppercase rounded shadow-xl hover:bg-indigo-700 hover:text-white hover:shadow-lg  active:shadow-lg transition duration-150 ease-in-out cursor-pointer`}
          >
            View
          </button>

        </div>
      ),
    },

  ];

  //1 approve FUNCTION TO DELETE ITEM FROM LIST
const approve = (approveId) => {
  setisLoading(true)
  let requestBody = {
      id: approveId
  }

  AxiosInterceptors.post('', requestBody, ApiHeader())
      .then(function (response) {
          console.log('delete response..', response?.data)
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
//2 delete FUNCTION TO DELETE ITEM FROM LIST
const reject = (deleteId) => {
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

  // FUNCTION TO FETCH LIST DATA
  const fetchMasterList = () => {
    setisLoading(true)
    // AxiosInterceptors.post(api_fetcClassFeeDefList, {}, ApiHeader())
    AxiosInterceptors.post(api_getAllTeachers, {}, ApiHeader())
      .then(function (response) {
        // if (response?.data?.status) {
        console.log('student list...', response)
        if (response?.data?.status === true) {
          setreadymadeListData(response?.data?.data)
        } else {
          activateBottomErrorCard(true, 'Error occured while fetching data.')
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
    fetchMasterList()
  }, [])

  // FUNCTION FOR CUSTOM ERROR MESSAGE CARD
  const activateBottomErrorCard = (state, msg) => {
    seterroMessage(msg)
    seterroState(state)
  }

  return (
    <>

      {erroState && <BottomErrorCard activateBottomErrorCard={activateBottomErrorCard} errorTitle={erroMessage} />}
      {erroState &&
        <div className="bg-red-100 border border-red-400 text-red-700 pl-4 pr-16 py-3 rounded relative text-center" role="alert">
          <strong className="font-bold">Sorry! </strong>
          <span className="block sm:inline">Some error occured while fetching list. Please try again later</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
          </span>
        </div>
      }



      {
        dataViewStatus &&
        <div>Modal to view</div>
      }

      <div className="flex mb-10">
        <div className='flex-1'>
          <div className='text-4xl font-semibold text-gray-700'>Teacher Register Request</div>
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

export default TeacherRegisterRequest