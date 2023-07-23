import React, { useEffect, useState } from 'react'
import LearningCard from '../LearningCard'
import AxiosInterceptors from '../../../Components/Api/AxiosInterceptors';
import ApiHeader from '../../../Components/Api/ApiHeader';
import BottomErrorCard from '../../../Components/Common/BottomErrorCard';
import ApiList from '../../../Components/Api/ApiList';
import ShimmerCardGrid from '../../../Components/Animations/ShimmerCardGrid';
import star from './star.png'
import toast, { Toaster } from 'react-hot-toast';


function CertificateList() {
    const [isLoading, setisLoading] = useState(false);
    const [erroState, seterroState] = useState(false);
    const [erroMessage, seterroMessage] = useState(null);
    const [certificateData, setcertificateData] = useState(null);
    const { api_getCertificates } = ApiList()


    //3 Fetch list FUNCTION TO FETCH LIST DATA
    const fetchCertificates = () => {
        setisLoading(true)
        AxiosInterceptors.post(api_getCertificates, {}, ApiHeader())
            .then(function (response) {
                console.log('certificate list...', response)
                if (response?.data?.status === true) {
                    setcertificateData(response?.data?.data)
                } else {
                    toast.error(response?.data?.message)
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
        fetchCertificates()
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
            <div className='mt-20 '>
                <div className='bg-[#6980D3] px-2 md:px-60 h-44 relative flex items-center'>
                    <div className='font-bold text-4xl font-serif text-white'>Certificate List</div>
                </div>
                <div className='grid grid-cols-12 md:px-40 mt-10'>
                    {isLoading && <div className='col-span-12'><ShimmerCardGrid /></div>}
                    {!isLoading && Array.isArray(certificateData) && certificateData?.map((data, index) => (
                        <LearningCard type='certification-card' data={data} />
                    ))}
                    {!isLoading && !Array.isArray(certificateData) &&
                        <div className='col-span-12 flex justify-center items-center flex-col bg-gray-100 p-10 mt-2'>
                            <div><img className='w-40' src={star} alt="star" /></div>
                            <h1 className='mt-4 font-semibold text-gray-700 text-lg'>Your certification is empty, Watch courses and generate certificates.</h1>
                            <button
                                onClick={() => navigate('/my-learnings/mycourse')}
                                type="button"
                                className="mt-4 rounded-md bg-[#6980D3] px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Browse Courses
                            </button>
                        </div>
                    }
                </div>

            </div>

        </>
    )
}

export default CertificateList