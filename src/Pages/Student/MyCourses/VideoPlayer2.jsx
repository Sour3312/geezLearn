import { useState } from 'react'
import ReactPlayer from 'react-player/lazy'
import { useLocation, useNavigate, Outlet, useParams } from 'react-router-dom';
import { RotatingLines } from "react-loader-spinner";
import YouTube from 'react-youtube';
import {
    Player, PlayToggle,
    ControlBar,
    ReplayControl,
    ForwardControl,
    CurrentTimeDisplay,
    TimeDivider,
    PlaybackRateMenuButton,
    VolumeMenuButton
} from 'video-react';
import VideoCourseContent from './VideoCourseContent';
import Overview from './Overview';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'
import { BsTriangleFill } from 'react-icons/bs'
import RatingPage from './RatingPage';
import ApiList from '../../../Components/Api/ApiList';
import AxiosInterceptors from '../../../Components/Api/AxiosInterceptors';
import ApiHeader from '../../../Components/Api/ApiHeader';
import BottomErrorCard from '../../../Components/Common/BottomErrorCard';
// import 'video-react/dist/video-react.css';
// import "node_modules/video-react/dist/video-react.css"; // import css
// import "../node_modules/video-react/dist/video-react.css";

const VideoPlayer2 = () => {

    const [showProgress, setshowProgress] = useState(false)
    const [isLoading, setisLoading] = useState(false);
    const [erroState, seterroState] = useState(false);
    const [currentName, setcurrentName] = useState(null);
    const [erroMessage, seterroMessage] = useState(null);
    const navigate = useNavigate()
    const location = useLocation()
    const { api_generateCertificate } = ApiList()
    const { courseId } = useParams()

    const fakePlaylist = [
        { id: 0, url: "https://img.freepik.com/free-vector/online-education-background_52683-8087.jpg", title: "Chapter 1", courseName: "Demo Course" },
        { id: 1, url: "https://img.freepik.com/free-psd/e-learning-concept-poster-style_23-2148600170.jpg", title: "Chapter 2", courseName: "Demo Course" },
        { id: 2, url: "https://img.freepik.com/premium-vector/online-training-education-studying-with-monitor_149152-82.jpg", title: "Chapter 3", courseName: "Demo Course" },
        { id: 3, url: "https://img.freepik.com/premium-vector/online-training-education-studying-with-monitor_149152-82.jpg", title: "Chapter 4", courseName: "Demo Course" },
        { id: 4, url: "https://img.freepik.com/free-vector/online-education-background_52683-8087.jpg", title: "Chapter 5", courseName: "Demo Course" },
    ]

    //5 FUNCTION TO GENERATE CERTIFICATE
    const generateCertificate = () => {
        setisLoading(true)
        let requestBody = {
            courseId: 8,
            // courseId: props?.courseId,
            studentName: currentName
        }

        console.log('before generate  certificates...', requestBody)
        // return
        AxiosInterceptors.post(api_generateCertificate, requestBody, ApiHeader())
            .then((response) => {
                console.log("--2-- After certificate generated data", response)
                if (response?.data?.status) {
                    console.log('success')
                } else {
                    activateBottomErrorCard(true, 'Error occured in submitting deactivation application. Please try again later.')
                }
            })
            .catch((err) => {
                activateBottomErrorCard(true, 'Error occured in submitting deactivation application. Please try again later.')
            }).finally(() => {
                setisLoading(false)
            })
    }

    // FUNCTION FOR CUSTOM ERROR MESSAGE CARD
    const activateBottomErrorCard = (state, msg) => {
        seterroMessage(msg)
        seterroState(state)
    }



    return (
        <>
            {erroState && <BottomErrorCard activateBottomErrorCard={activateBottomErrorCard} errorTitle={erroMessage} />}

            <dialog id="certification_dialog">
                <div className=''>
                    <button onClick={() => certification_dialog.close()} className='absolute top-2 right-3 text-xl p-2 w-8 h-8 rounded-lg  hover:bg-red-100 hover:text-red-500 font-semibold flex justify-center items-center'>x</button>
                    <div className=''>
                        <div className='font-serif font-semibold text-lg'>Create Certification</div>
                        <div className='text-gray-600 text-xs font-semibold'>Provide your full name as it will be printed on the certifcation and will not be changed after generated at once for one course.</div>
                    </div>
                </div>
                <div className='w-full mt-10'></div>
                <input
                    onChange={(e) => setcurrentName(e.target.value)}
                    className="flex h-10 w-full rounded-md border  border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="enter full name."
                ></input>

                {/* ACTION BUTTON & LOADER */}
                {isLoading ? <button
                    type="button"
                    className="flex justify-center items-center mt-4 rounded-md  bg-black px-10 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black cursor-default"
                ><RotatingLines strokeColor="white" strokeWidth="5" animationDuration="0.75" width="25" visible={true} /></button> :
                    <button
                        type="button"
                        onClick={generateCertificate}
                        className="mt-4 rounded-md  bg-black px-10 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >Create</button>}


            </dialog>
            <div className='grid grid-cols-12 space-x-0'>
                <div className='col-span-12 h-[80vh] bg-black text-white'>

                    {/* TOP HEADER */}
                    <div className='flex w-full space-x-10 bg-black border-b border-t border-gray-500 py-4 mb-1 px-10'>
                        <div className='flex-initial pr-10'>Udemy</div>
                        <div className='flex-1 justify-start'>Web Design for Web Developers: Build Beautiful Websites!</div>
                        <div className='flex-1 justify-end'>
                            <div className='flex justify-end'>
                                <div className='relative '>
                                    <div className='cursor-pointer hover:text-gray-200 ' onClick={() => setshowProgress(!showProgress)}>
                                        <img
                                            className="inline-block h-8 w-8 rounded-full cursor-pointer shadow-xl"
                                            src="https://overreacted.io/static/profile-pic-c715447ce38098828758e525a1128b87.jpg"
                                            alt="Dan_Abromov"
                                        />
                                        <span>Your Progress</span>
                                        {showProgress && <BiChevronUp className='inline font-semibold text-xl' />}
                                        {!showProgress && <BiChevronDown className='inline font-semibold text-xl' />}
                                    </div>

                                    {showProgress && <div className='bg-white text-black px-10 py-4 absolute top-10 -left-20 w-60 z-50'>
                                        <div>0 of 21 completed</div>
                                        {/* <div onClick={() => navigate('/certification')} className='text-sm font-semibold text-indigo-600 underline hover:text-indigo-800 cursor-pointer'>View Certification</div> */}
                                        <div onClick={() => certification_dialog.showModal()} className='text-sm font-semibold text-indigo-600 underline hover:text-indigo-800 cursor-pointer'>Create Certification</div>
                                        <div className='absolute -top-4 left-0 flex justify-center items-center w-full'><BsTriangleFill className="inline text-white text-xl" /></div>
                                    </div>}

                                </div>

                            </div>
                        </div>
                    </div>

                    {/* VIDEO PLAYER */}
                    {/* <div className=' border'>
                        <Player
                            playsInline
                            fluid={false}
                            width={"300px"}
                            autoPlay
                            poster="/assets/poster.png"
                            src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                        >
                            <ControlBar autoHide={false} disableDefaultControls={true} >
                                <PlayToggle />
                                <ReplayControl seconds={10} order={1.1} />
                                <ForwardControl seconds={30} order={1.2} />
                                <CurrentTimeDisplay order={4.1} />
                                <TimeDivider order={4.2} />
                                <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} order={7.1} />
                                <VolumeMenuButton disabled />
                            </ControlBar>
                        </Player>

                    </div> */}
                </div>
                {/* TABS */}



                <div className="col-span-12 w-full mb-20 ">
                    <div className="col-span-12 w-full md:px-32 bg-black">
                        <div className='flex border-b-2'>
                            <div onClick={() => navigate(`/play/course-content/${courseId}`)} className={`cursor-pointer px-4 py-2 text-base font-semibold leading-normal text-white  hover:text-indigo-600 ${location.pathname === 'play/course-content' && ' border-b-4 border-b-white'}`}>Course Content</div>
                            <div onClick={() => navigate(`/play/overview/${courseId}`)} className={`cursor-pointer px-4 py-2 text-base font-semibold leading-normal text-white  hover:text-indigo-600 ${location.pathname === 'play/overview' && ' border-b-4 border-b-white'} `}>Overview</div>
                            <div onClick={() => navigate(`/play/ratings/${courseId}`)} className={`cursor-pointer px-4 py-2 text-base font-semibold leading-normal text-white  hover:text-indigo-600 ${location.pathname === 'play/ratings' && ' border-b-4 border-b-white'} `}>Reviews</div>
                        </div>
                    </div>
                    <Outlet />
                    {/* <VideoCourseContent />
                    <Overview />
                    <RatingPage /> */}
                </div>




            </div>
        </>
    )
}

export default VideoPlayer2
