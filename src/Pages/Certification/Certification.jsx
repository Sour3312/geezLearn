import React, { useEffect, useState } from 'react'
import certblue2 from '../../Assets/images/certblue2.svg'
import logo from '../../Assets/logo/logo.png'
import './print.css'
import ApiHeader from '../../Components/Api/ApiHeader';
import BottomErrorCard from '../../Components/Common/BottomErrorCard';
import AxiosInterceptors from '../../Components/Api/AxiosInterceptors';
import ApiList from '../../Components/Api/ApiList';
import { useParams } from 'react-router-dom';
import ShimmerCard from '../../Components/Animations/ShimmerCard';

function Certification() {

  const [isLoading, setisLoading] = useState(false);
  const [certificateViewData, setcertificateViewData] = useState(false);
  const [erroState, seterroState] = useState(false);
  const [erroMessage, seterroMessage] = useState(null);
  const { api_getSingleCertificate } = ApiList()
  const { certificateId } = useParams()

  const certificateData = {
    name: 'Monu Khan',
    courseName: 'FULL PYTHON FOR BEGINNER COURSE',
    completedOn: 'july 2022'
  }

  //3 Fetch list FUNCTION TO FETCH LIST DATA
  const fetchCertificate = () => {
    setisLoading(true)
    let requestBody = {
      certificateNo: certificateId
    }
    AxiosInterceptors.post(api_getSingleCertificate, requestBody, ApiHeader())
      .then(function (response) {
        console.log('fetch certificate response', response)
        if (response?.data?.status === true) {
          setcertificateViewData(response?.data?.data)
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
    fetchCertificate()
  }, [])


  // FUNCTION FOR CUSTOM ERROR MESSAGE CARD
  const activateBottomErrorCard = (state, msg) => {
    seterroMessage(msg)
    seterroState(state)
  }

  return (
    <>
      {erroState && <BottomErrorCard activateBottomErrorCard={activateBottomErrorCard} errorTitle={erroMessage} />}

      <div className='w-2/3 mx-auto relative pt-10 pb-20' id='certificate'>
        {isLoading && <ShimmerCard />}
        {!isLoading && <div className=''>
          <img className='' src={certblue2} />
          <div className='w-full h-full absolute top-40 left-0 flex px-40'>
            <div className='w-full h-full'>
              <div className='text-center text-5xl font-semibold leading-7 text-gray-800'>CERTIFICATE <br /><span className='text-xl'>OF COMPLETION</span></div>
              <div className='font-custom-montserrat text-center font-bold text-4xl mt-20'>{certificateViewData?.student_name}</div>
              <div className='text-center text-xl text-gray-700 mt-2 font-serif'>This is to certify that <span className='font-semibold'>{certificateViewData?.student_name}</span> has successfully completed the <span className='font-semibold'>{certificateViewData?.courseName}</span> on <span>{certificateViewData?.completedOn}</span>.</div>
              <div className="mt-10 text-center">
                <span className='px-4 py-1 rounded-full bg-blue-400 text-white shadow-xl border border-white'><img className='inline w-5' src={logo} /> Geez Learn</span>
              </div>
            </div>
          </div>
        </div>
        }
      </div>
    </>
  )
}

export default Certification