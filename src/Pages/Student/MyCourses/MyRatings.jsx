
import { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import { useNavigate, useParams } from 'react-router-dom'
import { IoMdStar } from 'react-icons/io'
import * as yup from 'yup'
import ApiList from '../../../Components/Api/ApiList'
import AxiosInterceptors from '../../../Components/Api/AxiosInterceptors'
import ApiHeader from '../../../Components/Api/ApiHeader'
import ShimmerTable from '../../../Components/Animations/ShimmerTable'
import { RotatingLines } from "react-loader-spinner";
import BottomErrorCard from '../../../Components/Common/BottomErrorCard'



function MyRatings(props) {

  const { id } = useParams()
  const navigate = useNavigate()
  const [isLoading, setisLoading] = useState(false)
  const [isSubmitLoading, setisSubmitLoading] = useState(false)
  const [reviewDataList, setreviewDataList] = useState(null)
  const [erroState, seterroState] = useState(false);
  const [erroMessage, seterroMessage] = useState(null);
  const { api_fetchAllReview } = ApiList()

  const commentContent = {
    cRating: '4.3',
    cRatingCount: '4k',
    cRatings: [
      { name: 'Seema S.', starRatings: '5', createdAt: 'a week ago', comment: 'Yes it was a good match and gave me a very broad overview of introduction to python' },
      { name: 'Seema S.', starRatings: '5', createdAt: 'a week ago', comment: 'Yes it was a good match and gave me a very broad overview of introduction to python' },
      { name: 'Seema S.', starRatings: '5', createdAt: 'a week ago', comment: 'Yes it was a good match and gave me a very broad overview of introduction to python' },
    ]
  }

  let validationSchema = yup.object({

    reviewText: yup.string().required('Enter review'),
    starRatings: yup.string().required('Select rating'),
  })

  const initialValues = {
    reviewText: '',
    starRatings: '',
  };

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log('form values', values)
      postReview(values)
    }
    , validationSchema
  })

  const handleOnChange = (event) => {
    let name = event.target.name
    let value = event.target.value
  };

  /*// FUNCTION TO POST OR EDIT DATA
  const saveMasterForm = (values) => {
      setisLoading(true)
      let url
      let requestBody
      let requestBodyBase = {
          
      reviewText: values?.reviewText,
      starRatings: values?.starRatings,
      }
      if (id !== undefined) {
          url = 'apiEdit'
          requestBody = requestBodyBase
          requestBody.id = id
      } else {
          url = 'apiPost'
          requestBody = requestBodyBase
      }
  
      AxiosInterceptors.post(url, requestBody, ApiHeader())
          .then(function (response) {
              console.log('view fee master..', response?.data?.data)
              if (response?.data?.status) {
              } else {
              }
              setisLoading(false)
          })
          .catch(function (error) {
              console.log('==2 error list...', error)
              setisLoading(false)
          })
  }
  
  // FUNCTION TO FECTH DATA TO EDIT
  const fetchEditData = () => {
      setisLoading(true)
      seterroState(false)
      let requestBody = {
          id: id
      }
      AxiosInterceptors.post('apiFetch', requestBody, ApiHeader())
          .then(function (response) {
              console.log('fetch edit data response..', response?.data?.data)
              if (response?.data?.status) {
                  feedEditData(response?.data?.data)
              } else {
                  activateBottomErrorCard(true, 'Error occured in submitting deactivation application. Please try again later.')
              }
              setisLoading(false)
  
          })
          .catch(function (error) {
              console.log('= edit data error...', error)
              seterroState(true)
              setisLoading(false)
          })
  }
  
  // FUNCTION TO FEED EDIT DATA
  const feedEditData = (data) => {
      console.log('existing property details in prop address...', data)
     
      formik.setFieldValue('reviewText', data?.reviewText)
      formik.setFieldValue('starRatings', data?.starRatings)
  }
  
  // CALLING API TO FETCH DATA IN EDIT CASE
  useEffect(() => {
      if (id !== undefined) {
          fetchEditData()
      }
  }, [])

  
  */

  //3 Fetch list FUNCTION TO FETCH LIST DATA
  const fetchCourseAllReview = () => {
    setisLoading(true)
    AxiosInterceptors.post(api_fetchAllReview, {}, ApiHeader())
      .then(function (response) {
        console.log('all reeview list...', response)
        if (response?.data?.status) {
          setreviewDataList(response?.data?.data)
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
    fetchCourseAllReview()
  }, [])

  // FUNCTION FOR CUSTOM ERROR MESSAGE CARD
  const activateBottomErrorCard = (state, msg) => {
    seterroMessage(msg)
    seterroState(state)
  }


  return (
    <>
      {erroState && <BottomErrorCard activateBottomErrorCard={activateBottomErrorCard} errorTitle={erroMessage} />}
      <div className='bg-[#6980D3] px-2 md:px-60 h-44 relative flex items-center'>
        <div className='font-bold text-4xl font-serif text-white'>All Courses Ratings</div>
        {/* SPACER */}

      </div>
      <div className="block md:p-4 w-full md:py-6 rounded-lg mx-auto  shadow-xl bg-white px-4 sm:px-0">

        <div className='w-full bg-white grid grid-cols-12 px-2 sm:px-10 py-2 sm:py-10'>

          {/* LEFT MARGIN SPACER HIDDEN IN SMALL */}
          <div className="col-span-2 hidden sm:block"></div>

          <div className="col-span-12 sm:col-span-6 px-4 py-2">
            <h1 className='text-2xl font-bold text-gray-800 flex items-center font-custom-montserrat'><IoMdStar className='inline mr-3 text-amber-600' />All Courses Ratings</h1>

            <div className="grid grid-cols-12 mt-4">
              {isLoading && <div className='col-span-12' >{<ShimmerTable />}</div>}
              {!isLoading && Array.isArray(reviewDataList) && reviewDataList?.map((data) => (
                <div className='col-span-12 mb-6'>
                  <div className="flex">
                    <div className='flex-initial'><div className='w-10 h-10 bg-black text-white font-bold rounded-full flex justify-center items-center'>SS</div></div>
                    <div className='flex-initial ml-4'>
                      <div className='font-bold'>{data?.courseName}({data?.rating}<IoMdStar className='inline text-amber-600' />)</div>
                      <div className='text-sm font-bold text-gray-600'><span className='ml-3'>{data?.created_at}</span></div>
                    </div>
                  </div>
                  <div className='mt-3 font-custom-lora'>{data?.comment}</div>
                </div>
              ))}


              {/* SPACER */}

              <div className='col-span-12 sm:col-span-6 w-full md:pr-5 mt-10'>
                <button class="flex text-black border border-black py-2 px-6 focus:outline-none hover:bg-black hover:text-white  font-semibold shadow-lg justify-center items-center text-sm">Show all reviews</button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </>
  )
}


export default MyRatings