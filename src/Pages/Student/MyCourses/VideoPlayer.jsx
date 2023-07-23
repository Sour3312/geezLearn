import React from 'react'
import ReactPlayer from 'react-player/lazy'
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
// import "node_modules/video-react/dist/video-react.css"; // import css
// import "../node_modules/video-react/dist/video-react.css";

const VideoPlayer = () => {


    const fakePlaylist = [
        { id: 0, url: "https://img.freepik.com/free-vector/online-education-background_52683-8087.jpg", title: "Chapter 1", courseName: "Demo Course" },
        { id: 1, url: "https://img.freepik.com/free-psd/e-learning-concept-poster-style_23-2148600170.jpg", title: "Chapter 2", courseName: "Demo Course" },
        { id: 2, url: "https://img.freepik.com/premium-vector/online-training-education-studying-with-monitor_149152-82.jpg", title: "Chapter 3", courseName: "Demo Course" },
        { id: 3, url: "https://img.freepik.com/premium-vector/online-training-education-studying-with-monitor_149152-82.jpg", title: "Chapter 4", courseName: "Demo Course" },
        { id: 4, url: "https://img.freepik.com/free-vector/online-education-background_52683-8087.jpg", title: "Chapter 5", courseName: "Demo Course" },
    ]


    return (
        <>
            <div className='grid grid-cols-12 space-x-0'>
                <div className='col-span-9'>
                    <div className=' border'>
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

                    </div>
                </div>
                <div className='col-span-3 bg-gray-500'>
                    <div className='border p-1'>
                        <p className='text-center text-white font-semibold text-2xl my-2'>
                            Playlist Title
                        </p>


                        {fakePlaylist &&

                            fakePlaylist.map((item) => (

                                <div key={item.id} className='bg-gray-200 hover:bg-gray-300 p-1 border-b border-black cursor-pointer'>
                                    <div className=' '>
                                        <div className='flex m-1'>

                                            <img src={item?.url} className="h-10 w-10 rounded" alt="" />
                                            <div className='ml-2'>
                                                <p className='text-sm text-blue-700'>{item?.title}</p>
                                                <p className='text-xs'>{item?.courseName}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }

                    </div>
                </div>

            </div>
        </>
    )
}

export default VideoPlayer
