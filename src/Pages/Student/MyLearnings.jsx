import { useState, useEffect } from 'react'
import LearningCard from './LearningCard'
import { useNavigate } from 'react-router-dom'
import BottomErrorCard from '../../Components/Common/BottomErrorCard';
import ApiList from '../../Components/Api/ApiList';
import AxiosInterceptors from '../../Components/Api/AxiosInterceptors';
import ApiHeader from '../../Components/Api/ApiHeader';
import ShimmerCardGrid from '../../Components/Animations/ShimmerCardGrid';

function MyLearnings(props) {
    const navigate = useNavigate()
    const [isLoading, setisLoading] = useState(false);
    const [erroState, seterroState] = useState(false);
    const [erroMessage, seterroMessage] = useState(null);
    const [learningData, setlearningData] = useState(null);
    const { api_getPurchaseCourses } = ApiList()

    const learningDataconst = [
        { courseName: 'Welcome to this course', desc: 'web designer is the most.', timeDuration: '2m left' },
        { courseName: 'Welcome to this course', desc: 'web designer is the most.', timeDuration: '2m left' },
        { courseName: 'Welcome to this course', desc: 'web designer is the most.', timeDuration: '2m left' },
    ]

    //3 Fetch list FUNCTION TO FETCH LIST DATA
    const fetchPurchaseCourses = () => {
        setisLoading(true)
        AxiosInterceptors.post(api_getPurchaseCourses, {}, ApiHeader())
            .then(function (response) {
                console.log('my course learinnigns list...', response)
                if (response?.data?.status) {
                    setlearningData(response?.data?.data)
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
            {props?.location === 'dashboard' && < div className='flex'>
                <div className="flex-1 items-center text-3xl font-serif font-bold mb-8 px-4"> Let's Start Learning</div>
                <div onClick={() => navigate('/my-learnings/mycourse')} className="flex-1 items-center text-md font-semibold text-indigo-600 underline mb-8 px-4 text-right"> <span className='cursor-pointer hover:text-indigo-800'>My Learnings</span></div>
            </div >}

            <div className='grid grid-cols-12 '>
                {isLoading && <div className='col-span-12' ><ShimmerCardGrid /></div>}
                {!isLoading && Array.isArray(learningData) && learningData?.map((data, index) => (
                    <LearningCard type='learning-course-card' learningData={data} />
                ))}
            </div>

        </>
    )
}

export default MyLearnings