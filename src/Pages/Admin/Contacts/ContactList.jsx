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



function ContactList() {
  const [readymadeListData, setreadymadeListData] = useState([]);
  const [readymadeListStatus, setreadymadeListStatus] = useState(true);
  const [isLoading, setisLoading] = useState(false);
  const [isViewDataLoading, setisViewDataLoading] = useState(false);
  const [erroState, seterroState] = useState(false);
  const [erroMessage, seterroMessage] = useState(null);
  const [currentId, setcurrentId] = useState(null);
  const [deleteStatus, setdeleteStatus] = useState(false);
  const [dataViewStatus, setdataViewStatus] = useState(false);
  const [dataToView, setdataToView] = useState([]);
  const { api_deleteContact, api_getContactList, api_getTeacherById } = ApiList()
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
      Header: "Message",
      accessor: "message",
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
            onClick={() => deleteItem(cell.row.original?.id)}
            className={`px-3 py-1.5 border border-red text-red-400 font-medium text-xs leading-tight uppercase rounded shadow-xl hover:bg-red-600 hover:text-white hover:shadow-lg  active:shadow-lg transition duration-150 ease-in-out cursor-pointer`}
          >
            Delete
          </button>
        </div>
      ),
    },

  ];


  //2 delete FUNCTION TO DELETE ITEM FROM LIST
  const deleteItem = (id) => {
    setisLoading(true)
    setdeleteStatus(false)

    let requestBody = {
      id: id,
    }

    AxiosInterceptors.post(api_deleteContact, requestBody, ApiHeader())
      .then(function (response) {
        console.log('delete response..', response?.data?.data)
        if (response?.data?.status) {
          fetchContactList()
        } else {
          activateBottomErrorCard(true, 'Error occured in deletion.')
        }
      })
      .catch(function (error) {
        console.log('==delete error...', error)
        activateBottomErrorCard(true, 'Error occured in deletion.')
      }).finally(() => {
        setisLoading(false)
      })
  }


  //3 Fetch list FUNCTION TO FETCH LIST DATA
  const fetchContactList = () => {
    setisLoading(true)
    // AxiosInterceptors.post(api_fetcClassFeeDefList, {}, ApiHeader())
    AxiosInterceptors.post(api_getContactList, {}, ApiHeader())
      .then(function (response) {
        // if (response?.data?.status) {
        console.log('fetching contacty list', response)
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
    fetchContactList()
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
      {erroState &&
        <div className="bg-red-100 border border-red-400 text-red-700 pl-4 pr-16 py-3 rounded relative text-center" role="alert">
          <strong className="font-bold">Sorry! </strong>
          <span className="block sm:inline">Some error occured while fetching list. Please try again later</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
          </span>
        </div>
      }

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
          <div className='text-4xl font-semibold text-gray-700'>Contact List
            {isViewDataLoading && <RotatingLines
              strokeColor="black"
              strokeWidth="5"
              animationDuration="0.75"
              width="25"
              visible={true}
            />}
          </div>
          <div className='text-gray-600 text-sm'>List of contact messages posted by public.</div>
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

export default ContactList