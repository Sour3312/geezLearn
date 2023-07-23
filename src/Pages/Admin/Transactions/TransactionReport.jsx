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
import toast, { Toaster } from 'react-hot-toast';



function TransactionReport() {
  const [readymadeListData, setreadymadeListData] = useState(null);
  const [readymadeListStatus, setreadymadeListStatus] = useState(true);
  const [isLoading, setisLoading] = useState(false);
  const [erroState, seterroState] = useState(false);
  const [erroMessage, seterroMessage] = useState(null);
  const [currentId, setcurrentId] = useState(null);
  const [deleteStatus, setdeleteStatus] = useState(false);
  const [dataViewStatus, setdataViewStatus] = useState(false);
  const [dataToView, setdataToView] = useState();
  const { api_teacherAllTransactions } = ApiList()
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
      Cell: ({ cell }) => (<span>{cell.row.index + 1}</span>)
    },
    {
      Header: "Course Name",
      accessor: "courseName",
    },
    {
      Header: "Transaction No.",
      accessor: "transaction_no",
    },
    {
      Header: "Purchase-Date",
      accessor: "id",
    },
    {
      Header: "Price",
      accessor: "price",
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: ({ cell }) => (
        <div className="font-semibold text-green-500">Paid</div>
      ),
    },
    {
      Header: "Action",
      Cell: ({ cell }) => (
        <div className="flex">
          <button

            className={`ml-4 px-3 py-1.5  font-medium text-xs leading-tight uppercase rounded shadow-xl bg-[#CAD8FD] hover:bg-indigo-400 text-gray-700 hover:shadow-lg  active:shadow-lg transition duration-150 ease-in-out cursor-pointer`}
          >
            View
          </button>
        </div>
      ),
    },

  ];


  // FUNCTION TO FETCH LIST DATA
  const fetchTeachersTransactions = () => {
    setisLoading(true)
    // AxiosInterceptors.post(api_fetcClassFeeDefList, {}, ApiHeader())
    AxiosInterceptors.post(api_teacherAllTransactions, {}, ApiHeader())
      .then(function (response) {
        // if (response?.data?.status) {
        console.log('student list...', response)
        if (response?.data?.status === true) {
          setreadymadeListData(response?.data?.data)
        } else {
          toast.success(response?.data?.message)
          activateBottomErrorCard(true, 'Error occured while fetching data.')
        }
      })
      .catch(function (error) {
        console.log('==2 error list...', error)
        toast.error('Something went wrong')
      }).finally(() => {
        setisLoading(false)
      })
  }



  useEffect(() => {
    fetchTeachersTransactions()
  }, [])

  // FUNCTION FOR CUSTOM ERROR MESSAGE CARD
  const activateBottomErrorCard = (state, msg) => {
    seterroMessage(msg)
    seterroState(state)
  }

  return (
    <>
      <Toaster />
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
          <div className='text-4xl font-semibold text-gray-700'>Transaction Report</div>
          <div className='text-gray-600 text-sm'>List of the student enrolled in programme</div>
        </div>
        <div className='flex-1 flex justify-end'>

        </div>
      </div>

      <div className='w-full'> {
        isLoading &&
        <ShimmerTable />
      }</div>

      {!isLoading && Array.isArray(readymadeListData) &&
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

export default TransactionReport