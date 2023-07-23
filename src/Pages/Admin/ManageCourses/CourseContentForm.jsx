import { useState, useEffect } from 'react'
import CourseContentFormCard from './CourseContentFormCard'
import { FiPlus } from 'react-icons/fi'
import ApiList from '../../../Components/Api/ApiList'
import BottomErrorCard from '../../../Components/Common/BottomErrorCard';
import AxiosInterceptors from '../../../Components/Api/AxiosInterceptors';
import ApiHeader from '../../../Components/Api/ApiHeader';
import { RotatingLines } from "react-loader-spinner";
import ShimmerTableRow from '../../../Components/Animations/ShimmerTableRow';
import toast, { Toaster } from 'react-hot-toast';
import { useParams } from 'react-router-dom';


function CourseContentForm() {

    const [isLoading, setisLoading] = useState(false);
    const [isLoadingSave, setisLoadingSave] = useState(false);
    const [isLessonLoadingSave, setisLessonLoadingSave] = useState(false);
    const [isLoadingLectureDelete, setisLoadingLectureDelete] = useState(false);
    const [isLoadingLessonAdd, setisLoadingLessonAdd] = useState(false);
    const [currentLessonName, setcurrentLessonName] = useState(null);
    const [currentLessonContent, setcurrentLessonContent] = useState(null);
    const [currentLessonDuration, setcurrentLessonDuration] = useState(null);
    const [lectureData, setlectureData] = useState(null);
    const [currentLecture, setcurrentLecture] = useState(null);
    const [currentLectureId, setcurrentLectureId] = useState(null);
    const [erroState, seterroState] = useState(false);
    const [erroMessage, seterroMessage] = useState(null);
    const { api_createLecture, api_createLessons, api_viewLecture, api_viewLessons } = ApiList()
    const { id } = useParams()
    const contents = [
        {
            lectureTitle: 'Up and Running with Python',
            contentTime: '4 lectures . 6min',
            contentList: [
                { contentHeading: 'Installing Python', contentDuration: '04:07' },
                { contentHeading: 'Hello World', contentDuration: '01:07' },
            ]
        },
        {
            lectureTitle: 'The Basics (Data Types)',
            contentTime: '4 lectures . 6min',
            contentList: [
                { contentHeading: 'Installing Python', contentDuration: '04:07' },
                { contentHeading: 'Hello World', contentDuration: '01:07' },
            ]
        },
        {
            lectureTitle: 'Conditions and Loops',
            contentTime: '4 lectures . 6min',
            contentList: [
                { contentHeading: 'Installing Python', contentDuration: '04:07' },
                { contentHeading: 'Hello World', contentDuration: '01:07' },
            ]
        },
    ]

    //2 delete FUNCTION TO DELETE ITEM FROM LIST
    const deleteLecture = (deleteId) => {
        setisLoadingLectureDelete(true)

        let requestBody = {
            id: deleteId
        }

        AxiosInterceptors.post('', requestBody, ApiHeader())
            .then(function (response) {
                console.log('delete response..', response?.data?.data)
                if (response?.data?.status) {
                    toast.success('Lecture deleted successfully')
                    fetchMasterList()
                } else {
                    toast.error(response?.data?.message)
                }
            })
            .catch(function (error) {
                toast.error('Something went wrong')
            }).finally(() => {
                setcurrentLectureId(null)
                setisLoadingLectureDelete(false)
            })
    }


    //3 Fetch list FUNCTION TO FETCH LIST DATA
    const fetchLesson = () => {
        setisLoading(true)
        AxiosInterceptors.post('', {}, ApiHeader())
            .then(function (response) {
                console.log('lecture list.', response)
                if (response?.data?.status === true) {
                    setlectureData(response?.data?.data)
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
    const fetchLectures = () => {
        setisLoading(true)
        let requestBody = {
            courseId: id
        }
        AxiosInterceptors.post(api_viewLecture, requestBody, ApiHeader())
            .then(function (response) {
                console.log('fetch lecture data response..', response?.data)
                if (response?.data?.status) {
                    setlectureData(response?.data?.data)
                } else {
                    toast.error(response?.data?.message)

                }
            })
            .catch(function (error) {
                toast.error(response?.data?.message)
            }).finally(() => {
                setisLoading(false)
            })
    }

    //5 post form
    const postLecture = (data) => {
        setisLoadingSave(true)
        let requestBody = {
            courseId: id,
            lectureName: currentLecture
        }

        console.log('before login...', requestBody)
        AxiosInterceptors.post(api_createLecture, requestBody, ApiHeader())
            .then((response) => {
                console.log("-create lecture", response)
                if (response?.data?.status) {
                    console.log('success')
                    toast.success('Lecture added sucessfully !')
                    fetchLectures()
                } else {
                    toast.error(response?.data?.message)
                }
            })
            .catch((err) => {
                toast.error(response?.data?.message)
            }).finally(() => {
                setisLoadingSave(false)
            })
    }

    //5 post form
    const postLesson = (lectureId) => {
        setisLoadingLessonAdd(true)
        let requestBody = {
            lectuteId: lectureId,
            name: currentLessonName,
            content: currentLessonContent,
            duration: currentLessonDuration,
        }

        console.log('before posting lesson', requestBody)
        AxiosInterceptors.post(api_createLessons, requestBody, ApiHeader())
            .then((response) => {
                console.log("after posting lesson lecture", response)
                if (response?.data?.status) {
                    toast.success('Lecture added sucessfully !')
                    fetchLectures()
                } else {
                    toast.error(response?.data?.message)
                }
            })
            .catch((err) => {
                toast.error(response?.data?.message)

            }).finally(() => {
                setcurrentLectureId(null)
                setisLoadingLessonAdd(false)
            })
    }

    useEffect(() => {
        if (id !== undefined) {
            fetchLectures()
        }
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
            {/* <CourseContentFormCard contents={contents} /> */}
            <CourseContentFormCard
                isLoadingLessonAdd={isLoadingLessonAdd}
                isLoadingLectureDelete={isLoadingLectureDelete}
                currentLectureId={currentLectureId}
                setcurrentLectureId={setcurrentLectureId}
                deleteLecture={deleteLecture}
                isLessonLoadingSave={isLessonLoadingSave}
                postLesson={postLesson}
                currentLessonName={currentLessonName}
                setcurrentLessonName={setcurrentLessonName}
                currentLessonContent={currentLessonContent}
                setcurrentLessonContent={setcurrentLessonContent}
                currentLessonDuration={currentLessonDuration}
                setcurrentLessonDuration={setcurrentLessonDuration}
                contents={lectureData} />

            {isLoading &&
                <div className='px-6'>
                    <ShimmerTableRow />
                </div>
            }

            <div className='grid grid-cols-12'>
                <div className="form-group col-span-6 mb-6 md:px-6">
                    <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">Lecture Title<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></label>
                    <input value={currentLecture} onChange={(e) => setcurrentLecture(e.target.value)} type="text" className={'form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border-[1px] border-solid border-black  transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300'}
                    />

                </div>
                <div className="col-span-6">
                    <label className="form-label block mb-1 text-gray-600 text-sm font-semibold">&nbsp;</label>
                    {isLoadingSave ? <button
                        className="px-6 py-1.5 text-md font-semibold bg-black text-white shadow-sm hover:shadow-lg flex justify-center items-center"
                    >
                        <RotatingLines
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="25"
                            visible={true}
                        /></button> : <>
                        <button onClick={() => postLecture()}
                            type="button block"
                            className="px-6 py-1.5 text-md font-semibold bg-black text-white shadow-sm hover:shadow-lg"
                        >
                            Save</button>
                    </>
                    }
                </div>
            </div>

            <div className='px-6 mt-2'>
                <button
                    type="button"
                    className="px-3 py-2 text-md font-semibold text-black shadow-sm hover:bg-black hover:text-white border-2 border-black"
                >
                    <FiPlus className="inline text-lg" /> Add Lecture
                </button>
            </div>
        </>
    )
}

export default CourseContentForm