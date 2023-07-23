import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import ApiHeader from '../../../Components/Api/ApiHeader';
import AxiosInterceptors from '../../../Components/Api/AxiosInterceptors';
import ApiList from '../../../Components/Api/ApiList';
import { nullToNA } from '../../../Components/Common/PowerupFunctions';
import BottomErrorCard from '../../../Components/Common/BottomErrorCard';
import ListTable from '../../../Components/Common/ListTableCustom/ListTable';
import ShimmerTable from '../../../Components/Animations/ShimmerTable';
import { RotatingLines } from "react-loader-spinner";
import PaymentBifurcation from './PaymentBifurcation';



function TeachersList() {
  const [readymadeListData, setreadymadeListData] = useState([]);
  const [readymadeListStatus, setreadymadeListStatus] = useState(true);
  const [isLoading, setisLoading] = useState(false);
  const [isViewDataLoading, setisViewDataLoading] = useState(false);
  const [erroState, seterroState] = useState(false);
  const [erroMessage, seterroMessage] = useState(null);
  const [currentId, setcurrentId] = useState(null);
  const [currentName, setcurrentName] = useState(null);
  const [deleteStatus, setdeleteStatus] = useState(false);
  const [dataViewStatus, setdataViewStatus] = useState(false);
  const [dataToView, setdataToView] = useState([]);
  const { api_fetcClassFeeDefList, api_deleteClassFeeDefById, api_getClassFeeDefById, api_getAllTeachers, api_getTeacherById } = ApiList()
  const navigate = useNavigate()


  const datatoview = [
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
      Header: "Name",
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
      Header: "Status",
      accessor: "status",
      Cell: ({ cell }) => (<span className={`font-semibold ${cell.row.values.status === 'Active' ? 'text-green-400' : 'text-red-400'}`}>{nullToNA(cell.row.values.status)}</span>)
    },
    {
      Header: "Action",
      Cell: ({ cell }) => (
        <div className="flex">
          <button
            onClick={() => handleModal(cell.row.original.id)}
            className={`px-3 py-1.5 border border-black text-black font-medium text-xs leading-tight uppercase rounded shadow-xl hover:bg-black hover:text-white hover:shadow-lg  active:shadow-lg transition duration-150 ease-in-out cursor-pointer`}
          >
            View
          </button>
          <button
            onClick={() => {
              setcurrentName(cell.row.values?.name)
              setcurrentId(cell.row.original?.id)
              paymentBifurcationModal.showModal()
            }}
            className={`ml-3 px-3 py-1.5 border border-green-400 text-green-500 font-medium text-xs leading-tight uppercase rounded shadow-xl hover:bg-green-600 hover:text-white hover:shadow-lg  active:shadow-lg transition duration-150 ease-in-out cursor-pointer`}
          >
            Payments
          </button>
          {cell.row.values.status === 'Active' ?
            <button onClick={() => {
              setcurrentId(cell.row.original?.id)
              deleteItem()
            }}
              className={`ml-4 px-3 py-1.5 border border-red-500 text-red-500 font-medium text-xs leading-tight uppercase rounded shadow-xl hover:bg-red-700 hover:text-white hover:shadow-lg  active:shadow-lg transition duration-150 ease-in-out cursor-pointer`}
            >Disable</button> : <button onClick={() => {
              setcurrentId(cell.row.original?.id)
              deleteItem()
            }}
              className={`ml-4 px-3 py-1.5 border border-green-500 text-green-500 font-medium text-xs leading-tight uppercase rounded shadow-xl hover:bg-green-700 hover:text-white hover:shadow-lg  active:shadow-lg transition duration-150 ease-in-out cursor-pointer`}
            >Enable</button>
          }

        </div>
      ),
    },

  ];


  //2 delete FUNCTION TO DELETE ITEM FROM LIST
  const deleteItem = (deleteType = null) => {
    setisLoading(true)
    setdeleteStatus(false)

    let requestBody = {
      id: currentId,
      status: 'deactive'
    }

    AxiosInterceptors.post(api_deleteClassFeeDefById, requestBody, ApiHeader())
      .then(function (response) {
        console.log('delete response..', response?.data?.data)
        if (response?.data?.status) {
          fetchMasterList()
        } else {
          activateBottomErrorCard(true, 'Error occured in deletion.')
        }
        setisLoading(false)

      })
      .catch(function (error) {
        console.log('==delete error...', error)
        activateBottomErrorCard(true, 'Error occured in deletion.')
        setisLoading(false)
      })
  }


  //3 Fetch list FUNCTION TO FETCH LIST DATA
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

  //4 by id FUNCTION TO FECTH DATA TO EDIT
  const fetchDataById = (id) => {
    console.log('inside view teacher...', id)
    setisViewDataLoading(true)
    let requestBody = {
      id: id
    }
    AxiosInterceptors.post(api_getTeacherById, requestBody, ApiHeader())
      .then(function (response) {
        console.log('fetch view data response..', response?.data?.data)
        if (response?.data?.status) {
          setdataToView(response?.data?.data)
          d.showModal()
        } else {
          activateBottomErrorCard(true, 'Error occured while fetching data')
        }
      })
      .catch(function (error) {
        activateBottomErrorCard(true, 'Error occured while fetching data')
      }).finally(() => {
        setisViewDataLoading(false)
      })
  }


  useEffect(() => {
    fetchMasterList()
  }, [])

  const handleModal = (id) => {
    fetchDataById(id)
  }
  // FUNCTION FOR CUSTOM ERROR MESSAGE CARD
  const activateBottomErrorCard = (state, msg) => {
    seterroMessage(msg)
    seterroState(state)
  }

  return (
    <>

      {erroState && <BottomErrorCard activateBottomErrorCard={activateBottomErrorCard} errorTitle={erroMessage} />}

      <dialog className='relative h-4/5 w-1/2 rounded-lg' id="paymentBifurcationModal">
        <div className='sticky top-0'>
          <button onClick={() => paymentBifurcationModal.close()} className='absolute top-2 right-3 text-xl p-2 w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 hover:text-red-500 font-semibold flex justify-center items-center'>x</button>
          <div className='flex'>
            <div className='font-serif font-lg font-semibold'>Payment Bifurcation</div>
          </div>
        </div>
        <div className='mt-10'></div>
        <div className='w-ful  mb-6'>
          <PaymentBifurcation currentId={currentId} currentName={currentName} />
        </div>
      </dialog>

      {/* DATA MODAL */}
      <dialog className='relative h-4/5 w-1/2 rounded-lg' id="d">
        <div className='sticky top-0'>
          <button onClick={() => d.close()} className='absolute top-2 right-3 text-xl p-2 w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 hover:text-red-500 font-semibold flex justify-center items-center'>x</button>
          <div className='flex'>
            <div className='font-serif'>Teacher Data</div>
          </div>
        </div>
        <div className='mt-10'></div>
        <div className='w-ful  mb-6'>
          <div className='py-6 mt-2 rounded-lg  p-4'>
            <div className="flex flex-col md:flex-row space-y-2 md:space-x-5 pl-4 ">
              <div className='flex-1'>
                <div className='font-bold text-sm'>{nullToNA(datatoview[0].name)}</div>
                <div className='text-gray-500 text-xs'>Teacher's Name</div>
              </div>
              <div className='flex-1'>
                <div className='font-bold text-sm'>{nullToNA(datatoview[0].email)}</div>
                <div className='text-gray-500 text-xs'>Email</div>
              </div>
              <div className='flex-1'>
                <div className='font-semibold text-lg'>{nullToNA(datatoview[0].phone)}</div>
                <div className='text-gray-500 text-xs'>Phone</div>
              </div>
              <div className='flex-1'>
                <div className='font-semibold text-md'>{nullToNA(datatoview[0].status)}</div>
                <div className='text-gray-500 text-xs'>Status</div>
              </div>
              <div className='flex-1'>
                <div className='font-bold text-sm'>{nullToNA(datatoview[0].property_type)}</div>
                <div className='text-gray-500 text-xs'>Property Type</div>
              </div>

            </div>

            <div className="flex flex-col md:flex-row space-y-2 md:space-x-10  pl-4 mt-4">
              <div className='flex-1'>
                <div className='font-bold text-sm'>{nullToNA(datatoview[0].zone_mstr_id)}</div>
                <div className='text-gray-500 text-xs'>Zone</div>
              </div>
              <div className='flex-1'>
                <div className='font-bold text-sm'>{nullToNA(datatoview?.data?.is_mobile_tower)}</div>
                <div className='text-gray-500 text-xs'>Property has Mobile Tower(s) ?</div>
              </div>
              <div className='flex-1'>
                <div className='font-semibold text-md'>{nullToNA(datatoview?.data?.is_hoarding_board)} </div>
                <div className='text-gray-500 text-xs'>Property has Hoarding Board(s) ?</div>
              </div>
              <div className='flex-1'>
                <div className='font-semibold text-md'>{nullToNA(datatoview?.data?.is_petrol_pump)}</div>
                <div className='text-gray-500 text-xs'>Is property a Petrol Pump ?</div>
              </div>
              <div className='flex-1'>
                <div className='font-bold text-sm' >{nullToNA(datatoview?.data?.is_water_harvesting)}</div>
                <div className='text-gray-500 text-xs'>Rainwater harvesting provision ?</div>
              </div>
            </div>
          </div>
        </div>
      </dialog>

      <div className="flex mb-10">
        <div className='flex-1'>
          <div className='text-4xl font-semibold text-gray-700'>Teacher List
            {isViewDataLoading && <RotatingLines
              strokeColor="black"
              strokeWidth="5"
              animationDuration="0.75"
              width="25"
              visible={true}
            />}
          </div>
          <div className='text-gray-600 text-sm'>List of the student enrolled in programme</div>
        </div>
        <div className='flex-1 flex justify-end'>
          {/* <button
            className={`ml-4 h-10 px-8 py-1.5  font-medium text-xs leading-tight uppercase rounded shadow-xl bg-black text-white hover:bg-indigo-400  hover:shadow-lg  active:shadow-lg transition duration-150 ease-in-out cursor-pointer`}
          >
            Add
          </button> */}
        </div>
      </div>

      <div className='w-full'> {
        isLoading &&
        <ShimmerTable />
      }</div>


      {!isLoading && readymadeListData?.length != 0 &&
        <ListTable filter={false} exportStatus={false} assessmentType={false} columns={COLUMNS} dataList={readymadeListData} />
      }
      {/* <ListTableConnect
        api={api_fetcClassFeeDefList} // sending api
        columns={COLUMNS} // sending column
        requestBody={{}} // sending body
      /> */}
      {
        readymadeListStatus && readymadeListData?.length == 0 &&
        <div className="text-xl font-semibold text-red-400 text-center">Data Not Found</div>
      }
    </>
  )
}

export default TeachersList