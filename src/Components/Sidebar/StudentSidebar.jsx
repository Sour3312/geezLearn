import { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiAlertCircle } from 'react-icons/fi'
import { globalContextData } from '../Common/Context/GlobalContextFile'
import { getLocalStorageItemJsonParsed } from '../Common/localstorage'
import profile from '../../Assets/images/profile.png'

function StudentSidebar() {
    const [cardShowStatus, setcardShowStatus] = useState(false)
    const navigate = useNavigate()
    const { userData, setuserData, userImage, setuserImage } = useContext(globalContextData)

    useEffect(() => {
        // 🅽🅴🅴🅳 🅸🅼🅿🆁🅾🆅🅴🅼🅴🅽🆃🆂
        let localStorageUserData = userData === null ? getLocalStorageItemJsonParsed('userData') : userData
        let localStorageUserImage = userImage === null ? getLocalStorageItemJsonParsed('userImage') : userImage
        setuserData(localStorageUserData)
        setuserImage(localStorageUserImage)
    }, [])

    const logOutUser = () => {
        navigate('/logout')
    }
    return (

        <>
            <dialog id='logoutModal2' className='bg-transparent'>
                <div style={{ 'zIndex': 9999999 }} class="relative bg-white rounded-lg shadow-xl border-2 border-gray-50">
                    <button onClick={() => logoutModal2.close()} type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center darks:hover:bg-gray-800 darks:hover:text-white" >
                        <svg class="w-5 h-5" fill="currentColor" ><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </button>
                    <div class="p-6 text-center">
                        <div className='w-full flex h-10'> <span className='mx-auto'><FiAlertCircle size={30} /></span></div>
                        <h3 class="mb-5 text-lg font-normal text-gray-500 darks:text-gray-400">Are you sure you want to logout ?</h3>
                        <button type="button" className="cypress_button_logout text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 darks:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2" onClick={logOutUser}>
                            Yes, I'm sure
                        </button>

                    </div>
                </div>
            </dialog>

            <div className='relative' onMouseEnter={() => setcardShowStatus(true)} onMouseLeave={() => setcardShowStatus(false)}>
                <img
                    className="inline-block h-8 w-8 rounded-full cursor-pointer"
                    src={userImage || profile}
                    alt="Dan_Abromov"
                />
                {cardShowStatus && <div className="w-[300px] rounded-md border absolute right-[10px] px-4 pt-2 pb-10 bg-white shadow-xl">

                    <div className='flex space-x-4'>
                        <div className='flex-initial'>
                            <img
                                className="inline-block h-14 w-14 rounded-full"
                                src={userImage || profile}
                                alt="Dan_Abromov"
                            />
                        </div>
                        <div className='flex-initial'>
                            <div className='font-bold text-xl'>{userData?.userName}</div>
                            <div>{userData?.userEmail}</div>
                        </div>
                    </div>

                    <div className='border-b-2 mt-6'></div>
                    <div className="p-4 flex flex-col space-y-5">
                        <div onClick={() => navigate('/StudentDahboard')} className='cursor-pointer hover:text-indigo-600 hover:font-semibold'>Dashboard</div>
                        <div onClick={() => navigate('/my-learnings/mycourse')} className='cursor-pointer hover:text-indigo-600 hover:font-semibold'>My Learnings</div>
                        <div onClick={() => navigate('/cart')} className='cursor-pointer hover:text-indigo-600 hover:font-semibold'>My Cart</div>
                        <div onClick={() => navigate('/my-learnings/wishlist')} className='cursor-pointer hover:text-indigo-600 hover:font-semibold'>Wishlist</div>
                    </div>

                    <div className='border-b-2 mt-6'></div>
                    <div className="p-4 flex flex-col space-y-5">
                        <div onClick={() => navigate('/profile/basic-details')} className='cursor-pointer hover:text-indigo-600 hover:font-semibold'>Profile</div>
                        <div onClick={() => navigate('/order-history')} className='cursor-pointer hover:text-indigo-600 hover:font-semibold'>Purchase History</div>
                        <div onClick={() => navigate('/certificate-list')} className='cursor-pointer hover:text-indigo-600 hover:font-semibold'>Certifications</div>
                        <div onClick={() => navigate('/my-ratings')} className='cursor-pointer hover:text-indigo-600 hover:font-semibold'>My Ratings</div>
                    </div>

                    <div className='border-b-2 mt-6'></div>
                    <div className="p-4 flex flex-col space-y-5">
                        <div onClick={() => navigate('/change-password')} className='cursor-pointer hover:text-indigo-600 hover:font-semibold'>Change Password</div>
                        <div onClick={() => navigate('/help')} className='cursor-pointer hover:text-indigo-600 hover:font-semibold'>Help</div>
                        <div onClick={() => navigate('/contact')} className='cursor-pointer hover:text-indigo-600 hover:font-semibold'>Contact</div>
                        <div onClick={() => logoutModal2.showModal()} className='cursor-pointer hover:text-indigo-600 hover:font-semibold'>LogOut</div>
                    </div>
                </div>}
            </div>
        </>
    )
}

export default StudentSidebar