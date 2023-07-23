import { useState } from 'react'
import { BsFillPlayFill } from 'react-icons/bs'
import woman from './woman.jpeg'
import man from './man.png'
import LoginModal from '../Login/LoginModal'
import { useNavigate } from 'react-router-dom'


function TrustBrands() {
    const [openLoginModal, setOpenLoginModal] = useState(0)
    const [openPage, setOpenPage] = useState()
    const navigate = useNavigate()

    const handleLoginModal = (page) => {
        setOpenLoginModal(prev => prev + 1)
        setOpenPage(page)
    }


    return (
        <>
            <LoginModal openLoginModal={openLoginModal} openPage={openPage} />
            <div className='bg-gray-100 w-full py-8 px-4'>
                <div className='text-2xl md:text-3xl font-bold text-centers text-center'>Trusted by over 13,400 great teams</div>
                <div className='text-sm text-gray-600 text-center font-custom-lora'>Leading companies use the same courses to help employees keep their skills fresh.</div>
                <div className="flex flex-row py-6">
                    <div className="flex-1 flex justify-center items-center"><img src="https://s.udemycdn.com/partner-logos/v4/nasdaq-dark.svg" /> </div>
                    <div className="flex-1 flex justify-center items-center"><img src="https://s.udemycdn.com/partner-logos/v4/volkswagen-dark.svg" /> </div>
                    <div className="flex-1"><img src="https://s.udemycdn.com/partner-logos/v4/box-dark.svg" /> </div>
                    <div className="flex-1 hidden md:flex justify-center items-center"><img src="https://s.udemycdn.com/partner-logos/v4/netapp-dark.svg" /> </div>
                    <div className="flex-1 hidden md:flex justify-center items-center"><img src="https://s.udemycdn.com/partner-logos/v4/eventbrite-dark.svg" /> </div>
                    <div className="flex-1 hidden md:flex justify-center items-center"><img src="https://s.udemycdn.com/partner-logos/v4/tcs-dark.svg" /> </div>
                </div>
                <div className="flex flex-row py-6 md:hidden">
                    <div className="flex-1 flex justify-center items-center"><img src="https://s.udemycdn.com/partner-logos/v4/netapp-dark.svg" /> </div>
                    <div className="flex-1 flex justify-center items-center"><img src="https://s.udemycdn.com/partner-logos/v4/eventbrite-dark.svg" /> </div>
                    <div className="flex-1 flex justify-center items-center"><img src="https://s.udemycdn.com/partner-logos/v4/tcs-dark.svg" /> </div>
                </div>
            </div>

            {/*  IMAGE-CARD SECTION-1 */}
            <section className="text-gray-600 body-font overflow-hidden">
                <div className="container px-5 py-24 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                            <h1 className="text-gray-900 text-3xl title-font mb-4 font-custom-montserrat font-semibold">Geezlearn Plans</h1>
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-4 font-custom-lora">Upskill your team with Geezlearn</h1>

                            <ul className="space-y-1 max-w-md text-lg list-disc list-inside text-gray-800">
                                <li>
                                    Unlimited access to 19,000+ top Udemy courses, anytime, anywhere
                                </li>
                                <li>
                                    International course collection in 14 languages
                                </li>
                                <li>
                                    Top certifications in tech and business
                                </li>
                            </ul>
                            <div className="w-full grid grid-cols-12 mt-10">
                                <div className='col-span-12 md:col-span-6 w-full md:pr-5'>
                                    <button onClick={() => handleLoginModal("register-student")} className="flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded font-semibold shadow-lg w-full justify-center items-center">Get Geezlearn Plans</button>
                                </div>
                                <div className='col-span-12 md:col-span-6 w-full md:pl-10 mt-4 md:mt-0'>
                                    <button onClick={() => navigate('/about')} className="flex border border-indigo-500 text-indigo-500 py-2 px-6 focus:outline-none hover:bg-indigo-600 hover:text-white rounded font-semibold shadow-lg w-full justify-center items-center">Learn more</button>
                                </div>

                            </div>
                        </div>
                        <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src={woman} />
                    </div>
                </div>
            </section>

            {/*  IMAGE-CARD SECTION-2 */}
            <section className="text-gray-600 body-font overflow-hidden">
                <div className="container px-5 py-8 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">

                        <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src={man} />

                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mb-6 lg:mb-0 flex justify-center items-center ">
                            <div>
                                <h1 className="text-gray-900 text-3xl title-font mb-4 font-semibold">Become an instructor </h1>
                                <div className='text-lg md:text-xl text-gray-800 font-custom-lora'>Leading companies use the same courses to help employees keep their skills fresh.</div>
                                <div className="w-full grid grid-cols-12 mt-10">
                                    <div className='col-span-12 md:col-span-6 w-full md:pr-5'>
                                        <button onClick={() => handleLoginModal("register-teacher")} className="flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded font-semibold shadow-lg w-full justify-center items-center">Start Teaching Today</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default TrustBrands