import React,{useState} from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper";
import sl1 from './sl1.jpg'
import sl2 from './sl2.jpg'

import img1desktop from './img1desktop.png'
import img2desktop from './img2desktop.png'
import img3desktop from './img3desktop.png'
import img1mobile from './img1mobile.jpeg'
import img2mobile from './img2mobile.jpeg'
import img3mobile from './img3mobile.jpeg'
import wood from './wood.jpg'
import pc from './pc.svg'
import LoginModal from "../Login/LoginModal";

export default function Slider() {
    const [openLoginModal, setOpenLoginModal] = useState(0)
    const [openPage, setOpenPage] = useState()


    const handleLoginModal = (page) => {
        setOpenLoginModal(prev => prev + 1)
        setOpenPage(page)
    }

    return (
        <>
            <div className="z-0 relative">

                {/* 
                <Swiper
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper"
                    freeMode={true}
                >
                    <SwiperSlide>
                        <img
                            className="object-fill w-full h-auto md:w-full md:h-96 hidden md:block"
                            src={img1desktop}
                            alt="image slide 1"
                        />
                        <img
                            className="object-fill w-full h-auto md:hidden"
                            src={img1mobile}
                            alt="image slide 1"
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img
                            className="object-fill w-full h-auto md:w-full md:h-96 hidden md:block"
                            src={img2desktop}
                            alt="image slide 2"
                        />
                        <img
                            className="object-fill w-full h-auto md:hidden"
                            src={img2mobile}
                            alt="image slide 1"
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img
                            className="object-fill w-full h-auto md:w-full md:h-96 hidden md:block"
                            src={img3desktop}
                            alt="image slide 3"
                        />
                        <img
                            className="object-fill w-full h-auto  md:hidden"
                            src={img3mobile}
                            alt="image slide 1"
                        />
                    </SwiperSlide>
                </Swiper> */}
                <LoginModal openLoginModal={openLoginModal} openPage={openPage} />

                <div className="relative hidden">
                    <div className="w-full"><img className="w-full transform -scale-x-100" src={img1desktop} alt="" /></div>

                    {/* OVER CONTENT */}
                    <div className="w-full absolute top-0 left-0 h-full">
                        <div className="w-4/5 mx-auto flex justify-between h-full">

                            {/* TEXT CONTENT */}
                            <div className="flex-1 flex justify-center items-center p-4">
                                <div className="border border-white text-white bg-indigo-500 w-full h-full flex justify-center items-center shadow-xl filter">
                                    <div>
                                        <div className="text-6xl text-white font-semibold">World’s #1<br />Online Bootcamp</div>
                                        <div className="tracking-widest text-lg mt-4"><span className="font-semibold">5,000,00 </span>careers advanced</div>
                                        <div className="tracking-widest text-lg mt-4"><span className="font-semibold">5,000,00 </span>careers advanced</div>
                                        <div className="tracking-widest text-lg mt-4"><span className="font-semibold">5,000,00 </span>careers advanced</div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1"></div>
                        </div>
                    </div>
                </div>

                <div className="relative bg-[#6980D3] h-[80vh] w-full flex">
                    <div className="flex-1 flex justify-center items-center"><img className="w-[70%]" src={pc} alt="" /></div>

                    {/* CONTENT PART */}
                    <div className="flex-1">
                        <div className="text-white w-full h-full flex justify-center items-center">
                            <div>
                                <div className="text-6xl text-white font-semibold"># GeezLearn<br />The learning platform</div>
                                <div className="tracking-widest text-md mt-4 text-gray-200 md:pr-60"><span className="font-semibold">5,000,00 </span>careers advanced topics which will enhance your skill in no time. So what are your waiting for ?</div>
                                <button onClick={() => handleLoginModal("login")} type="button" className="rounded-md bg-white px-10 py-2 text-lg font-semibold text-[#6980D3]  hover:bg-[#6980D3] border border-white hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white shadow-xl mt-4"
                                >Login</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}