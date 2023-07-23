import React, { useEffect, useState } from 'react'
import LearningCard from './LearningCard'
import BottomErrorCard from '../../Components/Common/BottomErrorCard';
import AxiosInterceptors from '../../Components/Api/AxiosInterceptors';
import ApiHeader from '../../Components/Api/ApiHeader';
import ApiList from '../../Components/Api/ApiList';
import ShimmerCardGrid from '../../Components/Animations/ShimmerCardGrid';

function MyLearningCourses() {
    const [isLoading, setisLoading] = useState(false);
    const [dataList, setdataList] = useState(null);
    const [erroState, seterroState] = useState(false);
    const [erroMessage, seterroMessage] = useState(null);
    const { api_getPurchaseCourses } = ApiList()


    //3 Fetch list FUNCTION TO FETCH LIST DATA
    const fetchPurchaseCourses = () => {
        setisLoading(true)
        AxiosInterceptors.post(api_getPurchaseCourses, {}, ApiHeader())
            .then(function (response) {
                console.log('student list...', response)
                if (response?.data?.status === true) {
                    setdataList(response?.data?.data)
                } else {
                    setdataList(null)
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
        fetchPurchaseCourses()
    }, [])

    // FUNCTION FOR CUSTOM ERROR MESSAGE CARD
    const activateBottomErrorCard = (state, msg) => {
        seterroMessage(msg)
        seterroState(state)
    }

    return (
        <>
            {erroState && <BottomErrorCard activateBottomErrorCard={activateBottomErrorCard} errorTitle={erroMessage} />}
            <div className='grid grid-cols-12 '>
                {isLoading && <div className='col-span-12 space-x-2'><ShimmerCardGrid /></div>}
                {!isLoading && dataList?.map((data, index) => (
                    <LearningCard type='my-course-card' learningData={data} />
                ))}
            </div>
        </>
    )
}

export default MyLearningCourses